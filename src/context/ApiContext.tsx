"use client";
import { createContext, useState, useEffect, useCallback } from "react";
import axios, { AxiosInstance } from "axios";
import { DeviceData } from "@/types/devices";

type ApiContextType = {
  instance: AxiosInstance | null;
  changeBaseUrl: (url: string) => void;
  baseUrl: string;
  devices: DeviceData[];
  setActuator: (name: string, state: string) => Promise<DeviceData | undefined>;
  getSensor: (name: string) => Promise<DeviceData | undefined>;
}

export const ApiContext = createContext<ApiContextType | null>(null);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [instance, setInstance] = useState<AxiosInstance | null>(null);
  const [devices, setDevices] = useState<DeviceData[]>([]);

  const changeBaseUrl = (url: string) => {
    const trimmedUrl = url.trim();
  
    if (trimmedUrl === "") {
      throw new Error("URL cannot be empty. Please enter a valid URL.");
    }
  
    if (!trimmedUrl.startsWith("http://") && !trimmedUrl.startsWith("https://")) {
      throw new Error("URL must start with 'http://' or 'https://'.");
    }
  
    setBaseUrl(trimmedUrl);
  };

  const getSensors = useCallback(async (): Promise<DeviceData[] | undefined> => {
    if (!instance) return;
    
    try {
      const response = await instance.get<DeviceData[]>("/sensors");
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }, [instance]);

  const getActuators = useCallback(async (): Promise<DeviceData[] | undefined> => {
    if (!instance) return;
    
    try {
      const response = await instance.get<DeviceData[]>("/actuators");
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }, [instance]);

  const getSensor = useCallback(async (name: string): Promise<DeviceData | undefined> => {
    if (!instance) return;
    
    try {
      const response = await instance.get<DeviceData>(`/sensors/${name}`);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }, [instance]);

  const setActuator = useCallback(async (name: string, state: string): Promise<DeviceData | undefined> => {
    if (!instance) return;
    
    try {
      const response = await instance.put<DeviceData>(`/actuators/${name}`, { state });
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }, [instance]);

  useEffect(() => {
    if (baseUrl.length > 0) {
      const axiosInstance = axios.create({
        baseURL: baseUrl,
      });
      setInstance(axiosInstance);
    }
  }, [baseUrl]);

  // periodically get sensors and actuators and add/update the devices states
  useEffect(() => {
    const interval = setInterval(async () => {
      const sensors = await getSensors();
      const actuators = await getActuators();

      setDevices((prevDevices) => {
        // Add or update sensors and actuators in the devices state
        const updatedDevices = [...prevDevices];
        
        // Handle adding/updating sensors
      sensors?.forEach((sensor: DeviceData) => {
        const existingDeviceIndex = updatedDevices.findIndex(
          (device) => device.name === sensor.name
        );
        
        if (existingDeviceIndex === -1) {
          // If the device doesn't exist, add a new one
          updatedDevices.push(sensor);
        } else {
          // If the device exists, update its state
          updatedDevices[existingDeviceIndex] = {
            ...updatedDevices[existingDeviceIndex],
            ...sensor
          };
        }
      });

      // Handle adding/updating actuators
      actuators?.forEach((actuator: DeviceData) => {
        const existingDeviceIndex = updatedDevices.findIndex(
          (device) => device.name === actuator.name
        );

        if (existingDeviceIndex === -1) {
          // If the device doesn't exist, add a new one
          updatedDevices.push(actuator);
        } else {
          // If the device exists, update its state
          updatedDevices[existingDeviceIndex] = {
            ...updatedDevices[existingDeviceIndex],
            ...actuator
          };
        }
      });

      return updatedDevices;
    });
    }, 5000);

    return () => clearInterval(interval);
  }, [getSensors, getActuators]);
  
  return (
    <ApiContext.Provider value={{ instance, changeBaseUrl, baseUrl, devices, setActuator, getSensor }}>
      {children}
    </ApiContext.Provider>
  );
};