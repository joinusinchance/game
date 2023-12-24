
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
        return_item: return_item
    }
};

var debug;
var shelf_space = {};
var target = {};
var combineWith = [];
var distanceText;
var firstTime = true;
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
var items;
var collected_items = [];

var a_game = new Phaser.Game(config);

function preload() {
    this.load.image('spanner', 'assets/spanner_small.png');
    this.load.image('broken_tv', 'assets/broken_tv_small.png');
    this.load.image('bored_old_man', 'assets/bored_old_man_small.png');
    this.load.image('slightly_used_tv', 'assets/slightly_used_tv_small.png');
    this.load.image('lemon_seeds', 'assets/lemon_seeds_small.png');
}

function create() {

    shelf_space.x = [100, 200, 300, 400, 500, 600, 100, 200];
    shelf_space.y = [100, 100, 100, 100, 100, 100, 200, 200];






    //source = this.physics.add.sprite(100, 100, 'flower');
    experiment_item_1 = this.physics.add.sprite(shelf_space.x[0], shelf_space.y[0], 'spanner').setInteractive();
    experiment_item_2 = this.physics.add.sprite(shelf_space.x[1], shelf_space.y[1], 'broken_tv').setInteractive();
    experiment_item_3 = this.physics.add.sprite(shelf_space.x[2], shelf_space.y[2], 'bored_old_man').setInteractive();
    experiment_item_4 = this.physics.add.sprite(-100, -100, 'lemon_seeds').setInteractive();
    experiment_item_5 = this.physics.add.sprite(-100, -100, 'slightly_used_tv').setInteractive();



    target.x = 400; //pointer.x;
    target.y = 400;//pointer.y;

    debug = this.add.graphics();


    //items = {
    //        "a broken TV": new item(

    items = {
    "spanner" : new aItem
        (
            type = "small_item"
            , name = "spanner"
            , image = undefined
            , upgradeTo = undefined
            , combineWith = "broken_tv"
            , addItems = undefined
            , addLocations = undefined
            , upgradeLocation = undefined
            , drawPosition = [shelf_space.x[0], shelf_space.y[0]] // consider depreciating as covered by sprite object
            , items = undefined
            , nextTo = undefined
            , layout = undefined
            , text = undefined
            , sprite = experiment_item_1
            , currentStatus = 'on shelf'
            , previousStatus = ''
        ), 
        "broken_tv" : new aItem
        (
            type = "small_item"
            , name = "broken_tv"
            , image = undefined
            , upgradeTo = "slightly_used_tv"
            , combineWith = "spanner"
            , addItems = undefined
            , addLocations = undefined
            , upgradeLocation = undefined
            , drawPosition = [shelf_space.x[1], shelf_space.y[1]] // consider depreciating as covered by sprite object
            , items = undefined
            , nextTo = undefined
            , layout = undefined
            , text = undefined
            , sprite = experiment_item_2
            , currentStatus = 'on shelf'
            , previousStatus = ''
        ),

        "bored_old_man": new aItem
        (
            type = "small_item"
            , name = "bored_old_man"
            , image = undefined
            , upgradeTo = "lemon_seeds"
            , combineWith = "slightly_used_tv"
            , addItems = undefined
            , addLocations = undefined
            , upgradeLocation = undefined
            , drawPosition = [shelf_space.x[2], shelf_space.y[2]] // consider depreciating as covered by sprite object
            , items = undefined
            , nextTo = undefined
            , layout = undefined
            , text = undefined
            , sprite = experiment_item_3
            , currentStatus = 'on shelf'
            , previousStatus = ''
        ),

        "slightly_used_tv": new aItem
        (
            type = "small_item"
            , name = "slightly_used_tv"
            , image = undefined
            , upgradeTo = undefined
            , combineWith = undefined
            , addItems = undefined
            , addLocations = undefined
            , upgradeLocation = undefined
            , drawPosition = undefined //[shelf_space.x[2], shelf_space.y[2]] // consider depreciating as covered by sprite object
            , items = undefined
            , nextTo = undefined
            , layout = undefined
            , text = undefined
            , sprite = experiment_item_5
            , currentStatus = 'on shelf'
            , previousStatus = ''
        )
    };


    collected_items.push(items["spanner"]);
    collected_items.push(items["broken_tv"]);
    collected_items.push(items["bored_old_man"]);

    console.log (collected_items);
    console.log (collected_items[1]);




    //HTMLFormControlsCollection.log(this.Phaser.) 

    //console.log(experiment_item_3_details.drawPosition);

    // create listener event ons.. 

    experiment_item_1.on('pointerup', function (pointer) {

        console.log("click 1");
        collected_items[0].currentStatus = 'move to workbench';
        this.physics.moveToObject(collected_items[0].sprite, target, 600);
    }, this);


    experiment_item_2.on('pointerup', function (pointer) {

        console.log("click 2");
        collected_items[1].currentStatus = 'move to workbench';
        this.physics.moveToObject(collected_items[1].sprite, target, 600);
    }, this);

    experiment_item_3.on('pointerup', function (pointer) {

        console.log("click 3");
        collected_items[2].currentStatus = 'move to workbench';
        this.physics.moveToObject(collected_items[2].sprite, target, 600);

    }, this);

    distanceText = this.add.text(10, 10, 'Click to set target', { fill: '#00ff00' });

    var a_target = {};
    a_target.x = 400;
    a_target.y = 400;

    // this.physics.moveToObject(experiment_item_1_details.sprite, a_target, 600);


}

function update() {
    console.log(collected_items[0].name);
    manage_movement(collected_items[0], this);
    manage_movement(collected_items[1], this);
    manage_movement(collected_items[2], this);
    //manage_movement(experiment_item_2_details, this);

    manage_workbench();
}







function manage_movement(a_source, a_scene) {

    var a_bench_target = {};
    a_bench_target.x = 400;
    a_bench_target.y = 400;
    // shelf target shpould only be called qhen required
    var a_shelf_target = {};
    a_shelf_target.x = a_source.drawPosition[0];
    a_shelf_target.y = a_source.drawPosition[1];

    if (a_source.currentStatus == 'move to workbench') {
        console.log("moving to workbench");
        if (stop_if_arrived(a_source, a_bench_target, 'on bench') == true) {
            console.log("BENCH!!!", a_source.currentStatus);
            on_workbench.push(a_source);
        }
    }

    // chekc that we can break the loop if we need to
    if (a_source.currentStatus == 'on bench') {
        //a_source.currentStatus = 'move to shelf';

        //
    }


    if (a_source.currentStatus == 'move to shelf') {
        console.log(a_source.name);
        if(a_source.previousStatus != a_source.currentStatus)
        {
            a_scene.physics.moveToObject(a_source.sprite, a_shelf_target, 600);
            a_source.previousStatus = a_source.currentStatus;
        }


        if (stop_if_arrived(a_source, a_shelf_target, this, 'on shelf')) {
            console.log(a_source.name, "SHELF!!!");
            //this.physics.moveToObject(experiment_item_1_details.sprite, a_bench_target, 600);
        }
    }

}



function stop_if_arrived(a_source, a_target, nextStatus) {
    var arrived = false;
    var distance = Phaser.Math.Distance.Between(a_source.sprite.x, a_source.sprite.y, a_target.x, a_target.y);
    if (a_source.sprite.body.speed > 0) {
        console.log(a_source.name, "distiance:", distance);
        if (distance < 12) {
            ///source.body.reset(target.x, target.y);
            a_source.sprite.body.reset(a_target.x, a_target.y);
            a_source.currentStatus = nextStatus;
            arrived = true;
        }
    }
    return arrived;
}



function manage_workbench() {

    // for the moment, only allow 2 items on workbench
    //console.log ("workbech items", on_workbench.length)
    if (on_workbench.length == 3) {
        console.log ("should never get here --- too many - move to shelf!!");
        on_workbench[0].currentStatus = 'move to shelf'
        console.log ("item:" , on_workbench[0].name)
        
        on_workbench.shift();

    }

    //             on_workbench.push(a_source);

    if (on_workbench.length == 2) {
        upgrade_if_matched(on_workbench[0],on_workbench[1]);
    
        
    
    }
}


function upgrade_if_matched(item_1, item_2) {
    console.log("testing workbench");
    console.log(on_workbench[0].name);
    console.log(on_workbench[0].combineWith);
    console.log(on_workbench[1].name);
    console.log(on_workbench[1].combineWith);

    if (on_workbench[0].name == on_workbench[1].combineWith || on_workbench[1].name == on_workbench[0].combineWith ) // we may get scenarious where there is not symetry
    {
        console.log ("UPGRADE!!!!!!!!");
        if (on_workbench[0].upgradeTo)
        {
            console.log ("ITEM 1 CANNN   UPGRADE!!!!!!!!");
        }

        if (on_workbench[1].upgradeTo)
        {
            console.log ("ITEM 2 CANNN   UPGRADE!!!!!!!!");
            //console.log("found:" , collected_items.findIndex ((element) => element.name == "broken_tv"));
            var from_item = on_workbench[1].name;
            var from_item_id = collected_items.findIndex ((element) => element.name == from_item);                
            var drawPosition =[];
            var spriteDrawPosition =[];
            drawPosition  = on_workbench[1].drawPosition;
            spriteDrawPosition  = [on_workbench[1].sprite.x,on_workbench[1].sprite.y];


            console.log ("ugrade details from ", from_item, from_item_id);
            
            collected_items.findIndex ((element) => element.name == "broken_tv");

            console.log (on_workbench[1].upgradeTo,"upgrade to:",items[on_workbench[1].upgradeTo]);

            console.log ("upgrade item:", on_workbench[1].name);
            on_workbench[1].sprite.visible = false;
            on_workbench[1] = items[on_workbench[1].upgradeTo];

            console.log ("upgraded to:", on_workbench[1].name);
            
            console.log ("collected item :",collected_items[from_item_id].name);
            console.log ("----");
            collected_items[from_item_id] = on_workbench[1]; 
            console.log ("collected upgraded :",collected_items[from_item_id].name);
            
            console.log ("move status",collected_items[from_item_id].currentStatus );

            collected_items[from_item_id].previousStatus = 'on bench';        
            collected_items[from_item_id].currentStatus = 'move to shelf';
 
 
            //collected_items[from_item_id].drawPosition = drawPosition;
            collected_items[from_item_id].drawPosition = drawPosition;
            collected_items[from_item_id].sprite.x = spriteDrawPosition[0];
            collected_items[from_item_id].sprite.y = spriteDrawPosition[1];

            console.log ("all items now:",collected_items);
        }


    }

}

function return_item(item_1) {
    // clean this up
    var a_target = {};
    a_target.x = item_1.drawPosition[0];
    a_target.y = item_1.drawPosition[1];
    console.log(a_target);
    //globalThis.physics.moveToObject(item_1.sprite, a_target, 600);
    this.scene.physics.moveToObject(item_1.sprite, a_target, 600);
}
