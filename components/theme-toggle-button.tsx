import { useTheme } from "../app/context/themeContext";
import { Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="outline"
      aria-label="Toggle theme"
      aria-pressed={isDark}
      onClick={toggleTheme}
      className="flex items-center gap-2 px-4 py-2 rounded-full"
    >
      <Sun
        size={18}
        className={isDark ? "opacity-40" : "text-yellow-500"}
      />
      <Moon
        size={18}
        className={isDark ? "text-blue-500" : "opacity-40"}
      />
    </Button>
  );
};
