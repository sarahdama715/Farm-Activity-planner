export default function GeneratePlan() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Generate Plan</h1>
        <p className="text-gray-600 mt-2">
          Create an AI-powered farming plan based on your crop type, farm size, location, and resources.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900">Crop Type</label>
            <input
              type="text"
              placeholder="e.g., Wheat, Rice, Corn"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Farm Size (acres)</label>
            <input
              type="number"
              placeholder="e.g., 50"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Location</label>
            <input
              type="text"
              placeholder="e.g., City, State"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Planting Date</label>
            <input
              type="date"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Available Resources</label>
            <textarea
              placeholder="e.g., Irrigation system, Tractors, Fertilizers"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={4}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            Generate AI Plan
          </button>
        </form>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900">What will be generated?</h3>
        <ul className="mt-3 space-y-2 text-blue-800">
          <li>🌱 Planting activities</li>
          <li>💧 Irrigation schedules</li>
          <li>🌿 Weeding schedules</li>
          <li>🐛 Spraying schedules</li>
          <li>🌾 Harvesting plans</li>
          <li>📊 Resource allocation suggestions</li>
        </ul>
      </div>
    </div>
  );
}
