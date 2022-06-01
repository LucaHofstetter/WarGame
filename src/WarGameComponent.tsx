import React from "react";

import { PlayerComponent } from "./PlayerComponent";
import { StatusComponent } from "./StatusComponent";
import { ButtonComponent } from "./ButtonComponent";
var GameStatus = {
  NOTSTARTED: 0,
  FINISHED: 1,
  INPROGRESS: 2
};
var Suits = ["hearts", "diamonds", "clubs", "spades"];
var Cards: any = [];
for (var i = 2; i < 15; i++) {
  for (var j = 0; j < Suits.length; j++) {
    Cards.push(i + "_of_" + Suits[j]);
  }
}

export default class WarGameComponent extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      playerADeck: null,
      playerBDeck: null,
      playerACurrentCard: null,
      playerBCurrentCard: null,
      status: GameStatus.NOTSTARTED,
      currentWinner: null,
      currentWasWar: null,
      currentCardsWon: null
    };
  }

  clickHandler = () => {
    switch (this.state.status) {
      case GameStatus.NOTSTARTED:
        this.startGame();
        break;
      case GameStatus.INPROGRESS:
        this.stepForward();
        break;
      case GameStatus.FINISHED:
        this.startGame();
    }
  };

  startGame = () => {
    // get our own copy of the Cards array
    var cardArray = Cards.slice();

    // shuffle the cards
    var currentIndex = cardArray.length;
    var tempValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      tempValue = cardArray[currentIndex];
      cardArray[currentIndex] = cardArray[randomIndex];
      cardArray[randomIndex] = tempValue;
    }

    // give each player half and update the game status
    this.setState({
      playerADeck: cardArray.slice(0, 26),
      playerBDeck: cardArray.slice(26),
      status: GameStatus.INPROGRESS,
      currentWinner: null,
      currentWasWar: null,
      currentCardsWon: null
    });
  };

  stepForward = () => {
    // step the state forward
    var spoils = [];

    var aDeck = this.state.playerADeck;
    var bDeck = this.state.playerBDeck;
    var complete = false;
    var nextStatus = GameStatus.INPROGRESS;
    var isWar = false;
    console.log(this.state.playerADeck);

    // cycle until there isn't a match
    while (!complete) {
      var aCard = aDeck.shift();
      var bCard = bDeck.shift();
      var winner;
      spoils.push(aCard, bCard);
      var caVal = parseInt(aCard.split("_")[0], 16);
      var cbVal = parseInt(bCard.split("_")[0], 16);

      if (caVal === cbVal) {
        // WAR!
        isWar = true;
        if (aDeck.length < 2) {
          winner = "B";
          nextStatus = GameStatus.FINISHED;
          complete = true;
        } else if (bDeck.length < 2) {
          winner = "A";
          nextStatus = GameStatus.FINISHED;
          complete = true;
        } else {
          // hidden card
          spoils.push(aDeck.shift(), bDeck.shift());
          aCard = aDeck.shift();
          bCard = bDeck.shift();
          spoils.push(aCard, bCard);
          caVal = parseInt(aCard.split("_")[0], 16);
          cbVal = parseInt(bCard.split("_")[0], 16);
          if (caVal !== cbVal) {
            complete = true;
            if (caVal > cbVal) {
              winner = "A";
              aDeck.push.apply(aDeck, spoils);
            } else {
              winner = "B";
              bDeck.push.apply(bDeck, spoils);
            }
          }
        }
      } else {
        complete = true;
        if (caVal > cbVal) {
          winner = "A";
          aDeck.push.apply(aDeck, spoils);
        } else {
          winner = "B";
          bDeck.push.apply(bDeck, spoils);
        }
      }
    }
    if (!aDeck.length || !bDeck.length) {
      nextStatus = GameStatus.FINISHED;
    }
    this.setState({
      status: nextStatus,
      currentWinner: winner,
      currentWasWar: isWar,
      currentCardsWon: spoils.length,
      playerACurrentCard: aCard,
      playerBCurrentCard: bCard,
      playerADeck: aDeck,
      playerBDeck: bDeck
    });
  };
  render() {
    var text_options = ["Start Game", "Play Again", "Next Round"];
    var button_text = text_options[this.state.status];

    return (
      <div>
        <div id="war_game_component">
          <PlayerComponent
            cardCount={
              this.state.playerADeck ? this.state.playerADeck.length : 26
            }
            currentCard={this.state.playerACurrentCard}
            player="Player A"
          />

          <StatusComponent
            currentWinner={this.state.currentWinner}
            wasWar={this.state.currentWasWar}
            cardsWon={this.state.currentCardsWon}
            status={this.state.status}
          />

          <button onClick={this.clickHandler}>{button_text}</button>

          <PlayerComponent
            cardCount={
              this.state.playerBDeck ? this.state.playerBDeck.length : 26
            }
            currentCard={this.state.playerBCurrentCard}
            player="Player B"
          />
        </div>
      </div>
    );
  }
}
