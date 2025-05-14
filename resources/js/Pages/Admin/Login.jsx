import React from 'react';
import { Link, Head, useForm } from '@inertiajs/react';

export default function AdminLogin({ error }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col justify-center">
      <Head title="Admin Login - TrackIPS" />
      
      {/* Navigation */}
      <nav className="bg-gray-900 shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-cyan-500">TrackIPS Admin</span>
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
            Admin Panel Login
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Login with your administrator credentials
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-700">
            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <span className="block sm:inline">{error}</span>
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
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  />
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
                  {processing ? 'Signing in...' : 'Sign in as Administrator'}
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
                &copy; 2023 TrackIPS Admin Panel. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 