

function renderInit(){
    //ground.render();
}

function render(){
    
    
    for(var entity in Entities){
        Entities[entity].render();
    }
}

function update(){
    if(IO.keyTapped(38)) Matter.Body.setVelocity(
        player.physical,
        Matter.Vector.create(player.physical.velocity.x, -player.jump)
    );
    
    for(var entity in Entities){
        Entities[entity].update();
    }
}

function gameOver(){
    Render.stop();
    Update.stop();
    
    Matter.Composite.clear(engine.world);
    Entities = [];
    
    init();
}

Matter.Events.on(engine, 'collisionActive', function(e){
    for(var i in e.pairs){
        var pair = e.pairs[i];
        if(!(pair.bodyA.label == 'player' || pair.bodyB.label == 'player'))
        continue;
        if(!(pair.bodyA.class == 'game_over' || pair.bodyB.class == 'game_over'))
        continue;
        
        gameOver();
    }
});

$(document).ready(init());