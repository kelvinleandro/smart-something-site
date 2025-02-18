"use client";
import { useApi } from "@/hooks/useApi";
import useTheme from "@/hooks/useTheme";

import ApiUrlPrompt from "@/components/api-url-prompt";
import ToggleThemeButton from "@/components/toggle-theme-button";
import DevicesSection from "@/components/devices-section";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { theme } = useTheme();
  const { baseUrl, updateDevicesNames } = useApi();

  return (
    <div
      className="flex flex-col w-full h-full items-center pt-4 px-8"
      style={{ backgroundColor: theme.background }}
    >
      <div className="w-full relative flex items-center justify-center self-start">
        <h1
          className="text-4xl font-bold text-center justify-self-center"
          style={{ color: theme.text }}
        >
          SMART CAR
        </h1>
        <div className="absolute flex gap-2 right-4 items-center">
          {baseUrl.length > 0 && (
            <Button
              onClick={updateDevicesNames}
              className="rounded-xl"
              style={{
                color: theme.text,
                backgroundColor: theme.cardBackground,
              }}
            >
              Update
            </Button>
          )}

          <ToggleThemeButton />
        </div>
      </div>

      {baseUrl.length > 0 ? <DevicesSection /> : <ApiUrlPrompt />}
    </div>
  );
}
