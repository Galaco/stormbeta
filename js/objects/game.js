﻿/*
	This object holds all game objects,
	game loop and game logic.
*/

function Game(/*GraphicsHandler*/ graphicsHandler, /*AudioHandler*/ audioHandler){
	//CORE GAME VARIEBLES
	this.model = graphicsHandler;
	this.audio = audioHandler;
	this.currentTime = Date.now();
	this.lastTime = this.currentTime;
	this.inited = false;
	
	//IMAGES
	this.warriorImg = this.model.loadImg("resources/animtestfull.png");
	this.enemyImg = this.model.loadImg("resources/testWarrior.png");
	this.colliderImg = this.model.loadImg("resources/attackcollider.png");
	this.leftattackanim = this.model.loadImg("resources/attacktestfull.png");
	this.rightattackanim = this.model.loadImg("resources/attacktestfull.png");

	//AUDIO
	//this.testSnd = new Audio("resources/test.wav");
	
	//ARRAYS
	
	//Background elements
	this.bg = new Background(this.model, "resources/bgtest1.jpg");
	this.bg.setScrollRate(1);
	this.bg.posY = 270;
	this.bg2 = new Background(this.model, "resources/wall.png");
	this.bg2.setScrollRate(1.5);
	this.bg2.posY = 262;
	this.bg3 = new Background(this.model, "resources/fbbar.png");
	this.bg3.setScrollRate(1.8);
	this.bg3.posY = 520;
	this.bg4 = new Background(this.model, "resources/floor.png");
	this.bg4.setScrollRate(1.65);
	this.bg4.posY = 460;

	
	//ANIMATION
		
	//GENERAL VARIEBLES
	this.clock = 0;
	
	//Entities

	this.enemyManager = new EnemyManager(this.model.canvasWidth, this.model.canvasHeight, this.enemyImg);
	this.currentWarrior = new Warrior(this.warriorImg, this.model.canvasWidth/2, 420, this.colliderImg, this.leftattackanim, this.rightattackanim);
	
	//this is main game loop
	this.update = function(/*array of bytes*/ key, /*int*/ mouseX, /*int*/ mouseY, /*bool*/ isMouseDown) {
		
		//LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOP
		this.currentTime = Date.now();
		var frameTime = (this.currentTime - this.lastTime) / 1000; //get 1 frame update time in seconds
		this.lastTime = this.currentTime;
		this.currentWarrior.update(frameTime, key);
		
		if (this.clock == 0){
			//Do init here
			this.init();
		}
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
			if(this.enemyManager.enemies[i].dead)
			{
				//Kill it from the array
				this.enemyManager.enemies.splice(i,1);
			}
				if ((this.enemyManager.enemies[i].aabb.colliding(this.currentWarrior.childLeft.aabb) && this.currentWarrior.childLeft.attacking)
				|| (this.enemyManager.enemies[i].aabb.colliding(this.currentWarrior.childRight.aabb) && this.currentWarrior.childRight.attacking)){
					if (this.currentWarrior.attacking){
						this.enemyManager.enemies[i].onCollision();
								
					}
				}
				
			if (this.enemyManager.enemies[i].aabb.colliding(this.currentWarrior.aabb)){
				this.currentWarrior.health -=1;
				if(this.enemyManager.enemies[i].posX < 480) {
						//Push the enemy left
						this.enemyManager.enemies[i].posX -= 15;
				} else {
						//push to the right
						this.enemyManager.enemies[i].posX += 15;
				}
				if(this.currentWarrior.health <= 0) {
					this.enemyManager.enemies.shouldSpawn = false;
				}
			}
			this.enemyManager.enemies[i].update();
			
			//Check collisions with player and attack objects
			//var enemyAABB = enemyManager.enemies[i].aabb;
			//var 
			
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
		if(this.currentWarrior.animState == 0) {
					this.model.drawAnimFrame(this.currentWarrior.anim, this.currentWarrior.posX, this.currentWarrior.posY,0);
		} else if(this.currentWarrior.animState == 1) {
					this.model.drawAnimFrame(this.currentWarrior.attackAnimR, this.currentWarrior.posX, this.currentWarrior.posY,0);
			} else if(this.currentWarrior.animState == 2) {
					this.model.drawAnimFrame(this.currentWarrior.attackAnimL, this.currentWarrior.posX, this.currentWarrior.posY,0);
			}

		
			if(this.currentWarrior.childLeft.visibility == true){
				this.model.draw(this.currentWarrior.childLeft.sprite, this.currentWarrior.childLeft.xpos, this.currentWarrior.childLeft.ypos,1,1,1.0);
				this.currentWarrior.childLeft.aabb.renderDebug(this.model);

				}
			if(this.currentWarrior.childRight.visibility == true){
				this.model.draw(this.currentWarrior.childRight.sprite, this.currentWarrior.childRight.xpos, this.currentWarrior.childRight.ypos,1,1,1.0);
				this.currentWarrior.childRight.aabb.renderDebug(this.model);
				}
		//Draw everything
		//Items
		 for(i = 0; i < this.enemyManager.enemies.length; i++)
		 {
			 this.model.draw(this.enemyManager.enemies[i].sprite, this.enemyManager.enemies[i].posX, this.enemyManager.enemies[i].posY,1,1,1.0);
			 this.enemyManager.enemies[i].aabb.renderDebug(this.model);
			// this.drawSpriteByID(this.itemArray[i].id, this.itemArray[i].posX, this.itemArray[i].posY,1,1,false,this.itemArray[i].angle);
		 }
		 this.currentWarrior.aabb.renderDebug(this.model);
		 
		 //Dead
		 if(this.currentWarrior.health <= 0) {
			this.model.clearScreen('#FFF');
			this.model.drawText("YOU ARE DEAD",this.currentWarrior.posX,this.currentWarrior.posY,30,"rgba(255,0,0,1.0)");
		}
		 
	}
	
	this.init = function(){
		//left arrow - 37
		//right arrow - 39
		//control - 17
		this.currentWarrior.setupKeyPresses(/*left*/37, /*right*/39, /*special*/17);
		this.inited = true;
	}
}