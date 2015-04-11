/// <reference path="./card.ts"/>

class Deck {
	data: Card[] = [];
	currentCard: number = 0;

	constructor(){
		for (var i = 0; i < 52; i++){
			this.data.push(new Card(i));
		}
		this.shuffle();
	}
	// prints to console
	printAll(){
		this.data.forEach(function(c){
			console.log(c.suit + " " + c.value);
		});
	}
	shuffle(){ // conveniently from StackOverflow
		for(var j, x, i = this.data.length;
			i;
			j = Math.floor(Math.random() * i),
			x = this.data[--i],
			this.data[i] = this.data[j],
			this.data[j] = x);
		this.currentCard = 0;
	}

	deal(): Card{
		return this.data[this.currentCard++];
	}
}
