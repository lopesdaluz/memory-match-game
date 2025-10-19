import React from "react";
import type { CardType } from "../types/CardTypes";

type Props = {
  card: CardType;
  onClick: (card: CardType) => void;
};

const Card: React.FC<Props> = ({ card, onClick }) => {
  return (
    <div
      className={`w-24 h-32 md:w-28 md:h-36 flex items-center justify-center text-4xl font-bold rounded-xl shadow-lg cursor-pointer
                  ${
                    card.isFlipped || card.isMatched
                      ? "bg-white text-gray-900"
                      : "bg-gray-700 text-white"
                  }
                  transition-transform duration-300 transform hover:scale-105`}
      onClick={() => onClick(card)}
    >
      {/* Show emoji if flipped or matched, otherwise show question mark */}
      {card.isFlipped || card.isMatched ? card.value : "❓"}
    </div>
  );
};

export default Card;
