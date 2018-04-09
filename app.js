
/*< -----VARIABLE DECLARATIONS----- >*/

var squares = document.querySelectorAll('.square');
var btns = document.querySelectorAll('button')
var  color = [];
var guessColor;
// var hard = true;
var removedColors = [];
// var isClicked = false;


///////////////////////////////////////////////////////////////////////////////////////////////////////

/*< -----INITIAL FUNCTION CALLS----- >*/


assigningColor();


//////////////////////////////////////////////////////////////////////////////////////////////////////


/*< -----FUNCTIONS----- >*/


function hasDuplicates(array) {
    var valuesSoFar = [];
    for (var i = 0; i < array.length; ++i) {
        var value = array[i];
        if (valuesSoFar.indexOf(value) !== -1) {
            return true;
        }
        valuesSoFar.push(value);
    }
    return false;
}


function RandColor(){
	var number = [];
	for(var j = 0 ; j<3 ; ++j){
		number[j] = Math.floor((Math.random()*254)+1);
	}
   return ("("+number[0]+", "+number[1]+", "+number[2]+")");
}

//assign the random colors and determine the colors be guessed

function assigningColor(){
	for(var i = 0 ; i < squares.length ; ++i){
		color[i] = RandColor();
		//console.log(color[i]);
		squares[i].style.backgroundColor = "rgb"+color[i];
	    unfade(squares[i]);
	}
	guessColor = "rgb" + color[Math.floor((Math.random()*5)+1)];
	document.querySelector("span").textContent = guessColor;
	document.querySelector("#text").textContent = "";           
}
 
//fades in the element that is passed as argument to the function 

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.opacity = op;
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

//fades out the element that is passed as an argument to the function

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            // element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 20);
}
 

//////////////////////////////////////////////////////////////////////////////////////////////////////


/*< ----- EVENT LISTENERS ----- >*/



//change colors or the play again button 

btns[0].addEventListener("click",function(){
 assigningColor();
 document.querySelector("h1").style.backgroundColor = "#ff961e";
 btns[0].textContent = "New Colors"
 removedColors = [];
});

// check for the click on the color squares and display the result on the display/button bar

for(var i = 0 ; i<squares.length ; ++i){

	squares[i].addEventListener("click",function(){
		// isClicked = true;
		var selectedTile = this.style.backgroundColor; 
		if( (guessColor) ===  selectedTile ){ 
			document.querySelector("#text").textContent = "YOU WON!";
			document.querySelector("h1").style.backgroundColor = guessColor;
            btns[0].textContent = "Play Again?"
				for(var j = 0 ; j < squares.length ; ++j){
					squares[j].style.backgroundColor =  guessColor;
					unfade(squares[j]);	
                }
			}
		else
		{
			document.querySelector("#text").textContent = "WRONG!";
			fade(this);
			// this.style.backgroundColor = "rgb"+"(0,0,0)";
		}

	});
}

// easy button functionality : remove random 3 wrong colors

btns[1].addEventListener('click' , function(){
	if(removedColors.length !== 3 )
		for ( var i = 0 ; i < 3 ; ++i){
		 	removedColors[i] = Math.floor((Math.random()*5)+1);
		 	if(("rgb" + color[removedColors[i]] == guessColor )|| hasDuplicates(removedColors))
		 		--i;
		}
	console.log(removedColors);
	// console.log(isClicked);
	for ( var i = 0 ; i < 3 ; ++i)
		squares[removedColors[i]].style.backgroundColor = "black";
});

// hard button functionality : add the 3 random color back

btns[2].addEventListener('click' , function(){
	for ( var i = 0 ; i < 3 ; ++i)
		squares[removedColors[i]].style.backgroundColor = "rgb" + color[removedColors[i]];		
});

// cahnge color and text color on hovering on the buttons on the button/resut bar

for(var i = 0 ; i < (squares.length-1) ; ++i){
	btns[i].addEventListener("pointerover", function () {
		this.classList.add("hover");
	});
	btns[i].addEventListener("pointerout" , function () {
		this.classList.remove("hover");
	});

}


///////////////////////////////////////////////////////////////////////////////////////////////////////