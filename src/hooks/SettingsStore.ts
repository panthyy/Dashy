import { map } from "nanostores";
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

export type imageType = "random" | "none" | "image";
export type SettingsOptions = {
  image: imageType;
  imageSrc: string;
  cardSize: CardSize;
};

const settins = localStorage.getItem("settings") || "{}";

export const settings = map<SettingsOptions>(
  settins ? JSON.parse(settins) : { randomImage: false }
);

settings.subscribe((settings) => {
  localStorage.setItem("settings", JSON.stringify(settings));
});

settings.subscribe((settings, image) => {
  if (typeof window == "undefined") return;

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
});
