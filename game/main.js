var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var Seed;
function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('red','assets/red.png');
    game.load.image('grass','assets/ground.png');
    game.load.image('ground','assets/platform.png');
    game.load.image('star','assets/star.png');
    game.load.image('bomb','assets/bomb.png');
    game.load.spritesheet('dude','assets/trump_run.png',65,75);
}


var platforms;
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.add.image(0,0,'sky');
    this.add.image(0,0,'grass');


    platforms = game.add.group();
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');

    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');

    ledge.body.immovable = true;

    player = game.add.sprite(0, game.world.height - 250, 'dude');

    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3, 4, 5], 10, true);
    player.animations.add('right', [7, 8, 9, 10, 11, 12], 10, true);

    // time to create our seeds
    game.time.events.repeat(Phaser.Timer.SECOND * 4, 100, createSeed,this);








}



function createSeed() {
    Seed = game.add.sprite(game.world.randomX, 500, 'star');

    game.physics.enable(Seed, Phaser.Physics.ARCADE);

    Seed.body.velocity.y = -50;

}

function update() {

    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, Seed, collectStar, null, this);



    cursors = game.input.keyboard.createCursorKeys();

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 6;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }


    function collectStar (player, seed) {

        // Removes the star from the screen
        seed.kill();

    }
}

