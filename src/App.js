import React, { useState, useEffect } from "react";
import * as store from "./store";

function Cell({ cellVal, index }) {
    if (cellVal === 0) {
        return (
            <input
                value={cellVal}
                type="text"
                id={`txtbx${index}`}
                onClick={() => handleInputClick(cellVal, index)}
            />
        );
    } else {
        return (
            <input
                value={cellVal}
                type="text"
                readOnly={true}
                id={`txtbx${index}`}
                style={{ background: "lightblue" }}
            />
        );
    }
}

function handleInputClick(cellVal, index) {
    let newVal = parseInt(document.getElementById(`txtbx${index}`).value) + 1;
    if (newVal === 10) {
        newVal = 1;
    }
    document.getElementById(`txtbx${index}`).value = newVal;
}

function App() {
    const [sudoku, setSudoku] = useState({
      puzzle: [
        0, 2, 0, 6, 0, 0, 0, 0, 9, 0, 0, 0, 3, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0,
         0, 0, 6, 0, 0, 0, 0, 1, 0, 0, 0, 2, 5, 6, 0, 0, 2, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 6, 3, 0, 0, 1, 4, 0, 1, 7, 5, 0, 0, 0, 0, 0, 3, 8, 4, 0, 0,
           0, 0, 0, 2, 0, 6, 0, 3, 0, 0, 7, 0
      ],
      solution: []
    });

    useEffect(() => {
        store.connectToServer((board) => console.log(board));
        store.createBoard();
        store.subscribeToUpdatedCells((cells) => console.log(cells));
    });

    return (
        <div className="App">
            <h1>Sudoku With Friends</h1>
            <form>
                {sudoku.puzzle.map((cell, index) => (
                    <Cell key={index} index={index} cellVal={cell} />
                ))}
            </form>
        </div>
    );
}

export default App;
