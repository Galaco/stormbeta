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
	this.warriorImg = this.model.loadImg("resources/testWarrior.png");
	this.colliderImg = this.model.loadImg("resources/attackcollider.png");

	//AUDIO
	//this.testSnd = new Audio("resources/test.wav");
	
	//ARRAYS
	this.itemArray = [];
	
	//Background elements
	this.bg = new Background(this.model, "resources/bgtest1.jpg");
	this.bg.setScrollRate(2);
	this.bg.posY = 270;
	this.bg2 = new Background(this.model, "resources/wall.png");
	this.bg2.setScrollRate(3.5);
	this.bg2.posY = 360;
	
	
	//Enemies
	//this.itemArray.push(new Enemy(this.model.loadImg("resources/attackcollider.png"), 961, 100 ));
	
	//ANIMATION
		
	//GENERAL VARIEBLES
	this.clock = 0;
	
	//Entities
	this.currentWarrior = new Warrior(this.warriorImg, this.model.canvasWidth/2, this.model.canvasHeight/2, this.colliderImg);
	
	//this is main game loop
	this.update = function(/*array of bytes*/ key, /*int*/ mouseX, /*int*/ mouseY, /*bool*/ isMouseDown) {
		if (this.clock === 0){
			//Do init here
			this.init(this.currentWarrior);
		}
		//LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOP
		this.currentTime = Date.now();
		var frameTime = (this.currentTime - this.lastTime) / 1000; //get 1 frame update time in seconds
		this.lastTime = this.currentTime;
		this.currentWarrior.update(frameTime, key);
		
		this.clock += frameTime;
		
		//Draw stuff
		this.draw();
		
		//FPS
		this.model.drawText(Math.floor(1/frameTime),0,25,30,"rgba(255,0,0,1.0)");

		this.bg.scroll();
		this.bg2.scroll();
		
		
		for(i = 0; i < this.itemArray.length; i++)
		{
			this.itemArray[i].update();
		}
		// http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
	}

	this.draw = function(){
		this.model.clearScreen('#FFF');
				this.model.drawBackground(this.bg, this.bg.posX, this.bg.posY,0,this.bg.scaleX,this.bg.scaleY);
		this.model.drawBackground(this.bg2, this.bg2.posX, this.bg2.posY,0,this.bg2.scaleX, this.bg2.scaleY);
		//Draw warrior
		this.model.draw(this.currentWarrior.sprite, this.currentWarrior.posX, this.currentWarrior.posY,1,1,1.0);
		
			if(this.currentWarrior.childLeft.visibility == true){
				this.model.draw(this.currentWarrior.childLeft.sprite, this.currentWarrior.childLeft.xpos, this.currentWarrior.childLeft.ypos,1,1,1.0);
				}
			if(this.currentWarrior.childRight.visibility == true){
				this.model.draw(this.currentWarrior.childRight.sprite, this.currentWarrior.childRight.xpos, this.currentWarrior.childRight.ypos,1,1,1.0);
				}
		//Draw everything
		//Items
		 for(i = 0; i < this.itemArray.length; i++)
		 {
			 this.model.draw(this.itemArray[i].sprite, this.itemArray[i].posX, this.itemArray[i].posY,0,0.1,0.1);
			// this.drawSpriteByID(this.itemArray[i].id, this.itemArray[i].posX, this.itemArray[i].posY,1,1,false,this.itemArray[i].angle);
		 }		
	}
	
	this.init = function(){
		//left arrow - 37
		//right arrow - 39
		//control - 17
		this.currentWarrior.setupKeyPresses(/*left*/37, /*right*/39, /*special*/17);
	}
}