
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
        experiment_item_1_details.currentStatus = 'move to workbench';
        this.physics.moveToObject(experiment_item_1_details.sprite, target, 600);
  },this);


    experiment_item_2.on('pointerup', function (pointer) {
       
            console.log ("click 2");

            this.physics.moveToObject(experiment_item_2_details.sprite, target, 600);
            experiment_item_2_details.currentStatus = 'move to workbench';
      },this);

      experiment_item_3.on('pointerup', function (pointer) {
       
        console.log ("click 3");
        this.physics.moveToObject(experiment_item_3_details.sprite, target, 600);
        experiment_item_3_details.currentStatus = 'move to workbench';

  },this);

    distanceText = this.add.text(10, 10, 'Click to set target', { fill: '#00ff00' });

    var a_target = {};
    a_target.x = 400;
    a_target.y = 400;

   // this.physics.moveToObject(experiment_item_1_details.sprite, a_target, 600);


}

function update ()
{
    var a_bench_target = {};
    a_bench_target.x = 400;
    a_bench_target.y = 400;

    var a_shelf_target = {};
    a_shelf_target.x = 100;
    a_shelf_target.y = 100;



    

    manage_movement (experiment_item_1_details, this);
    manage_movement (experiment_item_2_details, this);
    manage_movement (experiment_item_3_details, this);

}







function manage_movement (a_source, a_scene) 
{

var a_bench_target = {};
a_bench_target.x = 400;
a_bench_target.y = 400;
// shelf target shpould only be called qhen required
var a_shelf_target = {};
a_shelf_target.x = a_source.drawPosition[0];
a_shelf_target.y =  a_source.drawPosition[1];

if (a_source.currentStatus=='move to workbench')
    {
        console.log ("moving to workbench");
        if ( stop_if_arrived(a_source, a_bench_target , 'on bench') == true) 
        {
            console.log ("BENCH!!!" , a_source.currentStatus);
        }
    }

    // chekc that we can break the loop if we need to
    if (a_source.currentStatus == 'on bench')
    {
        a_source.currentStatus = 'move to shelf';

        a_scene.physics.moveToObject(a_source.sprite, a_shelf_target, 600);
    }


    if (a_source.currentStatus=='move to shelf')
    {
        if (stop_if_arrived(a_source, a_shelf_target,this, 'on shelf') ) 
        {
            console.log ("SHELF!!!");
            //this.physics.moveToObject(experiment_item_1_details.sprite, a_bench_target, 600);
        }
    }

}



function stop_if_arrived(a_source, a_target, nextStatus) 
{
    var arrived = false;
    var distance = Phaser.Math.Distance.Between(a_source.sprite.x, a_source.sprite.y, a_target.x, a_target.y);
    if (a_source.sprite.body.speed > 0)
    {
        console.log (a_source.name, "distiance:",distance);
        if (distance < 12)
        {
            ///source.body.reset(target.x, target.y);
            a_source.sprite.body.reset(a_target.x, a_target.y);
            a_source.currentStatus = nextStatus;
            arrived = true;
        }
    }
    return arrived;
} 


function manage_movement_old (a_source, a_scene)
{
    if (a_source.currentStatus =='moving to workbench' ) {
        //console.log ("transporting.. ");
         
        if(stop_if_arrived(a_source, target, a_scene, 'on workbench')== true)
         {
            on_workbench.push(a_source);
            console.log ("workbench items:",on_workbench.length );
         }
         
    }
    else if (a_source.currentStatus =='on workbench' ) {
        //console.log ("on");
    } 
    else if (a_source.currentStatus == 'return to shelf') {
        var a_target = {};
        a_target.x = a_source.drawPosition[0];
        a_target.y =  a_source.drawPosition[1];
        console.log (a_target);
        //a_scene.physics.moveToObject(a_source.sprite, a_target, 600);
        a_source.currentStatus = 'returning to shelf'
        a_scene.physics.moveToObject(a_source.sprite, a_target, 600);
    }
    else if (a_source.currentStatus == 'returning to shelf') {
        var a_target = {};
        a_target.x = a_source.drawPosition[0];
        a_target.y = a_source.drawPosition[1];
        //console.log ("returning to shelf", a_source.name ,a_target);
        stop_if_arrived(a_source, a_target, a_scene, 'on shelf'); 
    }
    else if (a_source.currentStatus == 'on shelf') {
       // console.log (">>>",a_source.name, 'on shelf','#',  a_source.sprite.name,"<<<" );
        
    }
}

function manage_workbench () {
 
            // for the moment, only allow 2 items on workbench
            //console.log ("workbech items", on_workbench.length)
            if (on_workbench.length ==3) {
                // return_item(on_workbench[0]);
                 on_workbench[0].currentStatus = 'return to shelf'
                 on_workbench.shift();

             }
 
    //             on_workbench.push(a_source);
  
             if (on_workbench.length ==2){
                // upgrade_if_matched(on_workbench[0],on_workbench[1]);
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
