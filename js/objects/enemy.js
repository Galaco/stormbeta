function Enemy(sprite, posX, posY){
	//Sprite
	this.sprite = sprite;
	
	this.speed = 1;
	this.hp = 100;
	this.aabb = new AABB(1,1,2,2);
	//Position setting
	this.posX = posX
	this.posY = posY
	
	var self = this;
	
	this.sprite.onload = function() {
	delete this.aabb;
		self.aabb = new AABB(posX-self.sprite.width/2, posY-self.sprite.height/2, posX+self.sprite.width/2, posY+self.sprite.height/2);
		
	}
	
	
	this.update = function() {
		if (this.posX < 480 - this.sprite.width/2){
			this.posX+=this.speed;
		} else if (this.posX > 480 + this.sprite.width/2) {
			this.posX-=this.speed;
		}
		
		this.aabb.update(this.posX, this.posY);
	}
	
	this.onCollision = function() {
		console.log("enemy hit");
	}
}
	