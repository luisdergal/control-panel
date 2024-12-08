"use client";

import { useEffect, useState } from "react";

import { fetchRegions } from "./regionsService";

export default function Regions() {
  const [regions, setRegions] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRegions = async () => {
    try {
      const data = await fetchRegions();
      setRegions(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to load regions.");
      } else {
        setError("Failed to load regions.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRegions();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-400 mb-8">
          Regions
        </h1>

        {loading && (
          <p className="text-center text-lg text-gray-400 animate-pulse">
            Loading regions...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 font-medium">{error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region) => (
              <div
                key={region.id}
                className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-semibold text-blue-300">
                  {region.name}
                </h2>
                <p className="text-gray-400 mt-2">ID: {region.id}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}