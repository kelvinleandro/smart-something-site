import React, { useState } from "react";
import { LucideXCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DeviceCard from "@/components/device-card";
import CustomMap from "./map";
import useTheme from "@/hooks/useTheme";

const DEVICES_NAMES = ["AC", "CarLoc", "HL"];

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

      {isMapOpen && selectedDevice && (
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
            <CustomMap deviceName={selectedDevice} />
          </div>

          {/* small screen map */}
          <Dialog open={isMapOpen} onOpenChange={handleMapClose}>
            <DialogContent className="overflow-hidden lg:hidden h-[80%] text-white p-8">
              <DialogHeader>
                <DialogTitle>{selectedDevice}</DialogTitle>
              </DialogHeader>
              <div className="w-full min-h-52 max-h-80">
                <CustomMap deviceName={selectedDevice} />
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default DevicesSection;
