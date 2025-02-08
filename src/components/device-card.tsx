"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { LucidePlus, LucideMinus, LucideMapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Device } from "@/types/devices";
import useTheme from "@/hooks/useTheme";
import { useApi } from "@/hooks/useApi";

const MIN_AC_LEVEL = 1;
const MAX_AC_LEVEL = 3;

const DeviceCard = ({
  deviceName,
  onClick,
}: {
  deviceName: string;
  onClick: () => void;
}) => {
  const { theme } = useTheme();
  const { getDevice } = useApi();
  const [device, setDevice] = useState<Device | null>(null);

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const device = await getDevice(deviceName);
        if (device) {
          setDevice(device);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchDevice();
  }, [deviceName, getDevice]);

  return (
    <Card
      className="cursor-pointer px-2 shadow-lg shadow-blue-500/50 border-none"
      style={{
        background: theme.cardBackground,
      }}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle style={{ color: theme.text }}>{deviceName}</CardTitle>
      </CardHeader>
      <CardContent>
        {device && "lat" in device ? (
          <LucideMapPin style={{ color: theme.text }} className="w-6 h-6" />
        ) : device && "temperature" in device ? (
          <div className="">
            <p style={{ color: theme.text }}>
              <span className="font-bold">Temperature:</span>{" "}
              {device.temperature}
            </p>

            <div className="flex flex-row gap-1 items-center">
              <p className="font-bold" style={{ color: theme.text }}>
                Level:
              </p>
              <Button
                style={{ backgroundColor: theme.background }}
                className="rounded-full"
                size="icon"
                onClick={() => {}}
                disabled={device.level === MIN_AC_LEVEL}
              >
                <LucideMinus style={{ color: theme.text }} />
              </Button>
              <p className="font-bold" style={{ color: theme.text }}>
                {device.level}
              </p>
              <Button
                style={{ backgroundColor: theme.background }}
                className="rounded-full"
                size="icon"
                onClick={() => {}}
                disabled={device.level === MAX_AC_LEVEL}
              >
                <LucidePlus style={{ color: theme.text }} />
              </Button>
            </div>
          </div>
        ) : device && "status" in device ? (
          <div className="flex flex-row flex-wrap gap-2">
            <p style={{ color: theme.text }} className="font-bold">
              State:
            </p>

            <div className="flex flex-row gap-1 items-center">
              <p style={{ color: theme.text }}>OFF</p>
              <Switch
                checked={device.status == "ON"}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
              />
              <p style={{ color: theme.text }}>ON</p>
            </div>
          </div>
        ) : (
          <p style={{ color: theme.text }} className="font-bold">
            No information available
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DeviceCard;
