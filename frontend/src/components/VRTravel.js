import React from "react";

function VRTravel({ location }) {
  if (!location) return null;

  const url = `https://maps.google.com/maps?q=${encodeURIComponent(
    location
  )}&output=embed`;

  return (
    <iframe
      title="360-view"
      width="100%"
      height="400px"
      style={{ border: 0 }}
      src={url}
      allowFullScreen
    ></iframe>
  );
}

export default VRTravel;