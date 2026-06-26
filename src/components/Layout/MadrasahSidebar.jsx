import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';
import {
  LayoutDashboard, School, Eye, Users, Edit3, BarChart3, Lightbulb,
  Search, CalendarDays, FileText, DollarSign, BookOpen, FileCheck,
  Database, LogOut, X, GraduationCap
} from 'lucide-react';

const madrasahMenu = [
  { path: '/madrasah/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/madrasah/profil', label: 'Profil Madrasah', icon: School },
  { path: '/madrasah/visi-misi', label: 'Visi, Misi, Tujuan', icon: Eye },
  { path: '/madrasah/tpm', label: 'Tim Penjaminan Mutu', icon: Users },
  { path: '/madrasah/edm', label: 'Pengisian EDM', icon: Edit3 },
  { path: '/madrasah/skor-edm', label: 'Skor EDM', icon: BarChart3 },
  { path: '/madrasah/rekomendasi', label: 'Rekomendasi', icon: Lightbulb },
  { path: '/madrasah/analisis', label: 'Analisis Masalah', icon: Search },
  { path: '/madrasah/rkjm', label: 'RKJM 4 Tahun', icon: CalendarDays },
  { path: '/madrasah/jadwal', label: 'Jadwal Kegiatan', icon: CalendarDays },
  { path: '/madrasah/rkt', label: 'RKT Tahunan', icon: FileText },
  { path: '/madrasah/anggaran', label: 'Rencana Anggaran', icon: DollarSign },
  { path: '/madrasah/dokumen-edm', label: 'Dokumen EDM', icon: BookOpen },
  { path: '/madrasah/dokumen-rkm', label: 'Dokumen RKM', icon: FileCheck },
  { path: '/madrasah/backup', label: 'Backup & Restore', icon: Database },
];

export default function MadrasahSidebar({ collapsed, onToggle }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {!collapsed && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={onToggle} />
      )}
      <aside className={`fixed top-0 left-0 h-full bg-primary-800 text-white z-30 transition-all duration-300 overflow-y-auto ${
        collapsed ? '-translate-x-full lg:translate-x-0 lg:w-16' : 'translate-x-0 w-64'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-primary-700">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <GraduationCap className="w-7 h-7 text-gold-400" />
              <div>
                <h1 className="font-bold text-sm">Si-EDM RKM</h1>
                <p className="text-xs text-primary-300">Madrasah</p>
              </div>
            </div>
          ) : (
            <GraduationCap className="w-7 h-7 text-gold-400 mx-auto" />
          )}
          <button onClick={onToggle} className="lg:hidden text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-2 space-y-1 pb-20">
          {madrasahMenu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => { if (window.innerWidth < 1024) onToggle(); }}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive ? 'bg-primary-600 text-white' : 'text-primary-200 hover:bg-primary-700 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-primary-700 sticky bottom-0 bg-primary-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-primary-200 hover:bg-red-700 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="text-sm">Keluar</span>}
          </button>
        </div>
      </aside>
    </>
  );
}