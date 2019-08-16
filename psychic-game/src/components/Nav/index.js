import React from "react";
import GetStarted from "../GetStarted";
import InGame from "../InGame";
import "./style.css";

class Nav extends React.Component {
  state = {
    yikes: true
  };

  handleInputChange = () => {

  };

  keypress = e => {
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
    if (regex.includes(e.key)) {
      console.log(e.key);
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
        {this.state.yikes === true ? <GetStarted /> : <InGame />}
      </div>
    );
  }
}

export default Nav;
