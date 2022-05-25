import React from "react";
import { Card } from "./Card";
import { Player } from "./Player";

function shuffleCardDeck(a: any[]) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function createCardDeck() {
  const deck = [];
  const deckSize = 52;
  const suitSize = deckSize / 4;
  const suits = ["Hearts", "Spades", "Diamonds", "Clubs"];

  // CREATE AND ADD ALL CARDS TO CARD DECK
  for (let i = 0; i < suitSize; i++) {
    for (let y = 0; y < suits.length; y++) {
      const card: any = new Card(suits[y], i);
      deck.push(card);
    }
  }

  // CHECK IF DECK HAS CREATED ALL CARDS
  if (deck.length - 1 === deckSize) {
    const shuffledDeck = shuffleCardDeck([...deck]);

    // CREATE PLAYERS
    const player1: any = new Player(null);
    const player2: any = new Player(null);

    // GIVE PLAYERS THEIR CARD DECK
    player1.deck = shuffledDeck.slice(0, Math.ceil(shuffledDeck.length) / 2);
    player2.deck = shuffledDeck.slice(-Math.ceil(shuffledDeck.length));
  }
}

export default class CardDeck extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      card: {
        name: "",
        suit: "",
        value: Number
      }
    };
  }

  render() {
    return (
      <div className="card-deck">
        <div className=""></div>
      </div>
    );
  }
}
