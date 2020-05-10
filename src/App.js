import React from "react";
import * as store from "./store";
import Cell from "./components/Cell";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            puzzle: new Array(81),
            solution: [],
            guess: [],
        };
    }

    cycleCell = (index, delta) => () => {
        const val = this.state.puzzle[index];
        const row = Math.floor(index / 9);
        const col = index % 9;
        let newVal = val + delta;
        if (newVal < 1) newVal = 9;
        if (newVal > 9) newVal = 1;
        store.updateCell(row, col, newVal);
        console.log(row, col, newVal);
    }

    componentDidMount() {
        store.connectToServer(
            (board) => (document.getElementById("server").innerHTML = board)
        );
        store.createBoard();
        store.subscribeToUpdatedCells((cells) => {
            const { puzzle } = this.state;
            cells.forEach(({row, col, val}) => puzzle[row * 9 + col] = val);
            this.setState({ puzzle });
        });
    }

    render() {
        return (
            <div className="App">
                <h1>Sudoku With Friends</h1>
                <div id="info">
                    You are on board:
                    <div id="server"></div>
                    <input type="text" name="join-board" id="join-board" />
                    <button id="join-button">Join Board</button>
                </div>
                <form>
                    {this.state.puzzle.map((val, index) => (
                        <Cell key={index} index={index} cellVal={val} cycleUp={this.cycleCell(index, 1)} cycleDown={this.cycleCell(index, -1)}/>
                    ))}
                </form>
            </div>
        );
    }
}

export default App;
