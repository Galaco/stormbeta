function AABB(x1, y1, x2, y2){
	this.x1 = x1;
	this.x2 = x2;
	this.y1 = y1;
	this.y2 = y2;
	this.originX = x1 + ((x2 - x1) / 2);
	this.originY = y1 + ((y2 - y1) / 2);
	console.log("originX = ", this.originX);
	console.log("originY = ", this.originY);
	
	this.colliding = function(/*AABB*/other){		
		if(!(((this.x2< other.x1)||(other.x2<other.x1))||((this.y2 <other.y1)||(other.y2<this.y1)))){
		return true;
		}
		return false;
	}
	
	this.update = function(xpos, ypos) {
		xdiff = this.originX + (xpos - this.originX);
		ydiff = this.originY + (ypos - this.originY);
		this.x1 = this.x1 + xdiff;
		this.x2 = this.x2 + xdiff;
		this.y1 = this.y1 + ydiff;
		this.y2 = this.y2 + ydiff;
		
		this.originX = xdiff;
		this.originY = ydiff;
	}
}