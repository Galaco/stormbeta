/*
	This object loads and holds all sprites
	and game area where they are drawn.
	Also has methods to load images and to draw them on screen.
*/

function GraphicsHandler(gameSurface){
	//creates image and returns it preloaded with image from source
	this.loadImg = function(/*string*/source) {
		image = new Image(); 
		image.src = source;
		return image;
	}

	//setup screen where you can draw stuff
	this.gameArea 		= gameSurface.getGameArea();
	this.canvasWidth	= gameSurface.canvas.width;
	this.canvasHeight	= gameSurface.canvas.height;
	this.offsetX		= 0;	//camera X offset
	this.offsetY		= 0;	//camera Y offset 
	
	this.gameArea.textAlign = "left";
	//this.gameArea.textBaseline = "top";
	
	//draws sprite
	this.draw = function(/*img*/image, /*float*/x, /*float*/y, /*float*/angle, /*float*/scaleX, /*float*/scaleY, /*float*/alpha){ 
		//sets default values
		x 		= typeof x 		!== 'undefined' ? x : (image.width/2);
		y 		= typeof y 		!== 'undefined' ? y : (image.height/2);
		angle 	= typeof angle 	!== 'undefined' ? angle : 0;
		scaleX 	= typeof scaleX !== 'undefined' ? scaleX : 1.0;
		scaleY 	= typeof scaleY !== 'undefined' ? scaleY : 1.0;
		alpha 	= typeof alpha 	!== 'undefined' ? alpha : 1.0;
		
		//check if needs drawing
		if (((x-this.offsetX+(image.width*scaleX/2) > 0) && (y-this.offsetY+(image.height*scaleY/2) > 0)) 
		&& ((x-this.offsetX-(image.width*scaleX/2) < this.canvasWidth) && (y-this.offsetY-(image.height*scaleY/2) < this.canvasHeight))) {
			
			//save the current co-ordinate system 
			//before we screw with it
			this.gameArea.save(); 
		 
			//move to the middle of where we want to draw our image
			this.gameArea.translate(x-this.offsetX, y-this.offsetY);
		 
			//rotate around that point, converting our 
			//angle from degrees to radians 
			this.gameArea.rotate(angle * (Math.PI/180));
			
			//scale image
			this.gameArea.scale(scaleX,scaleY);
			
			//set alpha
			this.gameArea.globalAlpha = alpha;
			
			//draw it up and to the left by half the width
			//and height of the image to make it centered 
			//origin is center of the image
			this.gameArea.drawImage(image, -(image.width/2), -(image.height/2));
			
			//and restore the co-ords to how they were when we began
			this.gameArea.restore(); 
		}
	}
	
	//draws sprite
	this.drawAnimFrame = function(/*Animation*/ animation, /*float*/x, /*float*/y, /*float*/ angle){ 
		//sets default values
		x 		= typeof x 		!== 'undefined' ? x : (animation.width/2);
		y 		= typeof y 		!== 'undefined' ? y : (animation.height/2);
		//frameNo = typeof frameNo !== 'undefined' ? frameNo : 0;
		angle 	= typeof angle 	!== 'undefined' ? angle : 0;
		//scaleX 	= typeof scaleX !== 'undefined' ? scaleX : 1.0;
		//scaleY 	= typeof scaleY !== 'undefined' ? scaleY : 1.0;
		//alpha 	= typeof alpha 	!== 'undefined' ? alpha : 1.0;
	
		//save the current co-ordinate system 
		//before we screw with it
		this.gameArea.save(); 
	 
		//move to the middle of where we want to draw our image
		this.gameArea.translate(x-this.offsetX, y-this.offsetY);
	 
		//rotate around that point, converting our 
		//angle from degrees to radians 
		this.gameArea.rotate(angle * (Math.PI/180));
		
		//scale image
		this.gameArea.scale(animation.flipX,animation.flipY);
		
		//set alpha
		//this.gameArea.globalAlpha = alpha;

		var sourceW = animation.width;
		var sourceH = animation.height;
		var sourceX = animation.frameNo * sourceW;
		var sourceY = 0;
		
		//this.gameArea.drawImage(animation.image, 0, 0);
	    this.gameArea.drawImage(animation.image, sourceX, sourceY, sourceW, sourceH, -(sourceW/2), -(sourceH/2), sourceW, sourceH);

		//and restore the co-ords to how they were when we began
		this.gameArea.restore(); 
	}
	
	//draws text on canvas
	this.drawText = function(/*string*/ text, /*float*/ x, /*float*/ y, /*int*/ size, /*color*/ color, /*font*/ font, /*float*/ angle, /*bool*/stroke, /*int*/ strokeW) {
		//set default values
		text 	= 	typeof text 	!== 'undefined' ? text : "N/A";
		x 		= 	typeof x 		!== 'undefined' ? x : 0;
		y 		= 	typeof y 		!== 'undefined' ? y : 0;
		size 	= 	typeof size 	!== 'undefined' ? size : 18;
		color 	= 	typeof color 	!== 'undefined' ? color : "rgba(255,255,255,1.0)";
		font 	= 	typeof font 	!== 'undefined' ? font : "Ariel";
		angle 	= 	typeof angle 	!== 'undefined' ? angle : 0;
		stroke 	= 	typeof stroke 	!== 'undefined' ? stroke : 0;
		strokeW = 	typeof strokeW	!== 'undefined' ? strokeW : 1;
		
		//set font size
		this.gameArea.font = size + "px " + font;
		
		this.gameArea.save(); 
		//if (angle != 0){
		//	this.gameArea.textAlign = "center";
		//}
		
		this.gameArea.translate(x-this.offsetX,y-this.offsetY);
		this.gameArea.rotate(angle * (Math.PI/180));
		
		//draw text
		if (stroke == 0) {
			//fill text
			this.gameArea.fillStyle = color;
			this.gameArea.fillText(text,0,0); //take out offset to make text appear static
		} else {
			//strike text
			this.gameArea.lineWidth = strokeW;
			this.gameArea.strokeStyle = color;
			this.gameArea.strokeText(text,0,0); //take out offset to make text appear static
		}
		this.gameArea.restore();
	}
	
	//clears canvas
	this.clearScreen = function(/*color, empty for no color*/ color){
		if (typeof color === 'undefined'){
			this.gameArea.clearRect(0,0,this.canvasWidth,this.canvasHeight);
		} else {
			this.gameArea.fillStyle=color;
			this.gameArea.fillRect(0,0,this.canvasWidth,this.canvasHeight);
		}
	}
		//Draws a line
	this.drawLine = function(/*int*/x1,/*int*/y1,/*int*/x2,/*int*/y2, /*color*/ color, /*float*/ width){
		color 	= 	typeof color 	!== 'undefined' ? color : "rgba(255,255,255,1.0)"; //Default white
		color 	= 	typeof color 	!== 'undefined' ? color : 2; //Default white
		
		this.gameArea.strokeStyle = color;
		this.gameArea.fillStyle = color;
		this.gameArea.lineWidth = width;
		this.gameArea.beginPath();
		this.gameArea.moveTo(x1,y1);
		this.gameArea.lineTo(x2,y2);
		this.gameArea.stroke();

		this.gameArea.closePath();
	}
	
		this.drawBackground = function(/*img*/bgInstance, /*float*/x, /*float*/y, /*float*/angle, /*float*/scaleX, /*float*/scaleY, /*float*/alpha){ 
		//sets default values
		image = bgInstance.sprite;
		x 		= typeof x 		!== 'undefined' ? x : (image.width/2);
		y 		= typeof y 		!== 'undefined' ? y : (image.height/2);
		angle 	= typeof angle 	!== 'undefined' ? angle : 0;
		scaleX 	= typeof scaleX !== 'undefined' ? scaleX : 1.0;
		scaleY 	= typeof scaleY !== 'undefined' ? scaleY : 1.0;
		alpha 	= typeof alpha 	!== 'undefined' ? alpha : 1.0;
		
		//check if needs drawing
		//if (((x-this.offsetX+(image.width*scaleX/2) > 0) && (y-this.offsetY+(image.height*scaleY/2) > 0)) 
		//&& ((x-this.offsetX-(image.width*scaleX/2) < this.canvasWidth) && (y-this.offsetY-(image.height*scaleY/2) < this.canvasHeight))) {
			
			//save the current co-ordinate system 
			//before we screw with it
			this.gameArea.save(); 
		 
			//move to the middle of where we want to draw our image
			this.gameArea.translate(x-this.offsetX, y-this.offsetY);
		 
			//rotate around that point, converting our 
			//angle from degrees to radians 
			this.gameArea.rotate(angle * (Math.PI/180));
			
			//scale image
			this.gameArea.scale(scaleX,scaleY);
			
			//set alpha
			this.gameArea.globalAlpha = alpha;
			
			//draw it up and to the left by half the width
			//and height of the image to make it centered 
			//origin is center of the image
			this.gameArea.drawImage(image, -(image.width/2), -(image.height/2));
			if(bgInstance.leftInstance){					
				this.gameArea.drawImage(image, -(image.width/2)+image.width, -(image.height/2));
			} else {
				this.gameArea.drawImage(image, -(image.width/2)-image.width, -(image.height/2));
			}
			
			
			
			//and restore the co-ords to how they were when we began
			this.gameArea.restore(); 
		//}
	}
}
