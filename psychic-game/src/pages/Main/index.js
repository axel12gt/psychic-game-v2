import React from "react";
import GetStarted from "../../components/GetStarted";
import InGame from "../../components/InGame";
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

class Main extends React.Component {
  state = {
    yikes: true,
    score: 0,
    guesses: 10,
    choosen: [],
    hiddenWord: [],
    word: "",
    win: true,
  };

  handleInputChange = () => {};

  hiddenFunc = hidden => {
    console.log(hidden);
    this.setState({ hiddenWord: [] });
    this.state.hiddenWord.push(hidden);
  };

  gameReset = () => {
    hidden = [];
    this.setState({ guesses: 10, choosen: [], hiddenWord: [] });
    // maybe optional logic to give the user a choice (LOL) about resetting the game
    this.setState({ yikes: true });
  };

  wordChooser = () => {
    return data.dogs.names[Math.floor(Math.random() * data.dogs.names.length)];
  };

  keypress = e => {
    if (this.state.yikes) {
      word = this.wordChooser();
      //resets word to null, I use this.state.word as a check for losing the game if the user doesn't guess the word
      //so I need to reset at the start of every game. THIS IS DUMB WAY TO DO IT TODO MAKE IT BETTER
      this.setState({ word: word });
      console.log(word);
      word2 = word.split(" ");
      for (let i = 0; i < word2.length; i++) {
        for (let y = 0; y < word2[i].length; y++) {
          hidden.push("_");
        }
        hidden.push(" ");
      }
      this.state.hiddenWord.push(hidden);
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
          this.hiddenFunc(hidden);
          console.log("hiddenWord: " + this.state.hiddenWord);
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
        // if choosen array doesn't already have the key it pushes it to the array to prevent duplicates
        if (!this.state.choosen.includes(e.key)) {
          this.state.choosen.push(e.key);
        }
      }
      // runs checks for guesses and "_" everytime to see if they lost or won
      if (this.state.guesses === 0) {
        this.setState({win: false})       
        return this.gameReset();
      } else if (!hidden.includes("_")) {
        console.log("you win");
        this.setState({ score: this.state.score + 1 });
        return this.gameReset();
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
/**
 * TODO
 * clear word
  */

  render() {
    return (
      <div className="App">
        <div className="topbar">
          {this.state.yikes && this.state.score === 0 ? (
            <GetStarted />
          ) : (
            <InGame score={this.state.score} />
          )}
        </div>
        <header className="App-header">
          <div id="box">
            {this.state.yikes === true && this.state.score === 0 ? (
              <div>
                <p>Press a key to play</p>
                {!this.state.win ? (
                  <div>
                    <p>
                      The correct word was <br /> {this.state.word}
                    </p>
                  </div>
                ) : (
                  this.state.word ?
                  <div>
                    <p>You won <br /> {this.state.word} </p>
                  </div> : <div />
                )}
              </div>
            ) : this.state.yikes === true ? (
              <div>
                <p>Press a key to play again</p>
                {!this.state.win ? (
                  <div>
                    <p>
                      The correct word was <br /> {this.state.word}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>You won <br /> {this.state.word} </p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <span>Go ahead guess a letter or something</span>
                <br />
                <span id="spacing">{this.state.hiddenWord}</span>
                <ul>
                  <li>
                    choosen letters : <span>{this.state.choosen}</span>
                  </li>
                  <li>guesses left : {this.state.guesses}</li>
                </ul>
              </div>
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default Main;
