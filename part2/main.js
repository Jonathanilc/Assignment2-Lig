
var game = new Phaser.Game(800,600,Phaser.AUTO,'',{
    preload:preload,
    create: create,
    render: update
});

var score = 0;

var scoreText;

function preload () {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('grass','assets/ground.png');
    this.load.image('ground','assets/platform.png');
    this.load.image('star','assets/star.png');
    this.load.image('bomb','assets/bomb.png');
    this.load.spritesheet('dude','assets/dude.png',{
        frameWidth: 65, frameHeight: 75
    });

}

function create () {


    this.add.image(400,300,'sky');
    this.add.image(400,300,'grass');

    platforms = this.physics.add.staticGroup();

    platforms.create(400,568,'ground').setScale(2).refreshBody();

    platforms.create(600,400,'ground');
    platforms.create(50,250,'ground');
    platforms.create(750,220,'ground');

    //for player 1
    player = this.physics.add.sprite(100,450,'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude',{start: 0, end: 5}),
        frameRate: 10,
        repeats: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{key: 'dude', frame:6}],
        frameRate: 20

    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude',{start:7,end:12}),
        frameRate:10,
        repeat: -1
    });

    player.body.setGravityY(300);
    this.physics.add.collider(player,platforms);

    cursors = this.input.keyboard.createCursorKeys();

    // stars

    var star = this.physics







    this.physics.add.collider(star,platforms);

    this.physics.add.overlap(player, stars, collectStar, null, this);

    function collectStar (player, star)
    {
        star.disableBody(true, true);
        score += 10;
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0){
            stars.children.iterate(function (child) {
                child.enableBody(true,child.x,0,true,true);
            });

            var x = (player.x < 400) ? Phaser.Math.Between(400,800) : Phaser.Math.Between(0,400);
            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200,200),20);
            bomb.allowGravity = false;
        }
    }

    //score
    scoreText = this.add.text(16,16,'score: 0', {fontSize: '32px', fill: '#000'});

    //bombs
    bombs = this.physics.add.group();
    this.physics.add.collider(bombs,platforms);
    this.physics.add.collider(bombs,player,hitBomb,null,this);

    function hitBomb() {
        this.physics.pause();

        player.setTint(0xff0000);
        player.anims.play('turn');

        gameOver = true;
    }




}

function update() {
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-500);
    }
}


















