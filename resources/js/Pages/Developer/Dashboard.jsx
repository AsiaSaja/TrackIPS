import React, { useState, useEffect } from 'react';
import { Link, Head, useForm, usePage, router } from '@inertiajs/react';

export default function DeveloperDashboard() {
  const { developer } = usePage().props;
  const { flash } = usePage().props;
  const [showAlert, setShowAlert] = useState(!!flash?.success || !!flash?.error);
  const [alertMessage, setAlertMessage] = useState(flash?.success || flash?.error || '');
  const [alertType, setAlertType] = useState(flash?.success ? 'success' : 'error');
  const [apiKey, setApiKey] = useState(developer.api_key || '');
  const [isCopied, setIsCopied] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const { auth, csrf_token } = usePage().props; // Ambil csrf_token di level terluar komponen
  const user = auth?.user;

  const { post, processing } = useForm();

  useEffect(() => {
    if (flash?.success) {
      setShowAlert(true);
      setAlertMessage(flash.success);
      setAlertType('success');
      setApiKey(developer.api_key);
    } else if (flash?.error) {
      setShowAlert(true);
      setAlertMessage(flash.error);
      setAlertType('error');
    }
  }, [flash, developer]);

  const generateApiKey = () => {
    post(route('developer.generate-api-key'), {}, {
      preserveScroll: true,
      onSuccess: () => {
        // API key will be updated via the flash message
      },
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const toggleReveal = () => {
    setIsRevealed(!isRevealed);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const handleLogout = () => {
    router.post('/logout', {}, {
      headers: {
        'X-CSRF-TOKEN': csrf_token // Gunakan nilai yang sudah diambil di level atas
      },
      preserveState: false,
      preserveScroll: false,
      onSuccess: () => {
        router.visit('/login'), {
          replace: true,
          only: [],
        };
      },
      onError: () => {
        window.location.href = route('login');
      }
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900">
      <Head title="Developer Dashboard - TrackIPS" />

      {/* Navigation */}
      <nav className="bg-gray-900 shadow-md px-4 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-cyan-500">TrackIPS Developer</span>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <span className="text-gray-200">{developer.name}</span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {showAlert && (
          <div className={`mb-6 ${alertType === 'success' ? 'bg-green-900 border-green-800' : 'bg-red-900 border-red-800'} border text-white px-4 py-3 rounded relative`}>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {alertType === 'success' ? (
                  <svg className="h-5 w-5 text-green-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-red-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm">{alertMessage}</p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    onClick={closeAlert}
                    className={`inline-flex rounded-md p-1.5 ${alertType === 'success' ? 'bg-green-900 text-green-300 hover:bg-green-800' : 'bg-red-900 text-red-300 hover:bg-red-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${alertType === 'success' ? 'focus:ring-green-600' : 'focus:ring-red-600'}`}
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
          <h1 className="text-3xl font-bold text-white mb-6">Developer Dashboard</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">Developer Information</h2>
            <div className="bg-gray-900 rounded-md p-6 border border-gray-700">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-200 text-sm">Name</div>
                  <div className="text-white font-medium">{developer.name}</div>
                </div>
                <div>
                  <div className="text-gray-200 text-sm">Email</div>
                  <div className="text-white font-medium">{developer.email}</div>
                </div>
                <div>
                  <div className="text-gray-200 text-sm">Phone</div>
                  <div className="text-white font-medium">{developer.phone_num}</div>
                </div>
                <div>
                  <div className="text-gray-200 text-sm">Registered On</div>
                  <div className="text-white font-medium">{new Date(developer.created_at).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">Your API Key</h2>
            <div className="bg-gray-900 rounded-md p-6 border border-gray-700">
              <div className="flex flex-col space-y-4">
                <div className="relative">
                  <label className="text-gray-200 text-sm block mb-2">API Key</label>
                  <div className="flex">
                    <div className="relative flex-grow">
                      <input
                        type={isRevealed ? "text" : "password"}
                        readOnly
                        value={apiKey || "No API key generated yet"}
                        className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-l-md shadow-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                      />
                      <button
                        type="button"
                        onClick={toggleReveal}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                      >
                        {isRevealed ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      disabled={!apiKey}
                      className={`px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-r-md ${!apiKey && 'opacity-50 cursor-not-allowed'}`}
                    >
                      {isCopied ? (
                        <span className="flex items-center">
                          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          Copy
                        </span>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={generateApiKey}
                    disabled={processing}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  >
                    {processing ? 'Generating...' : 'Generate New API Key'}
                  </button>
                  {apiKey && (
                    <p className="mt-2 text-sm text-gray-300">
                      Note: Generating a new API key will invalidate your existing key.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">API Documentation</h2>
            <div className="bg-gray-900 rounded-md p-6 border border-gray-700">
              <h3 className="text-lg font-medium text-white mb-2">How to Use the API</h3>
              <p className="text-gray-200 mb-4">
                To use the TrackIPS API, include your API key in the header of each request:
              </p>
              
              <div className="bg-gray-900 rounded p-4 mb-6 font-mono text-sm text-gray-300 overflow-x-auto">
                <pre>{'Authorization: Bearer YOUR_API_KEY'}</pre>
              </div>
              
              <h4 className="text-white font-medium mb-2">Available Endpoints:</h4>
              <ul className="list-disc list-inside text-gray-200 space-y-2">
                <li>GET /api/rooms - Get all rooms</li>
                <li>GET /api/wifi - Get all WiFi access points</li>
                <li>GET /api/location - Get user location data</li>
              </ul>
              
              <p className="mt-4 text-cyan-300">
                For more detailed documentation, please refer to our complete API documentation.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-base text-gray-400">
                &copy; 2023 TrackIPS Developer Portal. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 