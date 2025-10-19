import Header from "./components/Header";
import GameBoard from "./components/GameBoard";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Header />
      <GameBoard />
    </div>
  );
}
