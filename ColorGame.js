//Our variables here
var colors = [];
var selectedColor;
var level = 6;

//Selecting elements from HTML page here
var squares =  document.querySelectorAll(".square");
var colorSpan = document.getElementById("color");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");


//Initially run this method
init();

function init() {
	//Add event listeners to the mode buttons
	setModeButtons();
	//Add event listeners to individual squares
	setUpSquares();
	//Generate colors, select an answer, fill squares with colors
	resetFunction();
}


function setModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			resetButton.textContent = "New Game"
			message.textContent = "";
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			h1.style.background = "steelblue";
			this.textContent === "Easy" ? level = 3: level = 6;
			resetFunction();
		});
	}
}

function setUpSquares() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", function() {
			var clickedColor = this.style.background;
			//console.log(clickedColor + " " + selectedColor);
			if (clickedColor == selectedColor) {
				//console.log("Correct");
				resetButton.textContent = "Play Again";
				message.textContent = "Correct!";
				changeColors(clickedColor);
				h1.style.background = clickedColor;
			} else {
				//console.log("incorrect");
				this.style.background = "#232323";
				message.textContent = "Wrong";
			}
		});
	}
}

function resetFunction() {
	// Generates 'level' number of random colors
	colors = generateColors(level);
	// Selects one color as the correct answer
	selectedColor = selectColor();
	//Shows the selected color to the user
	colorSpan.textContent = selectedColor;
	// Fills the squares with the randomly selected colors
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.background = colors[i];
			squares[i].style.display = "block";
		}
		else {
			squares[i].style.display = "none";
		}
	}
}

resetButton.addEventListener("click", function() {
	this.textContent = "New Game";
	message.textContent = "";
	h1.style.background = "steelblue";

	if (level === 3) {
		colors = generateColors(3);
	} else if (level === 6) {
		colors = generateColors(6);
	}
	
	selectedColor = selectColor();
	colorSpan.textContent = selectedColor;

	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background = colors[i];
	}
});

colorSpan.textContent = selectedColor;

function changeColors (color){
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background = color;
	}
}

function selectColor() {
	var rnd = Math.floor(Math.random() * colors.length);
	return colors[rnd];
}

function generateColors(num) {
	var colorsArray = [];

	for(var i = 0; i < num; i++) {
		colorsArray.push(randomColor());
	}

	return colorsArray;
}

function randomColor() {
	var red = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 255);
	var blue = Math.floor(Math.random() * 255);
	return ("rgb(" + red + ", " + green + ", " + blue + ")");
}