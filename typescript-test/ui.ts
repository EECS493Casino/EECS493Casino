//
// class BlackJack{
// 	hitButton: HTMLElement;
// 	stayButton: HTMLElement;
// 	dealercards: HTMLElement;
// 	usercards: HTMLElement;
// 	constructor(){
// 		this.hitButton = document.getElementById('hitButton');
// 		// button work
// 		this.activate(this.hitButton);
// 		this.hitButton.onclick = this.hitThat;
// 		this.stayButton = document.getElementById('stayButton');
// 		this.activate(this.stayButton);
// 		this.stayButton.onclick = this.stayThere;
// 	}
// 	activate(element: HTMLElement){
// 		element.className = "btn active";
// 	}
// 	deactivate(element: HTMLElement){
// 		element.className = "btn disabled";
// 	}
// 	updateUI(){
// 		document.getElementById('dealerscore').innerHTML =
// 			"Dealer has: " + allPlayers.getPlayer(0).score().toString();
// 		this.dealercards = document.getElementById('dealercards');
// 		this.dealercards.innerHTML = "";
// 		allPlayers.getPlayer(0).hand.forEach(function(c){
// 			if (!c.hidden)
// 				this.dealercards.innerHTML += "<img src=\"images/" +
// 										 c.val().toString().toLowerCase() +
// 										 "_of_" + c.suit.toLowerCase() +
// 										 ".png\" width=\"130\" height=\"150\">";
// 			else
// 				this.dealercards.innerHTML += "<img src=\"images/blank.png\" " +
// 										"width=\"130\" height=\"150\">";
// 		});
// 		document.getElementById('userscore').innerHTML =
// 			"User has: " + allPlayers.getPlayer(1).score().toString();
// 		this.usercards = document.getElementById('usercards');
// 		this.usercards.innerHTML = "";
// 		allPlayers.getPlayer(1).hand.forEach(function(c){
// 			if (!c.hidden)
// 				this.usercards.innerHTML += "<img src=\"images/" +
// 										c.val().toString().toLowerCase() +
// 										"_of_" + c.suit.toLowerCase() +
// 										".png\" width=\"130\" height=\"150\">";
// 			else
// 				this.usercards.innerHTML += "<img src=\"images/blank.png\" "
// 										"width=\"130\" height=\"150\">";
// 		});
// 	}
// 	hitThat(){
// 		if (this.hitButton.className == "btn active"){
// 			allPlayers.getPlayer(1).addCard(deck.deal());
// 			// allPlayers.getPlayer(1).printHand(0);
// 			this.updateUI();
// 			if (allPlayers.getPlayer(1).score() > 21) this.endGame();
// 		}
// 	}
// 	stayThere(){
// 		if (this.stayButton.className == "btn active"){
// 			this.endGame();
// 		}
// 	}
// 	newGame(){
// 		deck = new Deck();
// 		allPlayers = new PlayerContainer();
//
// 		allPlayers.addPlayer('user');
// 		allPlayers.firstDeal(deck);
//
// 		this.updateUI();
// 		this.activate(this.hitButton);
// 		this.activate(this.stayButton);
// 		document.getElementById('output').innerHTML = "";
// 	}
// 	endGame(){
// 		this.deactivate(this.hitButton);
// 		this.deactivate(this.stayButton);
// 		allPlayers.getPlayer(0).revealAllCards();
// 		this.updateUI();
// 		var outputtext: string = "";
// 		if (allPlayers.getPlayer(1).score() > 21)
// 			outputtext = "you bust";
// 		else{
// 			while (allPlayers.getPlayer(0).score() < 15 &&
// 					allPlayers.getPlayer(0).score() <
// 					allPlayers.getPlayer(1).score())
// 				allPlayers.getPlayer(0).addCard(deck.deal());
// 			this.updateUI();
// 			if (allPlayers.getPlayer(0).score() > 21)
// 				outputtext = "dealer busts, you win";
// 			else if (allPlayers.getPlayer(1).hand.length > 4)
// 				outputtext = "My but what a large hand you have, you win.";
// 			else
// 				if (allPlayers.getPlayer(0).score() >=
// 					allPlayers.getPlayer(1).score())
// 					outputtext = "dealer wins";
// 				else
// 					outputtext = "you win!";
// 		}
// 		document.getElementById("output").innerHTML =
// 			"<p>" + outputtext + "</p><button class='btn active' onclick='newGame()'>New Game?</button>";
// 	}
// }
//
// function activate(element: HTMLElement){
// 	element.className = "btn active";
// }
// function deactivate(element: HTMLElement){
// 	element.className = "btn disabled";
// }
//
// function updateUI(){
// 	document.getElementById('dealerscore').innerHTML =
// 		"Dealer has: " + allPlayers.getPlayer(0).score().toString();
// 	var dealercards: HTMLElement = document.getElementById('dealercards');
// 	dealercards.innerHTML = "";
// 	allPlayers.getPlayer(0).hand.forEach(function(c){
// 		if (!c.hidden)
// 			dealercards.innerHTML += "<img src=\"images/" +
// 									 c.val().toString().toLowerCase() +
// 									 "_of_" + c.suit.toLowerCase() +
// 									 ".png\" width=\"130\" height=\"150\">";
// 		else
// 			dealercards.innerHTML += "<img src=\"images/blank.png\" " +
// 									"width=\"130\" height=\"150\">";
// 	});
// 	document.getElementById('userscore').innerHTML =
// 		"User has: " + allPlayers.getPlayer(1).score().toString();
// 	var usercards: HTMLElement = document.getElementById('usercards');
// 	usercards.innerHTML = "";
// 	allPlayers.getPlayer(1).hand.forEach(function(c){
// 		if (!c.hidden)
// 			usercards.innerHTML += "<img src=\"images/" +
// 									c.val().toString().toLowerCase() +
// 									"_of_" + c.suit.toLowerCase() +
// 									".png\" width=\"130\" height=\"150\">";
// 		else
// 			usercards.innerHTML += "<img src=\"images/blank.png\" "
// 									"width=\"130\" height=\"150\">";
// 	});
// }
//
// function hitThat(){
// 	if (hitButton.className == "btn active"){
// 		allPlayers.getPlayer(1).addCard(deck.deal());
// 		// allPlayers.getPlayer(1).printHand(0);
// 		updateUI();
// 		if (allPlayers.getPlayer(1).score() > 21) endGame();
// 	}
// }
// function stayThere(){
// 	if (stayButton.className == "btn active"){
// 		endGame();
// 	}
// }
//
// function newgame(){ // should only be called by the new game button
// 	deck = new Deck();
// 	allPlayers = new PlayerContainer();
//
// 	allPlayers.addPlayer('user');
// 	allPlayers.firstDeal(deck);
//
// 	updateUI();
// 	activate(hitButton);
// 	activate(stayButton);
// 	document.getElementById('output').innerHTML = "";
// }
//
// function endGame(){
// 	deactivate(hitButton);
// 	deactivate(stayButton);
// 	allPlayers.getPlayer(0).revealAllCards();
// 	updateUI();
// 	var outputtext: string = "";
// 	if (allPlayers.getPlayer(1).score() > 21)
// 		outputtext = "you bust";
// 	else{
// 		while (allPlayers.getPlayer(0).score() < 15 &&
// 				allPlayers.getPlayer(0).score() <
// 				allPlayers.getPlayer(1).score())
// 			allPlayers.getPlayer(0).addCard(deck.deal());
// 		updateUI();
// 		if (allPlayers.getPlayer(0).score() > 21)
// 			outputtext = "dealer busts, you win";
// 		else if (allPlayers.getPlayer(1).hand.length > 4)
// 			outputtext = "My but what a large hand you have, you win.";
// 		else
// 			if (allPlayers.getPlayer(0).score() >=
// 				allPlayers.getPlayer(1).score())
// 				outputtext = "dealer wins";
// 			else
// 				outputtext = "you win!";
// 	}
// 	document.getElementById("output").innerHTML =
// 		"<p>" + outputtext + "</p><button class='btn active' onclick='newgame()'>New Game?</button>";
// }
//
//
// // button work
// var hitButton: HTMLElement = document.getElementById('hitButton');
// activate(hitButton);
// hitButton.onclick = hitThat;
// var stayButton = document.getElementById('stayButton');
// activate(stayButton);
// stayButton.onclick = stayThere;
//
// // first run ui
// updateUI();
