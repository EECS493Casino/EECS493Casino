/// <reference path='./deck.ts'/>
/// <reference path='./player.ts'/>
/// <reference path="./gameSettings.ts"/>
/// <reference path="./jquery.d.ts"/>

var settings = new gameSettings(false, 'cheatToggle');
var deck = new Deck();
var allPlayers = new PlayerContainer();

// basic starting case
allPlayers.addPlayer('user');
allPlayers.firstDeal(deck);
//allPlayers.printAll();

// The UI comes last as it actually uses the above code
/// <reference path='./ui.ts'/>
