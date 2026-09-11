'use client';

import { useEffect, useState } from 'react';

interface HealthData {
  status: string;
  timestamp: string;
  database: string;
  apiVersion: string;
  uptime: number;
}

export default function HealthCheckPage() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHealth() {
      try {
        const response = await fetch('/api/health');
        if (!response.ok) throw new Error('Failed to fetch health data');
        const data = await response.json();
        setHealth(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchHealth();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Health Check</h1>
        <p className="text-gray-600 mt-2">
          Real-time system health status and information.
        </p>
      </div>

      {loading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-blue-900">Loading health data...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-900 font-semibold">Error: {error}</p>
        </div>
      )}

      {health && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Status</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Service Status</span>
                <span
                  className={`font-semibold px-3 py-1 rounded-full text-white ${
                    health.status === 'healthy'
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}
                >
                  {health.status.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Database</span>
                <span className="font-semibold text-green-600">
                  {health.database}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">API Version</span>
                <span className="font-semibold">{health.apiVersion}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Uptime</span>
                <span className="font-semibold">
                  {Math.round(health.uptime)} seconds
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Check</span>
                <span className="font-semibold text-sm">
                  {new Date(health.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="font-semibold text-green-900">What this page does:</h3>
        <ul className="mt-3 space-y-2 text-green-800 text-sm">
          <li>✓ Fetches real data from an API endpoint (/api/health)</li>
          <li>✓ Renders dynamic health status information</li>
          <li>✓ Displays current server uptime and timestamp</li>
          <li>✓ Demonstrates client-side data fetching</li>
        </ul>
      </div>
    </div>
  );
}
