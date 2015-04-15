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


		this.deckHolder = document.getElementById('DeckHolder');
		this.deckHolder.innerHTML = "";
		deck.topCard().setHidden(true);
		deck.topCard().draw(this.deckHolder);
		
		for(var i = 1; i <= this.numOfUserHands; ++i) {
			document.getElementById('userscore' + i).innerHTML =
			"User has: " + allPlayers.getPlayer(i).score().toString();
			this.usercards[i].innerHTML = "";
			allPlayers.getPlayer(i).draw(this.usercards[i]);
		}

		if (allPlayers.getPlayer(this.curHand).score() == 21 && allPlayers.getPlayer(this.curHand).hand.length == 2) {
			document.getElementById('userscore' + this.curHand).innerHTML = "Blackjack!";
			this.stayThere();
		}
	}
	hitThat(){
		if (this.hitButton.className == "btn active"){
			var dealtCard: Card = deck.deal();
			dealtCard.setHidden(false);
			allPlayers.getPlayer(this.curHand).addCard(dealtCard);
			// allPlayers.getPlayer(this.curHand).printHand(0);
			this.updateUI();
			if (allPlayers.getPlayer(this.curHand).score() > 21) {
				document.getElementById('userscore' + this.curHand).innerHTML = "You bust.";
				this.stayThere();
			}
			if (allPlayers.getPlayer(this.curHand).score() == 21) {
				document.getElementById('userscore' + this.curHand).innerHTML = "Blackjack!";
				this.stayThere();
			}
			if (!allPlayers.getPlayer(this.curHand).canSplit()) {
				this.deactivate(document.getElementById('splitButton_' + this.curHand));
			} else {
				this.activate(document.getElementById('splitButton_' + this.curHand));
			}
		}
	}
	stayThere(){
		if (this.curHand < this.numOfUserHands) {
			this.deactivate(document.getElementById('hitButton_' + this.curHand));
			this.deactivate(document.getElementById('stayButton_' + this.curHand));
			this.deactivate(document.getElementById('splitButton_' + this.curHand));
			++this.curHand;
			this.activate(document.getElementById('hitButton_' + this.curHand));
			this.activate(document.getElementById('stayButton_' + this.curHand));
			if (allPlayers.getPlayer(this.curHand).canSplit()) {
				this.activate(document.getElementById('splitButton_' + this.curHand));
			}
			this.hitThat();
		} else if (this.stayButton.className == "btn active"){
			this.endGame();
		} else {
			alert("somethings wrong");
		}
	}
	newGame(){
		if (this.bank.bankRoll == 0) {
			alert("You are out of money! Please visit again later.");
			return;
		}
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
		this.deactivate(document.getElementById('splitButton_' + this.curHand));
		if (allPlayers.getPlayer(this.curHand).canSplit()) {
			this.activate(document.getElementById('splitButton_' + this.curHand));
		}
		
		this.bank.bet();
		this.disable();

	}
	endGame(){
		var win:boolean;
		var didNotBust:boolean = false;
		var bestScore:number = 0;
		var blackjackHand:boolean = false;
		allPlayers.getPlayer(0).revealAllCards();
		this.updateUI();
		for(var i = 1; i <= this.numOfUserHands; ++i) {
			if (allPlayers.getPlayer(i).score() <= 21) {
				if (bestScore < allPlayers.getPlayer(i).score())
					bestScore = allPlayers.getPlayer(i).score();
				didNotBust = true;
			}
		}
		if (didNotBust) {
			while (allPlayers.getPlayer(0).score() < 15 
					&& allPlayers.getPlayer(0).score() < bestScore){
					var dealtCard: Card = deck.deal();
					dealtCard.setHidden(false);
					allPlayers.getPlayer(0).addCard(dealtCard);
			}
			this.updateUI();
		}
		for(var i = 1; i <= this.numOfUserHands; ++i) {
			win = true;
			blackjackHand = false;
			this.deactivate(document.getElementById('hitButton_' + this.curHand));
			this.deactivate(document.getElementById('stayButton_' + this.curHand));
			this.deactivate(document.getElementById('splitButton_' + this.curHand));
	
			var outputtext: string = "";
			if (allPlayers.getPlayer(i).score() > 21) {
				win = false;
				outputtext = "you bust";
			} else if (allPlayers.getPlayer(i).score() == 21 && allPlayers.getPlayer(i).hand.length == 2) {
				blackjackHand = true;
				outputtext = "Blackjack!";
			} else {
				if (allPlayers.getPlayer(0).score() > 21) {
					outputtext = "dealer busts, you win";
				} else if (allPlayers.getPlayer(i).hand.length > 4) {
					outputtext = "My but what a large hand you have, you win.";
				} else {
					if (allPlayers.getPlayer(0).score() >=
						allPlayers.getPlayer(i).score()) {
						win = false;
						outputtext = "dealer wins";
					} else {
						outputtext = "you win!";
					}
				}
			}
			if (blackjackHand)
				this.bank.win(1.5);
			else if (win)
				this.bank.win(1);

			document.getElementById('userscore' + i).innerHTML = outputtext;
		}
		this.enable();
	}
	
	disable() {
		this.bank.disable();
		this.deactivate(this.newGameButton);
	}
	
	enable() {
		this.bank.update();
		this.bank.enable();
		if (this.bank.bankRoll <= 0) {
			this.bank.disable();
		}
		this.activate(this.newGameButton);
	}
	addPlayer() {
		++this.numOfUserHands;
		if (this.numOfUserHands > 4) {
			alert("Whoops! You can only have a maximum of 4 hands during one round.");
			this.deactivate(document.getElementById('splitButton_' + this.curHand));
			--this.numOfUserHands;
		} else if (this.bank.bankRoll < this.bank.wager) {
			alert("Uh Oh! You do not have enough money to split your hand.");
			this.deactivate(document.getElementById('splitButton_' + this.curHand));
			--this.numOfUserHands;
		} else {
			var newCard : Card = allPlayers.getPlayer(this.curHand).stealCard();
			allPlayers.addPlayer('user' + this.numOfUserHands);
			allPlayers.getPlayer(this.numOfUserHands).addCard(newCard);
			game.bank.bet();
			this.insertNewHand(this.numOfUserHands);
		}
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
		var splitButton: HTMLElement = document.createElement('button');
		splitButton.setAttribute('id', 'splitButton_' + id);
		splitButton.setAttribute('onclick', 'game.addPlayer();');
		splitButton.setAttribute('class', 'btn active');
		splitButton.innerHTML = "Split";
		buttonWrapper.appendChild(hitButton);
		buttonWrapper.appendChild(stayButton);
		buttonWrapper.appendChild(splitButton);

		if (id > 1) {
			this.hitThat();
			this.deactivate(document.getElementById('hitButton_' + id));
			this.deactivate(document.getElementById('stayButton_' + id));
			this.deactivate(document.getElementById('splitButton_' + id));
			this.updateUI();
		}
	}
}
