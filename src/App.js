import React from 'react';
import * as store from './store';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    store.connectToServer((board) => console.log(board));
    store.createBoard();
    store.subscribeToUpdatedCells(cells => console.log(cells));
  }
  constructor(props) {
    super(props);

    this.state = {
      puzzle: [
        0, 2, 0, 6, 0, 0, 0, 0, 9, 0, 0, 0, 3, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1, 0, 0, 0, 2, 5, 6, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 0, 0, 1, 4, 0, 1, 7, 5, 0, 0, 0, 0, 0, 3, 8, 4, 0, 0, 0, 0, 0, 2, 0, 6, 0, 3, 0, 0, 7, 0
      ],
      solution: [
        1, 2, 3, 6, 8, 7, 4, 5, 9, 9, 6, 4, 3, 2, 5, 1, 8, 7, 5, 8, 7, 9, 1, 4, 2, 6, 3, 3, 7, 9, 1, 4, 8, 6, 2, 5, 6, 1, 5, 2, 7, 9, 3, 4, 8, 8, 4, 2, 5, 6, 3, 7, 9, 1, 4, 9, 1, 7, 5, 2, 8, 3, 6, 7, 3, 8, 4, 9, 6, 5, 1, 2, 2, 5, 6, 8, 3, 1, 9, 7, 4
      ],
      guess: [
        0, 2, 0, 6, 0, 0, 0, 0, 9, 0, 0, 0, 3, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1, 0, 0, 0, 2, 5, 6, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 0, 0, 1, 4, 0, 1, 7, 5, 0, 0, 0, 0, 0, 3, 8, 4, 0, 0, 0, 0, 0, 2, 0, 6, 0, 3, 0, 0, 7, 0
      ]
    };
    this.handleInputClick = this.handleInputClick.bind(this);
  };

  handleInputClick(event) {
    const cell = event.target.id;
    let newVal = parseInt(document.getElementById(cell).value) + 1
    if (newVal === 10) {
    newVal = 1;
    }
    document.getElementById(cell).value = newVal;
    console.log(this.state.guess);
  }

  changedCell(event) {
    this.setState((state, prevState) => {

    })
  }

  createBoard(props) {
    return (
        <input
        value="0"
        type="text" 
        id="txtbx0"
      />
      );
  }

  render() {
    return (
      <div className="App">
        <h1>Sudoku With Friends</h1>
        <form>
        <input 
          value={this.state.puzzle[0]}
          onChange={this.changedCell}
          type="text" 
          id="txtbx"
          onClick={this.handleInputClick}
        />
        <input 
          value={this.state.puzzle[1]}
          onChange={this.changedCell}
          type="text" 
          id="txtbx1"
          onClick={this.handleInputClick}
        />
        </form>
      </div>
    );
  }

}

export default App;
