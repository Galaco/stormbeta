function AABB(/*sprite*/sprite){
	this.width = sprite.width;
	this.height = sprite.height;
	this.x1 = sprite.posX;
	this.x2 = sprite.posX+sprite.width;
	this.y1 = sprite.posY;
	this.y2 = sprite.posY+sprite.height;
	this.originX = sprite.posX+sprite.width/2;
	this.originY = sprite.posY+sprite.height/2;
	
	colliding = function(/*AABB*/other){		
		if(Math.abs(this.x1 - other.x1) > this.width + other.width) {
			if(Math.abs(this.y1 - other.y1) < this.height + other.height)
			{
				return true;
			}
		}
		return false;
	}
	
	update = function(/*sprite*/sprite) {
		this.originX = sprite.posX+sprite.width/2;
		this.originY = sprite.posY+sprite.height/2;
	}
}