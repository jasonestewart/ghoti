var ghoti = {};

var EMPTY = "";

var GAME_TIME = 120;

function load() {
	ghoti.model = new Model();
	ghoti.view = new View();
	
	ghoti.paused = false;
	
	if (document.addEventListener) {
       document.addEventListener("keydown", keypress, false);
    } else if (document.attachEvent) {
       document.attachEvent("onkeydown", keypress);
    } else {
       document.onkeydown= keypress;
    }
    	
	nextRound();
}

function nextRound() {
	var roundNum = ghoti.model.newRound();
	ghoti.view.newRound(roundNum);
	var word = ghoti.model.choseWord();	

	ghoti.word_array = word.split("");
	ghoti.guess_array = new Array();

	ghoti.view.populate(ghoti.word_array);
	CreateTimer("timer", GAME_TIME);
	ghoti.view.initCompleted(ghoti.model.dictionary);
}

function timeIsUp() {
	ghoti.view.showAll(ghoti.model.dictionary, ghoti.model.alreadyGuessed);
	if (ghoti.model.isSuccess()) {
		alert_message("Congrats, you've made it to round " + (ghoti.model.round + 1) + "! <a onclick='Proceed();'>Next Round</a>");
/* 		alert_message("Hit enter when you're ready to go to the next round."); */
		
	} else {
		alert_message("Too bad, Game over!");
	}
}

function Proceed() {
	var mh = document.getElementById('message-holder');
	anim_out(mh, 1);
	nextRound();
}

function checkChar(char) {
	if (ghoti.word_array.indexOf(char) == -1) {
		return false;
	} else {
		return true;
	}
	
}

function updateLetter(char, index, prefix) {
	var id = prefix + (index + 1);
	var text = document.getElementById(id);
	if (text != null) {
		text.innerHTML = char;
	}	
}


function handleBackspace() {
	// Remove from end of guess
	var letter = ghoti.guess_array.pop();
	var index = ghoti.guess_array.length;
	ghoti.view.setGuess(EMPTY, index);
	// Add to first free space of word
	index = ghoti.word_array.indexOf(EMPTY);
	ghoti.view.setWord(letter, index);
	ghoti.word_array[index] = letter;
}

function checkGuess() {
	var word = ghoti.guess_array.join("");
	if (!ghoti.model.isWord(word)) {
		ghoti.view.playBadSound();
	} else {
		if (ghoti.model.isGuessed(word)) {
			ghoti.view.playOldSound();
		} else {
			ghoti.view.playGoodSound();
			var score = ghoti.model.scoreWord(word);
			ghoti.view.updateScore(score);
			ghoti.view.addCompleted(word);
		}
	}
}


function handleEnter() {
	//Check guess
	checkGuess();
	if (ghoti.model.isFinished()) {
		nextRound();
	}
	//Remove all letters from guess
	while (ghoti.guess_array.length != 0) {
		handleBackspace();
	}	
}

function handleEsc() {
	if (ghoti.paused) {
		ghoti.paused = false;
	} else {
		ghoti.paused = true;
	}
}

function keypress(evt) {
	var evt = (evt) ? evt : ((event) ? event : null);
	evt.preventDefault();
	var code = evt.keyCode;
	if (code == 27) {
		handleEsc();
	}
	if (!ghoti.paused) {
		if (code == 8) {
			handleBackspace();
		} else if (code == 13) {
			handleEnter();
		} else {
			var char = String.fromCharCode(code);
			char = char.toUpperCase();
			if (checkChar(char)) {
				wordToGuess(char);
			}
		}
	}
}


function wordToGuess(char) {
	var index = ghoti.guess_array.length;
	ghoti.view.setGuess(char, index);
	ghoti.guess_array.push(char);

	index = ghoti.word_array.indexOf(char);
	ghoti.view.setWord(EMPTY, index);
	ghoti.word_array[index] = EMPTY;
}

var Timer;
var TotalSeconds;

function UpdateTimer() {
	var TimeStr;
	if (ghoti.paused) {
		TimeStr = "PAUSED";
	} else {
	    var Seconds = TotalSeconds;
	
	    var Minutes = Math.floor(Seconds / 60);
	    Seconds -= Minutes * (60);
	
	    TimeStr = Minutes + ":" + LeadingZero(Seconds)
	}
    Timer.innerHTML = TimeStr;
}



function LeadingZero(Time) {
    return (Time < 10) ? "0" + Time : + Time;
}



function CreateTimer(TimerID, Time) {
    Timer = document.getElementById(TimerID);
    TotalSeconds = Time;
    
    UpdateTimer()
    window.setTimeout("Tick()", 1000);
}





function Tick() {
    if (TotalSeconds <= 0) {
    	ghoti.paused = true;
        timeIsUp();
        ghoti.paused = false;
        return;
    } else if (!ghoti.paused) {
	    TotalSeconds -= 1;    	
    }
    UpdateTimer()
    window.setTimeout("Tick()", 1000);
}






function alert_message(message) {
	var fade = document.createElement('div');
	fade.setAttribute('class', 'fade-in');
	fade.style.display = 'block';
	var mh = document.createElement('div');
	mh.setAttribute('id', 'message-holder');
	mh.style.opacity = 0;
	fade.appendChild(mh);

	var p = document.createElement('p');
	p.innerHTML = message;
	mh.appendChild(p);
	document.body.insertBefore(fade, document.getElementById('background'));
	anim_in(mh, 0);
}
function anim_out(ele, op){
	var op = op - 0.1;
	ele.style.opacity = op;
	if(op > 0){
		setTimeout(function(){anim_out(ele, op);},100);
	} else {
		ele.style.opacity = 0;
/* 			document.body.removeChild(document.getElementById('message-holder')); */
	}
}
function anim_in(ele, op) {
	var op = op + 0.1;
	ele.style.opacity = op;
	if (op < 1) {
		setTimeout(function(){anim_in(ele, op);},100);
	} else {
		ele.style.opacity = 1;
		setTimeout(function (){anim_out(ele, op);},10000);
	}	
}


/*
function alert_message(message) {
	var mh = document.createElement('div');
	mh.setAttribute('id', 'message-holder');
	mh.style.opacity = 0;
	var p = document.createElement('p');
	p.innerHTML = message;
	mh.appendChild(p);
	document.body.insertBefore(mh, document.getElementById('game_wrapper'));
	anim_in(mh, 0);
	function anim_out(ele, op){
		var op = op - 0.1;
		ele.style.opacity = op;
		if(op > 0){
			setTimeout(function(){anim_out(ele, op);},10);
		} else {
			ele.style.opacity = 0;
			document.body.removeChild(document.getElementById('message-holder'));
		}
	}
	function anim_in(ele, op) {
		var op = op + 0.1;
		ele.style.opacity = op;
		if (op < 1) {
			setTimeout(function(){anim_in(ele, op);},10);
		} else {
			ele.style.opacity = 1;
			setTimeout(function (){anim_out(ele, op);},1000);
		}	
	}
}
*/


function nextMessage() {
	var backg = document.getElementById('background');
	
}




