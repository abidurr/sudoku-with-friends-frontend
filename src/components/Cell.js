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

export default function Cell({ cellVal, index, cycleUp, cycleDown, typeIn }) {
    if (cellVal === 0) {
        return (
            <input
                defaultValue={""}
                type="text"
                //min={1}
                //max={9}
                id={`txtbx${index}`}
                onClick={cycleUp}
                onContextMenu={(e) => { e.preventDefault(); cycleDown(); }}
                onChange={typeIn}
            />
        );
    } else {
        return (
            <input
                value={cellVal}
                type="text"
                //readOnly={true}
                id={`txtbx${index}`}
                style={{ background: "lightblue" }}
                onClick={cycleUp}
                onContextMenu={(e) => { e.preventDefault(); cycleDown(); }}
                onChange={typeIn}
            />
        );
    }
}

