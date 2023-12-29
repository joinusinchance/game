const phaserConfig = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    dom: {
        createContainer: false,
    },
    scene: 'scene_01',
    backgroundColor: 0x000000,
    transparent: true,
    physics: {
        default: 'arcade'
    },
    scene: {
        init: initScene,
        preload: preloadScene,
        create: createScene,
        update: updateScene
    }
}

console.log("item home is ", items["home"]);
console.log(Object.keys(items).length);





const game = new Phaser.Game(phaserConfig);

let old_game_state = "";
let layout = "info"; /// (info, level, experiments)
let layout_state = 0; // used for  clicking through texts etc 
let this_background;
let this_text;
let click_state = 0;

//let info_text = items["opening screen clean"].text;

var current_location; // store current location


// for the moment, only have a maaxof three items to pick up per location
var item_1;
var item_2;
var item_3;

var default_item_location = {};

default_item_location.x = {};
default_item_location.y = {};

var item_here = [];

var collected_items = [];


var icon_left;
var icon_right;
var icon_up;
var icon_down;
var icon_expiriment;

//// set experiment section...

var on_workbench = []; // stores an array of items that are on the workbench

var shelf_space = {};
var target = {};
var combineWith = [];
var distanceText;

shelf_space.x = {};
shelf_space.y = {};


var sprite_item_1;
var sprite_item_2;
var sprite_item_3;
var sprite_item_4;
var sprite_item_5;
var sprite_item_6;
var sprite_item_7;
var sprite_item_8;
var sprite_item_9;

function initScene() { }

function preloadScene() {
    // navigation icons
    this.load.image('left', 'assets/left_arrow_shiny.png');
    this.load.image('right', 'assets/right_arrow_shiny.png');
    this.load.image('icon experiments', 'assets/experiments_small.png');
    // small items you can pick up
    for (const prop in items) {
        console.log(items[prop].name, "---", items[prop].image);
        console.log(items[prop].currentStatus);
    
        if (items[prop].image !== undefined) {
            console.log("item has an image");
            if (items[prop].image.slice(-4) == '.png') {
                console.log ("png file ready");
                console.log("attempting to load ", items[prop].name, "---", items[prop].image);
                this.load.image(items[prop].name, items[prop].image);
            }
        }
        else {
            console.log("item doesnt have an image");
        }
    }
}


function createScene() {

    console.log("name of location", items["opening screen clean"].name);
    //this_background = this.add.image(0, 0, "");

    this_background = this.add.image(0, 0, "");

    icon_left = this.add.sprite(50, 300, 'left').setInteractive();
    icon_right = this.add.sprite(750, 300, 'right').setInteractive();
    icon_experiments = this.add.sprite(700, 50, 'icon experiments').setInteractive();

    // load all configurable locations and items based on info in ..item_initialisation.js
    for (const prop in items) {
        console.log(items[prop].name, "---", items[prop].image);
        console.log(items[prop].currentStatus);
    
        if (items[prop].image !== undefined) {
            console.log("item has an image");
            if (items[prop].image.slice(-4) == '.png') {
                console.log ("png file ready");
                console.log("attempting to load ", items[prop].name, "---", items[prop].image);
                this.load.image(items[prop].name, items[prop].image);
            }
        }
        else {
            console.log("item doesnt have an image");
        }
    
    }

    this_text = this.add.text(40, 100, "..", {
        fontSize: '32px',
        fill: '#000',
        wordWrap: { width: 760, useAdvancedWrap: true }
    });


    //icon_current_location.visible = false;
    //icon_current_location.visible = false


    default_item_location.x = [100, 200, 300];
    default_item_location.y = [500, 500, 500];


    shelf_space.x = [100, 200, 300, 400, 500, 600, 100, 200];
    shelf_space.y = [100, 100, 100, 100, 100, 100, 200, 200];


    // workbench targets
    target.x = 400; //pointer.x;
    target.y = 400;//pointer.y;


    //background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, '');

    //background.setTexture('experiments');


    const sprite_item_1 = this.physics.add.sprite(100, 500, '');
    const sprite_item_2 = this.physics.add.sprite(200, 500, '');
    const sprite_item_3 = this.physics.add.sprite(300, 500, '');
    const sprite_item_4 = this.physics.add.sprite(400, 500, '');
    const sprite_item_5 = this.physics.add.sprite(500, 500, '');
    const sprite_item_6 = this.physics.add.sprite(600, 500, '');
    const sprite_item_7 = this.physics.add.sprite(100, 500, '');
    const sprite_item_8 = this.physics.add.sprite(200, 500, '');
    const sprite_item_9 = this.physics.add.sprite(300, 500, '');

    sprite_item_1.visible = false;
    sprite_item_2.visible = false;
    sprite_item_3.visible = false;
    sprite_item_4.visible = false;
    sprite_item_5.visible = false;
    sprite_item_6.visible = false;
    sprite_item_7.visible = false;
    sprite_item_8.visible = false;
    sprite_item_9.visible = false;

    item_here.push(sprite_item_1);
    item_here.push(sprite_item_2);
    item_here.push(sprite_item_3);
    item_here.push(sprite_item_4);
    item_here.push(sprite_item_5);
    item_here.push(sprite_item_6);
    item_here.push(sprite_item_7);
    item_here.push(sprite_item_8);
    item_here.push(sprite_item_9);





    set_up_location(this, "opening screen clean");  // first location we need to assigned, from then on location points to next location via nexTo[]


    icon_left.on('pointerdown', function (pointer) {
        console.log("go left");
        set_up_location(this, current_location.nextTo[0]);
    });
    icon_right.on('pointerdown', function (pointer) {
        console.log("go right");
        set_up_location(this, current_location.nextTo[1]);
    });
    icon_experiments.on('pointerdown', function (pointer) {



        if (current_location.name != "experiments") {

            console.log("go experiments");
            set_up_location(this, "experiments");
            set_up_experiments();
        }
        else {
            set_up_location(this, collected_items[0].name);
        }
    });


    sprite_item_1.on('pointerdown', function (pointer) {

        /// refactor duplicate  x 8 is bad
        console.log(current_location.name, '---', current_location.layout);

        if (current_location.layout == 'location') {
            console.log("sprite click_item_1");
            collected_items.push(items[items[current_location.name].items[0]]);
            //collected_items.push(items[current_location.name]);
            console.log(collected_items);
            current_location.items.splice(0, 1);
            sprite_item_1.visible = false;
        }
        else if (current_location.layout == 'experiments') {
            console.log("sprite click_item_1 experiments ", target);


            console.log("click 1");
            collected_items[0].currentStatus = 'move to workbench';
            //this.physics.moveToObject(collected_items[0].sprite, target, 600);
            this.physics.moveToObject(sprite_item_1, target, 600);

        }


    }, this);





    sprite_item_2.on('pointerdown', function (pointer) {

        console.log(current_location.name, '---', current_location.layout);

        if (current_location.layout == 'location') {
            console.log("sprite click_item_1");
            collected_items.push(items[items[current_location.name].items[1]]);
            console.log(collected_items);
            current_location.items.splice(1, 1);
            //sprite_item_2.visible = false;
            set_up_location(this, current_location.name); /// a bad way but works for now

            console.log(current_location.items);
        }
        else if (current_location.layout == 'experiments') {
            console.log("sprite click_item_1 experiments ", target);


            console.log("click 2");
            collected_items[1].currentStatus = 'move to workbench';
            //this.physics.moveToObject(collected_items[0].sprite, target, 600);
            this.physics.moveToObject(sprite_item_2, target, 600);

        }


    }, this);

    sprite_item_3.on('pointerdown', function (pointer) {

        console.log(current_location.name, '---', current_location.layout);

        if (current_location.layout == 'location') {
            console.log("sprite click_item_1");
            collected_items.push(items[items[current_location.name].items[2]]);
            console.log(collected_items);

            current_location.items.splice(2, 1);
            //sprite_item_2.visible = false;
            set_up_location(this, current_location.name); /// a bad way but works for now


            console.log(current_location.items);
        }
        else if (current_location.layout == 'experiments') {
            console.log("sprite click_item_1 experiments ", target);


            console.log("click 2");
            collected_items[2].currentStatus = 'move to workbench';
            //this.physics.moveToObject(collected_items[0].sprite, target, 600);
            this.physics.moveToObject(sprite_item_3, target, 600);

        }


    }, this);


    sprite_item_4.on('pointerdown', function (pointer) {

        console.log(current_location.name, '---', current_location.layout);

        if (current_location.layout == 'location') {
            console.log("sprite click_item_1");
            collected_items.push(items[items[current_location.name].items[3]]);
            console.log(collected_items);

            current_location.items.splice(2, 1);
            //sprite_item_2.visible = false;
            set_up_location(this, current_location.name); /// a bad way but works for now



        }
        else if (current_location.layout == 'experiments') {
            console.log("sprite click_item_1 experiments ", target);


            console.log("click 2");
            collected_items[3].currentStatus = 'move to workbench';
            //this.physics.moveToObject(collected_items[0].sprite, target, 600);
            this.physics.moveToObject(sprite_item_4, target, 600);

        }


    }, this);

    sprite_item_5.on('pointerdown', function (pointer) {

        console.log(current_location.name, '---', current_location.layout);

        if (current_location.layout == 'location') {
            console.log("sprite click_item_5");
            collected_items.push(items[items[current_location.name].items[4]]);
            console.log(collected_items);

            current_location.items.splice(2, 1);
            //sprite_item_2.visible = false;
            set_up_location(this, current_location.name); /// a bad way but works for now



            sprite_item_5.visible = false;
        }
        else if (current_location.layout == 'experiments') {
            console.log("sprite click_item_5 experiments ", target);


            console.log("click 5");
            collected_items[4].currentStatus = 'move to workbench';
            //this.physics.moveToObject(collected_items[0].sprite, target, 600);
            this.physics.moveToObject(sprite_item_5, target, 600);

        }


    }, this);



}



function updateScene() {
    //console.log("here");
    opening_update();

    if (this.input.activePointer.isDown && click_state == 0) {
        console.log("pointer down");
        click_state = 1;
    }
    else if (!this.input.activePointer.isDown && click_state == 1) {
        console.log("pointer up", layout_state);
        click_state = 0;
        //progress_game_state(layout, layout_state);
        progress_game_state(current_location.layout, layout_state);
    }

    if (current_location.layout == 'experiments') {
        for (i = 0; i < collected_items.length; i++) {
            manage_movement(collected_items[i], this);
        }

        manage_workbench();
    }


}


function set_up_location(a_scene, a_location) {
    current_location = items[a_location];
    this_background.setTexture(current_location.name);
    //collected_items.shift();
    layout_state = 0;


    //this_background = a_scene.add.image(0, 0, items[a_location].name);
    //this_background = a_scene.add.image(0, 0, items[a_location].name);

    this_background.alpha = 1;
    this_background.setOrigin(0, 0);
    this_background.displayWidth = 800;
    this_background.displayHeight = 600;

    // by defualt hide all sprites
    icon_left.visible = false;
    icon_right.visible = false;
    icon_experiments.visible = false;
    /*
        item_1.visible = false;
        item_2.visible = false;
        item_3.visible = false;
    */



    for (i = 0; i < item_here.length; i++) {
        item_here[i].visible = false;
    }

    // if current scne layout = location show left right up down experiments 
    if (current_location.layout == 'location') {




        items[current_location.nextTo[0]].nextTo[1] = current_location.name;
        items[current_location.nextTo[1]].nextTo[0] = current_location.name;
    
    
        console.log("set up locations - ", current_location,'##' ,items[current_location.nextTo[0]].nextTo[1], '-##-');

        console.log(collected_items.length, '<< collected items');


        // lets just use first itemslot for location
        if (collected_items.length == 0) {

            collected_items.push(items[items[current_location.name].items[0]]);
            //collected_items.push(items[current_location.name]);
            /// item 0 needs to hide generallyitem_here[0].visible = false;
        }
        else {

            collected_items[0] = items[items[current_location.name].items[0]];
            //collected_items.push(items[current_location.name]);
            /// item 0 needs to hide generallyitem_here[0].visible = false;
        }




        //collected_items[0] = current_location;

        //console.log("current location is", current_location.name,'--',collected_items[0].name );

        console.log("-layout location-", item_here.length)
        icon_left.visible = true;
        icon_right.visible = true;
        icon_experiments.visible = true;

        // be cheeky set up current location as item & hide...
        //current_location.items.unshift(current_location.name);


        if (current_location.items !== undefined) {
            for (i = 0; i < current_location.items.length; i++) {
                item_here[i].setTexture(current_location.items[i]);
                item_here[i].visible = true;
                item_here[i].setInteractive();

                // the locations should have default draw postions for each item not the items 
                console.log(items[current_location.items[i]]);
                if (items[current_location.items[i]].drawPosition !== undefined && items[current_location.items[i]].drawPosition.length > 0) {
                    console.log("custom draw positions");
                    item_here[i].x = items[current_location.items[i]].drawPosition[0];
                    item_here[i].y = items[current_location.items[i]].drawPosition[1];
                }
                else {
                    item_here[i].x = default_item_location.x[i];
                    item_here[i].y = default_item_location.y[i];
                }
            }
        }

        /// first item holds our location, as such hide
        item_here[0].visible = false;

    }



    // if current scene has intro text display !
    if (current_location.text) {

        console.log("location has text");
        /*
        this_text = a_scene.add.text(40, 100, current_location.text[0], {
            fontSize: '32px',
            fill: '#000',
            wordWrap: { width: 760, useAdvancedWrap: true }
        });
        */
        this_text.text = current_location.text[0];
        console.log('text:' ,this_text.text);
        this_text.visible = true;
        if (current_location.layout == "location") {
            this_text.alpha = 1;
            this_text.visible.alpha = 1;
            this_background.alpha = 0.2;
        }
        else {

            this_text.alpha = 0;
            this_text.visible.alpha = 0;
        }
    }
    else {
        this_text.visible = false;
    }




}

function progress_game_state(layout, layout_stage) {

    if (current_location.text !== undefined) {
        this_text.text.visible = true;

        console.log(current_location.text);
        //if (layout == "info" && layout_state < current_location.text.length) 
        if (layout_state < current_location.text.length) {
            layout_state += 1;
            this_text.text = current_location.text[layout_stage];
            console.log(current_game_state_stage, current_location.text[current_game_state_stage]);
        }
        else if (current_location.layout = 'info')  // if all text click are used up and location  = info .. go to next location
        {
            set_up_location(this, current_location.nextTo[0]);
        }
    }
    else { // if location does not have text hide text object
        this_text.text.visible = false;
    }
    /// else route to next screen
}


function opening_update() {

    if (current_location.layout == "info" && current_location.text) {
        if (current_game_state_stage = -1 && this_background.alpha > 0.15) {
            this_background.alpha = this_background.alpha - 0.005;
            this_text.alpha += 0.1;

        }
    }
}


function set_up_experiments() {
    // set all items sprites to visible = false


    //collected_items.push(collected_items[0]);

    //collected_items[0] = collected_items[1]; // check if there is anything wrong woith the object iteself
    console.log("experiments:", collected_items.length);
    icon_experiments.visible = true;
    for (i = 0; i < item_here.length; i++) {
        item_here[i].visible = false;
    }
    // for all collected items, set up sprite configuration= false
    // consider that this is experiment location config -- adapt fro all others 
    for (i = 0; i < collected_items.length; i++) {
        console.log("set up experiment for -", collected_items[i].name, '--', shelf_space.x[i], ' #---');
        item_here[i].visible = true;
        collected_items[i].sprite = item_here[i];
        collected_items[i].sprite.setTexture(collected_items[i].name);
        collected_items[i].sprite.displayWidth = 100;
        collected_items[i].sprite.displayHeight = 100;
        collected_items[i].sprite.setInteractive();
        collected_items[i].drawPosition[0] = shelf_space.x[i];
        collected_items[i].drawPosition[1] = shelf_space.y[i];
        collected_items[i].sprite.x = shelf_space.x[i];
        collected_items[i].sprite.y = shelf_space.y[i];
        console.log(i);
    }
}

//////////////////////////////////
//// experiments sectioned hacked on here -- refactor in to seperate file 







function manage_movement(a_source, a_scene) {

    var a_bench_target = {};
    a_bench_target.x = 400;
    a_bench_target.y = 400;
    // shelf target shpould only be called qhen required
    var a_shelf_target = {};
    a_shelf_target.x = a_source.drawPosition[0];
    a_shelf_target.y = a_source.drawPosition[1];


    if (a_source.currentStatus == 'move to workbench') {
        if (stop_if_arrived(a_source, a_bench_target, 'on bench') == true) {
            console.log("BENCH!!!", a_source.currentStatus);
            on_workbench.push(a_source);
        }
    }

    // check that we can break the loop if we need to
    if (a_source.currentStatus == 'on bench') {
        //a_source.currentStatus = 'move to shelf';

        //
    }


    if (a_source.currentStatus == 'move to shelf') {
        if (a_source.previousStatus != a_source.currentStatus) {
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
        console.log("should never get here --- too many - move to shelf!!");
        on_workbench[0].currentStatus = 'move to shelf'
        console.log("item:", on_workbench[0].name)
        on_workbench.shift();

    }
    else if (on_workbench.length == 2) {
        upgrade_if_matched(on_workbench[0], on_workbench[1]);

        on_workbench[0].previousStatus = 'on bench';
        on_workbench[0].currentStatus = 'move to shelf';

        on_workbench[1].previousStatus = 'on bench';
        on_workbench[1].currentStatus = 'move to shelf';
        on_workbench.pop();
        on_workbench.pop();

    }
    else {
        // for the moment, nothing
    }
}

// below needs to be refactored -- but for now , works
function upgrade_if_matched(item_1, item_2) {
    console.log("testing workbench");
    console.log(on_workbench[0].name);
    console.log(on_workbench[0].combineWith);
    console.log(on_workbench[1].name);
    console.log(on_workbench[1].combineWith);

    if (on_workbench[0].name == on_workbench[1].combineWith || on_workbench[1].name == on_workbench[0].combineWith) // we may get scenarious where there is not symetry
    {
        console.log("UPGRADE!!!!!!!!");
        if (on_workbench[0].upgradeTo) {
            // wrkbench items  & dupicate code -- make a  function
            console.log("ITEM 1 CANNN   UPGRADE!!!!!!!!");
            //console.log("found:" , collected_items.findIndex ((element) => element.name == "broken_tv"));
            var from_item = [];
            //from_item[0]= on_workbench[0].name;
            from_item.push(on_workbench[0].name);
            from_item.push(on_workbench[1].name);
            var from_item_id = [];
            var from_sprite = undefined;
            from_item_id.push(collected_items.findIndex((element) => element.name == from_item[0]));
            from_item_id.push(collected_items.findIndex((element) => element.name == from_item[1]));
            var drawPosition0 = []; /// hack sould be array of arrays
            var drawPosition1 = [];
            var spriteDrawPosition0 = [];
            var spriteDrawPosition1 = [];
            drawPosition0 = on_workbench[0].drawPosition;
            drawPosition1 = on_workbench[1].drawPosition;

            ///   code below only looks different

            from_sprite = on_workbench[0].sprite;

            spriteDrawPosition0 = [on_workbench[0].sprite.x, on_workbench[0].sprite.y];
            spriteDrawPosition1 = [on_workbench[0].sprite.x, on_workbench[0].sprite.y];

            on_workbench[0] = items[on_workbench[0].upgradeTo];

            collected_items[from_item_id[0]] = on_workbench[0];

            collected_items[from_item_id[0]].drawPosition = drawPosition0;
            collected_items[from_item_id[0]].sprite = from_sprite;
            collected_items[from_item_id[0]].sprite.setTexture(collected_items[from_item_id[0]].name);

            console.log("all items now:", collected_items);
        }
        if (on_workbench[1].upgradeTo) {
            console.log("ITEM 2 CANNN   UPGRADE!!!!!!!!");
            //console.log("found:" , collected_items.findIndex ((element) => element.name == "broken_tv"));
            var from_item = [];
            //from_item[0]= on_workbench[0].name;
            from_item.push(on_workbench[0].name);
            from_item.push(on_workbench[1].name);
            var from_item_id = [];
            var from_sprite = undefined;
            from_item_id.push(collected_items.findIndex((element) => element.name == from_item[0]));
            from_item_id.push(collected_items.findIndex((element) => element.name == from_item[1]));
            var drawPosition0 = []; /// hack sould be array of arrays
            var drawPosition1 = [];
            var spriteDrawPosition0 = [];
            var spriteDrawPosition1 = [];
            drawPosition0 = on_workbench[0].drawPosition;
            drawPosition1 = on_workbench[1].drawPosition;
            from_sprite = on_workbench[1].sprite;

            spriteDrawPosition0 = [on_workbench[0].sprite.x, on_workbench[1].sprite.y];
            spriteDrawPosition1 = [on_workbench[1].sprite.x, on_workbench[1].sprite.y];


            on_workbench[1] = items[on_workbench[1].upgradeTo];

            collected_items[from_item_id[1]] = on_workbench[1];

            collected_items[from_item_id[1]].drawPosition = drawPosition1;
            collected_items[from_item_id[1]].sprite = from_sprite;
            collected_items[from_item_id[1]].sprite.setTexture(collected_items[from_item_id[1]].name);

            console.log("all items now:", collected_items);
        }
    }
}