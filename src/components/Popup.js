import React from "react";

export default function Popup({show, onPopupClose, res}) {
    if (show === true) {
        let msg = "";
        if (res.verdict === true) {
            msg = `Congrats! You finished the puzzle.`;
        } else {
            msg = "Your final guess is wrong!";
        }
        return (
            <div class="popup">
                <p>{msg} <button onClick={() => {onPopupClose()}}>
                    Okay
                </button> </p>
                
            </div>
        )
    } else {
        return null;
    }
}
