'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useApp } from '@/components/AppProvider';

const places: Record<string, Record<string, string[]>> = {
  Kenya: {
    Nairobi: ['Nairobi', 'Kiambu'],
    Coast: ['Kilifi', 'Mombasa', 'Kwale'],
    RiftValley: ['Eldoret', 'Nakuru'],
  },
  'United States': {
    California: ['Fresno', 'Los Angeles', 'Sacramento'],
    Texas: ['Austin', 'Dallas'],
  },
  Uganda: {
    Central: ['Kampala', 'Entebbe'],
  },
  India: {
    Punjab: ['Ludhiana', 'Amritsar'],
  },
  Tanzania: {
    DarEsSalaam: ['Dar es Salaam'],
    Arusha: ['Arusha'],
  },
  Nigeria: {
    Lagos: ['Lagos'],
    Kano: ['Kano'],
  },
  'South Africa': {
    Gauteng: ['Johannesburg', 'Pretoria'],
    WesternCape: ['Cape Town'],
  },
};

const countries = [...Object.keys(places), 'Other'];

const cropOptions = [
  'Maize',
  'Potatoes',
  'Beans',
  'Onions',
  'Tomatoes',
  'Apples',
  'Other',
];

type GeneratedPlan = {
  text: string;
};

function getToday() {
  const now = new Date();
  const offset = now.getTimezoneOffset();

  return new Date(now.getTime() - offset * 60000)
    .toISOString()
    .split('T')[0];
}

export default function GeneratePlan() {
  const { farmer, addPlan } = useApp();

  const [country, setCountry] = useState(
    farmer?.country || 'Kenya'
  );
  const [otherCountry, setOtherCountry] = useState('');
  const [region, setRegion] = useState('');
  const [otherRegion, setOtherRegion] = useState('');
  const [city, setCity] = useState('');
  const [otherCity, setOtherCity] = useState('');
  const [crop, setCrop] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] =
    useState<GeneratedPlan | null>(null);

  const regions = Object.keys(places[country] || {});
  const cities = places[country]?.[region] || [];

  const actualCountry =
    country === 'Other' ? otherCountry.trim() : country;

  const actualRegion =
    region === 'Other' ? otherRegion.trim() : region;

  const actualCity =
    city === 'Other' ? otherCity.trim() : city;

  async function submit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError('');
    setResult(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const actualCrop =
      crop === 'Other'
        ? String(formData.get('otherCrop') || '').trim()
        : crop;

    const acres = Number(formData.get('acres'));
    const workers = Number(formData.get('workers'));

    const plantingDate = String(
      formData.get('plantingDate') || ''
    );

    const resources = String(
      formData.get('resources') || ''
    ).trim();

    if (
      !actualCountry ||
      !actualRegion ||
      !actualCity ||
      !actualCrop ||
      !resources
    ) {
      setError('Please complete all required fields.');
      return;
    }

    if (!Number.isFinite(acres) || acres <= 0) {
      setError('Farm size must be greater than zero.');
      return;
    }

    if (!Number.isInteger(workers) || workers < 1) {
      setError('Enter at least one available worker.');
      return;
    }

    if (!plantingDate || plantingDate < getToday()) {
      setError(
        'Choose today or a future planting date.'
      );
      return;
    }

    const location =
      `${actualCity}, ${actualRegion}, ${actualCountry}`;

    setLoading(true);

    try {
      const response = await fetch(
        '/api/generate-plan',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            crop: actualCrop,
            acres,
            workers,
            country: actualCountry,
            region: actualRegion,
            city: actualCity,
            location,
            plantingDate,
            resources,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            'Unable to generate your plan. Please try again.'
        );
      }

      if (
        !data.plan ||
        typeof data.plan !== 'string' ||
        !data.plan.trim()
      ) {
        throw new Error(
          'The AI returned an empty plan. Please try again.'
        );
      }

      const planText = data.plan.trim();

      setResult({
        text: planText,
      });

      addPlan({
        id: crypto.randomUUID(),
        crop: actualCrop,
        acres,
        workers,
        country: actualCountry,
        region: actualRegion,
        city: actualCity,
        location,
        plantingDate,
        resources,
        weather:
          'Review local weather conditions before carrying out weather-dependent activities.',
        status: 'Planned',
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-black">
          Generate Plan
        </h1>

        <p className="mt-2 text-black">
          Create a farm-specific activity schedule using
          your crop, location, farm size, and available
          resources. All fields are required.
        </p>
      </div>

      <form
        onSubmit={submit}
        className="max-w-3xl space-y-5 rounded-lg bg-white p-8 shadow"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <label className="text-black">
            Country *

            <select
              required
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setRegion('');
                setCity('');
                setOtherCountry('');
                setOtherRegion('');
                setOtherCity('');
              }}
              className="mt-1 w-full rounded border p-2 text-black"
            >
              <option value="">
                Select country
              </option>

              {countries.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="text-black">
            State / region *

            <select
              required
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setCity('');
              }}
              className="mt-1 w-full rounded border p-2 text-black"
            >
              <option value="">
                Select region
              </option>

              {regions.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}

              <option value="Other">
                Other
              </option>
            </select>
          </label>

          <label className="text-black">
            City *

            <select
              required
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
              className="mt-1 w-full rounded border p-2 text-black"
            >
              <option value="">
                Select city
              </option>

              {cities.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}

              <option value="Other">
                Other
              </option>
            </select>
          </label>
        </div>

        {country === 'Other' && (
          <label className="block text-black">
            Enter country *

            <input
              required
              value={otherCountry}
              onChange={(e) =>
                setOtherCountry(e.target.value)
              }
              className="mt-1 w-full rounded border p-2 text-black"
              placeholder="Enter country"
            />
          </label>
        )}

        {region === 'Other' && (
          <label className="block text-black">
            Enter state or region *

            <input
              required
              value={otherRegion}
              onChange={(e) =>
                setOtherRegion(e.target.value)
              }
              className="mt-1 w-full rounded border p-2 text-black"
              placeholder="Enter state or region"
            />
          </label>
        )}

        {city === 'Other' && (
          <label className="block text-black">
            Enter city *

            <input
              required
              value={otherCity}
              onChange={(e) =>
                setOtherCity(e.target.value)
              }
              className="mt-1 w-full rounded border p-2 text-black"
              placeholder="Enter city"
            />
          </label>
        )}

        <label className="block text-black">
          Crop type *

          <select
            required
            value={crop}
            onChange={(e) =>
              setCrop(e.target.value)
            }
            className="mt-1 w-full rounded border p-2 text-black"
          >
            <option value="">
              Select crop
            </option>

            {cropOptions.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </label>

        {crop === 'Other' && (
          <label className="block text-black">
            Enter crop type *

            <input
              required
              name="otherCrop"
              placeholder="Enter crop type"
              className="mt-1 w-full rounded border p-2 text-black"
            />
          </label>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-black">
            Farm size (acres) *

            <input
              required
              name="acres"
              type="number"
              min="0.01"
              step="0.01"
              className="mt-1 w-full rounded border p-2 text-black"
            />
          </label>

          <label className="text-black">
            Available workers *

            <input
              required
              name="workers"
              type="number"
              min="1"
              step="1"
              className="mt-1 w-full rounded border p-2 text-black"
            />
          </label>
        </div>

        <label className="block text-black">
          Planting date *

          <input
            required
            name="plantingDate"
            type="date"
            min={getToday()}
            defaultValue={getToday()}
            className="mt-1 w-full rounded border p-2 text-black"
          />
        </label>

        <label className="block text-black">
          Resources you already have *

          <textarea
            required
            name="resources"
            rows={3}
            placeholder="e.g. seeds, jembes, fertilizer, irrigation equipment"
            className="mt-1 w-full rounded border p-2 text-black"
          />
        </label>

        {error && (
          <div
            role="alert"
            className="rounded border border-red-300 bg-red-50 p-3 text-black"
          >
            <p className="font-semibold">
              Plan generation failed
            </p>

            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-green-700 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? 'Generating your plan...'
            : 'Generate plan'}
        </button>

        {loading && (
          <p
            role="status"
            className="text-black"
          >
            Please wait while your farm activity plan is
            being prepared.
          </p>
        )}
      </form>

      {result && (
        <section
          aria-labelledby="generated-plan-title"
          className="max-w-3xl rounded-lg bg-white p-6 shadow"
        >
          <div>
            <p className="text-sm font-semibold text-green-700">
              PLAN GENERATED BY AI
            </p>

            <h2
              id="generated-plan-title"
              className="mt-1 text-2xl font-bold text-black"
            >
              Your farm activity plan
            </h2>

            <div className="mt-4 rounded border p-5 text-black">
  <ReactMarkdown
    components={{
      h2: ({ children }) => (
        <h2 className="mb-3 mt-6 text-2xl font-bold text-black first:mt-0">
          {children}
        </h2>
      ),

      h3: ({ children }) => (
        <h3 className="mb-2 mt-5 text-xl font-bold text-black">
          {children}
        </h3>
      ),

      h4: ({ children }) => (
        <h4 className="mb-2 mt-4 text-lg font-bold text-black">
          {children}
        </h4>
      ),

      p: ({ children }) => (
        <p className="mb-3 leading-7 text-black">
          {children}
        </p>
      ),

      ul: ({ children }) => (
        <ul className="mb-4 list-disc space-y-2 pl-6 text-black">
          {children}
        </ul>
      ),

      ol: ({ children }) => (
        <ol className="mb-4 list-decimal space-y-2 pl-6 text-black">
          {children}
        </ol>
      ),

      li: ({ children }) => (
        <li className="text-black">
          {children}
        </li>
      ),

      strong: ({ children }) => (
        <strong className="font-bold text-black">
          {children}
        </strong>
      ),

      hr: () => (
        <hr className="my-5 border-gray-200" />
      ),
    }}
  >
    {result.text}
  </ReactMarkdown>
</div>
          </div>

          <p className="mt-6 text-sm text-black">
            This plan is an AI-generated guide. Confirm
            planting dates, fertilizer rates, pest treatments,
            and weather-dependent activities with local
            agricultural guidance before implementation.
          </p>
        </section>
      )}
    </div>
  );
}