function Enemy(spriteL, spriteR, posX, posY){
	//Sprite
	this.spriteL = spriteL;
	this.animL = new Animation(spriteL,4,100,100,0.125);
	this.animR = new Animation(spriteR,4,100,100,0.125);
	//this.aabb = new AABB(1.0, 2.0, 3.0, 4.0);
	this.actualWidth = (spriteL.width/4)
	this.aabb = new AABB(posX-(this.actualWidth/4), posY-(spriteL.height/2), posX+(this.actualWidth/4), posY+(this.spriteL.height/2));
	this.speed = 1;
	this.hp = 100;
	this.animLeft = true; //True if moving left
	this.dead = false;

	
	//Position setting
	this.posX = posX
	this.posY = posY
	
	
	this.update = function(time) {
		this.animL.state = 1;
		if (this.posX < 480 - this.actualWidth/2){
			this.posX+=this.speed;
			this.animLeft = false;
		} else if (this.posX > 480 + this.actualWidth/2) {
			this.posX-=this.speed;
			this.animLeft = true;
		}
		this.aabb.update(this.posX, this.posY);
		this.animL.update(time);
		this.animR.update(time);
	}
	
	this.onCollision = function() {
		this.hp -= 50;
		if(this.hp <= 0) {
			this.dead = true;
		}
		this.animL.state = 0;
		//Push left
		if(this.posX < 480){
			this.posX -= 15;
		}else{
			this.posX += 15;
		}
	}
}
	