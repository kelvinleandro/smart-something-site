import { useContext } from "react";
import { ApiContext } from "@/context/api-context";

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within a ApiProvider");
  }
  return context;
};
