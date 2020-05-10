import React from 'react'

export default function Test({val, onClick}) {
    alert("Hello");
    return (
        <div onClick={onClick}>
            hi: {val}
        </div>
    )
}
