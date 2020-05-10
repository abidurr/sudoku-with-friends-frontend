import React from "react";
import * as store from "./store";
import Cell from "./components/Cell";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            puzzle: [],
            solution: [],
            guess: [],
        };
    }

    componentDidMount() {
        store.connectToServer(
            (board) => (document.getElementById("server").innerHTML = board)
        );
        store.createBoard();
        store.subscribeToUpdatedCells((cells) => {
            const puzz = cells.map(({ val }) => val);
            this.setState({ puzzle: puzz });
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
                        <Cell key={index} index={index} cellVal={val} />
                    ))}
                </form>
            </div>
        );
    }
}

export default App;
