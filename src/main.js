var backctx = Canvas.create();

Canvas.create();

var flappy_song = document.createElement('AUDIO');
flappy_song.src = "music/flappy.wav";
flappy_song.loop = true;
flappy_song.autoplay = true;

var accomp_sound = document.createElement('AUDIO');
accomp_sound.src = 'sounds/accomp.wav';

var birdImg = new Sprite('images/bird.png');

var loading = true;

var score;

var backgrounds = [
    new Sprite('images/turtle.png'),
    new Sprite('images/bird.png'),
    new Sprite('images/slime.png')
    ];

var colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'black',
    'white',
    'grey',
    'brown',
    'pink',
    ];
    
Update.framerate = 60;
Render.framerate = 60;

function init(){
    backctx.ctx.clear();
    
    document.body.style.background = 'blue';
    
	pipespeed = 8;
	
    engine.world.gravity.y = 2;
	
	score = 0;
	
    player.init();
    
    player.entity.sprite = birdImg;
	
	ceiling = new Entity(0, -125, window.innerWidth, 50, {isStatic : true});
	
	new Pipe();
		
    Update.start();
    Render.start();
	loading = false;
}

function renderInit(){
    
}

function render(){
    Canvas.ctx.clear();
    
    for(var entity in Entities){
        if(Entities[entity].render){
			Entities[entity].render();
		}
    }
    player.entity.render();
}

function update(){
    player.update();
    	
	$('#score')[0].innerHTML = score;
		
    for(var entity in Entities){
		if(Entities[entity].update){
			Entities[entity].update();
		}
	}
}

function gameOver(){
	loading = true;
	
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
		
        if(!loading) gameOver();
    }
});

if(window.init) $(document).ready(init());