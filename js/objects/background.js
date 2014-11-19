function Background(/*GraphicsHandler*/ graphicsHandler, /*imgPath*/directory){
	this.sprite = graphicsHandler.loadImg(directory);
	this.scrollRate = 1;
	this.zIndex = -1;
	this.posX = 0;
	this.posY = 0;
	this.leftInstance = 1;
	this.scaleX = 1;
	this.width = 0;
	this.height = 0;
	
	var self = this;
		
	this.load = function(){
		self.width = this.width;
		self.height = this.height;
		self.scaleX = (1/this.width)*graphicsHandler.canvasWidth;
	}
	
	this.sprite.onload = this.load;
	
	this.setScrollRate = function(/*ScrollRate*/scrollSpeed){
		this.scrollRate = scrollSpeed;
	}
	
	this.setLayerIndex = function(layer){
		this.zIndex = layer;
	}
	
	this.scroll = function (){
		this.posX -= this.scrollRate;
		if (this.posX < (this.sprite.width/2)*this.scaleX) {
			this.leftInstance = 1;
		}
		if (this.posX < -(this.sprite.width/2)*this.scaleX) {
			this.posX = ((this.sprite.width/2)*3)*this.scaleX;
			this.leftInstance = 0;
		}
	}
}