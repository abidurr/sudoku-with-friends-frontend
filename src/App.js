import React from "react";
import * as store from "./store";
import Cell from "./components/Cell";
import Test from "./Test"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            puzzle: [],
            solution: [],
            guess: [],
            globalVal: 10,
        };
    }

    componentDidMount() {
        alert("called");
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
                <Test val={this.state.globalVal} onClick={() => this.setState({globalVal: this.state.globalVal + 1})} />
                <h1>Sudoku With Friends</h1>
                <div id="info">
                    You are on board:
                    <div id="server"></div>
                </div>
                <form>
                    {this.state.puzzle.map((cell, index) => (
                        <Cell key={index} index={index} cellVal={cell} />
                    ))}
                </form>
            </div>
        );
    }
}

export default App;
