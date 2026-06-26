import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import MadrasahLayout from './components/Layout/MadrasahLayout';
import { getItem } from './services/storageService';

// Admin pages
import AdminDashboard from './pages/AdminDashboard';
import ActivationManagement from './pages/ActivationManagement';
import MasterEDM from './pages/MasterEDM';
import MasterProgram from './pages/MasterProgram';
import TemplateDocs from './pages/TemplateDocs';
import AdminBackupRestore from './pages/AdminBackupRestore';

// Madrasah pages
import MadrasahDashboard from './pages/MadrasahDashboard';
import ProfilMadrasah from './pages/ProfilMadrasah';
import VisiMisi from './pages/VisiMisi';
import TPMPage from './pages/TPMPage';
import EDMWizard from './pages/EDMWizard';
import EDMScore from './pages/EDMScore';
import RecommendationPage from './pages/RecommendationPage';
import ProblemAnalysis from './pages/ProblemAnalysis';
import RKJMPage from './pages/RKJMPage';
import JadwalKegiatan from './pages/JadwalKegiatan';
import RKTPage from './pages/RKTPage';
import BudgetPage from './pages/BudgetPage';
import DocumentEDM from './pages/DocumentEDM';
import DocumentRKM from './pages/DocumentRKM';
import BackupRestore from './pages/BackupRestore';

// Auth
import LoginPage from './pages/LoginPage';
import { login } from './services/authService';

function ProtectedRoute({ children, role }) {
  const auth = getItem('auth');
  if (!auth) return <Navigate to="/login" replace />;
  if (role && auth.role !== role) return <Navigate to="/login" replace />;
  return children;
}

function AdminRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/activation" element={<ActivationManagement />} />
        <Route path="/master-edm" element={<MasterEDM />} />
        <Route path="/master-program" element={<MasterProgram />} />
        <Route path="/template-docs" element={<TemplateDocs />} />
        <Route path="/backup" element={<AdminBackupRestore />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Layout>
  );
}

function MadrasahRoutes() {
  return (
    <MadrasahLayout>
      <Routes>
        <Route path="/" element={<MadrasahDashboard />} />
        <Route path="/profil" element={<ProfilMadrasah />} />
        <Route path="/visi-misi" element={<VisiMisi />} />
        <Route path="/tpm" element={<TPMPage />} />
        <Route path="/edm" element={<EDMWizard />} />
        <Route path="/skor-edm" element={<EDMScore />} />
        <Route path="/rekomendasi" element={<RecommendationPage />} />
        <Route path="/analisis" element={<ProblemAnalysis />} />
        <Route path="/rkjm" element={<RKJMPage />} />
        <Route path="/jadwal" element={<JadwalKegiatan />} />
        <Route path="/rkt" element={<RKTPage />} />
        <Route path="/anggaran" element={<BudgetPage />} />
        <Route path="/dokumen-edm" element={<DocumentEDM />} />
        <Route path="/dokumen-rkm" element={<DocumentRKM />} />
        <Route path="/backup" element={<BackupRestore />} />
        <Route path="*" element={<Navigate to="/madrasah" replace />} />
      </Routes>
    </MadrasahLayout>
  );
}

export default function App() {
  const [auth, setAuth] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const user = getItem('auth');
    if (user) setAuth(user);
    setChecking(false);
  }, []);

  if (checking) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div></div>;

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={auth ? <Navigate to={auth.role==='admin'?'/admin':'/madrasah'} replace /> : <LoginPage />} />
        <Route path="/admin/*" element={<ProtectedRoute role="admin"><AdminRoutes /></ProtectedRoute>} />
        <Route path="/madrasah/*" element={<ProtectedRoute role="madrasah"><MadrasahRoutes /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </HashRouter>
  );
}