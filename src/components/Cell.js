import React from 'react'

function handleInputClick(cellVal, index) {
    let newVal = parseInt(document.getElementById(`txtbx${index}`).value) + 1;
    if (newVal === 10) {
        newVal = 1;
    }
    document.getElementById(`txtbx${index}`).value = newVal;
}

export default function Cell({ cellVal, index }) {
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

