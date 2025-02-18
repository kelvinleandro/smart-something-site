"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LucideMapPin,
  Thermometer,
  LockOpen,
  Lock,
  PowerCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { DeviceState } from "@/types/devices";
import useTheme from "@/hooks/useTheme";
import { useApi } from "@/hooks/useApi";

const DeviceCard = ({
  deviceName,
  onClick,
}: {
  deviceName: string;
  onClick: () => void;
}) => {
  const { theme } = useTheme();
  const { getDevice, setActuator } = useApi();
  const [deviceState, setDeviceState] = useState<DeviceState | null>(null);
  const [sliderValue, setSliderValue] = useState<number>(0);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
  };

  const handleOkClick = () => {
    const stateValue = sliderValue === 0 ? "OFF" : `ON|${sliderValue}`;
    handleChangeState(stateValue);
  };

  const refresh = async () => {
    try {
      const state = await getDevice(deviceName);
      if (state) {
        setDeviceState(state as DeviceState);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangeState = async (state: string) => {
    try {
      const response = await setActuator(deviceName, state);
      if (response) {
        setDeviceState(response.state as DeviceState);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchDevice = async () => {
      // if (deviceName.includes("temperature_sensor")) {
      //   setDeviceState("23.3567");
      // } else if (deviceName.includes("light")) {
      //   setDeviceState("0");
      // } else if (deviceName.includes("door_lock")) {
      //   setDeviceState("LOCKED");
      // } else if (deviceName.includes("arconditioner")) {
      //   setDeviceState("32.12");
      // } else if (deviceName.includes("car_loc")) {
      //   setDeviceState("-3.742008|-38.574889");
      // }
      try {
        const state = await getDevice(deviceName);
        if (state) {
          setDeviceState(state as DeviceState);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchDevice();
  }, [deviceName, getDevice]);

  return (
    <Card
      className={`${
        deviceName.includes("car_loc") && "cursor-pointer"
      } px-2 shadow-lg shadow-blue-500/50 border-none min-h-full flex flex-col`}
      style={{
        background: theme.cardBackground,
      }}
      onClick={onClick}
    >
      <CardHeader className="flex-1">
        <CardTitle style={{ color: theme.text }} className="text-lg">
          {deviceName}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-3">
        {deviceName.includes("car_loc") ? (
          // car_loc content
          <LucideMapPin style={{ color: theme.text }} className="w-14 h-14" />
        ) : deviceState && deviceName.includes("temperature_sensor") ? (
          // temperature_sensor content
          <div className="flex items-center gap-1">
            <p style={{ color: theme.text }}>
              <span className="font-bold">Temperature:</span>{" "}
              {Number(deviceState).toFixed(2)}°C
            </p>

            <Thermometer style={{ color: theme.text }} className="w-8 h-8" />
          </div>
        ) : deviceState && deviceName.includes("door_lock") ? (
          // door_lock content
          <>
            {deviceState === "LOCKED" ? (
              <div
                onClick={() => handleChangeState("UNLOCKED")}
                className="rounded-full w-12 h-12 flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: theme.background }}
              >
                <Lock style={{ color: theme.text }} className="w-8 h-8" />
              </div>
            ) : (
              <div
                onClick={() => handleChangeState("LOCKED")}
                className="rounded-full w-12 h-12 flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: theme.background }}
              >
                <LockOpen style={{ color: theme.text }} className="w-8 h-8" />
              </div>
            )}
          </>
        ) : deviceState && deviceName.includes("arconditioner") ? (
          // arconditioner content
          <div className="flex flex-col">
            <p style={{ color: theme.text }}>
              <span className="font-bold">Temperature:</span>{" "}
              {Number(deviceState).toFixed(2)}°C
            </p>

            <div className="flex gap-2">
              <div
                onClick={() => handleChangeState("ON")}
                className="rounded-full w-12 h-12 flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: theme.background }}
              >
                <PowerCircle style={{ color: "#00ff00" }} className="w-8 h-8" />
              </div>

              <div
                onClick={() => handleChangeState("OFF")}
                className="rounded-full w-12 h-12 flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: theme.background }}
              >
                <PowerCircle style={{ color: "#ff0000" }} className="w-8 h-8" />
              </div>
            </div>
          </div>
        ) : deviceState && deviceName.includes("light") ? (
          // light content
          <div className="flex flex-col">
            <p style={{ color: theme.text }}>
              <span className="font-bold">Brightness:</span> {deviceState}
            </p>

            <div className="flex gap-2 items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={handleSliderChange}
                style={{ width: "100%", accentColor: theme.background }}
              />
              <p className="font-bold" style={{ color: theme.text }}>
                {sliderValue}
              </p>
              <Button
                onClick={handleOkClick}
                className="rounded-full cursor-pointer"
                style={{
                  backgroundColor: theme.background,
                  color: theme.text,
                }}
              >
                OK
              </Button>
            </div>
          </div>
        ) : (
          <p style={{ color: theme.text }} className="font-bold">
            No information available
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-1 justify-end">
        {!deviceName.includes("car_loc") && (
          <Button
            onClick={refresh}
            className="rounded-full"
            style={{ backgroundColor: theme.background, color: theme.text }}
          >
            Refresh
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DeviceCard;
