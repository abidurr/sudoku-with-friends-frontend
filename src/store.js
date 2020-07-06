import axios from 'axios';
import io from 'socket.io-client';
const BASE_URL = 'http://localhost:3000';
// TODO: comment above line and uncomment below line for dev and test on local machine
// const BASE_URL = 'https://wedoku.herokuapp.com';

let socket = undefined;

let joinedBoard = undefined;
let updatedCells = undefined;
let submissionResult = undefined;
let errorOccurred = undefined;

export function connectToServer() {
    socket = io.connect(BASE_URL);

    socket.on('connect', function (data) {
        console.log('Connected to server!');
    });

    socket.on('joinedBoard', channelName => {
        if (typeof joinedBoard === 'function') {
            joinedBoard(channelName);
        }
    });

    socket.on('updatedCells', cells => {
        if (typeof updatedCells === 'function') {
            updatedCells(cells);
        }
    });

    socket.on('submissionResult', res => {
        if (typeof submissionResult === 'function') {
            submissionResult(res);
        }
    });

    socket.on('errorOccurred', err => {
        if (typeof errorOccurred === 'function') {
            errorOccurred(err);
        }
    });
}

export function createBoard() {
    socket.emit('createBoard');
}

export function joinBoard(channel) {
    socket.emit('joinBoard', channel);
}

export function updateCell(row, col, val) {
    socket.emit('updateCell', { row, col, val });
}

export function submitBoard() {
    socket.emit('submitBoard');
}

export function subscribeToJoinedBoard(fn) {
    joinedBoard = fn;
}

export function subscribeToUpdatedCells(fn) {
    updatedCells = fn;
}

export function subscribeToSubmissionResult(fn) {
    submissionResult = fn;
}

export function subscribeToErrorOccurred(fn) {
    errorOccurred = fn;
}

export function getStatus(boardName, fn) {
    axios
        .get(`${BASE_URL}/status/${boardName}`)
        .then(res => fn(res.data))
        .catch(err => alert(err));
}
