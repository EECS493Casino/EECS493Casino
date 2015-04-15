
declare function initBankSlider(slider: JQuery, bank: Bank);
declare function disableSlider(slider: JQuery);
declare function enableSlider(slider: JQuery);
declare function updateSliderValues(slider: JQuery, bank: Bank);

class Bank {
	wager: number;
	bankRoll: number;
	slider: JQuery;
	bankRollView: JQuery;
	wagerView: JQuery;
	
	constructor(wager: number, startingBankRoll: number, bankRollView: JQuery, wagerView: JQuery, slider: JQuery) {
		this.wager = wager;
		this.bankRoll = startingBankRoll;
		this.bankRollView = bankRollView;
		this.wagerView = wagerView;
		this.slider = slider;
		this.initUi();
	}
	
	win(multiple: number) {
		this.bankRoll += this.wager + (this.wager * multiple);
		this.updateViews();
	}

	bet() {
		this.bankRoll -= this.wager;
		if (this.bankRoll < 0)
			this.bankRoll = 0;
		this.updateBankRollView();
	}

	initUi() {
		initBankSlider(this.slider, this);
		this.updateViews();
	}
	
	updateBankRollView() {
		this.bankRollView.html(""+this.bankRoll);
	}
	
	updateWagerView() {
		this.wagerView.html(""+this.wager);
	}

	updateViews() {
		this.updateBankRollView();
		this.updateWagerView();
	}

	updateWager(sliderValue: number) {
		this.wager = sliderValue;
		this.updateWagerView();
	}
	
	disable() {
		disableSlider(this.slider);
	}
	
	enable() {
		enableSlider(this.slider);
	}
	
	update() {
		updateSliderValues(this.slider, this);
	}
}