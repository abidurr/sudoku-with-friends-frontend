import React from "react";

export default function Popup({show, onPopupClose, res}) {
    if (show === true) {
        return (
            <div class="popup">
                <p>{JSON.stringify(res)}</p>
                <button onClick={() => {onPopupClose()}}>
                    X
                </button>
            </div>
        )
    } else {
        return null;
    }
}
