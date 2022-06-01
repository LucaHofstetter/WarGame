import React from "react";
import back from "/public/images/cards/back.svg";
export class PlayerComponent extends React.Component {
  render() {
    var svgFilename = "";
    function cardImagePath(key) {
      if (key) {
        svgFilename = key + ".svg";
      }
      console.log("/public/images/cards/" + svgFilename);
      return "/public/images/cards/" + svgFilename;
    }

    var cardCount = this.props.cardCount;
    var currentCard = this.props.currentCard;
    var player = this.props.player;

    return (
      <div className="player-component" data-player={player}>
        <div className="player-component__title">{player}</div>

        <div className="player-component__player-info">
          <div className="player-component__card-stack">
            <img className="player-component__back-card" alt="" src={back} />
            <img
              className="player-component__card"
              alt={svgFilename}
              src={cardImagePath(currentCard)}
            />
          </div>
          <div className="player-component__card-amount">{cardCount}</div>
        </div>
      </div>
    );
  }
}
