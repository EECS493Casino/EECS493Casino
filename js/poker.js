var cardsLoaded = false;
var pot = 0;
var winnings = 500;
var cpuBet = 0;
var cards = [];//array of all cards
var deck = [];
var cpuHand = [];
var playerHand = [];
// var cardsSelectable = true;
// var numCardsSelected = 0;
// var selectedStatus = [false,false,false,false,false];

function loadCards(){
    cards = [];//clear the array
    cards.push({name:"2 of Clubs", suit:"Clubs", value:2, flipped:false, imgpath:"images/2_of_clubs.png"});
    cards.push({name:"3 of Clubs", suit:"Clubs", value:3, flipped:false, imgpath:"images/3_of_clubs.png"});
    cards.push({name:"4 of Clubs", suit:"Clubs", value:4, flipped:false, imgpath:"images/4_of_clubs.png"});
    cards.push({name:"5 of Clubs", suit:"Clubs", value:5, flipped:false, imgpath:"images/5_of_clubs.png"});
    cards.push({name:"6 of Clubs", suit:"Clubs", value:6, flipped:false, imgpath:"images/6_of_clubs.png"});
    cards.push({name:"7 of Clubs", suit:"Clubs", value:7, flipped:false, imgpath:"images/7_of_clubs.png"});
    cards.push({name:"8 of Clubs", suit:"Clubs", value:8, flipped:false, imgpath:"images/8_of_clubs.png"});
    cards.push({name:"9 of Clubs", suit:"Clubs", value:9, flipped:false, imgpath:"images/9_of_clubs.png"});
    cards.push({name:"10 of Clubs", suit:"Clubs", value:10, flipped:false, imgpath:"images/10_of_clubs.png"});
    cards.push({name:"Jack of Clubs", suit:"Clubs", value:11, flipped:false, imgpath:"images/jack_of_clubs.png"});
    cards.push({name:"Queen of Clubs", suit:"Clubs", value:12, flipped:false, imgpath:"images/queen_of_clubs.png"});
    cards.push({name:"King of Clubs", suit:"Clubs", value:13, flipped:false, imgpath:"images/king_of_clubs.png"});
    cards.push({name:"Ace of Clubs", suit:"Clubs", value:14, flipped:false, imgpath:"images/ace_of_clubs.png"});

    cards.push({name:"2 of Diamonds", suit:"Diamonds", value:2, flipped:false, imgpath:"images/2_of_diamonds.png"});
    cards.push({name:"3 of Diamonds", suit:"Diamonds", value:3, flipped:false, imgpath:"images/3_of_diamonds.png"});
    cards.push({name:"4 of Diamonds", suit:"Diamonds", value:4, flipped:false, imgpath:"images/4_of_diamonds.png"});
    cards.push({name:"5 of Diamonds", suit:"Diamonds", value:5, flipped:false, imgpath:"images/5_of_diamonds.png"});
    cards.push({name:"6 of Diamonds", suit:"Diamonds", value:6, flipped:false, imgpath:"images/6_of_diamonds.png"});
    cards.push({name:"7 of Diamonds", suit:"Diamonds", value:7, flipped:false, imgpath:"images/7_of_diamonds.png"});
    cards.push({name:"8 of Diamonds", suit:"Diamonds", value:8, flipped:false, imgpath:"images/8_of_diamonds.png"});
    cards.push({name:"9 of Diamonds", suit:"Diamonds", value:9, flipped:false, imgpath:"images/9_of_diamonds.png"});
    cards.push({name:"10 of Diamonds", suit:"Diamonds", value:10, flipped:false, imgpath:"images/10_of_diamonds.png"});
    cards.push({name:"Jack of Diamonds", suit:"Diamonds", value:11, flipped:false, imgpath:"images/jack_of_diamonds.png"});
    cards.push({name:"Queen of Diamonds", suit:"Diamonds", value:12, flipped:false, imgpath:"images/queen_of_diamonds.png"});
    cards.push({name:"King of Diamonds", suit:"Diamonds", value:13, flipped:false, imgpath:"images/king_of_diamonds.png"});
    cards.push({name:"Ace of Diamonds", suit:"Diamonds", value:14, flipped:false, imgpath:"images/ace_of_diamonds.png"});

    cards.push({name:"2 of Hearts", suit:"Hearts", value:2, flipped:false, imgpath:"images/2_of_hearts.png"});
    cards.push({name:"3 of Hearts", suit:"Hearts", value:3, flipped:false, imgpath:"images/3_of_hearts.png"});
    cards.push({name:"4 of Hearts", suit:"Hearts", value:4, flipped:false, imgpath:"images/4_of_hearts.png"});
    cards.push({name:"5 of Hearts", suit:"Hearts", value:5, flipped:false, imgpath:"images/5_of_hearts.png"});
    cards.push({name:"6 of Hearts", suit:"Hearts", value:6, flipped:false, imgpath:"images/6_of_hearts.png"});
    cards.push({name:"7 of Hearts", suit:"Hearts", value:7, flipped:false, imgpath:"images/7_of_hearts.png"});
    cards.push({name:"8 of Hearts", suit:"Hearts", value:8, flipped:false, imgpath:"images/8_of_hearts.png"});
    cards.push({name:"9 of Hearts", suit:"Hearts", value:9, flipped:false, imgpath:"images/9_of_hearts.png"});
    cards.push({name:"10 of Hearts", suit:"Hearts", value:10, flipped:false, imgpath:"images/10_of_hearts.png"});
    cards.push({name:"Jack of Hearts", suit:"Hearts", value:11, flipped:false, imgpath:"images/jack_of_hearts.png"});
    cards.push({name:"Queen of Hearts", suit:"Hearts", value:12, flipped:false, imgpath:"images/queen_of_hearts.png"});
    cards.push({name:"King of Hearts", suit:"Hearts", value:13, flipped:false, imgpath:"images/king_of_hearts.png"});
    cards.push({name:"Ace of Hearts", suit:"Hearts", value:14, flipped:false, imgpath:"images/ace_of_hearts.png"});

    cards.push({name:"2 of Spades", suit:"Spades", value:2, flipped:false, imgpath:"images/2_of_spades.png"});
    cards.push({name:"3 of Spades", suit:"Spades", value:3, flipped:false, imgpath:"images/3_of_spades.png"});
    cards.push({name:"4 of Spades", suit:"Spades", value:4, flipped:false, imgpath:"images/4_of_spades.png"});
    cards.push({name:"5 of Spades", suit:"Spades", value:5, flipped:false, imgpath:"images/5_of_spades.png"});
    cards.push({name:"6 of Spades", suit:"Spades", value:6, flipped:false, imgpath:"images/6_of_spades.png"});
    cards.push({name:"7 of Spades", suit:"Spades", value:7, flipped:false, imgpath:"images/7_of_spades.png"});
    cards.push({name:"8 of Spades", suit:"Spades", value:8, flipped:false, imgpath:"images/8_of_spades.png"});
    cards.push({name:"9 of Spades", suit:"Spades", value:9, flipped:false, imgpath:"images/9_of_spades.png"});
    cards.push({name:"10 of Spades", suit:"Spades", value:10, flipped:false, imgpath:"images/10_of_spades.png"});
    cards.push({name:"Jack of Spades", suit:"Spades", value:11, flipped:false, imgpath:"images/jack_of_spades.png"});
    cards.push({name:"Queen of Spades", suit:"Spades", value:12, flipped:false, imgpath:"images/queen_of_spades.png"});
    cards.push({name:"King of Spades", suit:"Spades", value:13, flipped:false, imgpath:"images/king_of_spades.png"});
    cards.push({name:"Ace of Spades", suit:"Spades", value:14, flipped:false, imgpath:"images/ace_of_spades.png"});

    cardsLoaded = true;
}

// shuffle method for Array prototype
// source: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if ( i == 0 ) return this;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = this[i];
     this[i] = this[j];
     this[j] = temp;
  }
  return this;
}

/* initDeck()
 * Initializes the deck by putitng all cards into the deck
 * and then shuffling the contents randomly. 
 */
function initDeck()
{
    deck = [];
    for (var i = 0; i < 52; i++)
    {
        deck.push(i);
    }
    deck.shuffle();
}

function dealFiveEach()
{
    for (var i = 0; i < 5; i++)
    {
        var a = deck.pop();
        var b = deck.pop();
        cpuHand.push(a);
        playerHand.push(b);
    }
}

/* updateUI()
 * Used to "refresh" the user interface
 */
function updateUI()
{
    document.getElementById("pot").innerHTML = pot.toString();
    document.getElementById("winnings").innerHTML = winnings.toString();

    for (var i = 1; i <= 5; i++)
    {
        var elementId = "hum_card".concat(i.toString());
        var cardNumber = playerHand[i-1];
        var sourceString = cards[cardNumber].imgpath;
        document.getElementById(elementId).src = sourceString;
    }

    // for(var i=0; i<5; i++)
    // {
    //     var x = i+1;
    //     elementId = "hum_card".concat(x.toString());
    //     if(selectedStatus[i])
    //     {
    //         document.getElementById(elementId).style.border = "3px solid yellow";
    //     }
    //     else if(selectedStatus[i]==false || cardsSelectable==false)
    //     {
    //         document.getElementById(elementId).style.border = "";
    //     }
    // }

    return;
}

/* startRound()
 * sets up the game for a new round
 */
 function startRound()
 {
    if(!cardsLoaded)
        loadCards();
    initDeck();
    playerHand = [];
    cpuHand = [];
    dealFiveEach();
    pot = 0;
    cheatsOn = false;
    document.getElementById("cheatbutton").innerHTML = "Turn Cheating On";
    resetCpuCards();
    updateUI();
    document.getElementById("startbutton").disabled = true;
    document.getElementById("startbutton").className = "btn disabled";

    document.getElementById("openbutton").disabled = false;
    document.getElementById("openbutton").className = "btn active";

    document.getElementById("checkbutton").disabled = false;
    document.getElementById("checkbutton").className = "btn active";

    document.getElementById("raisebutton").disabled = true;
    document.getElementById("raisebutton").className = "btn disabled";

    document.getElementById("foldbutton").disabled = true;
    document.getElementById("foldbutton").className = "btn disabled";

    //document.getElementById("log").innerHTML = "";//clear log
    document.getElementById("log").innerHTML += "\nStarting new round...";
    document.getElementById("log").innerHTML += "\nYou may OPEN or CHECK";
 }


/* resetCpuCards()
 * This function conceals all cpu cards. It sets the "flipped"
 * status of each cpu card to "false" and 
 */
function resetCpuCards(){
    if(cardsLoaded)
    {
        for (var i = 1; i <= 5; i++)
        {
            var elementId = "cpu_card".concat(i.toString());
            var cardNumber = cpuHand[i-1];
            cards[cardNumber].flipped = false;
            document.getElementById(elementId).src = "testing/images/back_of_card.png";
        }
    }
    return;
}

function toggleCheating(){
    document.getElementById("log").innerHTML += "\n";
	if(cheatsOn == true)
	{
        resetCpuCards();
		cheatsOn = false;
        document.getElementById("log").innerHTML += "\n";
		document.getElementById("cheatbutton").innerHTML = "Turn Cheating On";
	}
	else
	{
		cheatsOn = true;
        document.getElementById("log").innerHTML += "\n";
		document.getElementById("cheatbutton").innerHTML = "Turn Cheating Off";
	}
    return;
}

function clickCard(x){
    // var elementId = "hum_card".concat(x.toString());
    // if(cardsSelectable)
    // {
    //     var i = x-1;
    //     if(selectedStatus[i] == false && numCardsSelected<3)
    //     {
    //         //document.getElementById(elementId).style.border = "3px solid yellow";
    //         selectedStatus[i] = true;
    //         numCardsSelected++;
    //         console.log(numCardsSelected);
    //     }
    //     else if(selectedStatus[i] == true)
    //     {
    //         //document.getElementById(elementId).style.border = "";
    //         selectedStatus[i] = false;
    //         numCardsSelected--;
    //         console.log(numCardsSelected);
    //     }
    //     else{}
    // }
    // updateUI();
    return;
}

/* flipCard
 * This function flips the card. It changes the image source
 * and the status of the card.*/
function flipCard(elementId, cardNumber)
{
    var sourceString;
    if(cards[cardNumber].flipped == false)
    {
        sourceString = cards[cardNumber].imgpath;
        cards[cardNumber].flipped = true;
    }
    else
    {
        sourceString = "testing/images/back_of_card.png";
        cards[cardNumber].flipped = false;
    }
    document.getElementById(elementId).src = sourceString;
}

/* clickCpuCard
 * This function is called when the player clicks on a cpu card.
 * If checating is enable, the card will be flipped. If not,
 * nothing happens.
*/
function clickCpuCard(x){
    var elementId = "cpu_card".concat(x.toString());
    console.log("you clicked ".concat(elementId.toString()));
    if(cheatsOn && cardsLoaded)
    {
        var cardNumber = cpuHand[x-1];
        flipCard(elementId,cardNumber);
    }
}


// function replaceSelectedCards()
// {
//     var keeps = [];
//     var returns = [];
//     for (var i = 0; i < 5; i++)
//     {
//         if(selectedStatus[i] == false)
//             keeps.push(playerHand[i]);
//         else
//             returns.push(playerHand[i]);
//         selectedStatus[i] = false;
//     }
//     playerHand = [];
//     for (var i = 0; i < keeps.length(); i++)
//         playerHand.push(keeps[i]);
//     for (var i = 0; i < returns.length(); i++)
//         deck.splice(1,0,returns[i]);
//     while(playerHand.length < 5)
//     {
//         var a = deck.pop();
//         playerHand.push(a);
//     }

//     updateUI();
//     return;
// }

function playeropen(){
    console.log("the user opens");
    var bet = null;
    while(bet == null)
    {
        bet = prompt("Please enter your bet", 100);
        if(bet <= 0){
            alert("Your bet must be greater than 0!");
            bet = null;
        }
        else if(bet == null){
            alert("Your must bet!");
        }
        else if(bet != null){
            pot += parseInt(bet);
        }
        else{}
    }  
    winnings = winnings-bet;
    updateUI();
    document.getElementById("log").innerHTML += ("\nYou opened at $" + bet +". The pot now contains $" + pot);
    document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;
    cpuTakesTurn("open",bet);
}


function check(){
    console.log("the user checks");
    document.getElementById("log").innerHTML += "\nYou checked.";
    cpuTakesTurn("check",0);
}

function raise(){
    var bet = 0;
    while(bet < cpuBet)
    {
        bet = prompt("What do you raise?", cpuBet);
        if (bet == null || isNaN(bet))
        {
            bet = 0;
            alert("please input a number");
        }
        if(bet < cpuBet)
            alert("Must be greater than or equal to previous bet, " + cpuBet);
    }
    pot += parseInt(bet);
    winnings = winnings-bet;
    document.getElementById("openbutton").disabled = true;
    document.getElementById("checkbutton").disabled = true;
    document.getElementById("raisebutton").disabled = true;
    document.getElementById("foldbutton").disabled = true;

    document.getElementById("openbutton").className = "btn disabled";
    document.getElementById("checkbutton").className = "btn disabled";
    document.getElementById("raisebutton").className = "btn disabled";
    document.getElementById("foldbutton").className = "btn disabled";

    updateUI();
    document.getElementById("log").innerHTML += "\nYou raised $" + bet;
    exposeAndCompareHands();

}

function fold(){
    document.getElementById("log").innerHTML += "\nYou folded the CPU gets the pot!";
    $("#log").html("You folded, the CPU gets the pot");
    pot = 0;
    updateUI();
    document.getElementById("startbutton").disabled = false;
    document.getElementById("openbutton").disabled = true;
    document.getElementById("checkbutton").disabled = true;
    document.getElementById("raisebutton").disabled = true;
    document.getElementById("foldbutton").disabled = true;

    document.getElementById("startbutton").className = "btn active";
    document.getElementById("openbutton").className = "btn disabled";
    document.getElementById("checkbutton").className = "btn disabled";
    document.getElementById("raisebutton").className = "btn disabled";
    document.getElementById("foldbutton").className = "btn disabled";
}


//Returns a random integer between min (inclusive) and max (inclusive)
//http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cpuOpens()
{
    console.log("CPU opens");
    cpuBet = getRandomInt(50,250);
    pot += parseInt(cpuBet);
    updateUI();
    document.getElementById("log").innerHTML += "\nThe CPU Opens at " + cpuBet +". You may RAISE (bet the equivalent or higher) or FOLD (quit).";
    document.getElementById("openbutton").disabled = true;
    document.getElementById("checkbutton").disabled = true;
    document.getElementById("raisebutton").disabled = false;
    document.getElementById("foldbutton").disabled = false;

    document.getElementById("openbutton").className = "btn disabled";
    document.getElementById("checkbutton").className = "btn disabled";
    document.getElementById("raisebutton").className = "btn active";
    document.getElementById("foldbutton").className = "btn active";
}

function cpuChecks()
{
    document.getElementById("log").innerHTML += "\nThe CPU checks";
    exposeAndCompareHands();
}

function cpuRaises(amount)
{
    document.getElementById("log").innerHTML += "\nThe CPU raises $".concat(amount.toString()) + ". THe pot now contains $" + pot ;
    pot += parseInt(amount);
    updateUI();
    exposeAndCompareHands();
}

function cpuFolds()
{
    document.getElementById("log").innerHTML += "\nThe CPU folded, you get the pot";
    winnings += parseInt(pot);
    pot = 0;
    updateUI();
    document.getElementById("startbutton").disabled = false;
    document.getElementById("openbutton").disabled = true;
    document.getElementById("checkbutton").disabled = true;
    document.getElementById("raisebutton").disabled = true;
    document.getElementById("foldbutton").disabled = true;

    document.getElementById("startbutton").className = "btn active";
    document.getElementById("openbutton").className = "btn disabled";
    document.getElementById("checkbutton").className = "btn disabled";
    document.getElementById("raisebutton").className = "btn disabled";
    document.getElementById("foldbutton").className = "btn disabled";
}

function cpuTakesTurn(previousAction,value)
{
    if(previousAction == "open")
    {
        if(value > 250)
            cpuFolds();
        else
            cpuRaises(value);
    }
    else if(previousAction == "check")
    {
        if(Math.random() < 0.3)
            cpuChecks();
        else
            cpuOpens();
    }
    else if(previousAction == "raise")
    {
        if(value > 250)
            cpuFolds();
        else
            cpuChecks();        
    }
    else{}
}

function exposeAndCompareHands(){
    document.getElementById("log").innerHTML += "\nexposing and comparing hands";
    document.getElementById("log").innerHTML += "\nYour hand is better, you get the pot";
    winnings += parseInt(pot);
    pot = 0;
    updateUI();

    document.getElementById("startbutton").disabled = false;
    document.getElementById("openbutton").disabled = true;
    document.getElementById("checkbutton").disabled = true;
    document.getElementById("raisebutton").disabled = true;
    document.getElementById("foldbutton").disabled = true;

    document.getElementById("startbutton").className = "btn active";
    document.getElementById("openbutton").className = "btn disabled";
    document.getElementById("checkbutton").className = "btn disabled";
    document.getElementById("raisebutton").className = "btn disabled";
    document.getElementById("foldbutton").className = "btn disabled";
}

function getHandValue(hand)
{
    //count how many times each type of card appears
    var counts = new Array(13); 
    for ( var i = 0; i < 13; i++)
        counts[i] = 0; 
    for(var i=0; i<5; i++)
    {
        var cardVal = hand[i].value;
        counts[value-2]++
    }


    //count the number of pairs,threes,and fours
    var pairs = 0, threes = 0, fours = 0;
    for(var i=0; i<13; i++)
    {
        if(counts[i]==2)
            pairs++;
        if(counts[i]==3)
            threes++;
        if(counts[i]==4)
            fours++
    }

    //count how many times a specific suit appears
    var suits = new Array(4);
    for ( var i = 0; i < 4; i++ )
        suits[i] = 0;
    for(var i=0; i<5; i++)
    {
        var suit = hand[i].suit;
        if(suit == "Clubs")
            suits[0]++;
        else if(suit == "Diamonds")
            suits[1]++;
        else if(suit == "Hearts")
            suits[2]++;
        else if(suit == "Spades")
            suits[3]++;
        else{}
    }

    document.getElementById("startbutton").disabled = false;
    document.getElementById("startbutton").className = "btn active";
}

$(document).ready(function(){
    //this is called when the page loads
    document.getElementById("startbutton").disabled = false;
    document.getElementById("openbutton").disabled = true;
    document.getElementById("checkbutton").disabled = true;
    document.getElementById("raisebutton").disabled = true;
    document.getElementById("foldbutton").disabled = true;
    
    document.getElementById("startbutton").className = "btn active";
    document.getElementById("openbutton").className = "btn disabled";
    document.getElementById("checkbutton").className = "btn disabled";
    document.getElementById("raisebutton").className = "btn disabled";
    document.getElementById("foldbutton").className = "btn disabled";

    document.getElementById("cheatbutton").className = "btn active";
});