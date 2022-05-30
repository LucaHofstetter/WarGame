import React from "react";

export class ButtonComponent extends React.Component {
  render() {
    var text_options = ["Start Game", "Play Again", "Next Round"];
    var button_text = text_options[this.props.status];
    return <button onClick={this.clickHandler}>{button_text}</button>;
  }
}
