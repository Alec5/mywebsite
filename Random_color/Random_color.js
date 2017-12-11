var hex = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
var color = "";
var interval;
var strobecheck = document.getElementById("strobecheck")

function getColor(){
	color = "";
	for (var i = 0; i < 6; i++){
		color += hex[Math.floor(Math.random() * 15)]
	}
}

function changeColor(){
	getColor();
	document.body.style.backgroundColor = color;
}

changeColor();

function strobe(){
	this.start = function(){
		interval = setInterval(changeColor, 70);
	}
	this.stop = function(){
		clearInterval(interval); 
	}
}

var newStrobe = new strobe();

function checkBox(){
	if (strobecheck.checked == true){
		strobecheck.checked = false;
	} else {
		strobecheck.checked = true;
	}
	check();
}

function check(){
	if (strobecheck.checked == true){
		newStrobe.start();
	} else {
		newStrobe.stop();
	}
}




