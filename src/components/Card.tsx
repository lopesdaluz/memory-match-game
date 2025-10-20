import React from "react";
import type { CardType } from "../types/CardTypes";

type Props = {
  card: CardType;
  onClick: (card: CardType) => void;
};

const Card: React.FC<Props> = ({ card, onClick }) => {
  return (
    <div
      className={`w-32 h-40 md:w-36 md:h-48 flex items-center justify-center border-2 border-gray-300 rounded-xl cursor-pointer 
        ${
          card.isFlipped || card.isMatched
            ? "bg-white "
            : "bg-gray-700 text-gray-700"
        }
      `}
      onClick={() => onClick(card)}
      style={{ fontSize: "2rem" }}
    >
      {card.isFlipped || card.isMatched ? card.value : "?"}
    </div>
  );
};

export default Card;
