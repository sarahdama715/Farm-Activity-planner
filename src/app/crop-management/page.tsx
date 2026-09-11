export default function CropManagement() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Crop Management</h1>
        <p className="text-gray-700 mt-2">
          Monitor and manage your crops throughout their lifecycle.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Your Crops</h2>
          <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
            + Add Crop
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Crop Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Area (acres)</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Planting Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td colSpan={5} className="px-6 py-8 text-center text-gray-700">
                  No crops added yet. Click "Add Crop" to get started.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900">Total Crops</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900">Total Area</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">0 acres</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900">Avg. Health</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">--</p>
        </div>
      </div>
    </div>
  );
}
