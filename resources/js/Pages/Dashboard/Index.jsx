import DashboardLayout from "../../Layouts/DashboardLayout";

export default function Dashboard({ auth }) {
    return (
        <DashboardLayout title="Dashboard">
        {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Total Users</h3>
                    <p className="text-3xl font-bold">1,234</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Revenue</h3>
                    <p className="text-3xl font-bold">$45,678</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Active Projects</h3>
                    <p className="text-3xl font-bold">24</p>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                    <table className="w-full">
                        <thead>
                        <tr className="text-left text-gray-600 border-b">
                            <th className="pb-3">User</th>
                            <th className="pb-3">Action</th>
                            <th className="pb-3">Date</th>
                        </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3].map((item) => (
                                <tr key={item} className="border-b last:border-b-0">
                                <td className="py-4">User {item}</td>
                                <td>Created new project</td>
                                <td>2024-03-0{item}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}