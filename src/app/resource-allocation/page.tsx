export default function ResourceAllocation() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Resource Allocation</h1>
        <p className="text-gray-700 mt-2">
          Manage and allocate your farm resources efficiently across your crops and activities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resources Overview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Available Resources</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Water (gallons)</span>
              <span className="font-semibold text-blue-600">0</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Fertilizer (kg)</span>
              <span className="font-semibold text-green-600">0</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Labor Hours</span>
              <span className="font-semibold text-yellow-600">0</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Machinery</span>
              <span className="font-semibold text-purple-600">0</span>
            </div>
          </div>
        </div>

        {/* Allocation Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Allocate Resources</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">Resource Type</label>
              <select className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900">
                <option>Select resource</option>
                <option>Water</option>
                <option>Fertilizer</option>
                <option>Labor</option>
                <option>Machinery</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Quantity</label>
              <input
                type="number"
                placeholder="Enter quantity"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Allocate Resource
            </button>
          </form>
        </div>
      </div>

      {/* Allocation History */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Allocation History</h2>
        <p className="text-gray-700">No allocations yet. Start by adding resources above.</p>
      </div>
    </div>
  );
}
