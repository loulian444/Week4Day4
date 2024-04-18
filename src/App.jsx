import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const tileValues = `1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 *`.split(` `);

  const generatePuzzle = () => {
    const board = [];

    while (board.length < 4) {
      const row = [];
      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * tileValues.length);
        row.push(tileValues.splice(randomIndex, 1)[0]);
      }
      board.push(row);
    }
    return board;
  };

  // poS = position of Star
  const [puzzle, setPuzzle] = useState(generatePuzzle());
  const [poSx, setPoSx] = useState(undefined);
  const [poSy, setPoSy] = useState(undefined);

  useEffect(() => {
    const star = document.getElementById(`*`);
    const y = findPositionY(star.id);
    const x = findPositionX(y, `*`);
    setPoSx(x);
    setPoSy(y);

    star.style.backgroundColor = `cyan`
  }, [puzzle]);

  const clickHandler = (e) => {
    const yPosition = findPositionY(e.target.id);
    const xPosition = findPositionX(yPosition, e.target.id);

    if (
      (xPosition - poSx === 1 && yPosition - poSy === 0) ||
      (xPosition - poSx === -1 && yPosition - poSy === 0) ||
      (xPosition - poSx === 0 && yPosition - poSy === 1) ||
      (xPosition - poSx === 0 && yPosition - poSy === -1)
    ) {
      puzzle[yPosition].splice(xPosition, 1, `*`);
      puzzle[poSy].splice(poSx, 1, e.target.id);
      setPuzzle([...puzzle]);
    }
  };

  const findPositionY = (num) => {
    for (let i = 0; i < puzzle.length; i++) {
      if (puzzle[i].includes(num)) return i;
    }
  };

  const findPositionX = (num, value) => {
    for (let i = 0; i < puzzle[num].length; i++) {
      if (puzzle[num][i] === value) return i;
    }
  };

  return (
    <>
      <h1>Q1</h1>
      <section id="puzzleSec">
        {puzzle.map((piece) => {
          return piece.map((value) => (
            <span key={value} id={value} onClick={clickHandler}>
              {value}
            </span>
          ));
        })}
      </section>
    </>
  );
}

export default App;
