import React from 'react';
import { Link, Head, usePage } from '@inertiajs/react';

export default function Index() {
  const { auth } = usePage().props;
  const user = auth?.user;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Head title="TrackIPS - Student Performance Tracking" />
      
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/home">
                  <h1 className="text-2xl font-bold text-indigo-600">TrackIPS</h1>
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Welcome, {user.name}</span>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Logout
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    Register
                  </Link>
                  <Link
                    href="/admin/login"
                    className="ml-4 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    Admin Panel
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-32">
        <div className="relative">
          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
              <div>
                <div>
                  <span className="h-12 w-12 rounded-md flex items-center justify-center bg-indigo-600">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
                    Empowering Academic Progress with <span className="text-indigo-600">TrackIPS</span>
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    A comprehensive platform for monitoring student performance, managing courses, and streamlining educational administration.
                  </p>
                  <div className="mt-6 space-x-4">
                    <Link
                      href="/features"
                      className="inline-flex px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200"
                    >
                      Explore Features
                    </Link>
                    <Link
                      href="/about"
                      className="inline-flex px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-md text-indigo-100 bg-indigo-800 hover:bg-indigo-900 transition-all duration-200"
                    >
                      Learn About Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-2 flex items-center justify-center">
              <div className="px-4 lg:px-0 relative lg:h-full">
                <div className="relative lg:w-full h-96 rounded-xl shadow-xl overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <svg className="h-48 w-48 text-white opacity-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-indigo-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by educators and administrators
            </h2>
            <p className="mt-3 text-xl text-indigo-200 sm:mt-4">
              Helping educational institutions track and improve student performance
            </p>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
                Students Tracked
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                10,000+
              </dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
                Institutions
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                500+
              </dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
                Data Points
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                Millions
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Key Features</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Why choose TrackIPS?
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Discover what makes our platform stand out
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-indigo-500 text-white mb-6">
                <svg className="h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Performance Analytics</h3>
              <p className="text-gray-600 mb-4">Comprehensive insights to track and improve student performance</p>
              <Link href="/features" className="text-indigo-600 font-medium hover:text-indigo-800">
                Learn more →
              </Link>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-indigo-500 text-white mb-6">
                <svg className="h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Course Management</h3>
              <p className="text-gray-600 mb-4">Efficiently organize courses, curricula, and educational resources</p>
              <Link href="/features" className="text-indigo-600 font-medium hover:text-indigo-800">
                Learn more →
              </Link>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-indigo-500 text-white mb-6">
                <svg className="h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Administration</h3>
              <p className="text-gray-600 mb-4">Role-based permissions and powerful administrative tools</p>
              <Link href="/features" className="text-indigo-600 font-medium hover:text-indigo-800">
                Learn more →
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/features" 
              className="inline-flex items-center text-base font-medium text-indigo-600 hover:text-indigo-800"
            >
              View all features
              <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Access the admin panel to begin managing your educational data.
          </p>
          <Link
            href="/admin"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            Go to Admin Panel
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
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
              <nav className="flex space-x-6">
                <Link href="/" className="text-gray-500 hover:text-gray-900">Home</Link>
                <Link href="/features" className="text-gray-500 hover:text-gray-900">Features</Link>
                <Link href="/about" className="text-gray-500 hover:text-gray-900">About</Link>
                <Link href="/admin" className="text-gray-500 hover:text-gray-900">Admin</Link>
              </nav>
              <p className="mt-4 text-base text-gray-400">
                &copy; 2023 TrackIPS. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
