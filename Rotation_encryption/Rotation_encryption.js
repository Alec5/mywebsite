let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
				"k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
				"u", "v", "w", "x", "y", "z", "A", "B", "C", "D",
				"E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
				"O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", 
				"Y", "Z", " ", ",", ";", ".", "!", "?", ":", "'",
				'"', "’", "@", "#", "$", "%", "^", "&",	"*", "(",
				")", "/", "<", ">", "[", "]", "{", "}", "1", "2",
				"3", "4", "5", "6",	"7", "8", "9", "0", "-", "_",
				"+", "="];
let encrypted_alphabet = [];
var output = document.getElementById("output");
var input = document.getElementById("text_input");
var key = 1;

function setKey(){
	key = parseInt(document.getElementById("key_input").value);
}

document.getElementById("key_input").addEventListener("click", setKey);

function setAlphabet(){
	for (var i = 0; i < alphabet.length; i++){
		encrypted_alphabet[i] = alphabet[(i+key)%alphabet.length]
	}
}

function encrypt(){
	output.innerHTML = ""
	setKey();
	setAlphabet();
	for (var k = 0; k < input.value.length; k++) {
		for (var j = 0; j < alphabet.length; j++) {
			if (input.value[k] == alphabet[j]){
				output.innerHTML += encrypted_alphabet[j];
			} 			
		}		
	}
}

function decrypt(){	
	output.innerHTML = ""
	key = alphabet.length-parseInt(document.getElementById("key_input").value);
	setAlphabet();
	for (var k = 0; k < input.value.length; k++) {
		for (var j = 0; j < alphabet.length; j++) {
			if (input.value[k] == alphabet[j]){
				output.innerHTML += encrypted_alphabet[j];
			} 			
		}		
	}
}
