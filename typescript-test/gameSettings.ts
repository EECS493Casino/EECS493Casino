class gameSettings{
    cheatsOn: boolean;
    cheatToggleButton: JQuery;
    constructor(cheats: boolean, cheatButon: JQuery){
        this.cheatsOn = cheats;
        this.cheatToggleButton = cheatButon;
        this.cheatToggleButton.click(function(){
            this.cheatsOn = !this.cheatsOn;
        });
    }
}
