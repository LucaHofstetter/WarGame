import React from "react";

export class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: ""
    };
  }

  name: string = this.state.playerName;
  deck: any[] = [];

  getName(event) {
    this.setState({
      playerName: event.target.value
    });
  }

  render() {
    return (
      <div className="player-registration">
        <label>Player</label>
        <input
          value={this.state.playerName}
          onChange={(event) => this.getName(event)}
        />
      </div>
    );
  }
}
