import React, { useState, useEffect } from "react";
import Card from "./Card";
import type { CardType } from "../types/CardTypes";

//the logic & import what each card does and the object of each card

//the function to generate cards
//random cards for the game
//each card has id, value, isFlipped and isMatched
//the cards ar4e shuffled randomly
//2 of each card
//the values are emojis of animals
//return the array of cards

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

//the hanleCarClick funtion
//if its clicked and its flipped or matched or 2 cards are flipped return
//update the card when the card is clicked
//set the cards and flipped state

const GameBoard: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>(generateCards());
  const [flipped, setFlipped] = useState<CardType[]>([]);

  const handleCardClick = (clickedCard: CardType) => {
    console.log("Clicked card:", clickedCard); //  shows which card you clicked
    console.log("Flipped cards before click:", flipped); //  shows what’s flipped before

    if (clickedCard.isFlipped || clickedCard.isMatched || flipped.length === 2)
      return;

    const updatedCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );

    console.log("Cards after flipping one:", updatedCards); //  shows the updated state

    setCards(updatedCards);
    setFlipped([...flipped, clickedCard]);

    console.log("Flipped cards after click:", [...flipped, clickedCard]); //  after click
  };

  //useEffect to check for matches
  //if 2 cards are flipped check if they match
  //if they match set isMatched to true
  //if not flip them back after 1 second
  //reset the flipped state
  useEffect(() => {
    if (flipped.length === 2) {
      console.log("Checking two flipped cards:", flipped); //  shows both flipped

      const [first, second] = flipped;
      if (first.value === second.value) {
        console.log("✅ It's a match!", first.value); //  match found
        setCards((prev) =>
          prev.map((card) =>
            card.value === first.value ? { ...card, isMatched: true } : card
          )
        );
      } else {
        console.log("❌ Not a match! Flipping back."); //  not a match
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

  //handleRestart function to restart the game
  //generate new cards and reset flipped state
  //called when restart button is clicked
  //reset the game
  //set new cards and reset flipped state
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
