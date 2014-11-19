function UIElement(sprite, posX, posY, prefix, suffix, imgOffsetX, imgOffsetY, scaleX, scaleY) {
	this.text = "";
	this.suffix = prefix;
	this.prefix = suffix;
	this.sprite = sprite;
	
	this.offsetX = imgOffsetX;
	this.offsetY = imgOffsetY;

	this.posX = posX;
	this.posY = posY;
	this.scaleX = scaleX;
	this.scaleY = scaleY;
	
	this.numerical = 200;
	
	var self = this;
	
	this.update = function(num) {
		this.numerical = num;
		this.text = this.prefix + this.numerical + this.suffix;
		this.scaleX = this.numerical*2;
	}
}