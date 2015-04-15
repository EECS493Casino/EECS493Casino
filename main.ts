/// <reference path='./deck.ts'/>
/// <reference path='./player.ts'/>
/// <reference path="./gameSettings.ts"/>
/// <reference path="./jquery.d.ts"/>
/// <reference path="./blackjack.ts"/>

declare var cheatsOn: boolean;

var settings = new gameSettings(cheatsOn, 'cheatToggle');
var deck = new Deck();
var allPlayers = new PlayerContainer();
allPlayers.addPlayer('user');
allPlayers.firstDeal(deck);
var game = new BlackJack(new Bank(100, 1000, $('#bankRoll'), $('#wager'), $('#wager-slider')));