import React, { useState } from "react";
import { LucideXCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DeviceCard from "@/components/device-card";
import { Device } from "@/types/devices";
import CustomMap from "./map";
import useTheme from "@/hooks/useTheme";

const DEVICES_NAMES = ["AC", "CarLoc", "HL"];

const DUMMY_DATA: Device[] = [
  { level: 3, temperature: 20 },
  {
    lat: -3.742008,
    lng: -38.574889,
  },
  { status: "ON" },
];

const DevicesSection = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const { theme } = useTheme();

  const handleCardClick = (name: string) => {
    if (!name.includes("CarLoc")) return;

    setSelectedDevice(name);
    setIsMapOpen(true);
  };

  const handleMapClose = () => {
    setSelectedDevice(null);
    setIsMapOpen(false);
  };

  return (
    <div className="w-full mt-4 flex justify-between lg:gap-8">
      <div className="w-full lg:w-[50%] grid grid-cols-2 md:grid-cols-3 gap-4 items-start">
        {DEVICES_NAMES.map((name, index) => (
          <DeviceCard
            key={index}
            deviceName={name}
            onClick={() => handleCardClick(name)}
          />
        ))}
      </div>

      {isMapOpen &&
        selectedDevice &&
        typeof selectedDevice.state === "object" && (
          <>
            {/* large screen map */}
            <div
              style={{
                backgroundColor: `rgba(${parseInt(
                  theme.background2.slice(1, 3),
                  16
                )}, ${parseInt(theme.background2.slice(3, 5), 16)}, ${parseInt(
                  theme.background2.slice(5, 7),
                  16
                )}, 0.3)`,
              }}
              className="hidden p-2 rounded-xl overflow-hidden lg:flex lg:flex-col lg:justify-stretch lg:items-end lg:w-[50%] lg:h-[400px] lg:gap-4  relative"
            >
              <LucideXCircle
                size={32}
                className="cursor-pointer hover:opacity-70"
                onClick={handleMapClose}
                style={{ color: theme.text }}
              />
              <CustomMap position={selectedDevice.state} />
            </div>

            {/* small screen map */}
            <Dialog open={isMapOpen} onOpenChange={handleMapClose}>
              <DialogContent className="overflow-hidden lg:hidden h-[80%] text-white p-8">
                <DialogHeader>
                  <DialogTitle>{selectedDevice.name}</DialogTitle>
                  <DialogDescription>
                    <span className="font-bold">ID:</span> {selectedDevice.id}
                  </DialogDescription>
                </DialogHeader>
                <div className="w-full min-h-52 max-h-80">
                  <CustomMap position={selectedDevice.state} />
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}
    </div>
  );
};

export default DevicesSection;
