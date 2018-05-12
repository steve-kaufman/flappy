Canvas.create();


function init(){
    engine.world.gravity.y = 2;
    
    player.init();
    
    Update.start();
    Render.start();
}

function renderInit(){
    
}

function render(){
    Canvas.ctx.clear();
    
    for(var entity in Entities){
        Entities[entity].render();
    }
}

function update(){
    player.update();
    
    for(var entity in Entities){
        Entities[entity].update();
    }
}

function gameOver(){
    Render.stop();
    Update.stop();
    
    setTimeout(function(){
        Matter.Composite.clear(engine.world);
        Entities = [];
    
        init();
    }, 1000);
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

if(window.init) $(document).ready(init());