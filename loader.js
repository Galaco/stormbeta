///////////////////////////////////
//	LOAD EXTERNAL JAVASCRIPT FILES
///////////////////////////////////
document.write("<script src='js/core/gameSurface.js' type='text/javascript'></script>");
document.write("<script src='js/core/graphics.js' type='text/javascript'></script>");
document.write("<script src='js/core/audio.js' type='text/javascript'></script>");
document.write("<script src='js/core/animation.js' type='text/javascript'></script>");

//objects
document.write("<script src='js/objects/game.js' type='text/javascript'></script>");
document.write("<script src='js/objects/rod.js' type='text/javascript'></script>");
document.write("<script src='js/objects/items.js' type='text/javascript'></script>");
document.write("<script src='js/objects/rock.js' type='text/javascript'></script>");
document.write("<script src='js/objects/itemDef.js' type='text/javascript'></script>");
document.write("<script src='js/objects/followObject.js' type='text/javascript'></script>");
document.write("<script src='js/objects/heart.js' type='text/javascript'></script>");
document.write("<script src='js/objects/flyingItem.js' type='text/javascript'></script>");

///////////////////////////////////
//	GAME OBJECT
///////////////////////////////////
function Main(){
	this.FRAME_RATE 	= 1000/60;
	this.gameSurface	= null;  	
	this.model 			= null;
	this.audio			= null;
	this.game 			= null;
	
	this.initGame = function(){
		this.gameSurface	= new GameSurface("MyCanvas",960,540);			//creates and stores game area (canvas)
		this.model 			= new GraphicsHandler(this.gameSurface);		//loads sprites	and has ability to draw them to gameArea	
		this.audio			= new AudioHandler();							//plays and manages sound instances	
		this.game 			= new Game(this.model,this.audio);				//holds all objects and game logic
	}
}

///////////////////////////////////
//	KEY HANDLER
///////////////////////////////////
key = [];

//on key press store pressed key keycode 
//also prevents browser default action on arrow keys and spacebar
addEventListener("keydown", 
function(e) 
{
	key[e.keyCode] = true;
	switch(e.keyCode){
		case 37: case 39: case 38:  case 40: 	//Arrow keys
		case 32: e.preventDefault(); break; 	//Space
		default: break; //Do not block other keys
	}
}, false);

//on key up delete stored keycode
addEventListener("keyup", function(e){
	delete key[e.keyCode];
}, false);


///////////////////////////////////
//	MOUSE HANDLER
///////////////////////////////////
var mouseX = 0;
var mouseY = 0;
var isMouseDown = false;

//NOW CREATED ON WINDOW LOAD TO AVOID CALLING CANVAS BEFORE IT IS CREATED
function addMouseListeners(){
	//ADD MOUSE EVENT LISTENER
	addEventListener("mousedown", 
	function(e) {
		if (mouseX > 0 && mouseX < main.model.canvasWidth && mouseY > 0 && mouseY < main.model.canvasHeight){
			e.preventDefault();
		}
		isMouseDown = true;
	}, true);

	//on mouse up sets to false
	addEventListener("mouseup", 
	function(e) {
		isMouseDown = false;
	}, true);

	//stores mouse coordinates
	addEventListener("mousemove", 
	function (e) {
		var x = e.pageX;
		var y = e.pageY;
		normalizeMouse(x,y);
	});
	
	//ADD TOUCH EVENT LISTENER
 	addEventListener("touchstart", 
	function(e){
		if(this.isMouseDown == true){
			isMouseDown = true;
		} else {
			isMouseDown = true;
			mouseX = e.touches[0].pageX;
			mouseY = e.touches[0].pageY;
			normalizeMouse(mouseX,mouseY);
			if (mouseX > 0 && mouseX < main.model.canvasWidth && mouseY > 0 && mouseY < main.model.canvasHeight){
				e.preventDefault();
			}
		}
	}, false); 
	
	addEventListener("touchend", 
	function(e){
		isMouseDown = false;
	}, false);
	
 	addEventListener("touchmove", 
	function(e){
		mouseX = e.touches[0].pageX ;
		mouseY = e.touches[0].pageY;
		
		isMouseDown = true;
		normalizeMouse(mouseX,mouseY);
		
		//if touch is insige canvas disable browsers default action
		if (mouseX > 0 && mouseX < main.model.canvasWidth && mouseY > 0 && mouseY < main.model.canvasHeight){
			e.preventDefault();
		}
	}, false); 
}

//gets mouse coordinates only in canvas only (x:0, y:0 is canvas top left corner) can go to negative
function normalizeMouse(/*float*/ x, /*float*/ y){
	var offsetX = this.main.gameSurface.canvas.offsetLeft;
	var offsetY = this.main.gameSurface.canvas.offsetTop;
	//var width 	= this.main.gameSurface.canvas.width;
	//var height 	= this.main.gameSurface.canvas.height;
	
	mouseX = x - offsetX;
	mouseY = y - offsetY;
}

///////////////////////////////////
//	ON PAGE LOAD INIT GAME
///////////////////////////////////
var main = new Main();

window.onload = function(){
	main.initGame();			//initialize game
	addMouseListeners();
	loop();
}

//draw loop
window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       || 
				window.webkitRequestAnimationFrame || 
				window.mozRequestAnimationFrame    || 
				window.oRequestAnimationFrame      || 
				window.msRequestAnimationFrame     || 
		function( callback ){
			window.setTimeout(callback, main.FRAME_RATE); 
		};
	})();

///////////////////////////////////
//	MAIN GAME LOOP
///////////////////////////////////
function loop(){
	requestAnimFrame(loop);
	main.game.update(key,mouseX,mouseY,isMouseDown);	//update game
}