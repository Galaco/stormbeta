/*
	This object loads and holds all sounds.
	NEEDS TO BE UPDATED IF CALLED TO RELEASE MEMORY OF CALLED SOUNDS. (clean())
*/
function AudioHandler(){
	//detect IE
	this.getInternetExplorerVersion = function(){
		// Returns the version of Internet Explorer or a -1
		// (indicating the use of another browser).
		var rv = -1; // Return value assumes failure.
		if (navigator.appName == 'Microsoft Internet Explorer'){
			var ua = navigator.userAgent;
			var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null)
			rv = parseFloat( RegExp.$1 );
		}
		return rv;
	}
	
	//Some variebles to store required data
	this.supportAudio = this.getInternetExplorerVersion();
	this.sounds = [];
	
	//METHODS
	this.play = function(/*Audio*/ sound){
		if (this.supportAudio === -1){
			sound.currentTime=0;
			sound.play();
			this.sounds.push(sound);
		}
	}

	//deletes finished sounds from the array
	this.clean = function(){
		for (var i = 0; i < this.sounds.length ; ++i){
			if (this.sounds[i].ended === true){
				this.sounds.splice(i,1);
				--i;
			}
		}
	}
}