var pipespeed = 8;
function Pipe(){
	this.reproduced = false;
	
	this.spacing = player.height * 7;
	
	this.splitY = (Math.random() * window.innerHeight * 0.7) +
					(window.innerHeight * 0.15);
	this.width = player.width * 7;
	this.height = this.splitY;
	this.x = window.innerWidth + this.width / 2;
	this.y = -100 + this.height / 2;
		
	console.log(this.splitY);
	
	this.top = new Entity(this.x, this.y, this.width, this.height,
							   {isStatic : true, isSensor : true, class : 'game_over'});
	var bot = {};
	bot.width = this.width;
	bot.height = window.innerHeight - this.y + 100;
	bot.x = this.x;
	bot.y = this.y + this.height / 2 + this.spacing + bot.height / 2;
	
	this.bottom = new Entity(bot.x, bot.y, 
							 bot.width, bot.height,
							 {isStatic : true, isSensor : true, class : 'game_over'});
	
	this.top.color = 'green';
	this.bottom.color = 'green';
	
	this.physical = this.top.physical;
	
	this.move = function(){
		Matter.Body.setPosition(
			this.physical,
			Matter.Vector.create(this.physical.position.x - pipespeed,
								 this.y)
		);
		Matter.Body.setPosition(
			this.bottom.physical,
			Matter.Vector.create(this.physical.position.x,
								 bot.y)
			);
	}
	
	this.update = function(){
		this.move();
		if(this.physical.position.x < window.innerWidth / 2 && !this.reproduced){
			new Pipe();
			this.reproduced = true;
			score += 1;
			pipespeed += 0.2;
		}
		if(this.physical.position.x < -this.width) this.destroy();
	};
	
	this.destroy = function(){
		Matter.Composite.remove(engine.world, [this.physical, this.bottom.physical]);
		for(var i in Entities){
			if(Entities[i] === this){
				Entities.splice(i - 2, 3);
			}
		}
	};
	
	
	Entities.push(this);
	
	console.log(Entities);
}