import React, { useState, useEffect } from 'react';
import { Link, Head, useForm } from '@inertiajs/react';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('error'); // 'error' or 'success'
  
  // Check for errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      setAlertMessage(firstError);
      setAlertType('error');
      setShowAlert(true);
      
      // Scroll ke atas untuk melihat pesan error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Submitting form with data:', data);
    
    // Validate password format before submission
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (data.password.length < 8) {
      setAlertMessage('Password must be at least 8 characters');
      setAlertType('error');
      setShowAlert(true);
      return;
    }
    
    if (!passwordRegex.test(data.password)) {
      setAlertMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number');
      setAlertType('error');
      setShowAlert(true);
      return;
    }
    
    if (data.password !== data.password_confirmation) {
      setAlertMessage('Passwords do not match');
      setAlertType('error');
      setShowAlert(true);
      return;
    }
    
    // Use XMLHttpRequest instead of fetch for better browser compatibility
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/register', true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Accept', 'application/json');
    
    // Get CSRF token from meta tag
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    if (token) {
      xhr.setRequestHeader('X-CSRF-TOKEN', token);
    }
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        console.log('Response status:', xhr.status);
        console.log('Response headers:', xhr.getAllResponseHeaders());
        console.log('Response text:', xhr.responseText.substring(0, 200) + '...');
        
        if (xhr.status >= 200 && xhr.status < 300) {
          // Success
          setAlertMessage('Registration successful! Redirecting to login...');
          setAlertType('success');
          setShowAlert(true);
          reset();
          
          // Log the successful registration
          console.log('Registration successful');
          
          // Redirect to login page
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        } else {
          // Error handling
          let errorMessage = 'Registration failed. Please try again.';
          
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.errors) {
              const firstError = Object.values(response.errors)[0];
              errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
            } else if (response.message) {
              errorMessage = response.message;
            }
          } catch (e) {
            console.error('Error parsing response:', e);
          }
          
          setAlertMessage(errorMessage);
          setAlertType('error');
          setShowAlert(true);
        }
      }
    };
    
    // Create form data for submission
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('password_confirmation', data.password_confirmation);
    formData.append('_token', token);
    
    console.log('Sending registration data with form data');
    xhr.send(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col justify-center">
      <Head title="Register - TrackIPS" />
      
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-indigo-600">TrackIPS</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/login"
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-16">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in to your account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Alert Component */}
          {showAlert && (
              <div className={`mb-4 ${alertType === 'error' ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500'} border-l-4 p-4 rounded-md`}>
                {/* ... (kode SVG dan tombol close tetap sama) */}
                <div className="ml-3">
                  <h3 className={`text-sm font-medium ${alertType === 'error' ? 'text-red-800' : 'text-green-800'}`}>
                    {alertType === 'error' ? 'Registration Error' : 'Success'}
                  </h3>
                  <div className={`mt-1 text-sm ${alertType === 'error' ? 'text-red-700' : 'text-green-700'}`}>
                    {alertMessage}
                  </div>
                </div>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
              </div>

              <div>
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={data.password_confirmation}
                    onChange={e => setData('password_confirmation', e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {errors.password_confirmation && <div className="text-red-500 text-sm mt-1">{errors.password_confirmation}</div>}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {processing ? 'Processing...' : 'Register'}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Google</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                    </svg>
                  </a>
                </div>

                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with GitHub</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-base text-gray-400">
                &copy; 2023 TrackIPS. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 