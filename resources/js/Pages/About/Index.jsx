import React from 'react';
import { Link, Head, usePage } from '@inertiajs/react';

export default function About() {
  const { auth } = usePage().props;
  const user = auth?.user;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Head title="About - TrackIPS" />
      
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
              <Link href="/home" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="/about" className="text-indigo-600 font-medium">About</Link>
              
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

      {/* Header */}
      <div className="bg-indigo-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-indigo-200 tracking-wide uppercase">About Us</h2>
            <p className="mt-1 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              The TrackIPS Story
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-indigo-200">
              Building better educational outcomes together
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-prose text-base">
            <svg className="absolute top-0 right-0 -mt-20 -mr-20 lg:mt-0 lg:mr-0 xl:mt-0 xl:mr-0 text-indigo-100" width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true">
              <defs>
                <pattern id="bedc54bc-7371-44a2-a2bc-b659873d81b9" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" className="text-indigo-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#bedc54bc-7371-44a2-a2bc-b659873d81b9)" />
            </svg>
            <div className="relative bg-white z-10">
              <div className="prose prose-indigo prose-lg text-gray-500 mx-auto">
                <h3 className="text-2xl font-extrabold text-gray-900 mt-12">Our Mission</h3>
                <p>
                  At TrackIPS, our mission is to empower educational institutions with powerful tools that help them track, analyze, and enhance academic outcomes. We believe that data-driven insights lead to better educational decisions and improved student success.
                </p>

                <h3 className="text-2xl font-extrabold text-gray-900 mt-12">Our Story</h3>
                <p>
                  TrackIPS was founded by a team of educators and technologists who recognized the challenges of tracking and improving student performance in today's educational environment. Our founders experienced firsthand the limitations of existing systems and set out to create a solution that would provide comprehensive insights while remaining intuitive and easy to use.
                </p>
                <p>
                  What began as a small project to help local schools has grown into a robust platform used by educational institutions around the world. Our team has expanded, but our commitment to supporting education through innovative technology remains unwavering.
                </p>

                <h3 className="text-2xl font-extrabold text-gray-900 mt-12">Our Values</h3>
                <ul>
                  <li><strong>Student Success:</strong> We believe that every student deserves the opportunity to succeed, and we design our tools to help educators identify and address the unique needs of each learner.</li>
                  <li><strong>Data Privacy:</strong> We are committed to protecting student data and ensuring that our platform meets the highest standards of security and privacy.</li>
                  <li><strong>Continuous Improvement:</strong> We believe in the power of feedback and iteration. Our platform is constantly evolving based on the needs and insights of our users.</li>
                  <li><strong>Accessibility:</strong> We strive to make our tools accessible to all educators, regardless of technical expertise or resource constraints.</li>
                </ul>

                <h3 className="text-2xl font-extrabold text-gray-900 mt-12">Our Team</h3>
                <p>
                  Our diverse team brings together expertise in education, technology, data science, and design. We are united by a shared passion for improving educational outcomes and a commitment to building tools that make a difference in the lives of students and educators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Our Leadership</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Meet the team
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Passionate educators and technologists working together
            </p>
          </div>

          <div className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="space-y-4">
              <div className="aspect-w-3 aspect-h-2">
                <div className="h-60 w-full bg-indigo-600 rounded-lg flex items-center justify-center">
                  <svg className="h-24 w-24 text-white opacity-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-lg leading-6 font-medium space-y-1">
                  <h3 className="text-gray-900">Dr. Jane Smith</h3>
                  <p className="text-indigo-600">Co-Founder & CEO</p>
                </div>
                <div className="text-base text-gray-500">
                  <p>Former educator with 15 years of experience. PhD in Educational Technology.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="aspect-w-3 aspect-h-2">
                <div className="h-60 w-full bg-indigo-600 rounded-lg flex items-center justify-center">
                  <svg className="h-24 w-24 text-white opacity-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-lg leading-6 font-medium space-y-1">
                  <h3 className="text-gray-900">Michael Johnson</h3>
                  <p className="text-indigo-600">Co-Founder & CTO</p>
                </div>
                <div className="text-base text-gray-500">
                  <p>Tech innovator with a background in data science and machine learning.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="aspect-w-3 aspect-h-2">
                <div className="h-60 w-full bg-indigo-600 rounded-lg flex items-center justify-center">
                  <svg className="h-24 w-24 text-white opacity-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-lg leading-6 font-medium space-y-1">
                  <h3 className="text-gray-900">Sarah Rodriguez</h3>
                  <p className="text-indigo-600">Head of Product</p>
                </div>
                <div className="text-base text-gray-500">
                  <p>Expert in UX design with a focus on creating intuitive educational tools.</p>
                </div>
              </div>
            </div>
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
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; 2023 TrackIPS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 