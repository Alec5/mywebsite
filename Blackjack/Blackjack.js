var cards = document.getElementById("cards");
var dealer_cards = document.getElementById("dealerCards")
var hidden = false;
var end = true;
var playing = false;
var dealer_bust = false;
var bust = false;
var double_bet = false;
var i = 0;
var rank_num = 0;
var suit_num = 0;
var money = 500;
var min_bet = 5;
var bet_val = 5;
var double_val = 0
var win_count = 0;
var loss_count = 0;
var tie_count = 0;
var outcome = "undetermined";
var outcome_box = document.getElementById("outcome_box");
var money_count = document.getElementById("money_count");
var bet_input = document.getElementById("bet_input");
var error = document.getElementById("error_message");
var wins = document.getElementById("wins");
var losses = document.getElementById("losses");
var ties = document.getElementById("ties");

wins.innerHTML = win_count;
losses.innerHTML = loss_count;
ties.innerHTML = tie_count;

document.getElementById("bet_input").value = 5;
money_count.innerHTML = "$" + money;

document.getElementById("outcome_box").style.visibility = "hidden";

function setBet(){
	if (bet_input.value == ""){
		error.innerHTML = "You must enter a bet.";
	} else if (isNaN(bet_input.value)){
		error.innerHTML = "Bet must be a number.";
	} else if (bet_input.value.includes(".")){
		error.innerHTML = "Bet must be a whole number.";
	} else if (parseFloat(bet_input.value) < 5) {
		error.innerHTML = "Bet cannot be smaller than the minimum bet.";
	} else if (parseFloat(bet_input.value) > 100){
		error.innerHTML = "Bet cannot be greater than the maximum bet.";
	} else if (parseFloat(bet_input.value) > money){
		error.innerHTML = "Bet cannot be greater than your money.";
	} else if (Number.isInteger(parseFloat(bet_input.value)) &&
	((parseFloat(bet_input.value)) % 1 == 0)){
		bet_val = parseFloat(bet_input.value);
		error.innerHTML = ""
	}
}

bet_input.addEventListener("input", setBet)

function isPlaying(){
	if (playing == true){
		bet_input.disabled = true;
	} else {
		bet_input.disabled = false;
	}
}


function action() {
    hidden = !hidden;
    if(hidden) {
        document.getElementById('Start').style.visibility = 'hidden';
    } else {
        document.getElementById('Start').style.visibility = 'visible';
    }
}
document.getElementById("Hit").style.visibility = "hidden";
document.getElementById("Stand").style.visibility = "hidden";
document.getElementById("Reset").style.visibility = "hidden";

function Card(suit, rank){
	this.suit = suit;
	this.rank = rank;
	
	this.toString = function() {
        return this.rank + " of " + this.suit;
    }	
}

function Deck(){
	 this.deal = function() {
        return this.deck.pop();
    };
	
	this.dealN = function(n) {
        let out = [];
        for(var j = 0; j < n; j++){
            out.push(this.deck.pop());
        }
        return out;
    };
	
	 this.shuffle = function () {
        for (var k = 0; k < this.deck.length; k++){
            let j = parseInt(this.deck.length * Math.random());
            this.deck[k] = this.deck.splice(j, 1, this.deck[k])[0];
        }
    };
	
	this.reset = function() {
		this.deck = [];
		suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
		ranks = ['1', '2', '3', '4', '5', '6', '7',
				'8', '9', '10', '11', '12', '13'];	
		for(var s = 0; s < suits.length; s++){
			for(var r = 0; r < ranks.length; r++) {
				this.deck.push(new Card(suits[s], ranks[r]));				
				}
			}		
		
	};
	
	 this.cards_left = function() {
        return this.deck.length;
    }	
	this.reset();
}

let myCard = new Card();
let myDeck = new Deck();
let newHand = new myHand();
let newScoreHand = new scoreHand();
let newDealerHand = new dealerHand();
let newStand = new stand();

function dealHand(){
	for (var k = 0; k<2; k++){
		return(myDeck.deal());
	}
}
	
function myHand(){
	this.hand = [];
	myDeck.reset();
	myDeck.shuffle();
	this.hand = myDeck.dealN(2);
	this.addCard = function(){
		this.hand.push(myDeck.dealN(1)[0]);
	}
}

function displayHand(){				
	cards.innerHTML = ""
	dealer_cards.innerHTML = ""
	
	for (var j = 0; j < newHand.hand.length; j++){
		playerCardsImg()
	}
	
	i = 0;
	
	for (var k = 0; k < newDealerHand.hand.length; k++){
		dealerCardsImg();
	}
	
	i = 0
}

function playerCardsImg(){
	var card_img = document.createElement("img");
	card_img.setAttribute("class", "card_img");
	
		rank_num = newHand.hand[i].rank	
		
		if (newHand.hand[i].suit == "Clubs"){
			suit_num = 1
		} else if (newHand.hand[i].suit == "Diamonds"){
			suit_num = 2
		} else if (newHand.hand[i].suit == "Hearts"){
			suit_num = 3
		} else if (newHand.hand[i].suit == "Spades"){
			suit_num = 4
		}
		card_img.setAttribute("src", "./Cards/" + rank_num + "_" + suit_num + ".png");
		cards.appendChild(card_img);
		//console.log(card_img.src)
	i++
}

function dealerCardsImg(){
	var card_img = document.createElement("img");
	card_img.setAttribute("class", "card_img");
	
		rank_num = newDealerHand.hand[i].rank	
		
		if (newDealerHand.hand[i].suit == "Clubs"){
			suit_num = 1
		} else if (newDealerHand.hand[i].suit == "Diamonds"){
			suit_num = 2
		} else if (newDealerHand.hand[i].suit == "Hearts"){
			suit_num = 3
		} else if (newDealerHand.hand[i].suit == "Spades"){
			suit_num = 4
		}
		card_img.setAttribute("src", "./Cards/" + rank_num + "_" + suit_num + ".png");
		dealer_cards.appendChild(card_img);
		//console.log(card_img.src)
	i++
}

function start (){
	if (error.innerHTML == ""){
		document.getElementById("Reset").style.visibility = "hidden";
		document.getElementById("Hit").style.visibility = "visible";
		document.getElementById("Stand").style.visibility = "visible";
		end = false;
		displayHand();
		scoreHand();
		action();
		playing = true;
		isPlaying();
	}
}


function resetGame(){
	if (error.innerHTML == ""){
		//reset hands of dealer and player, then reset deck
		newHand.hand = [];
		newDealerHand.hand = [];
		myDeck.reset();	
		myDeck.shuffle();
	
		//deal 2 new cards to player
		newHand.hand = myDeck.dealN(2);
	
		//deal a new card to the dealer
		newDealerHand.hand = myDeck.dealN(1);
	
		//display the new hands
		displayHand();
	
		//reset outcome
		outcome = "undetermined";
		
		//update win/tie/loss count
		wins.innerHTML = win_count;
		losses.innerHTML = loss_count;
		ties.innerHTML = tie_count;
	
		//allow a new game
		end = false;
		isEnd();
		playing = true;
		isPlaying();
		dealer_bust = false;
		bust = false;
		if (double_bet == true && bet_input.value == double_val){
			double_bet = false;
			bet_val = bet_val/2
			bet_input.value = bet_val;
		}
		double_bet = false;
		document.getElementById("outcome_box").style.visibility = "hidden";
		outcome_box.innerHTML = ""
	}
}


function dealerHand(){
	this.hand = [];
	this.hand = myDeck.dealN(1);
	this.addCard = function(){
		this.hand.push(myDeck.dealN(1)[0]);
	}
}
 
function scoreHand(){
	var score = 0; 
	var aceCount = 0;
	for (var x = 0; x < newHand.hand.length; x++){
		if (newHand.hand[x].rank == '1') {
			score += 11;
			aceCount += 1
		} else if (newHand.hand[x].rank == '11' || newHand.hand[x].rank == '12' ||
			newHand.hand[x].rank == '13' || newHand.hand[x].rank == '10' ){
			score +=10
		} else {
			score += parseInt(newHand.hand[x].rank)
		}
	}
	while (score > 21 && aceCount > 0) {
		score -= 10
		aceCount -= 1
	}
	if(score > 21) {
		end = true;
		bust = true;
		outcome = "lose";
		isEnd();
		loss_count++
		setTimeout(function() {
			document.getElementById("outcome_box").style.visibility = "visible";
			outcome_box.innerHTML = ("Bust. You LOSE!");
			bet();			
		}, 200)		
	}	
	return score;	
	console.log(score, aceCount)
}

function hit(){	
	newHand.addCard();
	displayHand();
	scoreHand();
}

function stand(){	
	this.dealerScore = function(){
		var dealer_score = 0; 
		var dealer_aceCount = [];
		for (var y = 0; y < newDealerHand.hand.length; y++){
			if (newDealerHand.hand[y].rank == '1') {
				dealer_score += 11;
				dealer_aceCount += 1
			} else if (newDealerHand.hand[y].rank == '11' || newDealerHand.hand[y].rank == '12' ||
				newDealerHand.hand[y].rank == '13' || newDealerHand.hand[y].rank == '14' ){
				dealer_score +=10
			} else {
				dealer_score += parseInt(newDealerHand.hand[y].rank)
			}
		}
		while (dealer_score > 21 && dealer_aceCount > 0) {
			dealer_score -= 10
			dealer_aceCount -= 1
		}				
		return dealer_score;	
		if (dealer_score > 21){
			dealer_bust = true;
		}
}
	this.dealerHit = function(){
		end = true;
		isEnd();
		newDealerHand.addCard();
		displayHand();
	}
}

function dealerTurn(){
	if (bust == false){
		document.getElementById("outcome_box").style.visibility = "visible";
		while(newStand.dealerScore() < 17){
			newStand.dealerHit()
		}
		setTimeout(function(){
		if (scoreHand() == 21 && scoreHand() > newStand.dealerScore < 21 &&
			newHand.hand.length == 2 && dealer_bust == false &&
			scoreHand() !== newStand.dealerScore()){
				console.log("Blackjack");
				end == true;
				outcome_box.innerHTML = ("Blackjack! You win.");
				outcome = "blackjack";
		} else if(scoreHand() == newStand.dealerScore() && scoreHand() <= 21){
			end = true;
			outcome_box.innerHTML = ("Tie");
			outcome = "tie";
		} else if(newStand.dealerScore() > 21){
			end = true;
			outcome_box.innerHTML = ("Dealer busts. You win.");
			outcome = "win";
		} else if(scoreHand() > newStand.dealerScore() && scoreHand() <= 21){
			end = true;
			outcome_box.innerHTML = ("You win.");
			outcome = "win";
		} else {
			end = true;
			outcome_box.innerHTML = "You lose!"
			outcome = "lose";
		}
		bet();		
	}, 200)
		isEnd();	
	}
}

	

function isEnd(){
	if (end == true){
		document.getElementById("Hit").style.visibility = "hidden";
		document.getElementById("Stand").style.visibility = "hidden";
		document.getElementById("Reset").style.visibility = "visible";
		playing = false;
		isPlaying();
	} else {
		document.getElementById("Hit").style.visibility = "visible";
		document.getElementById("Stand").style.visibility = "visible";
		document.getElementById("Reset").style.visibility = "hidden";
	}
}

function bet(){
	if (outcome == "win"){
		money += bet_val;
		win_count++
	} else if (outcome == "lose"){
		money -= bet_val;
		loss_count++
	} else if (outcome == "tie"){
		money += 0;
		tie_count++
	} else if (outcome == "blackjack"){
		money += (bet_val * 1.5);
		win_count++
	}
	money_count.innerHTML = "$" + money;
	isGameOver();
}

function doubleDown(){
	if (playing == true && error.innerHTML == "" && newHand.hand.length == 2){
		double_bet = true;
		double_val = bet_val * 2
		bet_val = bet_val * 2		
		bet_input.value = bet_val
		hit();
		setTimeout(function(){
			newStand.dealerScore(); 
			dealerTurn();
		}, 250);
	}
}

function isGameOver(){
	if (money < 5 && money > 0){
		var c1 = confirm("Game Over. You don't have enough money to place the minimum bet.\nPlay Again?")
		c1;
		if (c1 == true){
			location.reload();
		} else {
			window.close();
		}
	} else if (money <= 0){
		var c2 = confirm("Game Over. You lost all your money!\nPlay Again?");
		c2;
		if (c2 == true){
			location.reload();
		} else {
			location.reload();
		}
	}
	wins.innerHTML = win_count;
	losses.innerHTML = loss_count;
	ties.innerHTML = tie_count;
}



document.getElementById("Reset").style.visibility = "hidden";