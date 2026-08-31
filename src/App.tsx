import React, { useEffect } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { recordVisit } from '@/lib/visitorTracking';

// Pages
import Home from '@/pages/Home';
import Profil from '@/pages/Profil';
import Kurikulum from '@/pages/Kurikulum';
import Kesiswaan from '@/pages/Kesiswaan';
import Kontak from '@/pages/Kontak';

// SPMB Pages
import SpmbHome from '@/pages/spmb/SpmbHome';
import SpmbLogin from '@/pages/spmb/SpmbLogin';
import SpmbRegister from '@/pages/spmb/SpmbRegister';
import SpmbDashboard from '@/pages/spmb/SpmbDashboard';
import SpmbForm from '@/pages/spmb/SpmbForm';
import SpmbPayment from '@/pages/spmb/SpmbPayment';

// Admin Pages
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminRegistrations from '@/pages/admin/AdminRegistrations';
import AdminPayments from '@/pages/admin/AdminPayments';
import AdminVisitorAnalytics from '@/pages/admin/AdminVisitorAnalytics';
import AdminContent from '@/pages/admin/AdminContent';

function VisitorTracker() {
  const location = useLocation();

  useEffect(() => {
    recordVisit(location.pathname);
  }, [location.pathname]);

  return null;
}

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <>
      <VisitorTracker />
      <Routes>
        {/* Main website layout with Navbar & Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/kurikulum" element={<Kurikulum />} />
          <Route path="/kesiswaan" element={<Kesiswaan />} />
          <Route path="/kontak" element={<Kontak />} />
          
          {/* SPMB routes */}
          <Route path="/spmb" element={<SpmbHome />} />
          <Route path="/spmb/login" element={<SpmbLogin />} />
          <Route path="/spmb/register" element={<SpmbRegister />} />
          <Route path="/spmb/dashboard" element={<SpmbDashboard />} />
          <Route path="/spmb/dashboard/form" element={<SpmbForm />} />
          <Route path="/spmb/dashboard/payment" element={<SpmbPayment />} />
        </Route>

        {/* Admin routes with custom sidebar layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="registrations" element={<AdminRegistrations />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="visitors" element={<AdminVisitorAnalytics />} />
          <Route path="content" element={<AdminContent />} />
        </Route>
      </Routes>
    </>
  );
}
