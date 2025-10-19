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

  const handleRestart = () => {
    setCards(generateCards());
    setFlipped([]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-grey-900 p-4">
      <h1 className="text-4xl font-bold text-white mb-8">🐾 Memory Match</h1>

      {/* Card grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 ">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>

      <button
        onClick={handleRestart}
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
      >
        Restart Game
      </button>
    </div>
  );
};

export default GameBoard;
