/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';

interface Props {
  onSelect: (data: {
    destination: string;
    lat: number;
    lng: number;
  }) => void;
}

const DestinationSearch = ({ onSelect }: Props) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const searchPlaces = async (value: string) => {
    setQuery(value);

    if (value.length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
    );
    const data = await res.json();
    setResults(data.slice(0, 6));
    setLoading(false);
  };

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => searchPlaces(e.target.value)}
        placeholder="Enter for your destination"
        className="bg-black/20 border border-white/20 rounded-md px-3 py-1 w-full"
      />

      {loading && (
        <p className="text-xs text-white/60 mt-1">Searching...</p>
      )}

      {results.length > 0 && (
        <div className="absolute z-20 w-full bg-black/80 border border-white/20 rounded-md mt-1 backdrop-blur">
          {results.map(place => (
            <button
              key={place.place_id}
              type="button"
              onClick={() => {
                onSelect({
                  destination: place.display_name,
                  lat: Number(place.lat),
                  lng: Number(place.lon),
                });
                setQuery(place.display_name);
                setResults([]);
              }}
              className="block w-full text-left px-3 py-2 text-sm hover:bg-white/10"
            >
              {place.display_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DestinationSearch;