import React, { useState } from "react";

function Cell( { cellVal, index} ) {
  if (cellVal === 0) {
    return (
        <input 
          value={cellVal}
          type="text" 
          id={`txtbx${index}`}
          onClick={() => handleInputClick(index)}
        />
    )} else {
      return (
        <input 
          value={cellVal}
          type="text"
          readOnly={true}
          id={`txtbx${index}`}
          style={{background: "lightblue"}}
        />
      )}
}

function handleInputClick(cellVal, index) {
    let newVal = parseInt(document.getElementById(`txtbx${index}`).value) + 1
    if (newVal === 10) {
    newVal = 1;
    }
    document.getElementById(`txtbx${index}`).value = newVal;
}

function App() {
    const [sudoku, setSudoku] = useState({
        puzzle: [
            0, 2, 0, 6, 0, 0, 0, 0, 9, 0, 0, 0, 3, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1, 0, 0, 0, 2, 5, 6, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 0, 0, 1, 4, 0, 1, 7, 5, 0, 0, 0, 0, 0, 3, 8, 4, 0, 0, 0, 0, 0, 2, 0, 6, 0, 3, 0, 0, 7, 0
          ],
          solution: [
            1, 2, 3, 6, 8, 7, 4, 5, 9, 9, 6, 4, 3, 2, 5, 1, 8, 7, 5, 8, 7, 9, 1, 4, 2, 6, 3, 3, 7, 9, 1, 4, 8, 6, 2, 5, 6, 1, 5, 2, 7, 9, 3, 4, 8, 8, 4, 2, 5, 6, 3, 7, 9, 1, 4, 9, 1, 7, 5, 2, 8, 3, 6, 7, 3, 8, 4, 9, 6, 5, 1, 2, 2, 5, 6, 8, 3, 1, 9, 7, 4
          ],
          guess: [
            0, 2, 0, 6, 0, 0, 0, 0, 9, 0, 0, 0, 3, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1, 0, 0, 0, 2, 5, 6, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 0, 0, 1, 4, 0, 1, 7, 5, 0, 0, 0, 0, 0, 3, 8, 4, 0, 0, 0, 0, 0, 2, 0, 6, 0, 3, 0, 0, 7, 0
          ]
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
    )
}

export default App;