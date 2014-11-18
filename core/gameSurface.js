/*
	This object creates and holds data of HTML5 canvas
*/

function GameSurface(/*string*/ areaId, /*unsigned int*/width, /*unsigned int*/height){
	this.canvas = document.createElement("canvas"); 		//create html canvas
	this.docID = document.getElementById(areaId); 			//find gameArea div 
	this.canvas.width = width; 								//set canvas width
	this.canvas.height = height; 							//set canvas height
	this.gameArea = this.canvas.getContext("2d"); 			//get actual object that allows to draw on canvas
	this.docID.appendChild(this.canvas); 					//append canvas to gameArea div
	
	this.getGameArea = function() {
		return this.gameArea;								//returns object that allows to draw on canvas
	}
}