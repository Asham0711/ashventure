'use client';

interface TripMapProps {
  center: { lat: number; lng: number };
  selectedPlace?: { lat: number; lng: number };
}

export default function TripMap({ center, selectedPlace }: TripMapProps) {
  const lat = selectedPlace?.lat ?? center.lat;
  const lng = selectedPlace?.lng ?? center.lng;

  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=14&t=k&output=embed`;
  return (
    <div className="h-[97%] lg:h-[300px] rounded-xl overflow-hidden border border-white/20">
      <iframe
        src={mapSrc}
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full"
      />
    </div>
  );
}