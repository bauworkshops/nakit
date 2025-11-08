interface GoogleMapProps {
  lat: number;
  lng: number;
  title: string;
  className?: string;
}

// Text constants
const DEFAULT_TITLE = 'Location';

export function GoogleMap({ lat, lng, title = DEFAULT_TITLE, className }: GoogleMapProps) {
  // Google Maps embed URL with marker
  const mapUrl = `https://www.google.com/maps?q=${lat},${lng}&hl=en&z=15&output=embed`;

  return (
    <iframe
      className={className}
      src={mapUrl}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title={title}
      allowFullScreen
    />
  );
}

