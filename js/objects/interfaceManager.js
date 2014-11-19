function UIManager(){
	this.elements = [];
	
	this.addElement = function(uielement) {
		this.elements.push(uielement);
	}
	
	this.update = function() {
		for(i = 0; i < this.elements.length; i++)
		 {
			this.elements[i].update();
		 }
	}
}
	