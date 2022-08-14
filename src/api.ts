export type Card = {
  id: number;
  title: string;
  url: string;
  background: string;
};

export const getCards = async (): Promise<Card[]> => {
  const raw = localStorage.getItem("cards");
  if (raw) {
    return JSON.parse(raw);
  } else {
    return [];
  }
};

export const createCard = async (card: Card): Promise<Card> => {
  const cards = await getCards();
  const newCard = { ...card, id: cards.length };
  localStorage.setItem("cards", JSON.stringify([...cards, newCard]));
  return newCard;
};
