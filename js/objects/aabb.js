function AABB(x1, y1, x2, y2){
	this.x1 = x1;
	this.x2 = x2;
	this.y1 = y1;
	this.y2 = y2;
	this.originX = x1 + ((x2 - x1) / 2);
	this.originY = y1 + ((y2 - y1) / 2);
	
	this.colliding = function(/*AABB*/other){		
		if(!(((this.x2< other.x1)||(other.x2<other.x1))||((this.y2 <other.y1)||(other.y2<this.y1)))){
		return true;
		}
		return false;
	}
	
	this.update = function(xpos, ypos) {
		width = x2-x1;
		height = y2-y1;
		
		this.x1 = xpos - width/2;
		this.x2 = this.x1 + width;
		this.y1 = ypos - height/2;
		this.y2 = this.y1 + height;
		
		this.originX = this.x1 + width/2;
		this.originY = this.y1 + height/2;
	}
	
	this.renderDebug = function (model) {
		model.drawLine(this.x1, this.y1, this.x2, this.y2, "#0F0", "2");
	}
}