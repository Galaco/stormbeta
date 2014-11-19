function UIElement(sprite, posX, posY, prefix, suffix, imgOffsetX, imgOffsetY) {
	this.text = "";
	this.suffix = prefix;
	this.prefix = suffix;
	this.sprite = sprite;
	
	this.offsetX = imgOffsetX;
	this.offsetY = imgOffsetY;

	this.posX = posX;
	this.posY = posY;
	this.numerical = 0;
	
	var self = this;
	
	this.updateCallback = function(){};
	
	this.update = function() {
		this.numerical = this.updateCallback();
		
		this.text = this.prefix + this.numerical + this.suffix;
	}
}