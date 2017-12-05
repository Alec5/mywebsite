let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
                "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
                "u", "v", "w", "x", "y", "z", "A", "B", "C", "D",
                "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
                "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", 
                "Y", "Z", " ", ",", ";", ".", "!", "?", ":", "'",
                '"', "’", "@", "#", "$", "%", "^", "&", "*", "(",
                ")", "/", "<", ">", "[", "]", "{", "}", "1", "2",
                "3", "4", "5", "6", "7", "8", "9", "0", "-", "_",
                "+", "="];
let encrypted_alphabet = [];
var output = document.getElementById("output");
var input = document.getElementById("text_input");
var key = document.getElementById("key_input");
let keys = [];

let collection = [];


function setKey(){
    key = document.getElementById("key_input").value;
    for (var i = 0; i < key.length; i++){
        keys[i] = key.charCodeAt(i);
    }
	
}

document.getElementById("key_input").addEventListener("input", setKey);

function setAlphabets(){
	for (var j = 0; j < keys.length; j++){
		for (var i = 0; i < alphabet.length; i++){
			encrypted_alphabet[i] = alphabet[(i+keys[j])%92]
		}			
		collection[j] = encrypted_alphabet;
		encrypted_alphabet = [];	
	}
}

function encrypt(){
	output.innerHTML = "";
	setKey();
	setAlphabets();	
	for (var k = 0; k < input.value.length; k++) {
		for (var j = 0; j < alphabet.length; j++) {
			if (input.value[k] == alphabet[j]){
				output.innerHTML += collection[k%keys.length][j];
			} 			
		}		
	}
}

function setDecryptKeys(){
	key = document.getElementById("key_input").value;
    for (var i = 0; i < key.length; i++){
        keys[i] = alphabet.length - key.charCodeAt(i);
    }
}

function decrypt(){
	setDecryptKeys();
	output.innerHTML = "";
	setAlphabets();
	for (var k = 0; k < input.value.length; k++) {
		for (var j = 0; j < alphabet.length; j++) {
			if (input.value[k] == alphabet[j]){
				output.innerHTML += collection[k%keys.length][j];
			} 			
		}		
	}
}









