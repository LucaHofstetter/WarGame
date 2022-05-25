import React from "react";

import { PlayerComponent } from "./PlayerComponent";
import { StatusComponent } from "./StatusComponent";
import { ButtonComponent } from "./ButtonComponent";
var GameStatus = {
  NOTSTARTED: 0,
  FINISHED: 1,
  INPROGRESS: 2
};
var Suits = ["H", "D", "C", "S"];
var Cards: any = [];
for (var i = 2; i < 15; i++) {
  for (var j = 0; j < Suits.length; j++) {
    Cards.push(i + "_" + Suits[j]);
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
  render() {
    function startGame() {
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
    }

    function stepForward() {
      // step the state forward
      var spoils = [];

      var aDeck = this.state.playerADeck;
      var bDeck = this.state.playerBDeck;
      var complete = false;
      var nextStatus = GameStatus.INPROGRESS;
      var isWar = false;

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
    }

    function clickHandler() {
      switch (this.state.status) {
        case GameStatus.NOTSTARTED:
          startGame();
          break;
        case GameStatus.INPROGRESS:
          stepForward();
          break;
        case GameStatus.FINISHED:
          startGame();
      }
    }

    return (
      <div id="war_game_component">
        <table>
          <tbody>
            <tr>
              <td width="33%" rowSpan="2" className="center-align">
                <PlayerComponent
                  cardCount={
                    this.state.playerADeck
                      ? this.state.playerADeck.length
                      : null
                  }
                  currentCard={this.state.playerACurrentCard}
                />
              </td>
              <td width="34%" height="50%" className="center-align">
                <ButtonComponent
                  onClick={this.state.clickHandler}
                  status={this.state.status}
                />
              </td>
              <td width="33%" rowSpan="2" className="center-align">
                <PlayerComponent
                  cardCount={
                    this.state.playerBDeck
                      ? this.state.playerBDeck.length
                      : null
                  }
                  currentCard={this.state.playerBCurrentCard}
                />
              </td>
            </tr>
            <tr>
              <td className="center-align">
                <StatusComponent
                  currentWinner={this.state.currentWinner}
                  wasWar={this.state.currentWasWar}
                  cardsWon={this.state.currentCardsWon}
                  status={this.state.status}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
