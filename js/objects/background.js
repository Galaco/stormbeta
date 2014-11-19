function Background(/*GraphicsHandler*/ graphicsHandler, /*imgPath*/directory){
	this.sprite = graphicsHandler.loadImg(directory);
	this.scrollRate = 1;
	this.zIndex = -1;
	this.posX = 0;
	this.posY = 0;
	this.leftInstance = 1;
	this.width = this.sprite.width;
	this.height = this.sprite.height;
	
	this.setScrollRate = function(/*ScrollRate*/scrollSpeed){
		this.scrollRate = scrollSpeed;
	}
	
	this.setLayerIndex = function(layer){
		this.zIndex = layer;
	}
	
	this.scroll = function (){
		this.posX  -= this.scrollRate;
		if (this.posX < 480) {
			this.leftInstance = 1;
		}
		if (this.posX < -480) {
			this.posX = 1440;
			this.leftInstance = 0;
		}
	}
}