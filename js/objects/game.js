/*
	This object holds all game objects,
	game loop and game logic.
*/

function Game(/*GraphicsHandler*/ graphicsHandler, /*AudioHandler*/ audioHandler){
	//CORE GAME VARIEBLES
	this.model = graphicsHandler;
	this.audio = audioHandler;
	this.currentTime = Date.now();
	this.lastTime = this.currentTime;
	
	//IMAGES
	//this.test = this.model.loadImg("resources/test.png");

	//AUDIO
	//this.testSnd = new Audio("resources/test.wav");
	
	//ARRAYS
	this.itemArray = [];
	
	//ANIMATION
		
	//GENERAL VARIEBLES
	this.clock = 0;
	
	//this is main game loop
	this.update = function(/*array of bytes*/ key, /*int*/ mouseX, /*int*/ mouseY, /*bool*/ isMouseDown) {
		if (this.clock == 0){
			//Do init here
		}
		//LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOP
		this.currentTime = Date.now();
		var frameTime = (this.currentTime - this.lastTime) / 1000; //get 1 frame update time in seconds
		this.lastTime = this.currentTime;
		
		this.clock += frameTime;
		
		//Draw stuff
		this.draw();
		
		//FPS
		this.model.drawText(Math.floor(1/frameTime),0,25,30,"rgba(255,0,0,1.0)");

		// http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
	}

	this.draw = function(){

		
		//Draw everything
		//Items
		// for(i = 0; i < this.itemArray.length; i++)
		// {
			// //this.model.draw(this.itemArray[i].sprite, this.itemArray[i].posX, this.itemArray[i].posY,0,0.1,0.1);
			// this.drawSpriteByID(this.itemArray[i].id, this.itemArray[i].posX, this.itemArray[i].posY,1,1,false,this.itemArray[i].angle);
	
		// }		
	}
}