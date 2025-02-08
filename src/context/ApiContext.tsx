"use client";
import { createContext, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { Device } from "@/types/devices";

type ApiContextType = {
  changeBaseUrl: (url: string) => void;
  baseUrl: string;
  devicesNames: string[];
  getDevice: (name: string) => Promise<Device | undefined>;
  setActuator: (name: string, state: string) => Promise<Device | undefined>;
  updateDevicesNames: () => Promise<void>;
};

export const ApiContext = createContext<ApiContextType | null>(null);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [devicesNames, setDevicesNames] = useState<string[]>([]);

  const instance = useMemo(() => {
    if (baseUrl.length > 0) {
      const axiosInstance = axios.create({
        baseURL: baseUrl,
      });
      return axiosInstance;
    }
    return null;
  }, [baseUrl]);

  const changeBaseUrl = (url: string) => {
    const trimmedUrl = url.trim();

    if (trimmedUrl === "") {
      throw new Error("URL cannot be empty. Please enter a valid URL.");
    }

    if (
      !trimmedUrl.startsWith("http://") &&
      !trimmedUrl.startsWith("https://")
    ) {
      throw new Error("URL must start with 'http://' or 'https://'.");
    }

    setBaseUrl(trimmedUrl);
  };

  const getSensors = useCallback(async (): Promise<string[] | undefined> => {
    if (!instance) return;

    try {
      const response = await instance.get<string[]>("/sensors");
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }, [instance]);

  const getActuators = useCallback(async (): Promise<string[] | undefined> => {
    if (!instance) return;

    try {
      const response = await instance.get<string[]>("/actuators");
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }, [instance]);

  const getSensor = useCallback(
    async (name: string): Promise<Device | undefined> => {
      if (!instance) return;

      try {
        const response = await instance.get<Device>("/sensors", {
          params: { name },
        });
        return response?.data;
      } catch (error) {
        console.log(error);
      }
    },
    [instance]
  );

  const getActuator = useCallback(
    async (name: string): Promise<Device | undefined> => {
      if (!instance) return;

      try {
        const response = await instance.get<Device>("/actuators", {
          params: { name },
        });
        return response?.data;
      } catch (error) {
        console.log(error);
      }
    },
    [instance]
  );

  const setActuator = useCallback(
    async (name: string, state: string): Promise<Device | undefined> => {
      if (!instance) return;

      try {
        const response = await instance.post<Device>("/actuators", {
          name,
          state,
        });
        return response?.data;
      } catch (error) {
        console.log(error);
      }
    },
    [instance]
  );

  const getDevice = useCallback(
    async (name: string): Promise<Device | undefined> => {
      if (!instance) return;

      try {
        if (name.includes("CarLoc")) {
          return getSensor(name);
        } else {
          return getActuator(name);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [instance, getSensor, getActuator]
  );

  const updateDevicesNames = useCallback(async () => {
    const sensors = await getSensors();
    const actuators = await getActuators();

    if (sensors && actuators) {
      setDevicesNames([...sensors, ...actuators]);
    }
  }, [getSensors, getActuators]);

  return (
    <ApiContext.Provider
      value={{
        changeBaseUrl,
        baseUrl,
        devicesNames,
        setActuator,
        getDevice,
        updateDevicesNames,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
