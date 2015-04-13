/// <reference path='./deck.ts'/>
/// <reference path='./player.ts'/>
/// <reference path="./gameSettings.ts"/>
/// <reference path="./jquery.d.ts"/>
/// <reference path="./blackjack.ts"/>

var settings = new gameSettings(false, 'cheatToggle');
var deck = new Deck();
var allPlayers = new PlayerContainer();

// basic starting case
allPlayers.addPlayer('user');
allPlayers.firstDeal(deck);
//allPlayers.printAll();

var game = new BlackJack(new Bank(100, 1000, $('#bankRoll'), $('#wager'), $('#wager-slider')));