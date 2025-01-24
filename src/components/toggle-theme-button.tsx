import React from "react";
import { LucideSun, LucideMoon } from "lucide-react";
import useTheme from "@/hooks/useTheme";
import { Button } from "./ui/button";

const ToggleThemeButton = () => {
  const { currentColorScheme, theme, toggleTheme } = useTheme();
  return (
    <Button
      variant="default"
      style={{ backgroundColor: theme.cardBackground }}
      className="rounded-full"
      size="icon"
      onClick={toggleTheme}
    >
      {currentColorScheme === "dark" ? (
        <LucideMoon style={{ color: theme.text }} />
      ) : (
        <LucideSun style={{ color: theme.text }} />
      )}
    </Button>
  );
};

export default ToggleThemeButton;
