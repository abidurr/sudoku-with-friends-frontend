import React from "react";

function secondsToHms(d) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);
    const hDisplay = h > 0 ? h + (h === 1 ? " hr " : " hrs ") : "";
    const mDisplay = m > 0 ? m + (m === 1 ? " min " : " mins ") : "";
    const sDisplay = s > 0 ? s + (s === 1 ? " sec" : " secs") : "";
    return hDisplay + mDisplay + sDisplay;
}

export default function Popup({show, onPopupClose, res}) {
    if (show === true) {
        let msg = "";
        let time = secondsToHms(res.finishTime);
        console.log(`Finish time is ${res.finishTime}`);
        console.log(msg, time);
        if (res.verdict === true) {
            msg = `Congrats! You finished the puzzle in ${time}.`;
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
