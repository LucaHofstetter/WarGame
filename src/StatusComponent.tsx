import React from "react";

export class StatusComponent extends React.Component {
  render() {
    var GameStatus = {
      NOTSTARTED: 0,
      FINISHED: 1,
      INPROGRESS: 2
    };
    var winner = this.props.currentWinner;
    var status = this.props.status;
    var spoils = this.props.cardsWon;
    var war = this.props.wasWar;
    var text = "";
    if (status === GameStatus.NOTSTARTED || winner === null) {
      text = "";
    } else if (status === GameStatus.FINISHED) {
      text = "Player " + winner + " won the game!";
    } else {
      if (war) {
        text += "WAR! ";
      }
      text += "Player " + winner + " won " + spoils + " cards.";
    }
    return <div>{text}</div>;
  }
}
