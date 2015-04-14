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
		document.getElementById('userscore' + this.curHand).innerHTML =
			"User has: " + allPlayers.getPlayer(1).score().toString();

		for(var i = 1; i <= this.numOfUserHands; ++i) {
			document.getElementById('userscore' + i).innerHTML =
			"User has: " + allPlayers.getPlayer(i).score().toString();
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
			allPlayers.getPlayer(this.curHand).addCard(dealtCard);
			// allPlayers.getPlayer(this.curHand).printHand(0);
			this.updateUI();
			if (allPlayers.getPlayer(this.curHand).score() > 21) this.stayThere();
		}
	}
	stayThere(){
		if (this.curHand < this.numOfUserHands) {
			this.deactivate(document.getElementById('hitButton_' + this.curHand));
			this.deactivate(document.getElementById('stayButton_' + this.curHand));
			++this.curHand;
		} else if (this.stayButton.className == "btn active"){
			this.endGame();
		} else {
			alert("somethings wrong");
		}
	}
	newGame(){
		this.curHand = 1;
		this.numOfUserHands = 1;
		deck = new Deck();
		allPlayers = new PlayerContainer();



		document.getElementById('usercards').innerHTML = "";

		this.insertNewHand(this.curHand);
		allPlayers.addPlayer('user' + this.numOfUserHands);
		allPlayers.firstDeal(deck);
		
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

		this.deactivate(document.getElementById('hitButton_' + this.curHand));
		this.deactivate(document.getElementById('stayButton_' + this.curHand));
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
		++this.numOfUserHands;
		var newCard : Card = allPlayers.getPlayer(this.curHand).stealCard();
		allPlayers.addPlayer('user' + this.numOfUserHands);
		allPlayers.getPlayer(this.numOfUserHands).addCard(newCard);
		game.bank.bet();
		this.insertNewHand(this.numOfUserHands);
		this.updateUI();
	}

	insertNewHand(id: number) {
		var newHandWrapper: HTMLElement = document.createElement('div');
		newHandWrapper.setAttribute('id', 'handWrapper_' + id);
		newHandWrapper.setAttribute('class', 'handWrapperClass');
		document.getElementById('usercards').appendChild(newHandWrapper);
		var newUserScore: HTMLElement = document.createElement('p');
		newUserScore.setAttribute('id', 'userscore' + id);
		newHandWrapper.appendChild(newUserScore);
		this.usercards[id] = document.createElement('span');
		this.usercards[id].setAttribute('id', 'hand_' + id);
		this.usercards[id].innerHTML = "";
		newHandWrapper.appendChild(this.usercards[id]);
		var buttonWrapper: HTMLElement = document.createElement('div');
		buttonWrapper.setAttribute('id', 'buttonWrapper_' + id);
		buttonWrapper.setAttribute('class', 'playerButtons');
		newHandWrapper.appendChild(buttonWrapper);
		var hitButton: HTMLElement = document.createElement('button');
		hitButton.setAttribute('id', 'hitButton_' + id);
		hitButton.setAttribute('onclick', 'game.hitThat();');
		hitButton.setAttribute('class', 'btn active');
		hitButton.innerHTML = "Hit";
		var stayButton: HTMLElement = document.createElement('button');
		stayButton.setAttribute('id', 'stayButton_' + id);
		stayButton.setAttribute('onclick', 'game.stayThere();');
		stayButton.setAttribute('class', 'btn active');
		stayButton.innerHTML = "Stay";
		buttonWrapper.appendChild(hitButton);
		buttonWrapper.appendChild(stayButton);
	}
}
