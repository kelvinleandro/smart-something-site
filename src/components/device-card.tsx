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

const DeviceCard = ({ device }: { device: DeviceData }) => {
  const { theme } = useTheme();
  return (
    <Card>
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
              Lat: {typeof device.status === "object" && device.status.lat}
            </p>
            <p style={{ color: theme.text }}>
              Lng: {typeof device.status === "object" && device.status.lng}
            </p>
          </>
        ) : device.type === Devices.AC ? (
          <div className="">
            <p style={{ color: theme.text }}>
              <span className="font-bold">Temperature:</span> {typeof device.status === "string" && device.status}
            </p>

            <div className="flex flex-row gap-1 items-center">
              <p className="font-bold" style={{ color: theme.text }}>
                Level:
              </p>
              <Button
                style={{ backgroundColor: theme.cardBackground }}
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
                style={{ backgroundColor: theme.cardBackground }}
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
          <div className="flex flex-row gap-2">
            <p style={{ color: theme.text }} className="font-bold">Status:</p>

            <div className="flex flex-row gap-1">
              <p style={{ color: theme.text }}>OFF</p>
              <Switch />
              <p style={{ color: theme.text }}>ON</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeviceCard;
