"use client";
import { useApi } from "@/hooks/useApi";
import useTheme from "@/hooks/useTheme";
import ApiUrlPrompt from "@/components/api-url-prompt";
import ToggleThemeButton from "@/components/toggle-theme-button";

export default function Home() {
  const { theme } = useTheme();
  const {baseUrl} = useApi();

  return (
    <div className="flex flex-col w-full h-screen items-center pt-4" style={{ backgroundColor: theme.background }}>
      <div className="w-full relative flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center justify-self-center" style={{ color: theme.text }}>SMART CAR</h1>
        <div className="absolute right-4">
          <ToggleThemeButton />
        </div>
      </div>

      {
        baseUrl.length > 0 ? (
          <h1 className="text-4xl font-bold text-center" style={{ color: theme.text }}>BASE URL: {baseUrl}</h1>
        ) : (
          <ApiUrlPrompt />
        )
      }
    </div>
  );
}