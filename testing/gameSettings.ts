
class gameSettings{
    cheatsOn: boolean;
    cheatToggleButton: HTMLElement;
    constructor(cheats: boolean, cheatButonId: string){
        this.cheatsOn = cheats;
        this.cheatToggleButton = document.getElementById(cheatButonId);
        if (this.cheatsOn)
            this.cheatToggleButton.innerHTML = "Cheats: ON";
        else
            this.cheatToggleButton.innerHTML = "Cheats: OFF";
        this.cheatToggleButton.addEventListener('click', (event): void =>{
            this.cheatsOn = !this.cheatsOn;
            if (this.cheatsOn)
                this.cheatToggleButton.innerHTML = "Cheats: ON";
            else
                this.cheatToggleButton.innerHTML = "Cheats: OFF";
        });
    }
}
