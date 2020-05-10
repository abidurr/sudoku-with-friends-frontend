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
    const [sudoku, setSudoku] = useState({puzzle: []});

    useEffect(() => {
        store.connectToServer((board) => document.getElementById("server").innerHTML = board);
        store.createBoard();
        store.subscribeToUpdatedCells((cells) => {
            let puzz = [];
            cells.map(( {row, col, val} ) => puzz.push(val))
            setSudoku({puzzle: puzz}, [])
        });
        
    });

    return (
        <div className="App">
            <h1>Sudoku With Friends</h1>
            <div id="info">You are on board:
            <div id="server"></div>
            </div>
            <form>
                {sudoku.puzzle.map((index, cell) => (
                    <Cell key={index} index={index} cellVal={cell} />
                ))}
            </form>
        </div>
    );
}

export default App;
