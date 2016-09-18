let board = document.getElementById("gameboard"), 
	difficulty,
	numOfCards, 
	score = 0, 
	clickCounter = 0, 
	cardsInPlay = []

gameSetup();

function gameSetup(){

	document.getElementById("easy").addEventListener('click',setDifficulty);
	document.getElementById("medium").addEventListener('click',setDifficulty);
	document.getElementById("hard").addEventListener('click',setDifficulty);
}

function setDifficulty(){
	difficulty = this.getAttribute('id');
	switch(difficulty){

		case "hard":
		numOfCards = 12;
		break;

		case "medium":
		numOfCards = 8;
		break;

		case "easy":
		numOfCards = 4;
		break;

		default:
		alert("Resistance is Futile. The Borg is Here. Please Reload Page.");

	}

	createBoard(numOfCards);
	
	document.getElementById("modeSelector").setAttribute('id','scoreboard');
	document.getElementById("scoreboard").innerHTML="<div id='scoreboard'>Score : " + score + "</div>";
}

function createArrOfCards(numOfCards){
	let arr = [];
	for (let i = 0; i < numOfCards; i++){
		if (i >= numOfCards / 2) {
			arr.push('king');
		} else {
			arr.push('queen');
		}
	}
	return shuffle(arr);
}

function createBoard(difficulty){

	let columns = 2;
	let rows = Math.ceil(numOfCards / columns);
	let arrOfCards = createArrOfCards(numOfCards);

	for (let i = 0; i < rows; i++){
		let createRow = document.createElement('div');
		let currentId = "row" + i;
		createRow.setAttribute('id', currentId)
		createRow.className = 'row centered';
		board.appendChild(createRow);
		for (let j = 0; j < columns; j++) {
			let createCard = document.createElement('div');
			createCard.className = 'col-xs-6 card';	
			createCard.setAttribute('data-card', arrOfCards.pop()); //should figure out how to keep this attribute hidden in html
			createCard.addEventListener('click', isTwoCards);
			document.getElementById(currentId).appendChild(createCard);
		}
	}
}


function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function isTwoCards(){
	cardsInPlay.push(this.getAttribute('data-card'));
	this.innerHTML = "<img src='"+ this.getAttribute('data-card') + ".png'></img>"; 
	//console.log(cardsInPlay);
	if (cardsInPlay.length === 2) {
		isMatch(cardsInPlay);
	    cardsInPlay = [];
	}
	clickCounter += 1;
	if (clickCounter > numOfCards){
		alert("You have exceeded the maximum number of tries. Restarting now.");
		location.reload();
	}
}

function isMatch(cardArr){
	let elements = document.getElementsByClassName('card');
	function resetImg(){
		for (let i = 0; i < elements.length; i++){
		elements[i].innerHTML="";		
		}
	}
	//compare both cards, if true, increase score counter by 1;
	if (cardArr[0] === cardArr[1]){
		score += 1;
		document.getElementById("scoreboard").innerHTML="<div id='scoreboard'>Score : " + score + "</div>"; 
		//there was a bug when i tried to assign above line to global variable updateScore as the called object was 'null' before difficulty is set
		setTimeout(resetImg, 1000);
		alert("You found a match!");

	} else {
		setTimeout(resetImg, 1000);
		alert("Sorry, try again.");
	}
}

