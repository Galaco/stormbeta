function Enemy(sprite, posX, posY){
	//Sprite
	this.sprite = sprite;
	this.aabb = new AABB(posX-(sprite.width/2), posY-(sprite.height/2), posX+(this.sprite.width/2), posY+(this.sprite.height/2));
	this.speed = 1;
	this.hp = 100;
	this.dead = false;
	
	//Position setting
	this.posX = posX
	this.posY = posY
	
	this.update = function() {
		if (this.posX < 480 - this.sprite.width/2){
			this.posX+=this.speed;
		} else if (this.posX > 480 + this.sprite.width/2) {
			this.posX-=this.speed;
		}
		this.aabb.update(this.posX, this.posY);
	}
	
	this.onCollision = function() {
		this.hp -= 50;
		if(this.hp <= 0) {
			this.dead = true;
		}
		//Push left
		if(this.posX < 480){
			this.posX -= 15;
		}else{
			this.posX += 15;
		}
	}
}
	