import React from "react"
import "./style.css"

function InGame (props) {
    return (
        <p>
            Having fun yet? | Score: {props.score}
        </p>
    )
}

export default InGame;