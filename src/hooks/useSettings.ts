import { useEffect, useState } from "react";

type CardSize = "small" | "medium" | "large";

export const CardSizes: Record<
  CardSize,
  {
    width: number;
    height: number;
  }
> = {
  small: {
    width: 14,
    height: 7,
  },
  medium: {
    width: 16,
    height: 9,
  },
  large: {
    width: 20,
    height: 13,
  },
};
export type SettingsOptions = {
  image: "random" | "none" | "image";
  imageSrc: string;
  cardSize: CardSize;
};

export const useSettings = () => {
  // ??
  const settins = localStorage.getItem("settings") || "{}";
  const [settings, setSettings] = useState<SettingsOptions>(
    settins ? JSON.parse(settins) : { randomImage: false }
  );

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const setSetting = (key: keyof SettingsOptions, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  return {
    settings,
    setSetting,
  };
};
