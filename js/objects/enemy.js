function Enemy(sprite, posX, posY){
	//Sprite
	this.sprite = sprite;
	this.aabb = new AABB(this.sprite);
	this.speed = 1;
	this.hp = 100;
	
	//Position setting
	this.posX = posX
	this.posY = posY
	
	this.update = function() {
		if (this.posX < 480){
			this.posX+=this.speed;
		} else {
			this.posX-=this.speed;
		}
	}
}
	