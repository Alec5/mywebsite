var fib = document.getElementById("fib");
var diamond = document.getElementById("diamond");
var length = document.getElementById("length")
var until = document.getElementById("until")
var br = document.createElement("br");
var prime_generated = document.getElementById("prime_generated");
var seq = [0, 1];
var x = document.getElementById("lengthD");
var primes = [];
var primes2 = [];

function makeSequence(){
	seq = [0, 1]
    fib.innerHTML = ""
    fib.innerHTML += seq[0] + ", "
    fib.innerHTML += seq[1] + ", "
    for (var i = 2; i < length.value; i++){
        seq[i] = parseInt(seq[i-1]) + parseInt(seq[i-2]);
        fib.innerHTML += seq[i] + ", "
    }
}
function enterCheck(e) {
    if (13 == e.keyCode) {
        makeSequence();
        makePyramid();
        getPrimes();
		listPrimes();
    }
}

function makePyramid(){
    diamond.innerHTML = ""
    for (var i = 0; i <= x.value; i++){
        for (var j = i; j > 0; j--){
            diamond.innerHTML += "*"
        }
        diamond.appendChild(br);
    }
}
			
function getPrimes(){
    primes = [];
	primes[0] = 2;
	
    for (var i = 3; i < until.value; i += 2){       
        primes.push(i)        
	}
    for (var l = 0; l < primes.length; l++){
        for (var j = 2; j < until.value; j++){
            for (var k = primes.length - 1; k >= 0; k--) {
                if(primes[k] == primes[l]*j) {
                    primes.splice(k, 1);
                }
            }
        }
    }   
}

function getPrimes2(){
    primes2 = [];
	primes2[0] = 2;
	
    for (var i = 3; i < 3000; i += 2){
            primes2.push(i)
	}
    for (var l = 0; l < primes2.length; l++){
        for (var j = 2; j < 3000; j++){
            for (var k = primes2.length - 1; k >= 0; k--) {
                if(primes2[k] == primes2[l]*j) {
                    primes2.splice(k, 1);
                }
            }
        }
    }   
}

function listPrimes(){
	document.getElementById("prime_list").innerHTML = ""
	 for (var m = 0; m < primes.length; m++){
        document.getElementById("prime_list").innerHTML += primes[m] + ", "
    }   
}

function genPrime(){
	prime_generated.innerHTML = ""
	var x = Math.floor(Math.random() * primes2.length)
	console.log(x)
	prime_generated.innerHTML = primes2[x]
}
			
document.addEventListener("keypress", enterCheck)
getPrimes2();
makeSequence();
makePyramid();
getPrimes();
listPrimes();

