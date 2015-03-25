/// <reference path='./deck.ts'/>
/// <reference path='./player.ts'/>
/// <reference path='./ui.ts'/>

var deck = new Deck();
var allPlayers = new PlayerContainer();

// basic starting case
allPlayers.addPlayer('user');
allPlayers.firstDeal(deck);
allPlayers.printAll();
