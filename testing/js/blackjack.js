var Bank = (function () {
    function Bank(wager, startingBankRoll, bankRollView, wagerView, slider) {
        this.wager = wager;
        this.bankRoll = startingBankRoll;
        this.bankRollView = bankRollView;
        this.wagerView = wagerView;
        this.slider = slider;
        this.initUi();
    }
    Bank.prototype.win = function (multiple) {
        this.bankRoll += this.wager + (this.wager * multiple);
        this.updateViews();
    };
    Bank.prototype.bet = function () {
        this.bankRoll -= this.wager;
        this.updateBankRollView();
    };
    Bank.prototype.initUi = function () {
        initBankSlider(this.slider, this);
        this.updateViews();
    };
    Bank.prototype.updateBankRollView = function () {
        this.bankRollView.html("" + this.bankRoll);
    };
    Bank.prototype.updateWagerView = function () {
        this.wagerView.html("" + this.wager);
    };
    Bank.prototype.updateViews = function () {
        this.updateBankRollView();
        this.updateWagerView();
    };
    Bank.prototype.updateWager = function (sliderValue) {
        this.wager = sliderValue;
        this.updateWagerView();
    };
    Bank.prototype.disable = function () {
        disableSlider(this.slider);
    };
    Bank.prototype.enable = function () {
        enableSlider(this.slider);
    };
    return Bank;
})();
//stuff
/// <reference path="./bank.ts"/>
var BlackJack = (function () {
    function BlackJack(bank) {
        var _this = this;
        this.usercards = [];
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
        this.newGameButton = document.getElementById('startGame');
        this.bank = bank;
        this.curHand = 1;
        this.numOfUserHands = 1;
    }
    BlackJack.prototype.activate = function (element) {
        element.className = "btn active";
    };
    BlackJack.prototype.deactivate = function (element) {
        element.className = "btn disabled";
    };
    BlackJack.prototype.updateUI = function () {
        document.getElementById('dealerscore').innerHTML =
            "Dealer has: " + allPlayers.getPlayer(0).score().toString();
        this.dealercards = document.getElementById('dealercards');
        this.dealercards.innerHTML = "";
        allPlayers.getPlayer(0).draw(this.dealercards);
        document.getElementById('userscore').innerHTML =
            "User has: " + allPlayers.getPlayer(1).score().toString();
        for (var i = 1; i <= this.numOfUserHands; ++i) {
            this.usercards[i].innerHTML = "";
            allPlayers.getPlayer(i).draw(this.usercards[i]);
        }
        this.deckHolder = document.getElementById('DeckHolder');
        this.deckHolder.innerHTML = "";
        deck.topCard().setHidden(true);
        deck.topCard().draw(this.deckHolder);
    };
    BlackJack.prototype.hitThat = function () {
        if (this.hitButton.className == "btn active") {
            var dealtCard = deck.deal();
            dealtCard.setHidden(false);
            allPlayers.getPlayer(1).addCard(dealtCard);
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
    };
    BlackJack.prototype.endGame = function () {
        var win;
        win = true;
        this.deactivate(this.hitButton);
        this.deactivate(this.stayButton);
        allPlayers.getPlayer(0).revealAllCards();
        this.updateUI();
        var outputtext = "";
        if (allPlayers.getPlayer(1).score() > 21) {
            win = false;
            outputtext = "you bust";
        }
        else {
            while (allPlayers.getPlayer(0).score() < 15 &&
                allPlayers.getPlayer(0).score() <
                    allPlayers.getPlayer(1).score()) {
                var dealtCard = deck.deal();
                dealtCard.setHidden(false);
                allPlayers.getPlayer(0).addCard(dealtCard);
            }
            this.updateUI();
            if (allPlayers.getPlayer(0).score() > 21) {
                outputtext = "dealer busts, you win";
            }
            else if (allPlayers.getPlayer(1).hand.length > 4) {
                outputtext = "My but what a large hand you have, you win.";
            }
            else {
                if (allPlayers.getPlayer(0).score() >=
                    allPlayers.getPlayer(1).score()) {
                    win = false;
                    outputtext = "dealer wins";
                }
                else {
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
    };
    BlackJack.prototype.disable = function () {
        this.bank.disable();
        this.deactivate(this.newGameButton);
    };
    BlackJack.prototype.enable = function () {
        this.bank.enable();
        this.activate(this.newGameButton);
    };
    BlackJack.prototype.addPlayer = function () {
        this.curHand;
        ++this.numOfUserHands;
        allPlayers.addPlayer('user' + this.numOfUserHands);
        var newCard = allPlayers.getPlayer(1).stealCard();
        allPlayers.getPlayer(this.numOfUserHands).addCard(newCard);
        this.usercards[this.curHand + 1] = document.createElement('span');
        this.usercards[this.curHand + 1].setAttribute('id', 'hand_' + this.numOfUserHands);
        this.usercards[this.curHand + 1].innerHTML = "";
        document.getElementById('usercards').appendChild(this.usercards[this.curHand + 1]);
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
            el.innerHTML += "<img src=\"images/" +
                this.val().toString().toLowerCase() +
                "_of_" + this.suit.toLowerCase() +
                ".png\" width=\"130\" height=\"150\">";
        else {
            el.innerHTML += "<img id=\"" + this.val() + this.suit +
                "\" src=\"images/back_of_card.png\" " +
                "width=\"130\" height=\"150\">";
            var hiddenEl = document.getElementById(this.val() + this.suit);
            hiddenEl.addEventListener('mouseover', function (event) {
                if (settings.cheatsOn)
                    hiddenEl.setAttribute('src', "images/" +
                        _this.val().toString().toLowerCase() +
                        "_of_" + _this.suit.toLowerCase() + ".png");
            });
            hiddenEl.addEventListener('mouseout', function (event) {
                hiddenEl.setAttribute('src', "images/back_of_card.png");
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
        for (var j, x, i = this.data.length; i; j = Math.floor(Math.random() * i),
            x = this.data[--i],
            this.data[i] = this.data[j],
            this.data[j] = x)
            ;
        this.currentCard = 0;
    };
    Deck.prototype.deal = function () {
        return this.data[this.currentCard++];
    };
    Deck.prototype.topCard = function () {
        return this.data[this.currentCard];
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
            console.log(this.hand[i].val() +
                " of " +
                this.hand[i].suit);
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
    Player.prototype.stealCard = function () {
        var index = this.hand.length - 1;
        var tempCard = this.hand[index];
        if (index != undefined) {
            this.hand.splice(index, 1);
        }
        return tempCard;
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
var game = new BlackJack(new Bank(100, 1000, $('#bankRoll'), $('#wager'), $('#wager-slider')));
