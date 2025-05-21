import React, { useState, useEffect } from 'react';
import { Link, Head, useForm, usePage } from '@inertiajs/react';

export default function DeveloperLogin({ error }) {
  const { flash } = usePage().props;
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(!!error || !!flash?.success || !!flash?.error);
  const [alertMessage, setAlertMessage] = useState(error || flash?.success || flash?.error || '');
  const [alertType, setAlertType] = useState(flash?.success ? 'success' : 'error');

  // Check for errors or success messages
  useEffect(() => {
    // Handle validation errors
    if (Object.keys(errors).length > 0) {
      setShowAlert(true);
      setAlertMessage(Object.values(errors).join(', '));
      setAlertType('error');
    } 
    // Handle success flash messages
    else if (flash?.success) {
      setShowAlert(true);
      setAlertMessage(flash.success);
      setAlertType('success');
    }
    // Handle error flash messages
    else if (flash?.error) {
      setShowAlert(true);
      setAlertMessage(flash.error);
      setAlertType('error');
    }
    // Handle direct error prop
    else if (error) {
      setShowAlert(true);
      setAlertMessage(error);
      setAlertType('error');
    }
  }, [errors, flash, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/developer/login', {
      onSuccess: () => {
        // This is handled by redirect from backend
        console.log('Login successful');
      },
      onError: (errors) => {
        // Additional error handling
        console.log('Login errors:', errors);
        setShowAlert(true);
        setAlertMessage(Object.values(errors).join(', '));
        setAlertType('error');
      }
    });
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col justify-center">
      <Head title="Developer Login - TrackIPS" />
      
      {/* Navigation */}
      <nav className="bg-gray-900 shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-cyan-500">TrackIPS Developer</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-200"
              >
                User Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-16">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Developer Portal Login
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Login with your developer credentials to access API keys
            <br />
            Or{' '}
            <Link href="/developer/register" className="font-medium text-cyan-400 hover:text-cyan-300">
              register for a new developer account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-700">
            {showAlert && (
              <div className={`mb-4 ${alertType === 'success' ? 'bg-green-900 border-green-800 text-green-100' : 'bg-red-900 border-red-800 text-red-100'} px-4 py-3 rounded relative`}>
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
                        className={`inline-flex rounded-md p-1.5 ${alertType === 'success' ? 'bg-green-900 text-green-300 hover:bg-green-800' : 'bg-red-900 text-red-300 hover:bg-red-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${alertType === 'success' ? 'focus:ring-green-600' : 'focus:ring-red-600'}`}
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
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  />
                </div>
                {errors.email && <div className="text-red-400 text-sm mt-1">{errors.email}</div>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  />
                  <button 
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
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
                {errors.password && <div className="text-red-400 text-sm mt-1">{errors.password}</div>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    checked={data.remember}
                    onChange={e => setData('remember', e.target.checked)}
                    className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-600 rounded bg-gray-700"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  {processing ? 'Signing in...' : 'Sign in as Developer'}
                </button>
              </div>
            </form>
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