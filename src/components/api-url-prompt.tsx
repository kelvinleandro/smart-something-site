import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useApi } from "@/hooks/useApi";
import useTheme from "@/hooks/useTheme";

const ApiUrlPrompt = () => {
  const { theme } = useTheme();
  const { changeBaseUrl } = useApi();
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChangeUrl = (url: string) => {
    try {
      changeBaseUrl(url);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 flex-1 justify-center items-center">
      <h2
        className="text-2xl font-bold text-center"
        style={{ color: theme.text }}
      >
        What is your API URL?
      </h2>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex flex-col">
          <Input
            placeholder="API URL"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            style={{ color: theme.text }}
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <Button
          onClick={() => handleChangeUrl(url)}
          className="rounded-lg self"
          style={{ color: theme.text, backgroundColor: theme.cardBackground }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ApiUrlPrompt;
