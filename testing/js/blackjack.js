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
        if (this.bankRoll < 0)
            this.bankRoll = 0;
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
    Bank.prototype.update = function () {
        updateSliderValues(this.slider, this);
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
        document.getElementById('userscore' + this.curHand).innerHTML =
            "User has: " + allPlayers.getPlayer(1).score().toString();
        for (var i = 1; i <= this.numOfUserHands; ++i) {
            document.getElementById('userscore' + i).innerHTML =
                "User has: " + allPlayers.getPlayer(i).score().toString();
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
            allPlayers.getPlayer(this.curHand).addCard(dealtCard);
            this.updateUI();
            if (allPlayers.getPlayer(this.curHand).score() > 21) {
                this.stayThere();
                document.getElementById('userscore' + this.curHand).innerHTML = "You bust.";
            }
        }
    };
    BlackJack.prototype.stayThere = function () {
        if (this.curHand < this.numOfUserHands) {
            this.deactivate(document.getElementById('hitButton_' + this.curHand));
            this.deactivate(document.getElementById('stayButton_' + this.curHand));
            this.deactivate(document.getElementById('splitButton_' + this.curHand));
            ++this.curHand;
            this.activate(document.getElementById('hitButton_' + this.curHand));
            this.activate(document.getElementById('stayButton_' + this.curHand));
            this.activate(document.getElementById('splitButton_' + this.curHand));
            this.hitThat();
        }
        else if (this.stayButton.className == "btn active") {
            this.endGame();
        }
        else {
            alert("somethings wrong");
        }
    };
    BlackJack.prototype.newGame = function () {
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
        this.bank.bet();
        this.disable();
    };
    BlackJack.prototype.endGame = function () {
        var win;
        var didNotBust = false;
        var bestScore = 0;
        allPlayers.getPlayer(0).revealAllCards();
        this.updateUI();
        for (var i = 1; i <= this.numOfUserHands; ++i) {
            if (allPlayers.getPlayer(i).score() <= 21) {
                if (bestScore < allPlayers.getPlayer(i).score())
                    bestScore = allPlayers.getPlayer(i).score();
                didNotBust = true;
            }
        }
        if (didNotBust) {
            while (allPlayers.getPlayer(0).score() < 15
                && allPlayers.getPlayer(0).score() < bestScore) {
                var dealtCard = deck.deal();
                dealtCard.setHidden(false);
                allPlayers.getPlayer(0).addCard(dealtCard);
            }
            this.updateUI();
        }
        for (var i = 1; i <= this.numOfUserHands; ++i) {
            win = true;
            this.deactivate(document.getElementById('hitButton_' + this.curHand));
            this.deactivate(document.getElementById('stayButton_' + this.curHand));
            this.deactivate(document.getElementById('splitButton_' + this.curHand));
            var outputtext = "";
            if (allPlayers.getPlayer(i).score() > 21) {
                win = false;
                outputtext = "you bust";
            }
            else {
                if (allPlayers.getPlayer(0).score() > 21) {
                    outputtext = "dealer busts, you win";
                }
                else if (allPlayers.getPlayer(i).hand.length > 4) {
                    outputtext = "My but what a large hand you have, you win.";
                }
                else {
                    if (allPlayers.getPlayer(0).score() >=
                        allPlayers.getPlayer(i).score()) {
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
            document.getElementById('userscore' + i).innerHTML = outputtext;
            console.log(outputtext + 'userscore' + i);
        }
        this.enable();
    };
    BlackJack.prototype.disable = function () {
        this.bank.disable();
        this.deactivate(this.newGameButton);
    };
    BlackJack.prototype.enable = function () {
        this.bank.update();
        this.bank.enable();
        if (this.bank.bankRoll <= 0) {
            this.bank.disable();
        }
        this.activate(this.newGameButton);
    };
    BlackJack.prototype.addPlayer = function () {
        ++this.numOfUserHands;
        var newCard = allPlayers.getPlayer(this.curHand).stealCard();
        allPlayers.addPlayer('user' + this.numOfUserHands);
        allPlayers.getPlayer(this.numOfUserHands).addCard(newCard);
        game.bank.bet();
        this.insertNewHand(this.numOfUserHands);
    };
    BlackJack.prototype.insertNewHand = function (id) {
        if (id > 4) {
            alert("Whoops! You can only have a maximum of 6 hands during one round.");
            this.deactivate(document.getElementById('splitButton_' + this.curHand));
            --this.numOfUserHands;
        }
        else if (this.bank.bankRoll < this.bank.wager && id > 1) {
            alert("Uh Oh! You do not have enough money to split your hand.");
            this.deactivate(document.getElementById('splitButton_' + this.curHand));
            --this.numOfUserHands;
        }
        else {
            var newHandWrapper = document.createElement('div');
            newHandWrapper.setAttribute('id', 'handWrapper_' + id);
            newHandWrapper.setAttribute('class', 'handWrapperClass');
            document.getElementById('usercards').appendChild(newHandWrapper);
            var newUserScore = document.createElement('p');
            newUserScore.setAttribute('id', 'userscore' + id);
            newHandWrapper.appendChild(newUserScore);
            this.usercards[id] = document.createElement('span');
            this.usercards[id].setAttribute('id', 'hand_' + id);
            this.usercards[id].innerHTML = "";
            newHandWrapper.appendChild(this.usercards[id]);
            var buttonWrapper = document.createElement('div');
            buttonWrapper.setAttribute('id', 'buttonWrapper_' + id);
            buttonWrapper.setAttribute('class', 'playerButtons');
            newHandWrapper.appendChild(buttonWrapper);
            var hitButton = document.createElement('button');
            hitButton.setAttribute('id', 'hitButton_' + id);
            hitButton.setAttribute('onclick', 'game.hitThat();');
            hitButton.setAttribute('class', 'btn active');
            hitButton.innerHTML = "Hit";
            var stayButton = document.createElement('button');
            stayButton.setAttribute('id', 'stayButton_' + id);
            stayButton.setAttribute('onclick', 'game.stayThere();');
            stayButton.setAttribute('class', 'btn active');
            stayButton.innerHTML = "Stay";
            var splitButton = document.createElement('button');
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
