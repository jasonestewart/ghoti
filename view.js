var EMPTY = "";

function View() {
	this.score = document.getElementById("score");
	this.percent = document.getElementById("percent");
	
	this.updateScore = function() {
		this.score.innerHTML = "<span class=\"label\">Score: </span><span class=\"value\">" + ghoti.model.score + "</span>";
		this.percent.innerHTML = "<span class=\"label\">Percent: </span><span class=\"value\">" + ghoti.model.percent + "%</span>";
	};
		
	this.populate = function(word_array) {
		var temp = word_array.slice(0);
		for (var length = 7; length > 1; length--) {
			var random = Math.floor(Math.random()*length);
			this.word[length-1].innerHTML = temp[random];
			word_array[length-1] = temp[random];
			temp.splice(random, 1);
		}
		this.word[0].innerHTML = temp[0];
		word_array[0] = temp[0];
	};
	
	this.initCompleted = function(dictionary) {
		var div = document.getElementById("completed");
		div.innerHTML = "";
		var orderedWords = new Array();
		for (var i=3; i <= 7; i++) {
			orderedWords[i] = new Array();
		}
		for (var i=0; i < dictionary.length; i++) {
			var word = dictionary[i];
			var length = word.length;
			orderedWords[length].push(word);
		}
		for (var i=3; i <= 7; i++) {
			var ul = document.createElement("ul");
			div.appendChild(ul);
			var count = 0;
			for (var index = 0; index < orderedWords[i].length; index++) {
				var word = orderedWords[i][index];
				count++;
				if (count > 12) {
					ul = document.createElement("ul");
					div.appendChild(ul);
					count = 0;
				}		
				var li = document.createElement("li");
				ul.appendChild(li);
				var letter_array = word.split("");
				for (var ltr = 0; ltr < word.length; ltr++) {
					var div1 = document.createElement("div");
					var div2 = document.createElement("div");
					div1.className = "letter_box";
					li.appendChild(div1);
					div1.appendChild(div2);
					div2.innerHTML = letter_array[ltr];
					div2.style.visibility = "hidden";
				}
				li.id = word;
			}
		}
	}
	
	this.showAll = function(dictionary, guessed) {
		for (var i = 0; i < dictionary.length; i++) {
			var word = dictionary[i];
			if(guessed.indexOf(word) == -1) {
				this.addCompleted(word);
				var div = document.getElementById(word);
				div.className = "red";
			}
		}
	};
	
	this.newRound = function(roundNum) {
		for (var i=0; i<7; i++) {
			this.setGuess(EMPTY, i);
		}
		var div = document.getElementById("roundNum");
		div.innerHTML = "<span class=\"label\">Round: </span><span class=\"value\">" + roundNum + "</span>";
		this.updateScore();
	};
	
	
	this.setGuess = function(char, index) {
		this.ltr[index].innerHTML = char;
	};
	this.setWord = function(char, index) {
		this.word[index].innerHTML = char;
	};
	
	this.word = new Array();
	
	for (var i = 1; i <= 7; i++) {
		var id = "w_" + i;
		this.word.push(document.getElementById(id));
	}
	
	this.ltr = new Array();
	
	for (var i = 1; i <= 7; i++) {
		var id = "ltr_" + i;
		this.ltr.push(document.getElementById(id));
	}
	
	this.addCompleted = function(word) {
		var li = document.getElementById(word);
		var letters = li.childNodes;
		for (var i = 0; i < letters.length; i++) {
			var div1 = letters[i];
			var div2 = div1.firstChild;
			div2.style.visibility = "visible";
		}
	};
/* 	this.GameOver = function() { 

		black = document.getElementById("background");
		gameover = document.getElementById("gameover");
		black.innerHTML = "<span class=\"label\">Round: </span><span class=\"value\">" + roundNum + "</span>";

	
	}*/

	 
	this.playGoodSound = function() {
		this.goodSound.play()
	};
	this.playBadSound = function() {
		this.badSound.play()
	};
	this.playOldSound = function() {
		this.oldSound.play()
	};
	this.goodSound = document.getElementById("goodSound");
	this.badSound = document.getElementById("badSound");
	this.oldSound = document.getElementById("oldSound");
	
	this.goodSound.src = "sounds/goodSound.mp3";
	this.badSound.src = "sounds/badSound.mp3";
	this.oldSound.src = "sounds/oldSound.mp3";

}

