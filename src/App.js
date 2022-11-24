import "./styles.css";
import { useEffect, useState } from "react";
import { winningCombinations } from "./tools/wc";

const Box = ({ value, handleClick }) => {
  return (
    <>
      <div class="box" onClick={handleClick}>
        {value}
      </div>
    </>
  );
};

const Board = () => {
  const [data, setData] = useState(Array(9).fill(""));
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({ winner: "", state: false });

  const handleClick = (box) => {
    setData(
      data.map((val, index) => {
        if (index === box && val === "") {
          return player;
        }

        return val;
      })
    );
  };

  useEffect(() => {
    checkWinner();
    checkTie();

    player === "X" ? setPlayer("O") : setPlayer("X");
  }, [data]);

  useEffect(() => {
    if (result.state !== false) {
      alert(`Game finished. Wining player is ${result.winner}`);
    }
  }, [result]);

  const checkTie = () => {
    let filled = true;
    data.forEach((box) => {
      if (box === "") {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: "No One", state: "Tie" });
    }
  };

  const checkWinner = () => {
    winningCombinations.forEach((curr) => {
      const firstPlayer = data[curr[0]];
      if (firstPlayer === "") return;
      let foundWinning = true;

      curr.forEach((index) => {
        if (data[index] !== firstPlayer) {
          foundWinning = false;
        }
      });

      if (foundWinning) {
        setResult({ winner: player, state: true });
        restartGame();
      }
    });
  };

  const restartGame = () => {
    setData(Array(9).fill(""));
    setPlayer("O");
  };

  return (
    <div class="board">
      {data.map((item, index) => (
        <Box
          value={data[index]}
          key={index}
          handleClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <h1>Hello Dev</h1>
      <h2>
        Try to make a Tick Tack Toe game
        <br /> like the one below
      </h2>
      <div>Next Player: </div>
      <Board />
    </div>
  );
}
