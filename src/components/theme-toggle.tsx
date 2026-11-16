"use client";

import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { brand } from "@/config/brand";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function currentTheme(): "light" | "dark" {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, currentTheme, () => "light" as const);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem(brand.themeKey, next);
    } catch {
      // The theme still changes for this view if storage is blocked.
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="h-11 px-3"
      aria-pressed={theme === "dark"}
      onClick={toggle}
    >
      {theme === "dark" ? "Light theme" : "Dark theme"}
    </Button>
  );
}
