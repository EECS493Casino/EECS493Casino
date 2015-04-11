// This is a single player class, it shall hold all info
// specific to that player
var Player = (function () {
    function Player(s) {
        this.hand = []; // and their hands, cool
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
    // this prints to console
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
    return Player;
})();
// This container shall hold all current players and will
// handle information for all of them
var PlayerContainer = (function () {
    function PlayerContainer() {
        this.data = []; // who's playing?
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
