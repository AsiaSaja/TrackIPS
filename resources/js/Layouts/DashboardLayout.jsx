import { Link } from "@inertiajs/react";
import { Head } from "@inertiajs/react";

export default function DashboardLayout({ children, title }) {
    return (
    <div className="min-h-screen bg-gray-100">
        <Head title={title} />
        
        {/* Sidebar */}
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
            <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800">My Dashboard</h2>
            <nav className="mt-6">
                <Link
                href="/dashboard/home"
                className="block p-2 text-gray-700 hover:bg-gray-100 rounded"
                activeClassName="bg-blue-100 text-blue-600"
                >
                Dashboard
                </Link>
                <Link
                href="/dashboard/settings"
                className="block p-2 text-gray-700 hover:bg-gray-100 rounded"
                activeClassName="bg-blue-100 text-blue-600"
                >
                Settings
                </Link>
            </nav>
            </div>
        </div>

        {/* Main Content */}
        <div className="ml-64 p-8">
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