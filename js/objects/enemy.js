function Enemy(sprite, posX, posY){
	//Sprite
	this.sprite = sprite;
	this.aabb = new AABB(posX, posY, posX+this.sprite.width, posX+this.sprite.height);
	this.speed = 1;
	this.hp = 100;
	
	//Position setting
	this.posX = posX
	this.posY = posY
	
	this.update = function() {
		if (this.posX < 480 - this.sprite.width/2){
			this.posX+=this.speed;
		} else if (this.posX > 480 + this.sprite.width/2) {
			this.posX-=this.speed;
		}
	}
}
	