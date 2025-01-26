import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { LucidePlus, LucideMinus } from "lucide-react";
import { Button } from "./ui/button";
import { Devices, DeviceData } from "@/types/devices";
import useTheme from "@/hooks/useTheme";

const DeviceCard = ({
  device,
  onClick,
}: {
  device: DeviceData;
  onClick: () => void;
}) => {
  const { theme } = useTheme();
  return (
    <Card
      className="cursor-pointer px-2 shadow-lg shadow-blue-500/50 border-none"
      style={{
        background: theme.cardBackground,
      }}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle style={{ color: theme.text }}>{device.name}</CardTitle>
        <CardDescription style={{ color: theme.text }}>
          ID: {device.id}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {device.type === Devices.CAR_LOC ? (
          <>
            <p style={{ color: theme.text }}>
              Lat: {typeof device.state === "object" && device.state.lat}
            </p>
            <p style={{ color: theme.text }}>
              Lng: {typeof device.state === "object" && device.state.lng}
            </p>
          </>
        ) : device.type === Devices.AC ? (
          <div className="">
            <p style={{ color: theme.text }}>
              <span className="font-bold">Temperature:</span>{" "}
              {typeof device.state === "string" && device.state}
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
                disabled={device.level === device.min}
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
                disabled={device.level === device.max}
              >
                <LucidePlus style={{ color: theme.text }} />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-row flex-wrap gap-2">
            <p style={{ color: theme.text }} className="font-bold">
              State:
            </p>

            <div className="flex flex-row gap-1 items-center">
              <p style={{ color: theme.text }}>OFF</p>
              <Switch className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500" />
              <p style={{ color: theme.text }}>ON</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeviceCard;
