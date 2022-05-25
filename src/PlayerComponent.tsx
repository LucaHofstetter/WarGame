import React from "react";

export class PlayerComponent extends React.Component {
  render() {
    function cardImagePath(key) {
      var svgFilename = "back.svg";
      if (key) {
        svgFilename = key.replace("_", "") + ".svg";
      }
      return "/public/images/cards/" + svgFilename;
    }
    var cardCount = this.props.cardCount;
    var currentCard = this.props.currentCard;
    var count = "";
    if (cardCount) {
      var c = cardCount === 1 ? "card" : "cards";
      count = (
        <p>
          {cardCount} {c} remaining
        </p>
      );
    }
    return (
      <div>
        <p>
          <img width="100%" alt="" src={cardImagePath(currentCard)} />
        </p>
        {count}
      </div>
    );
  }
}
