class gameSettings{
    cheatsOn: boolean;
    cheatToggleButton: HTMLElement;
    constructor(cheats: boolean){
        this.cheatsOn = cheats;
    }
    setCheats(cheats: boolean){
        this.cheatsOn = cheats;
    }
    getCheats(): boolean{
        return this.cheatsOn;
    }
}
