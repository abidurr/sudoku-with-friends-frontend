import React from 'react';
import * as store from './store';
import Cell from './components/Cell';
import Popup from './components/Popup';
import { secondsToHms, copyToClipboard } from './utils';
import cellChangeSound from './sfx/change_cell.mp3';
function getShareLink(boardName) {
    return window.location.origin + '/' + boardName;
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.audioRef = null;
        this.state = {
            boardName: '',
            puzzle: new Array(81),
            uneditable: new Array(81),
            verdict: false,
            time: 0,
            penalty: 0,
            finishTime: -1,
            showPopup: false,
        };
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
    };

    countUp = () => {
        this.setState(({ time }) => ({ time: time + 1 }));
    };

    joinedBoardHandler = board => {
        store.getStatus(board, status => {
            let uneditable = new Array(81);
            status.uneditable.forEach(({ row, col }) => {
                uneditable[row * 9 + col] = true;
            });
            this.setState({
                uneditable,
                time: status.time,
                penalty: status.penalty,
                finishTime: status.finishTime,
            });
        });
        this.setState({ boardName: board });
    };

    playCellChangedSound() {
        if (!this.audioRef.paused) {
            this.audioRef.currentTime = 0;
        } else {
            this.audioRef.play();
        }
    }

    updatedCellsHandler = cells => {
        this.playCellChangedSound();
        const { puzzle } = this.state;
        cells.forEach(({ row, col, val }) => (puzzle[row * 9 + col] = val));
        this.setState({ puzzle });
    };

    submissionResultHandler = res => {
        const { time, penalty, verdict, finishTime } = res;
        this.setState({
            showPopup: true,
            time,
            penalty,
            verdict,
            finishTime,
        });
    };

    componentDidMount() {
        store.subscribeToJoinedBoard(this.joinedBoardHandler);
        store.subscribeToUpdatedCells(this.updatedCellsHandler);
        store.subscribeToSubmissionResult(this.submissionResultHandler);
        store.subscribeToErrorOccurred(alert);
        store.connectToServer();

        const boardName = window.location.pathname.substr(1);
        if (boardName === '') {
            store.createBoard();
        } else {
            store.subscribeToErrorOccurred(err => {
                alert(err + "\nYou'll play in a new board.");
                window.location.replace(window.location.origin);
            });
            store.subscribeToJoinedBoard(board => {
                store.subscribeToErrorOccurred(alert);
                this.joinedBoardHandler(board);
            });
            store.joinBoard(boardName);
        }
    }

    render() {
        const { boardName, verdict, penalty, time, finishTime } = this.state;
        return (
            <div className="App">
                <h1>Sudoku With Friends</h1>
                <div id="info">
                    Share this link with friends to play together:
                    <div id="server">{getShareLink(boardName)}</div>
                    <button
                        id="copy-button"
                        onClick={() => {
                            copyToClipboard(getShareLink(boardName));
                        }}
                    >
                        Copy Link
                    </button>
                </div>
                <div id="grid-container">
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
                </div>
                <div id="check">
                    <div id="timer">
                        Timer: {!time ? '0' : secondsToHms(time)}
                    </div>
                    <div id="penalty">Penalty: {penalty} </div>
                    <div id="finish-time">
                        Finish:{' '}
                        {finishTime >= 0 ? secondsToHms(finishTime) : 'No'}{' '}
                    </div>
                    <button id="submit-board" onClick={store.submitBoard}>
                        Submit Guess
                    </button>
                </div>
                <div id="help">
                    <abbr
                        title="Copy and share the link above with friends and play on the same board to finish the puzzle quicker.
                    Left or right click on a cell to cycle between numbers."
                    >
                        <i>Help?</i>
                    </abbr>
                </div>

                <Popup
                    show={this.state.showPopup}
                    onPopupClose={() => this.setState({ showPopup: false })}
                    res={{ verdict, penalty, finishTime }}
                />

                <audio
                    ref={elem => (this.audioRef = elem)}
                    src={cellChangeSound}
                    style={{ display: 'none' }}
                />
            </div>
        );
    }
}

export default App;
