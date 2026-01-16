"use client";
import { useEffect } from "react";

const ACCENT_KEY = "custom-accent";

const presets = [
  { name: "Blue", value: "oklch(0.85 0.13 230)" },
  { name: "Green", value: "oklch(0.85 0.13 140)" },
  { name: "Pink", value: "oklch(0.85 0.13 340)" },
  { name: "Orange", value: "oklch(0.85 0.13 60)" },
];

export function AccentPicker() {
  const setAccent = (color: string) => {
    document.documentElement.style.setProperty("--info", color);
    if (typeof window !== "undefined" && typeof window.localStorage?.setItem === "function") {
      window.localStorage.setItem(ACCENT_KEY, color);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.localStorage?.getItem !== "function") {
      return;
    }
    const saved = window.localStorage.getItem(ACCENT_KEY);
    if (saved) setAccent(saved);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm mr-2">Accent:</span>
      {presets.map((preset) => (
        <button
          key={preset.name}
          style={{
            background: preset.value,
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: "2px solid #ccc",
          }}
          onClick={() => setAccent(preset.value)}
          aria-label={preset.name}
        />
      ))}
    </div>
  );
}
