import { useStore } from "@nanostores/react";
import { useMemo, useRef, useState } from "react";
import type { Card } from "../api";
import { settings } from "../hooks/SettingsStore";
import { useCardStore } from "../hooks/useCardStore";
import { useClickedOutside } from "../hooks/useClickedOutside";
import { CardSizes, SettingsOptions } from "../hooks/useSettings";
/* 
  REFACTOR LATER  REFACTOR LATER  REFACTOR LATER  REFACTOR LATER 
  REFACTOR LATER  REFACTOR LATER  REFACTOR LATER  REFACTOR LATER 
  REFACTOR LATER  REFACTOR LATER  REFACTOR LATER  REFACTOR LATER 
*/

const Card = ({
  card,
  deleteCard,
}: {
  card: Card;
  deleteCard: (id: number) => void;
}) => {
  const setngs = useStore(settings);
  const CardSize = CardSizes[setngs.cardSize];
  return (
    <div
      onClick={() => {
        window.open(card.url);
      }}
      style={{
        width: CardSize.width + "rem",
        height: CardSize.height + "rem",
      }}
      className="
      relative group
       flex items-center justify-center rounded-md hover:cursor-pointer hover:scale-105
    bg-primary-dark text-primary-light dark:bg-primary-light dark:text-primary-dark
    "
    >
      <h2>{card.title}</h2>
      <div
        onClick={(e) => {
          e.stopPropagation();
          deleteCard(card.id);
        }}
        className="hidden group-hover:flex text-white  rounded-md font-bold absolute right-2 top-2 opacity-10 hover:opacity-80"
      >
        ❌
      </div>
    </div>
  );
};

export const Dashboard = () => {
  const { cardApi, cards } = useCardStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  useClickedOutside(modalRef, () => setIsModalOpen(false));
  const [Title, setTitle] = useState("");
  const [Url, setUrl] = useState("");
  const [background, setBackground] = useState("");

  return (
    <div className="w-full h-full ">
      {isModalOpen && (
        <div className="z-10 top-0 left-0 absolute w-full h-full flex items-center justify-center bg-[rgb(255,255,255,0.85)]">
          <div
            ref={modalRef}
            className="dark:bg-primary-light p-5 shadow-md dark:shadow-none bg-primary-dark"
          >
            <h2 className=" dark:text-primary-dark text-primary-light">
              Add a new card
            </h2>
            <div>
              <div className=" flex flex-col gap-3 mt-10">
                <input
                  type="text"
                  className="dark:bg-primary-dark rounded-sm py-1 px-2 border-b-2 dark:border-none focus:outline-none placeholder:animate-pulse
        placeholder:font-semibold dark:placeholder:text-gray-300"
                  value={Title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="title"
                />
                <input
                  type="text"
                  className="dark:bg-primary-dark rounded-sm py-1 px-2 border-b-2 dark:border-none focus:outline-none placeholder:animate-pulse
        placeholder:font-semibold dark:placeholder:text-gray-300"
                  value={Url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="url"
                />
                <input
                  type="text"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="dark:bg-primary-dark rounded-sm py-1 px-2 border-b-2 dark:border-none focus:outline-none placeholder:animate-pulse
        placeholder:font-semibold dark:placeholder:text-gray-300"
                  placeholder="background"
                />
                <div className="flex justify-between mt-5">
                  <button
                    className=" px-4 py-2 font-bold text-white rounded-md bg-red-500 hover:bg-red-700"
                    onClick={() => {
                      setIsModalOpen(false);
                      setTitle("");
                      setUrl("");
                      setBackground("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className=" px-4 py-2 font-bold text-white rounded-md bg-green-500 hover:bg-green-700"
                    onClick={() => {
                      cardApi.createCard({
                        title: Title,
                        url: Url,
                        background: background,
                        id: 0,
                      });
                      setTitle("");
                      setUrl("");
                      setBackground("");
                      setIsModalOpen(false);
                    }}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full h-full flex  items-center justify-center ">
        <div className="flex  w-fit h-min gap-5 flex-wrap p-10">
          {cards?.map((card) => (
            <Card key={card.id} deleteCard={cardApi.deleteCard} card={card} />
          ))}

          <button
            className=" absolute right-12 bottom-4 opacity-20  rounded-md font-bold px-4 py-1 hover:opacity-80 "
            onClick={() => {
              console.log("as");
              setIsModalOpen(true);
            }}
          >
            Add Card
          </button>
        </div>
      </div>
    </div>
  );
};
