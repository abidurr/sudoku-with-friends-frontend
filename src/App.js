import React from "react";
import * as store from "./store";
import Cell from "./components/Cell";
import Popup from "./components/Popup";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            puzzle: new Array(81),
            uneditable: new Array(81),
            verdict: false,
            time: 0,
            penalty: 0,
            showPopup: false,
        };
        this.countUp = this.countUp.bind(this);
        setInterval(this.countUp, 1000);
    }

    cycleCell = (index, delta) => () => {
        const val = this.state.puzzle[index];
        const row = Math.floor(index / 9);
        const col = index % 9;
        let newVal = val + delta;
        if (newVal < 0) newVal = 9;
        if (newVal > 9) newVal = 0;
        store.updateCell(row, col, newVal);
        console.log(row, col, newVal);
    };

    secondsToHms(d) {
        d = Number(d);
        const h = Math.floor(d / 3600);
        const m = Math.floor((d % 3600) / 60);
        const s = Math.floor((d % 3600) % 60);
        const hDisplay = h > 0 ? h + (h === 1 ? " hr " : " hrs ") : "";
        const mDisplay = m > 0 ? m + (m === 1 ? " min " : " mins ") : "";
        const sDisplay = s > 0 ? s + (s === 1 ? " sec" : " secs") : "";
        return hDisplay + mDisplay + sDisplay;
    }

    countUp() {
        this.setState(({ time }) => ({ time: time + 1 }));
    }

    componentDidMount() {
        store.connectToServer((board) => {
            document.getElementById("server").innerHTML = board;
            store.getStatus(board, (status) => {
                console.log(JSON.stringify(status, undefined, 4));
                let uneditable = new Array(81);
                status.uneditable.forEach(({ row, col }) => {
                    uneditable[row * 9 + col] = true;
                });
                this.setState({ 
                    uneditable,
                    time: status.time,
                    penalty: status.penalty,
                 });
            });
        });
        store.createBoard();
        store.subscribeToUpdatedCells((cells) => {
            const { puzzle } = this.state;
            cells.forEach(({ row, col, val }) => (puzzle[row * 9 + col] = val));
            this.setState({ puzzle });
        });
        store.subscribeToSubmissionResult((res) => {
            const { time, penalty, verdict } = res;
            this.setState({ showPopup: true, time, penalty, verdict });
        });
    }

    render() {
        const { verdict, penalty, time } = this.state;
        return (
            <div className="App">
                <h1>Sudoku With Friends</h1>
                <div id="info">
                    You are on board:
                    <div id="server"></div>
                    <input type="text" name="join-board" id="join-board" />
                    <button
                        id="join-button"
                        onClick={() => {
                            const boardName = document.getElementById(
                                "join-board"
                            ).value;
                            store.joinBoard(boardName);
                        }}
                    >
                        Join Board
                    </button>
                </div>
                <form id="sudoku-board">
                    {this.state.puzzle.map((val, index) => (
                        <Cell
                            key={index}
                            index={index}
                            cellVal={val}
                            uneditable={this.state.uneditable[index]}
                            cycleUp={this.cycleCell(index, 1)}
                            cycleDown={this.cycleCell(index, -1)}
                        />
                    ))}
                </form>
                <div id="check">
                    <div id="timer">
                        Timer:{" "}
                        {!this.state.time
                            ? "0"
                            : this.secondsToHms(this.state.time)}{" "}
                    </div>
                    <div id="penalty">Penalty: {this.state.penalty} </div>
                    <button
                        id="submit-board"
                        onClick={() => {
                            store.submitBoard();
                        }}
                    >
                        Submit Final Guess
                    </button>
                </div>

                <Popup
                    show={this.state.showPopup}
                    onPopupClose={() => this.setState({ showPopup: false })}
                    res={{ verdict, time, penalty }}
                />

                <div id="help">
                    <abbr
                        title="Send your friend(s) the ID of the board or join theirs.
                    Left or right click on a cell to cycle between numbers."
                    >
                        <i>Help?</i>
                    </abbr>
                </div>
            </div>
        );
    }
}

export default App;
