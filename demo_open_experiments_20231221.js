
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
        update: update,
        stop_if_arrived: stop_if_arrived,
        return_item : return_item
    }
};  

var debug;
var shelf_space={};
var target={};
var combineWith=[];
var distanceText;
//var from= {}; 
//var to={};
shelf_space.x = {};
shelf_space.y = {};


var experiment_item_1;
var experiment_item_2;
var experiment_item_3;
var experiment_item_4;
var experiment_item_3_details;
var on_workbench = [];


var a_game = new Phaser.Game(config);

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

    shelf_space.x = [100,200,300,400,500,600,100,200]; 
    shelf_space.y = [100,100,100,100,100,100,200,200]; 
    combineWith = ['spanner','broken_tv','slightly_used_tv'];

    //source = this.physics.add.sprite(100, 100, 'flower');
    experiment_item_1 = this.physics.add.sprite(shelf_space.x[0],shelf_space.y[0], 'spanner').setInteractive();
    experiment_item_2 = this.physics.add.sprite(shelf_space.x[1],shelf_space.y[1], 'broken_tv').setInteractive();
    experiment_item_3 = this.physics.add.sprite(shelf_space.x[2],shelf_space.y[2], 'bored_old_man').setInteractive();
    experiment_item_4 = this.physics.add.sprite(shelf_space.x[3],shelf_space.y[3], 'lemon_seeds').setInteractive();
    
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
        , drawPosition= [shelf_space.x[0],shelf_space.y[0]] // consider depreciating as covered by sprite object
        , items= undefined
        , nextTo= undefined
        , layout= undefined
        , text= undefined
        , sprite= experiment_item_1
        , currentStatus = 'on shelf'
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
        , drawPosition= [shelf_space.x[1],shelf_space.y[1]] // consider depreciating as covered by sprite object
        , items= undefined
        , nextTo= undefined
        , layout= undefined
        , text= undefined
        , sprite= experiment_item_2
        , currentStatus = 'on shelf'
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
        , drawPosition= [shelf_space.x[2],shelf_space.y[2]] // consider depreciating as covered by sprite object
        , items= undefined
        , nextTo= undefined
        , layout= undefined
        , text= undefined
        , sprite= experiment_item_3
        , currentStatus = 'on shelf'
    ) ;


    //HTMLFormControlsCollection.log(this.Phaser.) 

    console.log (experiment_item_3_details.drawPosition);

    // create listener event ons.. 

    experiment_item_1.on('pointerup', function (pointer) {
       
        console.log ("click 1");
        //this.physics.moveToObject(experiment_item_1_details.sprite, target, 600);
        experiment_item_1_details.currentStatus = 'moving to workbench';
        this.physics.moveToObject(experiment_item_1_details.sprite, target, 600);
  },this);


    experiment_item_2.on('pointerup', function (pointer) {
       
            console.log ("click 2");

            this.physics.moveToObject(experiment_item_2_details.sprite, target, 600);

      },this);

      experiment_item_3.on('pointerup', function (pointer) {
       
        console.log ("click 3");
        this.physics.moveToObject(experiment_item_3_details.sprite, target, 600);

  },this);

    distanceText = this.add.text(10, 10, 'Click to set target', { fill: '#00ff00' });



}

function update ()
{
    /*
    if (experiment_item_1_details.currentStatus =='move to workbench' ) {
        console.log ("transporting.. ");
        stop_if_arrived(experiment_item_1_details, target, this);
    }
    else if (experiment_item_1_details.currentStatus == 'return to shelf') {
        var a_target = {};
        a_target.x = 10;
        a_target.y = 10;
        console.log (a_target);
        this.physics.moveToObject(experiment_item_1_details.sprite, a_target, 600);
        //a_scene.physics.moveToObject(a_source.sprite, a_target, 600);

    }
    */
    manage_movement(experiment_item_1_details, this);
    stop_if_arrived(experiment_item_2_details, target, this, 'on workbench');
    stop_if_arrived(experiment_item_3_details, target, this, 'on workbench');


    //this.physics.moveToObject(experiment_item_1_details.sprite, a_target, 600);
}

function manage_movement(a_source, a_scene)
{
    if (a_source.currentStatus =='moving to workbench' ) {
        console.log ("transporting.. ");
        stop_if_arrived(a_source, target, a_scene, 'on workbench');
    }
    else if (a_source.currentStatus =='on workbench' ) {
        console.log ("on");
    } 
    else if (a_source.currentStatus == 'return to shelf') {
        var a_target = {};
        a_target.x = 10;
        a_target.y = 10;
        console.log (a_target);
        a_scene.physics.moveToObject(a_source.sprite, a_target, 600);
        a_source.currentStatus = 'returning to shelf'
        a_scene.physics.moveToObject(a_source.sprite, a_target, 600);
    }
    else if (a_source.currentStatus == 'returning to shelf') {

    }
}

function stop_if_arrived(a_source, a_target, a_scene, nextStatus) 
{
    var distance = Phaser.Math.Distance.Between(a_source.sprite.x, a_source.sprite.y, a_target.x, a_target.y);
    if (a_source.sprite.body.speed > 0)
    {
        console.log (a_source.name, distance);
        if (distance < 12)
        {
            ///source.body.reset(target.x, target.y);
            a_source.sprite.body.reset(target.x, target.y);
 
            // for the moment, only allow 2 items on workbench
            if (on_workbench.length ==2) {
               // return_item(on_workbench[0]);
                on_workbench[0].currentStatus = 'return to shelf'
                on_workbench.shift();
                // change to make first sprite ratehr than last 

                var a_target = {};
                a_target.x = 10;
                a_target.y = 10;
                console.log (a_target);
                //a_source.currentStatus= 'return to shelf';

                //a_scene.physics.moveToObject(a_source.sprite, a_target, 600);
            }

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
    console.log(on_workbench[0].combineWith); 
    console.log(on_workbench[1].name);
    console.log(on_workbench[1].combineWith);
}

function return_item(item_1)
{
    // clean this up
    var a_target = {};
    a_target.x = item_1.drawPosition[0];
    a_target.y = item_1.drawPosition[1];
    console.log (a_target);
    //globalThis.physics.moveToObject(item_1.sprite, a_target, 600);
    this.scene.physics.moveToObject(item_1.sprite, a_target, 600);
}
