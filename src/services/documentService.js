import { getItem, setItem } from './storageService';

const TEMPLATES_KEY = 'document_templates';
const DOCUMENTS_KEY = 'documents';

export function getTemplates() {
  return getItem(TEMPLATES_KEY) || [];
}

export function saveTemplate(template) {
  const templates = getTemplates();
  templates.push({ ...template, id: Date.now().toString(), createdAt: new Date().toISOString() });
  setItem(TEMPLATES_KEY, templates);
  return templates;
}

export function updateTemplate(id, updates) {
  const templates = getTemplates();
  const idx = templates.findIndex(t => t.id === id);
  if (idx !== -1) {
    templates[idx] = { ...templates[idx], ...updates };
    setItem(TEMPLATES_KEY, templates);
    return templates;
  }
  return null;
}

export function deleteTemplate(id) {
  const templates = getTemplates();
  const filtered = templates.filter(t => t.id !== id);
  setItem(TEMPLATES_KEY, filtered);
  return filtered;
}

export function getDocuments() {
  return getItem(DOCUMENTS_KEY) || [];
}

export function saveDocument(doc) {
  const docs = getDocuments();
  docs.push({ ...doc, id: Date.now().toString(), createdAt: new Date().toISOString() });
  setItem(DOCUMENTS_KEY, docs);
  return docs;
}

export function deleteDocument(id) {
  const docs = getDocuments();
  const filtered = docs.filter(d => d.id !== id);
  setItem(DOCUMENTS_KEY, filtered);
  return filtered;
}

export default { getTemplates, saveTemplate, updateTemplate, deleteTemplate, getDocuments, saveDocument, deleteDocument };