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
	
	//Background elements
	this.bg = new Background(this.model, "resources/bgtest1.jpg");
	this.bg.setScrollRate(1);
	this.bg.posY = 270;
	this.bg2 = new Background(this.model, "resources/wall.png");
	this.bg2.setScrollRate(1.75);
	this.bg2.posY = 262;
	this.bg3 = new Background(this.model, "resources/fbbar.png");
	this.bg3.setScrollRate(2);
	this.bg3.posY = 520;
	this.bg4 = new Background(this.model, "resources/floor.png");
	this.bg4.setScrollRate(1.75);
	this.bg4.posY = 460;

	
	//ANIMATION
		
	//GENERAL VARIEBLES
	this.clock = 0;
	
	//Entities

	this.enemyManager = new EnemyManager(this.model.canvasWidth, this.model.canvasHeight, this.warriorImg);
	this.currentWarrior = new Warrior(this.warriorImg, this.model.canvasWidth/2, 420, this.colliderImg);
	
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
		this.bg3.scroll();
		this.bg4.scroll();
		
		//Enemy manager
		this.enemyManager.update(frameTime);
		
		//Update enemies
		for(i = 0; i < this.enemyManager.enemies.length; i++)
		{
			this.itemArray[i].update();
			if (this.itemArray[i].aabb.colliding(this.currentWarrior)){
				if (this.currentWarrior.attacking){
					this.itemArray[i].onCollision();	
				}
			}
			this.enemyManager.enemies[i].update();
		}
		// http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
	}

	this.draw = function(){
		this.model.clearScreen('#FFF');
				this.model.drawBackground(this.bg, this.bg.posX, this.bg.posY,0,this.bg.scaleX,this.bg.scaleY);
		this.model.drawBackground(this.bg2, this.bg2.posX, this.bg2.posY,0,this.bg2.scaleX, this.bg2.scaleY);
		this.model.drawBackground(this.bg4, this.bg4.posX, this.bg4.posY,0,this.bg4.scaleX, this.bg4.scaleY);
		this.model.drawBackground(this.bg3, this.bg3.posX, this.bg3.posY,0,this.bg3.scaleX, this.bg3.scaleY);
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
		 for(i = 0; i < this.enemyManager.enemies.length; i++)
		 {
			 this.model.draw(this.enemyManager.enemies[i].sprite, this.enemyManager.enemies[i].posX, this.enemyManager.enemies[i].posY,1,1,1.0);
			// this.drawSpriteByID(this.itemArray[i].id, this.itemArray[i].posX, this.itemArray[i].posY,1,1,false,this.itemArray[i].angle);
		 }
		 //console.log(this.currentWarrior);
		this.model.drawLine(this.currentWarrior.aabb.x1, this.currentWarrior.aabb.y1, this.currentWarrior.aabb.x2, this.currentWarrior.aabb.y2, "#0F0", "2");
		this.model.drawLine(this.currentWarrior.childLeft.aabb.x1, this.currentWarrior.childLeft.aabb.y1, this.currentWarrior.childLeft.aabb.x2, this.currentWarrior.childLeft.aabb.y2, "#0F0", "2");
		this.model.drawLine(this.currentWarrior.childRight.aabb.x1, this.currentWarrior.childRight.aabb.y1, this.currentWarrior.childRight.aabb.x2, this.currentWarrior.childRight.aabb.y2, "#0F0", "2");
	}
	
	this.init = function(){
		//left arrow - 37
		//right arrow - 39
		//control - 17
		this.currentWarrior.setupKeyPresses(/*left*/37, /*right*/39, /*special*/17);
	}
}