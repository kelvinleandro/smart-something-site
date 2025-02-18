import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DeviceCard from "@/components/device-card";
import CustomMap from "./map";
import { useApi } from "@/hooks/useApi";

// const DEVICES_NAMES = [
//   "door_lock-3",
//   "arconditioner-2",
//   "light-1",
//   "arconditioner-1",
//   "temperature_sensor-2",
//   "arconditioner-3",
//   "car_loc-1",
// ];

const DevicesSection = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const { devicesNames } = useApi();

  const handleCardClick = (name: string) => {
    if (!name.includes("car_loc")) return;

    setSelectedDevice(name);
    setIsMapOpen(true);
  };

  const handleMapClose = () => {
    setSelectedDevice(null);
    setIsMapOpen(false);
  };

  return (
    <div className="w-full mt-4 flex justify-between lg:gap-8">
      <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-4 items-start">
        {devicesNames.map((name, index) => (
          <DeviceCard
            key={index}
            deviceName={name}
            onClick={() => handleCardClick(name)}
          />
        ))}
      </div>

      {isMapOpen && selectedDevice && (
        <Dialog open={isMapOpen} onOpenChange={handleMapClose}>
          <DialogContent className="overflow-hidden h-[80%] text-white  p-8">
            <DialogHeader>
              <DialogTitle className="text-3xl">{selectedDevice}</DialogTitle>
            </DialogHeader>
            <div className="w-full min-h-52 max-h-80">
              <CustomMap deviceName={selectedDevice} />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DevicesSection;
