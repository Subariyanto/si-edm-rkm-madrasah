import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';
import {
  LayoutDashboard, Users, ClipboardCheck, BookOpen, FileText,
  Database, ShieldCheck, LogOut, Menu, X, Key
} from 'lucide-react';

const adminMenu = [
  { path: '/admin/dashboard', label: 'Dashboard Admin', icon: LayoutDashboard },
  { path: '/admin/activation', label: 'Kode Aktivasi', icon: Key },
  { path: '/admin/master-edm', label: 'Master Indikator EDM', icon: ClipboardCheck },
  { path: '/admin/master-program', label: 'Master Program RKM', icon: BookOpen },
  { path: '/admin/templates', label: 'Template Dokumen', icon: FileText },
  { path: '/admin/backup', label: 'Backup & Restore', icon: Database },
];

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={onToggle} />
      )}
      <aside className={`fixed top-0 left-0 h-full bg-primary-800 text-white z-30 transition-all duration-300 ${
        collapsed ? '-translate-x-full lg:translate-x-0 lg:w-16' : 'translate-x-0 w-64'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-primary-700">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-gold-400" />
              <div>
                <h1 className="font-bold text-sm">Si-EDM RKM</h1>
                <p className="text-xs text-primary-300">Admin Panel</p>
              </div>
            </div>
          ) : (
            <ShieldCheck className="w-7 h-7 text-gold-400 mx-auto" />
          )}
          <button onClick={onToggle} className="lg:hidden text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-2 space-y-1 overflow-y-auto flex-1" style={{ height: 'calc(100% - 120px)' }}>
          {adminMenu.map((item) => (
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
        <div className="p-3 border-t border-primary-700">
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