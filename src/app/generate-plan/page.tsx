'use client';

import { useState } from 'react';

const CROP_TYPES = [
  'Maize',
  'Potatoes',
  'Beans',
  'Onions',
  'Tomatoes',
  'Apples',
  'Other',
];

export default function GeneratePlan() {
  const [cropType, setCropType] = useState('');
  const [otherCropType, setOtherCropType] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {};

    const selectedCropType = formData.get('cropType') as string;
    if (!selectedCropType) {
      newErrors.cropType = 'Crop type is required';
    } else if (selectedCropType === 'Other' && !formData.get('otherCropType')) {
      newErrors.otherCropType = 'Please specify your crop type';
    }

    const farmSize = parseInt(formData.get('farmSize') as string);
    if (!farmSize || farmSize <= 0) {
      newErrors.farmSize = 'Farm size must be greater than 0';
    }

    const location = formData.get('location') as string;
    if (!location?.trim()) {
      newErrors.location = 'Location is required';
    }

    const plantingDate = formData.get('plantingDate') as string;
    if (!plantingDate) {
      newErrors.plantingDate = 'Planting date is required';
    } else if (plantingDate < getTodayDate()) {
      newErrors.plantingDate = 'Planting date cannot be in the past';
    }

    const workers = parseInt(formData.get('workers') as string);
    if (!workers || workers <= 0) {
      newErrors.workers = 'Available workers must be greater than 0';
    }

    const resources = formData.get('resources') as string;
    if (!resources?.trim()) {
      newErrors.resources = 'Available resources are required';
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newErrors = validateForm(formData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    alert('Plan generated successfully! (Demo mode)');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Generate Plan</h1>
        <p className="text-gray-700 mt-2">
          Create an AI-powered farming plan based on your crop type, farm size, location, and resources.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Crop Type <span className="text-red-600">*</span>
            </label>
            <select
              name="cropType"
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
            >
              <option value="">Select a crop type</option>
              {CROP_TYPES.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
            {errors.cropType && (
              <p className="mt-1 text-sm text-red-600">{errors.cropType}</p>
            )}
          </div>

          {cropType === 'Other' && (
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Specify Your Crop Type <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="otherCropType"
                value={otherCropType}
                onChange={(e) => setOtherCropType(e.target.value)}
                placeholder="e.g., Wheat, Rice, Corn"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
              {errors.otherCropType && (
                <p className="mt-1 text-sm text-red-600">{errors.otherCropType}</p>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Farm Size (acres) <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                name="farmSize"
                placeholder="e.g., 50"
                min="1"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
              {errors.farmSize && (
                <p className="mt-1 text-sm text-red-600">{errors.farmSize}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Available Workers <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                name="workers"
                placeholder="e.g., 5"
                min="1"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
              {errors.workers && (
                <p className="mt-1 text-sm text-red-600">{errors.workers}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              Location <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="location"
              placeholder="e.g., City, State"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-400"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              Planting Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="plantingDate"
              min={getTodayDate()}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
            />
            {errors.plantingDate && (
              <p className="mt-1 text-sm text-red-600">{errors.plantingDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              Available Resources <span className="text-red-600">*</span>
            </label>
            <textarea
              name="resources"
              placeholder="e.g., Irrigation system, Tractors, Fertilizers"
              rows={4}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-400"
            ></textarea>
            {errors.resources && (
              <p className="mt-1 text-sm text-red-600">{errors.resources}</p>
            )}
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
        <h3 className="font-semibold text-gray-900">What will be generated?</h3>
        <ul className="mt-3 space-y-2 text-gray-700">
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
