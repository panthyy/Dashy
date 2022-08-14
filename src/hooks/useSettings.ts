import { useEffect, useState } from "react";
type Settings = {
  image: "random" | "none" | "image";
  imageSrc: string;
};
export const useSettings = () => {
  const settins = localStorage.getItem("settings") || "{}";
  const [settings, setSettings] = useState<Settings>(
    settins ? JSON.parse(settins) : { randomImage: false }
  );

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const setSetting = (key: keyof Settings, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  return {
    settings,
    setSetting,
  };
};
