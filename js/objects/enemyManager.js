function EnemyManager(canvasWidth, canvasHeight, enemyImg){
	
	this.enemyImg = enemyImg;
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.enemies = [];
	this.enemyYpos = 420;
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
		
		//left
		if(side == false){
			//var result = Math.floor((Math.random() * enemySpawnPositionRange) + 0);
			this.result = 100;
		} else {
			//this.result = Math.floor((Math.random() * this.canvasWidth + (this.canvasWidth - enemySpawnPositionRange)));
			this.result = this.canvasWidth - 100;
		}
			var enemyXPos = this.result;
			var enemyYPos = this.enemyYPos;
			enemyToAdd = new Enemy(this.enemyImg, enemyXPos, enemyYPos);  
			this.enemies.push(enemyToAdd);
	}
}
	