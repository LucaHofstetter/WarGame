import React from "react";

export class PlayerComponent extends React.Component {
  render() {
    var backCard = "/public/images/cards/back.svg";
    var svgFilename = "back.svg";
    function cardImagePath(key) {
      if (key) {
        console.log(key);
        svgFilename = key + ".svg";
      }
      return "/public/images/cards/" + svgFilename;
    }
    var cardCount = this.props.cardCount;
    var currentCard = this.props.currentCard;

    return (
      <div className="player-component">
        <div className="player-component__card-stack">
          <img className="player-component__back-card" alt="" src={backCard} />
          <img
            className="player-component__card"
            alt={svgFilename}
            src={cardImagePath(currentCard)}
          />
        </div>

        <div className="player-component__card-amount">{cardCount}</div>
      </div>
    );
  }
}
