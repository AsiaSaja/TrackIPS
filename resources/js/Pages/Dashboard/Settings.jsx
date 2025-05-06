import DashboardLayout from "../../Layouts/DashboardLayout";

export default function Settings() {
    return(
        <DashboardLayout title="Settings">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                defaultValue="user@example.com"
              />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Save Changes
            </button>
          </form>
        </div>
      </DashboardLayout>
    );
}