import { useEffect, useState } from "react";
import { Card, getCards } from "../api";

export const useCardStore = () => {
  const [Cards, setCards] = useState<Card[] | null>(null);

  useEffect(() => {
    getCards().then((cards) => {
      setCards(cards);
    });
  }, []);

  useEffect(() => {
    Cards && localStorage.setItem("cards", JSON.stringify(Cards));
  }, [Cards]);

  const createCard = async (card: Card) => {
    const newCard = { ...card, id: Cards?.length || 0 };
    setCards([...(Cards || []), newCard]);
  };
  const deleteCard = async (id: number) => {
    setCards(Cards?.filter((card) => card.id !== id) || []);
  };
  const updateCard = async (card: Card) => {
    setCards(Cards?.map((c) => (c.id === card.id ? card : c)) || []);
  };

  return {
    cardApi: {
      createCard,
      deleteCard,
      updateCard,
    },
    cards: Cards,
  };
};
