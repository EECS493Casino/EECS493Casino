//stuff

/// <reference path="./bank.ts"/>
declare function newGame();

class BlackJack{
	hitButton: HTMLElement;
	stayButton: HTMLElement;
	dealercards: HTMLElement;
	usercards: HTMLElement[] = [];
	deckHolder: HTMLElement;
	newGameButton: HTMLElement;
	bank: Bank;
	numOfUserHands: number;
	curHand: number;

	constructor(bank: Bank){
		this.hitButton = document.getElementById('hitButton');
		// button work
		this.activate(this.hitButton);
		this.hitButton.addEventListener('click', (event): void=>{
			this.hitThat();
		});
		this.stayButton = document.getElementById('stayButton');
		this.activate(this.stayButton);
		this.stayButton.addEventListener('click', (event): void=>{
			this.stayThere();
		});
		this.newGameButton = document.getElementById('startGame');
		this.bank = bank;
		this.curHand = 1;
		this.numOfUserHands = 1;
	}
	activate(element: HTMLElement){
		element.className = "btn active";
	}
	deactivate(element: HTMLElement){
		element.className = "btn disabled";
	}
	updateUI(){
		document.getElementById('dealerscore').innerHTML =
			"Dealer has: " + allPlayers.getPlayer(0).score().toString();
		this.dealercards = document.getElementById('dealercards');
		this.dealercards.innerHTML = "";
		allPlayers.getPlayer(0).draw(this.dealercards);
		document.getElementById('userscore').innerHTML =
			"User has: " + allPlayers.getPlayer(1).score().toString();

		for(var i = 1; i <= this.numOfUserHands; ++i) {
			this.usercards[i].innerHTML = "";
			allPlayers.getPlayer(i).draw(this.usercards[i]);
		}
		
		this.deckHolder = document.getElementById('DeckHolder');
		this.deckHolder.innerHTML = "";
		deck.topCard().setHidden(true);
		deck.topCard().draw(this.deckHolder);
	}
	hitThat(){
		if (this.hitButton.className == "btn active"){
			var dealtCard: Card = deck.deal();
			dealtCard.setHidden(false);
			allPlayers.getPlayer(1).addCard(dealtCard);
			// allPlayers.getPlayer(1).printHand(0);
			this.updateUI();
			if (allPlayers.getPlayer(1).score() > 21) this.endGame();
		}
	}
	stayThere(){
		if (this.stayButton.className == "btn active"){
			this.endGame();
		}
	}
	newGame(){
		this.curHand = 1;
		this.numOfUserHands = 1;
		deck = new Deck();
		allPlayers = new PlayerContainer();

		allPlayers.addPlayer('user' + this.numOfUserHands);
		allPlayers.firstDeal(deck);

		document.getElementById('usercards').innerHTML = "";
		this.usercards[this.curHand] = document.createElement('span');
		this.usercards[this.curHand].setAttribute('id', 'hand_' + this.numOfUserHands);
		this.usercards[this.curHand].innerHTML = "";
		document.getElementById('usercards').appendChild(this.usercards[this.curHand]);

		this.updateUI();
		this.activate(this.hitButton);
		this.activate(this.stayButton);
		document.getElementById('output').innerHTML = "";
		
		this.bank.bet();
		this.disable();

	}
	endGame(){
		var win:boolean;
		win = true;

		this.deactivate(this.hitButton);
		this.deactivate(this.stayButton);
		allPlayers.getPlayer(0).revealAllCards();
		this.updateUI();
		var outputtext: string = "";
		if (allPlayers.getPlayer(1).score() > 21) {
			win = false;
			outputtext = "you bust";
		} else {
			while (allPlayers.getPlayer(0).score() < 15 &&
					allPlayers.getPlayer(0).score() <
					allPlayers.getPlayer(1).score()){
				var dealtCard: Card = deck.deal();
				dealtCard.setHidden(false);
				allPlayers.getPlayer(0).addCard(dealtCard);
			}
			this.updateUI();
			if (allPlayers.getPlayer(0).score() > 21) {
				outputtext = "dealer busts, you win";
			} else if (allPlayers.getPlayer(1).hand.length > 4) {
				outputtext = "My but what a large hand you have, you win.";
			} else {
				if (allPlayers.getPlayer(0).score() >=
					allPlayers.getPlayer(1).score()) {
					win = false;
					outputtext = "dealer wins";
				} else {
					outputtext = "you win!";
				}
			}
		}
		if (win)
			this.bank.win(1);
		document.getElementById("output").innerHTML =
			"<p>" + outputtext + "</p>";

		this.enable();
		document.getElementById('buttonholder').style.display = "none";
	}
	
	disable() {
		this.bank.disable();
		this.deactivate(this.newGameButton);
	}
	
	enable() {
		this.bank.enable();
		this.activate(this.newGameButton);
	}
	addPlayer() {
		this.curHand;
		++this.numOfUserHands;
		allPlayers.addPlayer('user' + this.numOfUserHands);
		var newCard : Card = allPlayers.getPlayer(1).stealCard();
		allPlayers.getPlayer(this.numOfUserHands).addCard(newCard);
		this.usercards[this.curHand + 1] = document.createElement('span');
		this.usercards[this.curHand + 1].setAttribute('id', 'hand_' + this.numOfUserHands);
		this.usercards[this.curHand + 1].innerHTML = "";
		document.getElementById('usercards').appendChild(this.usercards[this.curHand + 1]);
	}
}
