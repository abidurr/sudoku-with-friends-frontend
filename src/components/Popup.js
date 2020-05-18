import React from "react";
import TickLogo from "../img/tick.png";
import CrossLogo from "../img/cross.png";

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

export default function Popup({ show, onPopupClose, res }) {
    if (show === true) {
        let msg = "";
        let finishTimeDisplay = secondsToHms(res.finishTime);
        if (res.verdict === true) {
            msg = `Congrats! You finished the puzzle in ${finishTimeDisplay}.`;
        } else {
            msg = "Your guess is wrong!";
        }
        const logo = <img alt="" src={res.verdict ? TickLogo : CrossLogo} />;
        return (
            <div class="popup">
                {logo}
                <p>{msg}</p>
                <button
                    onClick={() => {
                        onPopupClose();
                    }}
                >
                    Okay
                </button>
            </div>
        );
    } else {
        return null;
    }
}
