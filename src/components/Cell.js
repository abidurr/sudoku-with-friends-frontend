import React from 'react'
/** 
function handleInputClick(cellVal, index) {
        let newVal = parseInt(document.getElementById(`txtbx${index}`).value) + 1;
        if (newVal === 10) {
            newVal = 1;
        }
        document.getElementById(`txtbx${index}`).value = newVal;
}
**/

export default function Cell({ cellVal, uneditable, index, cycleUp, cycleDown, typeIn }) {
    if (uneditable) {
        return (
            <input
                value={cellVal}
                type="text"
                readOnly={true}
                id={`txtbx${index}`}
                style={{ background: "lightblue" }}
            />
        );
    } else {
        return (
            <input
                value={cellVal===0 ? "" : cellVal}
                style={{ background: "white"}}
                type="text"
                id={`txtbx${index}`}
                onClick={cycleUp}
                onContextMenu={(e) => { e.preventDefault(); cycleDown(); }}
                onChange={typeIn}
            />
        );
    }
}

