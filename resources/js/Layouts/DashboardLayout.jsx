import { Link } from "@inertiajs/react";
import { Head } from "@inertiajs/react";

export default function DashboardLayout({ children, user, title = "Dashboard" }) {
    return (
    <div className="min-h-screen bg-gray-100">
        <Head title={title} />
        
        {/* Sidebar */}
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-indigo-600">TrackIPS</h2>
                
                {/* User Info */}
                {user && (
                    <div className="mt-6 pb-6 border-b border-gray-200">
                        <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
                                {user.name.charAt(0)}
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700 truncate">{user.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                        </div>
                    </div>
                )}
                
                <nav className="mt-6">
                    <div className="space-y-1">
                        <Link
                            href={route('user.dashboard')}
                            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-5 w-5 text-gray-500 group-hover:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            Peta Tracking
                        </Link>
                        <Link
                            href={route('home')}
                            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-5 w-5 text-gray-500 group-hover:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Home
                        </Link>
                    </div>
                </nav>
            </div>
            
            {/* Logout Section */}
            <div className="absolute bottom-0 w-full p-6">
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="w-full flex items-center px-2 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </Link>
            </div>
        </div>

        {/* Main Content */}
        <div className="ml-64 min-h-screen">
            {/* Header */}
            <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            </div>

            {/* Content */}
            {children}
        </div>
    </div>
    )
}