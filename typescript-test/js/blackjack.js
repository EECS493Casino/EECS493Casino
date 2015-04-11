var BlackJack = (function () {
    function BlackJack() {
        var _this = this;
        this.hitButton = document.getElementById('hitButton');
        this.activate(this.hitButton);
        this.hitButton.addEventListener('click', function (event) {
            _this.hitThat();
        });
        this.stayButton = document.getElementById('stayButton');
        this.activate(this.stayButton);
        this.stayButton.addEventListener('click', function (event) {
            _this.stayThere();
        });
        this.updateUI();
    }
    BlackJack.prototype.activate = function (element) {
        element.className = "btn active";
    };
    BlackJack.prototype.deactivate = function (element) {
        element.className = "btn disabled";
    };
    BlackJack.prototype.drawCard = function (c) {
    };
    BlackJack.prototype.updateUI = function () {
        document.getElementById('dealerscore').innerHTML = "Dealer has: " + allPlayers.getPlayer(0).score().toString();
        this.dealercards = document.getElementById('dealercards');
        this.dealercards.innerHTML = "";
        allPlayers.getPlayer(0).draw(this.dealercards);
        document.getElementById('userscore').innerHTML = "User has: " + allPlayers.getPlayer(1).score().toString();
        this.usercards = document.getElementById('usercards');
        this.usercards.innerHTML = "";
        allPlayers.getPlayer(1).draw(this.usercards);
    };
    BlackJack.prototype.hitThat = function () {
        if (this.hitButton.className == "btn active") {
            allPlayers.getPlayer(1).addCard(deck.deal());
            this.updateUI();
            if (allPlayers.getPlayer(1).score() > 21)
                this.endGame();
        }
    };
    BlackJack.prototype.stayThere = function () {
        if (this.stayButton.className == "btn active") {
            this.endGame();
        }
    };
    BlackJack.prototype.newGame = function () {
        deck = new Deck();
        allPlayers = new PlayerContainer();
        allPlayers.addPlayer('user');
        allPlayers.firstDeal(deck);
        this.updateUI();
        this.activate(this.hitButton);
        this.activate(this.stayButton);
        document.getElementById('output').innerHTML = "";
    };
    BlackJack.prototype.endGame = function () {
        var _this = this;
        this.deactivate(this.hitButton);
        this.deactivate(this.stayButton);
        allPlayers.getPlayer(0).revealAllCards();
        this.updateUI();
        var outputtext = "";
        if (allPlayers.getPlayer(1).score() > 21)
            outputtext = "you bust";
        else {
            while (allPlayers.getPlayer(0).score() < 15 && allPlayers.getPlayer(0).score() < allPlayers.getPlayer(1).score())
                allPlayers.getPlayer(0).addCard(deck.deal());
            this.updateUI();
            if (allPlayers.getPlayer(0).score() > 21)
                outputtext = "dealer busts, you win";
            else if (allPlayers.getPlayer(1).hand.length > 4)
                outputtext = "My but what a large hand you have, you win.";
            else if (allPlayers.getPlayer(0).score() >= allPlayers.getPlayer(1).score())
                outputtext = "dealer wins";
            else
                outputtext = "you win!";
        }
        document.getElementById("output").innerHTML = "<p>" + outputtext + "</p><button id='newGame' class='btn active'>New Game?</button>";
        this.newGameButton = document.getElementById('newGame');
        this.newGameButton.addEventListener('click', function (event) {
            _this.newGame();
        });
    };
    return BlackJack;
})();
var Card = (function () {
    function Card(i) {
        var s = "null";
        switch (Math.floor(i / 13)) {
            case 0:
                s = "Hearts";
                break;
            case 1:
                s = "Diamonds";
                break;
            case 2:
                s = "Spades";
                break;
            case 3:
                s = "Clubs";
                break;
        }
        this.suit = s;
        this.value = Math.floor(i % 13);
        this.hidden = false;
    }
    Card.prototype.val = function () {
        if (this.value < 9)
            return (this.value + 2).toString();
        else
            switch (this.value) {
                case 9:
                    return "Jack";
                case 10:
                    return "Queen";
                case 11:
                    return "King";
                case 12:
                    return "Ace";
            }
    };
    Card.prototype.valNum = function () {
        return (this.value < 9) ? this.value + 2 : 10;
    };
    Card.prototype.setHidden = function (b) {
        this.hidden = b;
    };
    Card.prototype.draw = function (el) {
        var _this = this;
        if (!this.hidden)
            el.innerHTML += "<img src=\"images/" + this.val().toString().toLowerCase() + "_of_" + this.suit.toLowerCase() + ".png\" width=\"130\" height=\"150\">";
        else {
            el.innerHTML += "<img id=\"" + this.val() + this.suit + "\" src=\"images/blank.png\" " + "width=\"130\" height=\"150\">";
            var hiddenEl = document.getElementById(this.val() + this.suit);
            hiddenEl.addEventListener('mouseover', function (event) {
                if (settings.cheatsOn)
                    hiddenEl.setAttribute('src', "images/" + _this.val().toString().toLowerCase() + "_of_" + _this.suit.toLowerCase() + ".png");
            });
            hiddenEl.addEventListener('mouseout', function (event) {
                hiddenEl.setAttribute('src', "images/blank.png");
            });
        }
    };
    return Card;
})();
/// <reference path="./card.ts"/>
var Deck = (function () {
    function Deck() {
        this.data = [];
        this.currentCard = 0;
        for (var i = 0; i < 52; i++) {
            this.data.push(new Card(i));
        }
        this.shuffle();
    }
    Deck.prototype.printAll = function () {
        this.data.forEach(function (c) {
            console.log(c.suit + " " + c.value);
        });
    };
    Deck.prototype.shuffle = function () {
        for (var j, x, i = this.data.length; i; j = Math.floor(Math.random() * i), x = this.data[--i], this.data[i] = this.data[j], this.data[j] = x)
            ;
        this.currentCard = 0;
    };
    Deck.prototype.deal = function () {
        return this.data[this.currentCard++];
    };
    return Deck;
})();
var gameSettings = (function () {
    function gameSettings(cheats, cheatButonId) {
        var _this = this;
        this.cheatsOn = cheats;
        this.cheatToggleButton = document.getElementById(cheatButonId);
        this.cheatToggleButton.addEventListener('click', function (event) {
            _this.cheatsOn = !_this.cheatsOn;
            if (_this.cheatsOn)
                _this.cheatToggleButton.innerHTML = "Cheats: ON";
            else
                _this.cheatToggleButton.innerHTML = "Cheats: OFF";
        });
    }
    return gameSettings;
})();
var Player = (function () {
    function Player(s) {
        this.hand = [];
        this.name = s;
        this.emptyHand();
    }
    Player.prototype.addCard = function (c) {
        this.hand.push(c);
    };
    Player.prototype.addHiddenCard = function (c) {
        c.setHidden(true);
        this.hand.push(c);
    };
    Player.prototype.draw = function (el) {
        this.hand.forEach(function (c) {
            c.draw(el);
        });
    };
    Player.prototype.emptyHand = function () {
        this.hand = [];
    };
    Player.prototype.printHand = function (i) {
        console.log(this.name + " has: " + this.score());
        for (; i < this.hand.length; i++)
            console.log(this.hand[i].val() + " of " + this.hand[i].suit);
    };
    Player.prototype.revealAllCards = function () {
        this.hand.forEach(function (c) {
            c.setHidden(false);
        });
    };
    Player.prototype.score = function () {
        var output = 0;
        var numAces = 0;
        this.hand.forEach(function (c) {
            if (c.hidden)
                output += 0;
            else if (c.val() == "Ace")
                numAces++;
            else
                output += c.valNum();
        });
        for (; numAces > 0; numAces--) {
            output += (output + 11 + numAces - 1 <= 21) ? 11 : 1;
        }
        return output;
    };
    return Player;
})();
var PlayerContainer = (function () {
    function PlayerContainer() {
        this.data = [];
        this.addPlayer('Dealer');
    }
    PlayerContainer.prototype.addPlayer = function (s) {
        this.data.push(new Player(s));
    };
    PlayerContainer.prototype.getPlayer = function (i) {
        return this.data[i];
    };
    PlayerContainer.prototype.firstDeal = function (d) {
        for (var i = this.data.length - 1; i > 0; i--) {
            this.data[i].addCard(d.deal());
            this.data[i].addCard(d.deal());
        }
        this.data[0].addCard(d.deal());
        this.data[0].addHiddenCard(d.deal());
    };
    PlayerContainer.prototype.printAll = function () {
        this.data.forEach(function (p) {
            p.printHand(0);
        });
    };
    return PlayerContainer;
})();
/// <reference path='./deck.ts'/>
/// <reference path='./player.ts'/>
/// <reference path="./gameSettings.ts"/>
/// <reference path="./jquery.d.ts"/>
/// <reference path="./blackjack.ts"/>
var settings = new gameSettings(false, 'cheatToggle');
var deck = new Deck();
var allPlayers = new PlayerContainer();
allPlayers.addPlayer('user');
allPlayers.firstDeal(deck);
var game = new BlackJack();
