var player = {
    width : window.innerHeight / 32,
    height : window.innerHeight / 32,
    
    flap_strength : 15,
    
    init : function(){
        this.x = window.innerWidth / 2 - this.width / 2;
        this.y = 0;
        this.entity = new Entity(this.x, this.y, this.width, this.height,
								 {label : 'player'});
        this.physical = this.entity.physical;
    },
    update : function(){
        if(IO.keyTapped([38, 32, 87, 'click', 'touch'])){
            this.flap();
        }
        if(this.physical.position.y > window.innerHeight){
            if(window.gameOver) gameOver();
        }
        Matter.Body.setPosition(
            this.physical,
            Matter.Vector.create(this.x, this.physical.position.y)
        );
    },
    
    flap : function(){
        Matter.Body.setVelocity(this.physical,
            Matter.Vector.create(this.physical.velocity.x, 
                -this.flap_strength));
    }
};