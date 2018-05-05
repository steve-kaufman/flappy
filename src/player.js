var player = {
    width : 32,
    height : 32,
    x : window.innerWidth / 2 - this.width / 2,
    y : window.innerHeight / 4
};

player = new Entity(player.x, player.y, player.width, player.height);