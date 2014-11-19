function EnemyManager(canvasWidth, canvasHeight, enemyImg){
	
	this.enemyImg = enemyImg;
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.enemies = [];
	//this.enemyYpos = 420;
	this.shouldSpawn = true;
	this.currentDifficulty = 1;
	this.timeTillDifficultyIncreases = 20; //Seconds
	this.currentTimeOnDifficulty = 0;
	
	this.timeTillSpawn = 4/this.currentDifficulty;
	this.timeWaitedForSpawn = 0;
	
	this.update = function(time){
		//Update time on difficulty to check if increase is needed
		this.currentTimeOnDifficulty += time;
		this.timeWaitedForSpawn += time;
		
		if(this.currentTimeOnDifficulty > this.timeTillDifficultyIncreases){
			//Reset time
			this.currentTimeOnDifficulty = 0;
			++this.currentDifficulty;
			this.timeTillSpawn = 4/this.currentDifficulty;
		}
		
		//Check to see if something needs spawning
		if(this.timeWaitedForSpawn > this.timeTillSpawn)
		{
			//Spawn something
			if(this.shouldSpawn){
				this.spawnEnemyRandomly();
			}
			this.timeWaitedForSpawn = 0;
		}	
	}
	
	this.spawnEnemyRandomly = function(){
		var enemySpawnPositionRange = 100;
		//Pick side
		var side =  Math.random()<.5;
		this.result = 0;
		
		//y = 400-450
		this.spawnY = this.generateRand(400, 450);
		
		//left
		if(side == false){
			this.result = this.generateRand(0, enemySpawnPositionRange);
			//this.result = 10;
		} else {
			this.result = this.generateRand(this.canvasWidth - enemySpawnPositionRange, this.canvasWidth);
			//this.result = this.canvasWidth - 10;
		}
			var enemyToAdd = new Enemy(this.enemyImg, this.result, this.spawnY);  
			this.enemies.push(enemyToAdd);
	}
	
	this.generateRand = function(lowNumber, highNumber){
		return Math.floor(Math.random() * (highNumber - lowNumber + 1)) + lowNumber;
	}
}
	