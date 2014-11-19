function Animation(image,maxFrames,width,height,speed){
	
	this.image = image;
	this.width = width;
	this.height = height;
	this.maxFrames = maxFrames;
	this.frameNo = 0;
	this.speed = speed; //in seconds
	this.clock = 0;
	this.loop = 1;
	this.state = 1; // 0 - paused // 1 - playing // 2 - stopped
	this.flipX = 1; // 1 - normal // -1 - flipped
	this.flipY = 1; // 1 - normal // -1 - flipped
		
	this.update = function(/*float*/ frameTime){
		//if (this.state != 1 || this.maxFrames == 1 || this.speed == 0)
			//return;
	
		//increment the clock
		this.clock += frameTime;

		//check if needs to be updated
		if (this.clock > this.speed)
		{
			//get how many frames to skip based on time passed
			var frameSkip = Math.floor(this.clock/this.speed);
			this.clock -= frameSkip*this.speed; //subtract that time from clock

			this.frameNo += frameSkip; //update new frames position

			//fix current frames position
			if (this.frameNo >= this.maxFrames)
			{
				if (this.loop == 1)
					this.frameNo = 0;
				else
					this.state = 2;
			}
		}
	}
}