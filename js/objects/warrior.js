function Warrior(spriteA, posX, posY, colliderImg, attackLSheet, attackRSheet){

	//Sprite setting
	this.sprite = spriteA;
	
	this.numberOfAnimFrames = 4;
	this.anim = new Animation(spriteA,this.numberOfAnimFrames,100,100,0.125);
	this.attackAnimR = new Animation(attackRSheet,6, 200, 100, 0.125);
	this.attackAnimR.loop = 0;
	this.attackAnimL = new Animation(attackLSheet,6, 200, 100, 0.125);
	this.attackAnimL.loop = 0;
	this.attackAnimR.frameNo = 0;
	this.attackAnimR.state = 0;
	this.attackAnimL.state = 0;
	this.aabb = new AABB(1,1,2,2);
	var self = this;
	this.health = 100;
	this.animState = 0; //0 - walking, 1 - attack right, 2 - attack left
	
	this.sprite.onload = function() {
		this.actualWidth = self.sprite.width/4;
		self.aabb = new AABB((posX-this.actualWidth/3.5), 
		(posY-self.sprite.height/2), 
		((posX+this.actualWidth/3.5)), 
		(posY+self.sprite.height/2));
	}
		
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
	this.childRight = new ChildCollider(this.posX + this.childRightOffset, this.posY, colliderImg);
	
	//Attacking state
	this.currentAttackTime = 0;
	this.currentDelayTime = 0;
	this.attacking = false;
	this.delaying = false;
	this.attackingTime = 0.5;
	this.delayTime = 0.5;
	
	this.playerAABB = spriteA/2
	
	this.setupKeyPresses = function(leftAttack, rightAttack, specialActive) {
		this.leftAttackKey = leftAttack;
		this.rightAttackKey = rightAttack;
		this.specialActivateKey = specialActive;
	}
	
	this.update = function(frameTime, keys) {
		this.anim.update(frameTime);
		this.attackAnimR.update(frameTime);
		this.attackAnimL.update(frameTime);
		//Attack handling
		if(this.attacking == true) {
			this.currentAttackTime += frameTime;
			if(this.currentAttackTime > this.attackingTime){
				this.attacking = false;
				this.delaying = true;
				this.childLeft.setActive(false);
				this.childRight.setActive(false);		
				this.currentAttackTime = 0;
				this.animState = 0;
				this.attackAnimR.frameNo = 0;
				this.attackAnimL.frameNo = 0;
				this.attackAnimR.state = 0;
				this.attackAnimL.state = 0;
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
			this.attackAnimL.state = 1;
		}
		
		if (this.rightAttackKey in keys) {
			this.attackRight();
			this.attacking = true;
			this.attackAnimR.state = 1;
		}
		
		if (this.specialActivateKey in keys) {
			this.activateSpecial();
		}
	}
	
	this.attackLeft = function() {
		this.childLeft.setActive(true);
		this.animState = 2;
	}
	
	this.attackRight = function() {
		this.childRight.setActive(true);
		this.animState = 1;
	}
	
	this.activateSpecial = function() {
	}
}

function ChildCollider(xpos, ypos, sprite)
{
	this.width = 30;
	this.height = 30;
	this.xpos = xpos;
	this.ypos = ypos;
	this.sprite = sprite;
	this.visiblity = false;
	this.attacking = false;
	this.aabb = new AABB(xpos - (this.width/2), ypos - (this.height/2), xpos + (this.width/2), ypos + (this.height/2));
		
	this.setActive = function(isActive){
		this.visibility = isActive;
		this.attacking = isActive;
	}
	
	this.setPos = function(xpos, ypos){
		this.xpos = xpos;
		this.ypos = ypos;
		this.aabb.update(xpos, ypos);
	}
}
	