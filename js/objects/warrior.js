function Warrior(spriteA, posX, posY, colliderImg){

	//Sprite setting
	this.sprite = spriteA;
		
	//Position setting
	this.posX = posX
	this.posY = posY
	
	//Storing key press setting
	this.leftAttackKey = null;
	this.rightAttackKey = null;
	this.specialActivateKey = null;
	
	//Child sprites

	this.childLeftOffset = 30;
	this.childRightOffset = 30;
	this.childLeft = new ChildCollider(this.posX - this.childLeftOffset, this.posY, colliderImg);
	this.childRight = new ChildCollider(this.posX + this.childLeftOffset, this.posY, colliderImg);
	
	//Attacking state
	this.currentAttackTime = 0;
	this.currentDelayTime = 0;
	this.attacking = false;
	this.delaying = false;
	this.attackingTime = 0.5;
	this.delayTime = 0.5;
	
	this.setupKeyPresses = function(leftAttack, rightAttack, specialActive) {
		this.leftAttackKey = leftAttack;
		this.rightAttackKey = rightAttack;
		this.specialActivateKey = specialActive;
	}
	
	this.update = function(frameTime, keys) {
		//Attack handling
		if(this.attacking == true) {
			this.currentAttackTime += frameTime;
			if(this.currentAttackTime > this.attackingTime){
				this.attacking = false;
				this.delaying = true;
				this.childLeft.setActive(false);
				this.childRight.setActive(false);		
				this.currentAttackTime = 0;
			}
			return;
		}
		
		if(this.delaying == true) {
			this.currentDelayTime += frameTime;
			if(this.currentDelayTime > this.delayTime){
				this.delaying = false;
				this.currentDelayTime = 0;
			}
			return;
		}
				
		if (this.leftAttackKey in keys) {
			this.attackLeft();
			this.attacking = true;
		}
		
		if (this.rightAttackKey in keys) {
			this.attackRight();
			this.attacking = true;
		}
		
		if (this.specialActivateKey in keys) {
			this.activateSpecial();
		}
	}
	
	this.attackLeft = function() {
		this.childLeft.setActive(true);
	}
	
	this.attackRight = function() {
		this.childRight.setActive(true);
	}
	
	this.activateSpecial = function() {
	}
}

function ChildCollider(xpos, ypos, sprite)
{
	this.width = sprite.width;
	this.height = sprite.height;
	this.xpos = xpos;
	this.ypos = ypos;
	this.sprite = sprite;
	this.visiblity = false;
	this.attacking = false;
	
	this.setActive = function(isActive){
		this.visibility = isActive;
		this.attacking = isActive;
	}
}
	