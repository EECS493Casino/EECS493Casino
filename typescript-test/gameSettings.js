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
