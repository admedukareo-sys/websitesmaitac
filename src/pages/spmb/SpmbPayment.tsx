import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getRegistrationByUserId, updateRegistration } from '@/lib/storage';

export default function SpmbPayment() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/spmb/login');
      return;
    }
    const reg = getRegistrationByUserId(user.id);
    if (reg && reg.paymentStatus !== 'UNPAID') {
      navigate('/spmb/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    // Mock upload proof url
    const mockFileUrl = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80';

    updateRegistration(user.id, {
      paymentProofUrl: mockFileUrl,
      paymentStatus: 'PENDING',
    });

    setLoading(false);
    navigate('/spmb/dashboard');
  };

  if (!user) return null;

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">Pembayaran Biaya Pendaftaran</h1>
          
          <div className="bg-emerald-50 rounded-xl p-6 mb-8 text-center">
            <p className="text-slate-600 mb-2">Total yang harus dibayar:</p>
            <p className="text-3xl font-bold text-emerald-700">Rp 250.000</p>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-slate-800 mb-2">Transfer ke Rekening Bank:</h3>
            <div className="bg-slate-100 rounded-lg p-4 font-mono text-center mb-2">
              BSI (Bank Syariah Indonesia)<br/>
              <span className="text-xl font-bold">1234 5678 90</span><br/>
              a.n. Yayasan Andalas Cendekia
            </div>
            <p className="text-sm text-slate-500 text-center">Pastikan nominal transfer sesuai.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Upload Bukti Transfer</label>
              <input 
                type="file" 
                name="paymentProof" 
                accept="image/*" 
                required 
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" 
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? 'Mengirim...' : 'Konfirmasi & Kirim Bukti'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
