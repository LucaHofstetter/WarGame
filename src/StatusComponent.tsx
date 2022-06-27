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
    var className = "";
    className = "game-status ";
    if (status === GameStatus.NOTSTARTED || winner === null) {
      text = "";
      className = "noStart";
    } else if (status === GameStatus.FINISHED) {
      text = "Player " + winner + " won the game!";
      className = "end";
    } else {
      if (war) {
        text += "WAR! ";
        className = "war";
      }
      text += "Player " + winner + " won " + spoils + " cards.";
    }
    return (
      <div className={className}>
        <div className="game-status__message">{text}</div>
      </div>
    );
  }
}
