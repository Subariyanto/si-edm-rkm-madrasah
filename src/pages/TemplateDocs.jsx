import { useState } from 'react';
import { getTemplates, saveTemplate, updateTemplate, deleteTemplate } from '../services/documentService';
import { documentTemplates } from '../data/documentTemplates';
import { getItem, setItem } from '../services/storageService';
import { FileText, Plus, Edit3, Trash2, Save, X, Eye, RotateCcw } from 'lucide-react';
import ConfirmModal from '../components/Modals/ConfirmModal';

const STORAGE_KEY = 'document_templates';

export default function TemplateDocs() {
  const [templates, setTemplates] = useState(() => {
    const stored = getItem(STORAGE_KEY);
    return (stored && stored.length > 0) ? stored : documentTemplates;
  });
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [viewTemplate, setViewTemplate] = useState(null);
  const [notif, setNotif] = useState('');

  const emptyForm = { name: '', type: 'edm', description: '', structure: [] };
  const [form, setForm] = useState({ ...emptyForm });

  const showNotif = (msg) => { setNotif(msg); setTimeout(() => setNotif(''), 3000); };

  const handleEdit = (t) => {
    setForm({ name: t.name, type: t.type, description: t.description || '', structure: [...(t.structure || [])] });
    setEditing(t.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) { showNotif('Nama template wajib diisi'); return; }
    let updated;
    if (editing) {
      updated = templates.map(t => t.id === editing ? { ...t, ...form } : t);
    } else {
      updated = [...templates, { ...form, id: Date.now().toString(), createdAt: new Date().toISOString() }];
    }
    setItem(STORAGE_KEY, updated);
    setTemplates(updated);
    setShowForm(false);
    setForm({ ...emptyForm });
    setEditing(null);
    showNotif(editing ? 'Template berhasil diperbarui' : 'Template baru berhasil ditambahkan');
  };

  const handleDelete = (id) => {
    setItem(STORAGE_KEY, templates.filter(t => t.id !== id));
    setTemplates(prev => prev.filter(t => t.id !== id));
    setConfirmDelete(null);
    showNotif('Template berhasil dihapus');
  };

  const handleReset = () => {
    setItem(STORAGE_KEY, documentTemplates);
    setTemplates(documentTemplates);
    showNotif('Data template dikembalikan ke default');
  };

  const handleSectionChange = (index, field, value) => {
    const newStructure = [...form.structure];
    newStructure[index] = { ...newStructure[index], [field]: value };
    setForm(prev => ({ ...prev, structure: newStructure }));
  };

  const addSection = () => {
    setForm(prev => ({ ...prev, structure: [...prev.structure, { section: '', order: prev.structure.length + 1, content: '' }] }));
  };

  const removeSection = (index) => {
    setForm(prev => ({ ...prev, structure: prev.structure.filter((_, i) => i !== index) }));
  };

  const typeLabel = { edm: 'EDM', rkm: 'RKM', edm_report: 'Laporan EDM' };
  const typeColor = { edm: 'bg-green-100 text-green-700', rkm: 'bg-blue-100 text-blue-700', edm_report: 'bg-purple-100 text-purple-700' };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Template Dokumen</h1>
          <p className="text-gray-500 text-sm">Kelola template dokumen EDM dan RKM</p>
        </div>
      </div>

      {notif && <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">{notif}</div>}

      <div className="flex gap-2 mb-4">
        <button onClick={() => { setForm({ ...emptyForm }); setEditing(null); setShowForm(true); }} className="flex items-center gap-1 px-4 py-2 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800">
          <Plus size={16} /> Tambah Template
        </button>
        <button onClick={handleReset} className="flex items-center gap-1 px-4 py-2 text-sm border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50">
          <RotateCcw size={16} /> Reset Default
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(t => (
          <div key={t.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-green-50 rounded-lg"><FileText size={24} className="text-green-700" /></div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColor[t.type] || 'bg-gray-100 text-gray-700'}`}>
                {typeLabel[t.type] || t.type}
              </span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{t.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{t.description}</p>
            <div className="text-xs text-gray-400 mb-3">
              {t.structure?.length || 0} seksi • Dibuat {new Date(t.createdAt).toLocaleDateString('id-ID')}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setViewTemplate(t)} className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-xs border border-gray-300 text-gray-600 rounded hover:bg-gray-50">
                <Eye size={14} /> Lihat
              </button>
              <button onClick={() => handleEdit(t)} className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-xs border border-blue-300 text-blue-600 rounded hover:bg-blue-50">
                <Edit3 size={14} /> Edit
              </button>
              <button onClick={() => setConfirmDelete(t.id)} className="flex items-center justify-center px-3 py-1.5 text-xs border border-red-300 text-red-500 rounded hover:bg-red-50">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Template Modal */}
      {viewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-gray-800">{viewTemplate.name}</h3>
              <button onClick={() => setViewTemplate(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="px-6 py-4">
              <p className="text-sm text-gray-500 mb-4">{viewTemplate.description}</p>
              <div className="space-y-2">
                {(viewTemplate.structure || []).sort((a, b) => a.order - b.order).map((s, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{s.order}</span>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{s.section}</p>
                      {s.content && <p className="text-xs text-gray-500 mt-1 whitespace-pre-line">{s.content}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end px-6 py-4 border-t">
              <button onClick={() => setViewTemplate(null)} className="px-4 py-2 text-sm bg-green-700 text-white rounded hover:bg-green-800">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Create Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
              <h3 className="text-lg font-semibold text-gray-800">{editing ? 'Edit Template' : 'Tambah Template Baru'}</h3>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Template <span className="text-red-500">*</span></label>
                <input value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
                  <select value={form.type} onChange={e => setForm(prev => ({ ...prev, type: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option value="edm">Dokumen EDM</option>
                    <option value="rkm">Dokumen RKM</option>
                    <option value="edm_report">Laporan EDM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                  <input value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Struktur / Seksi</label>
                  <button type="button" onClick={addSection} className="text-xs text-green-700 hover:text-green-800 flex items-center gap-1"><Plus size={14} /> Tambah Seksi</button>
                </div>
                <div className="space-y-3">
                  {form.structure.map((s, i) => (
                    <div key={i} className="flex gap-2 items-start p-3 bg-gray-50 rounded-lg">
                      <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">{i + 1}</span>
                      <div className="flex-1 space-y-2">
                        <input value={s.section} onChange={e => handleSectionChange(i, 'section', e.target.value)} placeholder="Nama seksi (contoh: Cover)" className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" />
                        <textarea value={s.content || ''} onChange={e => handleSectionChange(i, 'content', e.target.value)} placeholder="Konten (opsional)" className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" rows={2} />
                      </div>
                      <button onClick={() => removeSection(i)} className="text-red-400 hover:text-red-600 mt-1"><X size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-lg sticky bottom-0">
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100">Batal</button>
              <button onClick={handleSave} className="flex items-center gap-1 px-4 py-2 text-sm text-white bg-green-700 rounded hover:bg-green-800"><Save size={16} /> Simpan</button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <ConfirmModal
          title="Hapus Template"
          message="Yakin hapus template ini? Dokumen yang sudah dibuat dengan template ini mungkin terpengaruh."
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
          confirmText="Ya, Hapus"
          danger
        />
      )}
    </div>
  );
}