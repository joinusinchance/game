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
    scene: {
        init: initScene,
        preload: preloadScene,
        create: createScene,
        update: updateScene
    }
}

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


function initScene() { }

function preloadScene() {
    // navigation icons
    this.load.image('left', 'assets/left_arrow_shiny.png');
    this.load.image('right', 'assets/right_arrow_shiny.png');
    this.load.image('icon experiments', 'assets/experiments_small.png');


    // special locations
    this.load.image("opening screen clean", "assets/opening_screen_clean.png");
    this.load.image('experiments', 'assets/background_experiments_light.png');
    /// location images
    this.load.image('an_empty_yard', 'assets/an_empty_yard.png');
    this.load.image('a_lemon_tree_in_soil', 'assets/a_lemon_tree_in_soil.png');
    this.load.image('home', 'assets/background_home_light.png');
    this.load.image('road', 'assets/background_road_light.png');
    this.load.image('juice stand', 'assets/juice_bar.png');
    this.load.image('an empty yard', 'assets/an_empty_yard.png');
    this.load.image('a hole in the yard', 'assets/a_hole_in_the_yard.png');
    this.load.image('a hole in the yard closer up', 'assets/a_hole_in_the_yard_closer_up.png');
    this.load.image('lemon tree in soil', 'assets/a_lemon_tree_in_soil.png');


    // small items you can pick up
    this.load.image('spanner', 'assets/spanner_small.png');
    this.load.image('broken_tv', 'assets/broken_tv_small.png');
    this.load.image('bored_old_man', 'assets/bored_old_man_small.png');
    this.load.image('slightly_used_tv', 'assets/slightly_used_tv_small.png');
    this.load.image('lemon_seeds', 'assets/lemon_seeds_small.png');
    this.load.image('manure', 'assets/manure_small.png');
    this.load.image('lemon_tree', 'assets/lemon_tree_small.png');






}

function createScene() {

    console.log("name of location", items["opening screen clean"].name);
    //this_background = this.add.image(0, 0, "");

    this_background = this.add.image(0, 0, "");

    icon_left = this.add.sprite(50, 300, 'left').setInteractive();
    icon_right = this.add.sprite(750, 300, 'right').setInteractive();
    icon_experiments = this.add.sprite(700, 50, 'icon experiments').setInteractive();

    //icon_current_location.visible = false;
    //icon_current_location.visible = false


    default_item_location.x = [100,200,300];
    default_item_location.y = [500,500,500];

    // items for locations
    item_1 = this.add.sprite(default_item_location.x[0], default_item_location.y[0], 'lemon_seeds').setInteractive(); // set default images -- should do this dynamically 
    item_2 = this.add.sprite(default_item_location.x[1], default_item_location.y[1], 'lemon_seeds').setInteractive();
    item_3 = this.add.sprite(default_item_location.x[2], default_item_location.y[2], 'lemon_seeds').setInteractive();

    item_here.push(item_1);
    item_here.push(item_2);
    item_here.push(item_3);



    item_1.visible = false;
    item_2.visible = false;
    item_3.visible = false;

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
        console.log("go experiments");
    });

    item_1.on('pointerdown', function (pointer) {

        console.log("click_item_1");
        

        collected_items.push(items[items[current_location.name].items[0]]);
        console.log(collected_items);
        item_1.visible = false;
    });

    item_2.on('pointerdown', function (pointer) {

        console.log("click_item_2");
        console.log("go left");

        collected_items.push(items[items[current_location.name].items[1]]);
        console.log(collected_items);
        item_2.visible = false;


    });

    item_3.on('pointerdown', function (pointer) {

        console.log("click_item_3");
        console.log("go left");

        collected_items.push(items[items[current_location.name].items[2]]);
        console.log(collected_items);
        item_3.visible = false;


    });


}


function updateScene() {
    //console.log("here");
    opening_update();

    if (this.input.activePointer.isDown && click_state == 0) {
        console.log("pointer down");
        click_state = 1;
    }
    else if (!this.input.activePointer.isDown && click_state == 1) {
        console.log("pointer up");
        click_state = 0;
        progress_game_state(layout, layout_state);
    }


}


function set_up_location(a_scene, a_location) {
    current_location = items[a_location];
    console.log("current location is", current_location.name);

    this_background.setTexture(current_location.name);


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

    item_1.visible = false;
    item_2.visible = false;
    item_3.visible = false;

    for (i = 0; i < item_here[0].length; i++) {
        item_here[i].visible = false;
    }

    // if current scne layout = location show left right up down experiments 
    if (current_location.layout == 'location') {
        icon_left.visible = true;
        icon_right.visible = true;
        icon_experiments.visible = true;

        for (i = 0; i < current_location.items.length; i++) {
            item_here[i].setTexture(current_location.items[i])
            item_here[i].visible = true;
            item_here[i].setInteractive();

            // the locations should have default draw postions for each item not the items 
            console.log (items[current_location.items[i]]);
            if (items[current_location.items[i]].drawPosition!== undefined && items[current_location.items[i]].drawPosition.length>0){
                console.log ("custom draw positions");
                item_here[i].x = items[current_location.items[i]].drawPosition[0];
                item_here[i].y = items[current_location.items[i]].drawPosition[1];
            }
            else {
                item_here[i].x = default_item_location.x[i];
                item_here[i].y = default_item_location.y[i];
            }
        }

    }



    // if current scene has intro text display !
    if (current_location.text) {

        this_text = a_scene.add.text(40, 100, current_location.text[0], {
            fontSize: '32px',
            fill: '#000',
            wordWrap: { width: 760, useAdvancedWrap: true }
        });
        this_text.alpha = 0;
        this_text.visible.alpha = 0;
    }
    else {
        this_text.visible = false;
    }




}

function progress_game_state(layout, layout_stage) {

    if (current_location.text !== undefined) {
        this_text.text.visible = true;
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
        this_text.text.visible = true;
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
