var SUCCESS_RATIO = 10;

function Model () {
	this.score = 0;
	this.percent = 0;
	this.guessedCount = 0;	
	this.totalCount = 0;
	this.success = false;
	this.round = 0;
	this.alreadyGuessed = new Array();
		
	this.allwords = new Array();
	for (var key in ALLWORDS) {
		this.allwords.push(key);
	}
		
	
	this.newRound = function() {
		this.percent = 0;
		this.guessedCount = 0;
		this.totalCount = 0;
		this.round++;
		this.alreadyGuessed = new Array();
		return this.round;
	}
	
	this.choseWord = function() {
		var random = Math.floor(Math.random()*this.allwords.length);
		var word = this.allwords[random];
		this.dictionary = ALLWORDS[word];
		this.dictionary.push(word);
		for (var index in this.dictionary) {
			this.dictionary[index] = this.dictionary[index].toUpperCase();
			this.totalCount += this.dictionary[index].length;
		}
		this.success = false;
		word = word.toUpperCase();
		return word;
	}
	
	this.updateSuccessStatus = function(word) {
		this.guessedCount += word.length;
		this.percent = Math.round(100*(this.guessedCount/this.totalCount));
		if(( this.percent >= SUCCESS_RATIO) 
			|| (word.length == 7)) {
			this.success = true;
		}
	} 
	
	this.scoreWord = function(word) {
		this.score += word.length;
		this.alreadyGuessed.push(word);
		this.updateSuccessStatus(word);
		return this.score;
	};
	
	this.isWord = function(word) {
		var index = this.dictionary.indexOf(word);
		return (index != -1);
	};
	
	this.isGuessed = function(word) {
		var index = this.alreadyGuessed.indexOf(word);
		return (index != -1);
	};

	this.isFinished = function() {
		return (this.alreadyGuessed.length == this.dictionary.length);
	};
	
	this.isSuccess = function() {
		return this.success;
	};
	
	

}