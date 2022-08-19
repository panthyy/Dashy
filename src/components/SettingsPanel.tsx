import { useStore } from "@nanostores/react";
import { useEffect, useRef, useState } from "react";
import type { imageType } from "../hooks/SettingsStore";
import { settings as stn } from "../hooks/SettingsStore";
import type { SettingsOptions } from "../hooks/useSettings";

export const SettingsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const PanelRef = useRef<HTMLDivElement>(null);

  const settings = useStore(stn);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (PanelRef.current && !PanelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    isOpen && document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const openStyle = {
    display: "flex",
    width: "2.5rem",
  };

  const closedStyle = {
    display: "absolute",
    top: "0",
    right: "0",
    height: "100%",
    width: "2.5rem",
  };

  return (
    <div ref={PanelRef} className="flex  ">
      <div
        style={isOpen ? openStyle : closedStyle}
        className="group flex items-center justify-center hover:cursor-pointer hover:bg-gradient-to-r hover:to-white  dark:hover:to-gray-300 hover:from-transparent "
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="group-hover:opacity-100 opacity-20">🛠️</span>
      </div>

      <div
        className="
        transition-all duration-300  ease-in-out
      bg-primary-dark dark:bg-primary-light dark:text-primary-dark text-primary-light
        box-border
      "
        style={{
          opacity: isOpen ? 1 : 0,
          width: isOpen ? "30vw" : "0px",
          padding: isOpen ? "2rem" : "0px",
        }}
      >
        {isOpen && (
          <div className="flex flex-col w-full h-full">
            <header>
              <h2>Settings</h2>
            </header>
            <div className="w-full h-full overflow-y-auto mt-5 flex flex-col gap-5">
              <div className=" flex gap-2 items-center">
                <label>Background Image</label>
                <select
                  className=" text-primary-dark  rounded-sm  dark:border-2"
                  value={settings.image}
                  onChange={(e) => {
                    stn.set({
                      ...settings,
                      image: e.target.value as imageType,
                    });
                  }}
                >
                  <option value="random">Random</option>
                  <option value="image">Image</option>
                  <option value="none">None</option>
                </select>
              </div>
              {settings.image === "image" && (
                <div className=" flex gap-5 flex-col">
                  <label> Image Upload </label>
                  {settings.imageSrc && (
                    <div className=" w-full h-20 overflow-hidden flex items-center">
                      <img className=" object-cover" src={settings.imageSrc} />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files && e.target.files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = (e) => {
                        const base64 = reader.result?.toString();
                        base64 &&
                          stn.set({
                            ...settings,
                            imageSrc: base64,
                          });
                      };
                    }}
                  />
                </div>
              )}

              <div className="flex gap-5 ">
                <label>Card Size</label>
                <select
                  className=" text-primary-dark  rounded-sm  dark:border-2"
                  value={settings.cardSize}
                  onChange={(e) => {
                    stn.set({
                      ...settings,
                      cardSize: e.target.value as SettingsOptions["cardSize"],
                    });
                  }}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
