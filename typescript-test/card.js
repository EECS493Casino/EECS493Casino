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
        if (!this.hidden)
            el.innerHTML += "<img src=\"images/" +
                this.val().toString().toLowerCase() +
                "_of_" + this.suit.toLowerCase() +
                ".png\" width=\"130\" height=\"150\">";
        else {
            el.innerHTML += "<img id=\"" + this.val() + this.suit +
                "\" src=\"images/blank.png\" " +
                "width=\"130\" height=\"150\">";
            document.getElementById(this.val() + this.suit).addEventListener('mouseover', function (event) {
            });
        }
    };
    return Card;
})();
