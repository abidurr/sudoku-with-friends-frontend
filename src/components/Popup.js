import React from "react";

export default function Popup({show, onPopupClose, res}) {
    if (show === true) {
        let msg = "";
        let time = res.time;
        console.log(msg, time);
        if (res.verdict === true) {
            msg = "Congrats! You finished the puzzle.";
        } else {
            msg = "Your final guess is wrong!";
        }
        return (
            <div class="popup">
                <p>{msg} </p> 
                <button onClick={() => {onPopupClose()}}>
                    Okay
                </button> 
                
            </div>
        )
    } else {
        return null;
    }
}
