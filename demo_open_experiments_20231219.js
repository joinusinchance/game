
/*
Thanks to
https://jsfiddle.net/espace3d/b9085mjp/
for the moveTo demo
*/

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade'
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};  

var debug;
var source;
var target={}
var distanceText;
var to={};

new Phaser.Game(config);

function preload ()
{
    this.load.image('flower', 'assets/sprites/flower-exo.png');
}

function create ()
{
    source = this.physics.add.sprite(100, 300, 'flower');

    debug = this.add.graphics();

    this.input.on('pointerdown', function (pointer) {
        console.log("on")

        target.x = 400; //pointer.x;
        target.y = 400;//pointer.y;
        
        // Move at 200 px/s:
        this.physics.moveToObject(source, target, 200);

        debug.clear().lineStyle(1, 0x00ff00);
        debug.lineBetween(0, target.y, 800, target.y);
        debug.lineBetween(target.x, 0, target.x, 600);


    }, this);

    distanceText = this.add.text(10, 10, 'Click to set target', { fill: '#00ff00' });

    /*
    window.setTimeout(()=>{
            // let target={}
            target.x = 400
            target.y = 400
            this.physics.moveToObject(source, target, 200);
    },5000)

    window.setTimeout(()=>{
            to.x =200
            to.y =200
            this.physics.moveToObject(source, to, 200);
    },1500)
    */

}

function update ()
{
    var distance = Phaser.Math.Distance.Between(source.x, source.y, target.x, target.y);

    if (source.body.speed > 0)
    {
        distanceText.setText('Distance: ' + distance);

        //  4 is our distance tolerance, i.e. how close the source can get to the target
        //  before it is considered as being there. The faster it moves, the more tolerance is required.
        if (distance < 4)
        {
            source.body.reset(target.x, target.y);
        }
    }
}
