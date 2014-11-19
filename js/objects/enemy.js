function Enemy(sprite, posX, posY){
	//Sprite
	this.sprite = sprite;
	this.aabb = new AABB(this.sprite);
	this.speed = 1;
		
	//Position setting
	this.posX = posX
	this.posY = posY
	this.dir = !Boolean(posX);
	
	
	this.update = function() {
		if (this.dir){
			this.posX+=this.speed;
		} else {
			this.posX-=this.speed;
		}
		console.log(this.posX);
	}
}
	