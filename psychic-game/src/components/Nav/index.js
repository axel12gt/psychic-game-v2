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

// the chosen word that may include spaces
let word;
// the word split into an array with a length depending on the amount of words
let word2;
// for displaying letters from underscore to the letter
let hidden = [];

class Nav extends React.Component {
  state = {
    yikes: true,
    score: 0,
    guesses: 10,
    choosen: []
  };

  handleInputChange = () => {};

  gameReset = () => {
    this.setState({ guesses: 10 });
    hidden = [];
    this.setState({ choosen: [] });
    console.log(this.state.choosen + " | " + hidden);
    // maybe optional logic to give the user a choice (LOL) about resetting the game
    this.setState({ yikes: true });
  };

  wordChooser = () => {
    return data.dogs.names[Math.floor(Math.random() * data.dogs.names.length)];
  };

  keypress = e => {
    if (this.state.yikes) {
      word = this.wordChooser();
      console.log(word);
      word2 = word.split(" ");
      for (let i = 0; i < word2.length; i++) {
        for (let y = 0; y < word2[i].length; y++) {
          hidden.push("_");
        }
        hidden.push(" ");
      }
    }
    // prevents the first key pushed from being counted
    if (!this.state.yikes) {
      // regex check is there for \s check because some words have spaces and checks if guesses > 0
      if (
        regex.includes(e.key) &&
        this.state.guesses > 0 &&
        hidden.includes("_")
      ) {
        // checks if word has the letter as well as the letter isn't already guessed
        if (word.includes(e.key) && !this.state.choosen.includes(e.key)) {
          // this for loop goes through the hidden array and checks how many letters match and where they go
          for (let i = 0; i < word.length; i++) {
            if (word[i] === e.key) {
              hidden[i] = e.key;
            }
          }
        } else if (this.state.choosen.includes(e.key)) {
          console.log("Please select another letter");
        } else if (!word.includes(e.key)) {
          this.setState({ guesses: this.state.guesses - 1 });
        }
        console.log(
          "word: " + hidden + "\nguesses: " + this.state.guesses,
          "\nchoosen: " + this.state.choosen,
          "\nscore: " + this.state.score
        );
        this.handleInputChange();
      }
      // runs checks for guesses and "_" everytime to see if they lost or won
      if (this.state.guesses === 0) {
        console.log("you lose");
        return this.gameReset();
      } else if (!hidden.includes("_")) {
        console.log("you win");
        this.setState({ score: this.state.score + 1 });
        return this.gameReset();
      }
      // if choosen array doesn't already have the key it pushes it to the array to prevent duplicates
      if (!this.state.choosen.includes(e.key)) {
        this.state.choosen.push(e.key);
      }
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
