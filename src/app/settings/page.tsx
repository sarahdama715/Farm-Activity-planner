export default function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your account and application preferences.
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Farm Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Farm Information</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">Farm Name</label>
              <input
                type="text"
                placeholder="Your farm name"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Location</label>
              <input
                type="text"
                placeholder="City, State/Province"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Total Farm Size (acres)</label>
              <input
                type="number"
                placeholder="Enter farm size"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
            >
              Save Farm Information
            </button>
          </form>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifications"
                className="h-4 w-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
              />
              <label htmlFor="notifications" className="ml-3 text-gray-900">
                Email notifications for scheduled activities
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="reminders"
                className="h-4 w-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
              />
              <label htmlFor="reminders" className="ml-3 text-gray-900">
                Receive reminders for resource allocation
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="darkMode"
                className="h-4 w-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
              />
              <label htmlFor="darkMode" className="ml-3 text-gray-900">
                Dark mode
              </label>
            </div>
          </div>
        </div>

        {/* Account */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Account</h2>
          <p className="text-gray-600 mb-4">Manage your account settings and preferences.</p>
          <button className="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
