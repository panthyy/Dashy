import { useEffect, useRef, useState } from "react";
import { useSettings } from "../hooks/useSettings";

export const SettingsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { settings, setSetting } = useSettings();

  const PanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let out: string = "";

    switch (settings.image) {
      case "image":
        out = "url(" + settings.imageSrc + ")";
        break;
      case "random":
        out = "url(https://source.unsplash.com/random/1920x1080)";
        break;
    }
    document.body.style.backgroundImage = out;

    console.log(settings);
  }, [settings]);
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

  return (
    <div ref={PanelRef} className="flex  ">
      <button className=" mt-auto pr-5 pb-5" onClick={() => setIsOpen(!isOpen)}>
        🛠️
      </button>
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
                    setSetting("image", e.target.value);
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
                        setSetting("imageSrc", base64);
                      };
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
