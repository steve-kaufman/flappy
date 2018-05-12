var player = {
    width : 32,
    height : 32,
    
    flap_strength : 10,
    
    init : function(){
        this.x = window.innerWidth / 2 - this.width / 2;
        this.y = window.innerHeight / 4;
        this.entity = new Entity(this.x, this.y, this.width, this.height);
        this.physical = this.entity.physical;
    },
    update : function(){
        if(IO.keyTapped(38)){
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