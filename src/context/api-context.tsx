"use client";
import { createContext, useState, useCallback, useMemo } from "react";
import { PostData } from "@/types/devices";
import { SENSORS_PREFIX } from "@/constants/devices-prefix";
import axios from "axios";

type ApiContextType = {
  changeBaseUrl: (url: string) => void;
  baseUrl: string;
  devicesNames: string[];
  getDevice: (name: string) => Promise<string | undefined>;
  setActuator: (name: string, state: string) => Promise<PostData | undefined>;
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
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.log(error);
      }
    }
  }, [instance]);

  const getActuators = useCallback(async (): Promise<string[] | undefined> => {
    if (!instance) return;

    try {
      const response = await instance.get<string[]>("/actuators");
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.log(error);
      }
    }
  }, [instance]);

  const getSensor = useCallback(
    async (name: string): Promise<string | undefined> => {
      if (!instance) return;

      try {
        const response = await instance.get<string>("/sensors", {
          params: { name },
        });
        return response.data;
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          console.log(error);
        }
      }
    },
    [instance]
  );

  const getActuator = useCallback(
    async (name: string): Promise<string | undefined> => {
      if (!instance) return;

      try {
        const response = await instance.get<string>("/actuators", {
          params: { name },
        });
        return response.data;
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          console.log(error);
        }
      }
    },
    [instance]
  );

  const setActuator = useCallback(
    async (name: string, state: string): Promise<PostData | undefined> => {
      if (!instance) return;

      try {
        const response = await instance.post<PostData>("/actuators", {
          name,
          state,
        });
        return response.data;
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          console.log(error);
        }
      }
    },
    [instance]
  );

  const getDevice = useCallback(
    async (name: string): Promise<string | undefined> => {
      if (!instance) return;

      try {
        if (SENSORS_PREFIX.some((prefix) => name.startsWith(prefix))) {
          return getSensor(name);
        } else {
          return getActuator(name);
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          console.log(error);
        }
      }
    },
    [instance, getSensor, getActuator]
  );

  const updateDevicesNames = useCallback(async () => {
    const sensors = await getSensors();
    const actuators = await getActuators();

    if (sensors && actuators) {
      const uniqueDevicesNames = [...new Set([...sensors, ...actuators])];
      setDevicesNames(uniqueDevicesNames);
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
