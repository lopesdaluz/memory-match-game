import React, { useState, useEffect } from "react";
import Card from "./Card";
import type { CardType } from "../types/CardTypes";

const generateCards = (): CardType[] => {
  const values = ["🐶", "🐱", "🐰", "🦊", "🐻", "🐸"];
  const cards = values
    .flatMap((value) => [
      { id: Math.random(), value, isFlipped: false, isMatched: false },
      { id: Math.random(), value, isFlipped: false, isMatched: false },
    ])
    .sort(() => Math.random() - 0.5);

  return cards;
};

const GameBoard: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>(generateCards());
  const [flipped, setFlipped] = useState<CardType[]>([]);

  const handleCardClick = (clickedCard: CardType) => {
    if (clickedCard.isFlipped || clickedCard.isMatched || flipped.length === 2)
      return;

    const updatedCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );

    setCards(updatedCards);
    setFlipped([...flipped, clickedCard]);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (first.value === second.value) {
        setCards((prev) =>
          prev.map((card) =>
            card.value === first.value ? { ...card, isMatched: true } : card
          )
        );
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.isMatched ? card : { ...card, isFlipped: false }
            )
          );
        }, 1000);
      }
      setFlipped([]);
    }
  }, [flipped]);

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 p-4 max-w-md mx-auto">
      {cards.map((card) => (
        <Card key={card.id} card={card} onClick={handleCardClick} />
      ))}
    </div>
  );
};

export default GameBoard;
