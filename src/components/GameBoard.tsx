import Card from "./Card";

export default function GameBoard() {
  // placeholder
  const cards = ["A", "B", "C", "D", "E", "F", "G", "H"];

  return (
    <main className="max-w-4xl mx-auto py-16 px-4 grid grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index} value={card} />
      ))}
    </main>
  );
}
