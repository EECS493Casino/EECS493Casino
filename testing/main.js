  var deck;
  var Vals = {
    1 : 'ace',
    2 : 2,
    3 : 3,
    4 : 4,
    5 : 5,
    6 : 6,
    7 : 7,
    8 : 8,
    9 : 9,
    10 : 10,
    11 : 'jack',
    12 : 'queen',
    13 : 'king'
  }

  var Suits = {
     0 : 'hearts',
     1 : 'spades',
     2 : 'clubs',
     3 : 'diamonds'

  }

  var Card = function(val, suit) {
    this.val = val;
    this.suit = suit;
  }

  Card.prototype.getCardImgPath = function() {
    return "images/" + Vals[this.val] + "_of_" + Suits[this.suit] + ".png";
  }

  var Deck = function(numOfDecks) {
    this.index = 0;
    this.cards = [];
    for(var i = 0; i < numOfDecks; ++i) {
      for(var j = i * 52; j < (i * 52) + 52; ++j) {
        this.cards[j] = new Card((j % 13) + 1, Math.floor((j - (i * 52)) / 13));
      }
    }
  }

  Deck.prototype.printAll = function () {
    this.cards.forEach(function(card) {
      console.log(Vals[card.val] + " " + Suits[card.suit]);
    });
  }

  Deck.prototype.shuffle = function () {
    //Should probably implement a better shuffle function
    for(var i = 0; i < this.cards.length; ++i) {
      var j = Math.floor(Math.random() * this.cards.length);
      var temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  Deck.prototype.getNextCard = function () {
    if (this.index < this.cards.length) {
      return this.cards[this.index++].getCardImgPath();
    } else {
      alert("End of deck!");
      return null;
    }
  }

  function generateAndShuffleDeck() {
    deck = new Deck($("#num_deck").val());
    deck.shuffle();
  }

  function deal() {
    if (!deck) {
      alert("You must select number of decks and press shuffle to generate a new deck before dealing.");
      return
    }

    var numOfCardsPerHand = 2;
    for(var i = 0; i < numOfCardsPerHand; ++i) {
      var dealerCardPath = deck.getNextCard();
      if (!dealerCardPath)
        return;
      $("#dealer_hand").append(getCardHtmlMarkUp("dealer", i, dealerCardPath));
      var playerCardPath = deck.getNextCard();
      if (!playerCardPath)
        return;
      $("#player_hand").append(getCardHtmlMarkUp("dealer", i, playerCardPath));
    }
  }

  function getCardHtmlMarkUp(player, index, imgPath) {
    //I imagine this will get more complex when we need to overlap the image with the back of a card
    return '<img src="' + imgPath + '" class="card">';
  }

  function reset() {
    deck = null;
    $("#dealer_hand").html('');
    $("#player_hand").html('');
  }
  
