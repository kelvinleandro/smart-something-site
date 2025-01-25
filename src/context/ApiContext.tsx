"use client";
import { createContext, useState, useEffect } from "react";
import axios, { AxiosInstance } from "axios";
import { log } from "console";

type ApiContextType = {
  instance: AxiosInstance | null;
  changeBaseUrl: (url: string) => void;
  baseUrl: string;
}

export const ApiContext = createContext<ApiContextType | null>(null);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [instance, setInstance] = useState<AxiosInstance | null>(null);

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

  useEffect(() => {
    if (baseUrl.length > 0) {
      const axiosInstance = axios.create({
        baseURL: baseUrl,
      });
      setInstance(axiosInstance);
    }
  }, [baseUrl]);
  
  return (
    <ApiContext.Provider value={{ instance, changeBaseUrl, baseUrl }}>
      {children}
    </ApiContext.Provider>
  );
};