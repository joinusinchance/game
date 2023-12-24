
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
var source=[];
var target={};
var combineWith=[];
var distanceText;
//var from= {}; 
//var to={};

var experiment_item_1;
var experiment_item_2;
var experiment_item_3;
var experiment_item_4;
var experiment_item_3_details;
var on_workbench = [];


new Phaser.Game(config);

function preload ()
{
    this.load.image('spanner', 'assets/spanner_small.png');
    this.load.image('broken_tv', 'assets/broken_tv_small.png');
    this.load.image('bored_old_man', 'assets/bored_old_man_small.png');
    this.load.image('slightly_used_tv', 'assets/slightly_used_tv_small.png');
    this.load.image('lemon_seeds', 'assets/lemon_seeds_small.png');
}

function create ()
{

    source =[100,100,200,100,300,100,400,100]; // TODO
    combineWith = ['spanner','broken_tv','slightly_used_tv'];

    //source = this.physics.add.sprite(100, 100, 'flower');
    experiment_item_1 = this.physics.add.sprite(source[0],source[1], 'spanner').setInteractive();
    experiment_item_2 = this.physics.add.sprite(source[2],source[3], 'broken_tv').setInteractive();
    experiment_item_3 = this.physics.add.sprite(source[4],source[5], 'bored_old_man').setInteractive();
    experiment_item_4 = this.physics.add.sprite(source[6],source[7], 'lemon_seeds').setInteractive();
    
    target.x = 400; //pointer.x;
    target.y = 400;//pointer.y;

    debug = this.add.graphics();


    experiment_item_1_details = new aItem
    (
        type = "small_item"
        , name = "spanner"
        , image= undefined
        , upgradeTo= "slightly_used_tv"
        , combineWith= "broken_tv"
        , addItems= undefined
        , addLocations= undefined
        , upgradeLocation= undefined
        , drawPosition= [400,100] // consider depreciating as covered by sprite object
        , items= undefined
        , nextTo= undefined
        , layout= undefined
        , text= undefined
        , sprite= experiment_item_3
    ) ;

    experiment_item_2_details = new aItem
    (
        type = "small_item"
        , name = "broken_tv"
        , image= undefined
        , upgradeTo= "slightly_used_tv"
        , combineWith= "spanner"
        , addItems= undefined
        , addLocations= undefined
        , upgradeLocation= undefined
        , drawPosition= [400,100] // consider depreciating as covered by sprite object
        , items= undefined
        , nextTo= undefined
        , layout= undefined
        , text= undefined
        , sprite= experiment_item_3
    ) ;

    experiment_item_3_details = new aItem
    (
        type = "small_item"
        , name = "bored_old_man"
        , image= undefined
        , upgradeTo= "lemon_seeds"
        , combineWith= "slightly_used_tv"
        , addItems= undefined
        , addLocations= undefined
        , upgradeLocation= undefined
        , drawPosition= [400,100] // consider depreciating as covered by sprite object
        , items= undefined
        , nextTo= undefined
        , layout= undefined
        , text= undefined
        , sprite= experiment_item_3
    ) ;

    console.log (experiment_item_3_details.drawPosition);

    // create listener event ons.. 

    experiment_item_1.on('pointerup', function (pointer) {
       
        console.log ("click 1");
        this.physics.moveToObject(experiment_item_1, target, 600);

  },this);


    experiment_item_2.on('pointerup', function (pointer) {
       
            console.log ("click 2");

            this.physics.moveToObject(experiment_item_2, target, 600);

      },this);

      experiment_item_3.on('pointerup', function (pointer) {
       
        console.log ("click 3");
        this.physics.moveToObject(experiment_item_3, target, 600);

  },this);

    distanceText = this.add.text(10, 10, 'Click to set target', { fill: '#00ff00' });



}

function update ()
{
    stop_if_arrived(experiment_item_1, target);
    stop_if_arrived(experiment_item_2, target);
    stop_if_arrived(experiment_item_3, target);
}

function stop_if_arrived(a_source, a_target) 
{
    var distance = Phaser.Math.Distance.Between(a_source.x, a_source.y, a_target.x, a_target.y);
    if (a_source.body.speed > 0)
    {
        if (distance < 12)
        {
            ///source.body.reset(target.x, target.y);
            a_source.body.reset(target.x, target.y);

            on_workbench.push(a_source);
            if (on_workbench.length ==2){
                upgrade_if_matched(on_workbench[0],on_workbench[1]);
            }
            
            
        }
    }
} 

function  upgrade_if_matched(item_1, item_2)
{
    console.log ("testing workbench");
    console.log(on_workbench[0].name);

}

