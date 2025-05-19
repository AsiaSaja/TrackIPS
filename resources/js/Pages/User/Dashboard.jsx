import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Map from './Map';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function UserDashboard({ auth }) {
  const [userPosition, setUserPosition] = useState([-7.2575, 112.7521]); // Default: ITS Surabaya
  const [isLocationLoading, setIsLocationLoading] = useState(true);

  useEffect(() => {
    // Simulasi mendapatkan lokasi pengguna
    // Dalam implementasi nyata, ini bisa diganti dengan data dari sensor atau API
    const getLocation = setTimeout(() => {
      // Contoh: Lokasi disekitar ITS
      const simulatedPosition = [
        -7.2575 + (Math.random() * 0.002 - 0.001),
        112.7521 + (Math.random() * 0.002 - 0.001)
      ];
      setUserPosition(simulatedPosition);
      setIsLocationLoading(false);
    }, 1500);

    return () => clearTimeout(getLocation);
  }, []);

  return (
    <DashboardLayout user={auth?.user}>
      <Head title="Dashboard User" />
      
      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h1 className="text-2xl font-semibold mb-6">Tracking Lokasi</h1>
              
              {isLocationLoading ? (
                <div className="flex justify-center items-center h-[500px] bg-gray-100 rounded-lg">
                  <div className="text-center">
                    <svg className="animate-spin h-10 w-10 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p>Mendapatkan lokasi Anda...</p>
                  </div>
                </div>
              ) : (
                <div>
                  <Map position={userPosition} />
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-medium text-blue-900">Informasi Lokasi</h3>
                    <p className="mt-2">Latitude: {userPosition[0].toFixed(6)}</p>
                    <p>Longitude: {userPosition[1].toFixed(6)}</p>
                    <p className="mt-2 text-sm text-blue-700">
                      * Posisi saat ini disimulasikan untuk demonstrasi
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 