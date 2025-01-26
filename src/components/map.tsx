import React from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

type MapProps = {
  position: { lat: number; lng: number };
};

const CustomMap: React.FC<MapProps> = ({ position }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  return (
    isLoaded && (
      <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={18}>
        <Marker position={position} />
      </GoogleMap>
    )
  );
};

export default CustomMap;
