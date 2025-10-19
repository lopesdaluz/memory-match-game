import React from "react";
import type { CardType } from "../types/CardTypes";

type Props = {
  card: CardType;
  onClick: (card: CardType) => void;
};

const Card: React.FC<Props> = ({ card, onClick }) => {
  return (
    <div
      className={`w-24 h-24 md:w-32 md:h-32 flex items-center justify-center border rounded-lg cursor-pointer 
                  ${
                    card.isFlipped || card.isMatched
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700"
                  }`}
      onClick={() => onClick(card)}
    >
      {card.isFlipped || card.isMatched ? card.value : "?"}
    </div>
  );
};

export default Card;
