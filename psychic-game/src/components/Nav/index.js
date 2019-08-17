import React from "react";
import GetStarted from "../GetStarted";
import InGame from "../InGame";
import "./style.css";

const data = require("../../utils/words.json");
const regex = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m"
];

let word;
let word2;
let hidden = [];

class Nav extends React.Component {
  state = {
    yikes: true,
    score: 0,
    guesses: 10
  };

  handleInputChange = () => {};

  wordChooser = () => {
    return data.dogs.names[Math.floor(Math.random() * data.dogs.names.length)];
  };

  keypress = e => {
    if (this.state.yikes) {
      word = this.wordChooser();
      console.log(word);
      word2 = word.split(" ");
      console.log(word2);
      for (let i = 0; i < word2.length; i++) {
        for (let y = 0; y < word2[i].length; y++) {
          hidden.push("_");
        }
        hidden.push(" ");
      }
    }
    // regex check is there for \s check because some words have spaces
    if (regex.includes(e.key)) {
      if (word.includes(e.key)) {
        // this for loop goes through the hidden array and checks how many letters match and where they go
        for (let i = 0; i < word.length; i++) {
          if (word[i] === e.key) {
            hidden[i] = e.key;
          }
        }
      }
      console.log(hidden);
      this.handleInputChange();
    }
    this.setState({ yikes: false });
  };

  componentDidMount() {
    document.addEventListener("keydown", this.keypress, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keypress, false);
  }

  render() {
    return (
      <div className="topbar">
        {this.state.yikes === true ? (
          <GetStarted />
        ) : (
          <InGame score={this.state.score} />
        )}
      </div>
    );
  }
}

export default Nav;
