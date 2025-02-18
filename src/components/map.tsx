import React, { useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { CarLocState } from "@/types/devices";
import { useApi } from "@/hooks/useApi";

const containerStyle = {
  width: "100%",
  height: "100%",
};

type MapProps = {
  deviceName: string;
};

const CustomMap: React.FC<MapProps> = ({ deviceName }) => {
  // const [position, setPosition] = React.useState<CarLocState | null>(null);
  const [position, setPosition] = React.useState<CarLocState | null>(
    "-3.742008|-38.574889"
  );
  const { getDevice } = useApi();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  console.log(isLoaded, process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!);

  // after two seconds, update the position
  // useEffect(() => {
  //   const fetchDevice = async () => {
  //     try {
  //       const device = (await getDevice(deviceName)) as CarLocState;
  //       if (device) {
  //         setPosition(device);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  //   fetchDevice();
  //   const interval = setInterval(fetchDevice, 2000);
  //   return () => clearInterval(interval);
  // }, [deviceName, getDevice]);

  return (
    isLoaded &&
    position && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: Number(position.split("|")[0]),
          lng: Number(position.split("|")[1]),
        }}
        zoom={18}
      >
        <Marker
          position={{
            lat: Number(position.split("|")[0]),
            lng: Number(position.split("|")[1]),
          }}
        />
      </GoogleMap>
    )
  );
};

export default CustomMap;
