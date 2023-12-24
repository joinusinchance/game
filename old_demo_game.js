/// #11 if first screen does not have an item we get issues
// fix!!

import Phaser from 'phaser';
import { game } from '../main';

import { CONFIG_WIDTH, CONFIG_HEIGHT } from '../constants';

let logo;
let cursors;
let text;
let image;

let prev_area = "background";
let area = "background";
let icon_left;
let icon_right


let item_1;
let item_2;
let item_3;

let experiment_item_1;
let experiment_item_2;
let experiment_item_3;
let experiment_item_4;
let experiment_item_5;
let experiment_item_6;
let experiment_item_7;
let experiment_item_8;

let item;
let items;
let item_here = [];
let experiment_items = [];


let user_money;
let user_items;

let location;
let locations;

// now define user parameter
let previous_location = "";
let current_location = "opening screen clean"; //"home";
let current_items = [""];
let new_location = "";

// now define clicks // for experiments
let previous_click = -1;
let current_click = -1;

//let icon_current_location = "";

export default class Demo extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }




  preload() {
    // icons and generic images
    this.load.image('background_002', 'assets/images/background_002.png');
    this.load.image('logo', 'assets/images/Replit-logo.png');
    this.load.image('left', 'assets/images/left_arrow_shiny.png');
    this.load.image('right', 'assets/images/right_arrow_shiny.png');
    this.load.image('icon experiments', 'assets/images/experiments_small.png');

    // location images
    this.load.image('background', 'assets/images/house.png');
    this.load.image('experiments', 'assets/images/background_experiments_light.png');
    this.load.image('home', 'assets/images/background_home_light.png');
    this.load.image('road', 'assets/images/background_road_light.png');
    this.load.image('juice stand', 'assets/images/juice_bar.png');
    this.load.image('an empty yard', 'assets/images/an_empty_yard.png');
    this.load.image('a hole in the yard', 'assets/images/a_hole_in_the_yard.png');
    this.load.image('a hole in the yard closer up', 'assets/images/a_hole_in_the_yard_closer_up.png');
    this.load.image('lemon tree in soil', 'assets/images/a_lemon_tree_in_soil.png');

    this.load.image('opening screen clean', 'assets/images/opening_screen_clean.png');

    
    // item images
    this.load.image('a broken TV', 'assets/images/broken_tv_small.png');
    this.load.image('a slightly used TV', 'assets/images/slightly_used_tv_small.png');
    this.load.image('spanner', 'assets/images/spanner_small.png');
    this.load.image('manure', 'assets/images/manure_small.png');
    this.load.image('a bored old man', 'assets/images/bored_old_man_small.png');
    this.load.image('some lemon seeds', 'assets/images/lemon_seeds_small.png');
    this.load.image('a lemon tree', 'assets/images/lemon_tree_small.png');
  }

  create() {
    //this.add.image(0, 0, 'background');
    class location {
      constructor(name, image, items, moveTo, upgradeLocation,screenState) {
        this.name = name;
        this.image = image;
        this.items = items; /// lets set have a max of 3
        this.moveTo = moveTo;
        this.upgradeLocation = upgradeLocation;
        this.screenState = screenState // info , experiments,location
      }
    }

    class item {
      constructor(name, image, upgradeTo, combineWith, addItems, addLocations, upgradeLocation, drawPosition) {
        this.name = name; //"name": "a broken TV",
        this.image = image;
        this.upgradeTo = upgradeTo; //"a slightly used TV",
        this.combineWith = combineWith;
        this.addItems = addItems;
        this.addLocations = addLocations;
        this.upgradeLocation = upgradeLocation;
        this.drawPosition = drawPosition;
      }
    }
// so we can keep the lookups simple, location names = image names -- eventually only have one field for name & image
    items = {
      "a broken TV": new item("a broken TV", "a broken TV", "a slightly used TV", "spanner")
      , "a slightly used TV": new item("a slightly used TV", "a slightly used TV", "", "some lemon seeds", "a grumpy old man")
      , "spanner": new item("spanner", "spanner", "", "a broken TV")
      , "manure": new item("manure", "manure", "", "some lemon seeds","","","",[400,400])
      , "a bored old man": new item("a bored old man", "a bored old man", "some lemon seeds", "a slightly used TV")
      , "some lemon seeds": new item("some lemon seeds", "some lemon seeds", "a lemon tree", "manure", "")
      , "a bucket of water": new item("a bucket of water", "", "", "", "")
      , "a lemon tree": new item("a lemon tree", "a lemon tree", "", "manure", "", "", "an empty yard")
      , "some lemons": new item("some lemons", "some lemons", "some lemons", "manure", "")
      , "background_002": new item("background_002", "background_002", "some lemons", "manure", "")

    }


    locations = {
      // special locations 
      "opening screen clean": new location("opening screen clean", "opening screen clean", ["spanner"], ["home", "home"],"","info"),
      
      "experiments": new location("experiments", "experiments", [""], ["previous_location", "previous_location"],"","info"),//,"","experiments"),
      // regular locations 
      
      "home": new location("home", "home", ["a broken TV", "spanner"], ["juice stand", "road"]),
      //"home": new location("home", "home",["broken TV"],["juice stand","road"]),
      "juice stand": new location(name = "juice stand", image = "juice stand", [""], ["an empty yard", "home"]),
      "an empty yard": new location(name = "an empty yard", image = "an empty yard", [""], ["a hole in the yard", "juice stand"],"lemon tree in soil"),
      "a hole in the yard": new location(name = "a hole in the yard", image = "a hole in the yard", [""], ["a hole in the yard closer up", "an empty yard"]),


      "a hole in the yard closer up": new location(name = "a hole in the yard closer up", image = "a hole in the yard closer up", ["manure"], ["road", "a hole in the yard"]),


      "lemon tree in soil": new location(name = "lemon tree in soil", image = "lemon tree in soil", [""], ["road", "juice stand"]),
      
      "road": new location(name = "road", image = "road", ["a bored old man"], ["home", "a hole in the yard closer up"])
    }


    //lemon tree in soil
    user_money = 0
    user_items = [];
    user_items.push(current_location);
    console.log ('initial user items',user_items);






    image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    //image.setScale(scale).setScrollFactor(0);
    console.log('------');
    console.log(scale);
    console.log('------');

    // default directions and experiments
    const icon_left = this.add.sprite(50, 300, 'left').setInteractive();
    //icon_left.setDropShadow(4, 6, 0xff00ff, 0.7);

    const icon_right = this.add.sprite(750, 300, 'right');//.setInteractive();
    const icon_experiments = this.add.sprite(700, 50, 'icon experiments').setInteractive();

    //icon_current_location.visible = false;
    //icon_current_location.visible = false

    // items for locations
    const item_1 = this.add.sprite(100, 500, '');
    const item_2 = this.add.sprite(200, 500, '');
    const item_3 = this.add.sprite(300, 500, '');

    item_here.push(item_1);
    item_here.push(item_2);
    item_here.push(item_3);


    //const icon_current_location = this.add.sprite(700, 500, '');
    const experiment_item_1 = this.add.sprite(700, 500, user_items[0]);
    const experiment_item_2 = this.add.sprite(200, 100, '');
    const experiment_item_3 = this.add.sprite(300, 100, '');
    const experiment_item_4 = this.add.sprite(400, 100, '');
    const experiment_item_5 = this.add.sprite(500, 100, '');
    const experiment_item_6 = this.add.sprite(600, 100, '');
    const experiment_item_7 = this.add.sprite(700, 100, '');
    const experiment_item_8 = this.add.sprite(100, 200, '');

    //experiment_items.push(icon_current_location); // first exeriment item is always the current location
    experiment_items.push(experiment_item_1);
    experiment_items.push(experiment_item_2);
    experiment_items.push(experiment_item_3);
    experiment_items.push(experiment_item_4);
    experiment_items.push(experiment_item_5);
    experiment_items.push(experiment_item_6);
    experiment_items.push(experiment_item_7);
    experiment_items.push(experiment_item_8);

  //#10 to do - current location = first item user "holds"


    item_1.on('pointerup', function (pointer) {
      console.log("items check");
      if (item_here[0].visible = true) {
        user_items.push(locations[current_location].items[0]);
        console.log(items[locations[current_location].items[0]]);
        console.log("user items");
        console.log(user_items);
        locations[current_location].items[0] = ""
        item_here[0].visible = false;
      }
    });

    item_2.on('pointerup', function (pointer) {
      console.log("items check");
      if (item_here[1].visible = true) {
        user_items.push(locations[current_location].items[1]);
        console.log("user items");
        console.log(user_items);
        locations[current_location].items[1] = ""
        item_here[1].visible = false;
      }
    });


    function upgrade_location(location, item) {
      console.log ("proposed location:", location);
      console.log ("proposed item:", item);

      console.log (items[item]);
      console.log (locations[location].name);
      console.log (locations[location].upgradeLocation);
      
      if (location == item) {
        
        new_location  = locations[location].upgradeLocation;
        locations['experiments'].moveTo[0] = new_location;
        locations['experiments'].moveTo[1] = new_location;


        // repoint directional moveTo references left and right
        // we might need to expand where directions are >2 
        // this can be used to insert and also delete as per location config 
        locations[locations[new_location].moveTo[0]].moveTo[1] = new_location;
        locations[locations[new_location].moveTo[1]].moveTo[0] = new_location;
        

      }

      //previous_location = new_location;
      // so that we tidy up experiment space
      

    }

    function run_experiment() {
      console.log("run experiment");
      console.log("click id, user item at id");
      console.log(current_click,user_items[current_click]);
      console.log(previous_click,user_items[previous_click]);
      console.log ("current then previous location");
      console.log (current_location, locations['experiments'].moveTo[0]);
console.log (current_click);

      

      if (current_click == 0) {
          console.log("upgraded locations in main previous+++");

       
        upgrade_location(locations['experiments'].moveTo[0], items[user_items[previous_click]].upgradeLocation);
        update_experiment_location();
        }
// else if used to be 8000
      else if (previous_click == 0) {
        console.log("upgraded locations in main previous+++");
        upgrade_location(locations['experiments'].moveTo[0],items[user_items[previous_click]].upgradeLocation);
        update_experiment_location();

        
      }
      else if (items[user_items[current_click]].upgradeTo != "") {
          user_items[current_click] = items[user_items[current_click]].upgradeTo;
          update_experiment_location();
        }
        else if (items[user_items[previous_click]].upgradeTo != "") {
          user_items[previous_click] = items[user_items[previous_click]].upgradeTo;
          update_experiment_location();
        }


    }

    function update_experiment_location() {
      for (let i = 0; i < experiment_items.length; i++) {
        console.log('hide items')
        experiment_items[i].visible = false;
      }

      if (locations[current_location].name == 'experiments') {
        console.log('show experiments ');
        // TODO: duplicate code-  redraw should be based on code in update and proceduralised 
        current_click = -1;
        previous_click = current_click;

        for (let i = 0; i < user_items.length; i++) {
          if (user_items.length > 0) {
            experiment_items[i].visible = true;
            //experiment_items[i].setTexture(items[user_items[i]].image);


            experiment_items[i].setTexture(user_items[i]);
            experiment_items[i].setInteractive();
            console.log(user_items[i]);

          }
          else {
            // just in case there is no image 
            experiment_items[i].visible = false;
            experiment_items[i].setInteractive(false);
          }
        }


      }
    }

    experiment_item_1.on('pointerup', function (pointer) {
      console.log(user_items[0]);
      previous_click = current_click;
      current_click = 0;

      if (previous_click > -1) {
        run_experiment();
      }

    });

    experiment_item_2.on('pointerup', function (pointer) {
      console.log(user_items[1]);
      previous_click = current_click;
      current_click = 1;

      if (previous_click > -1) {
        run_experiment();
      }
    });

    experiment_item_3.on('pointerup', function (pointer) {
      console.log(user_items[2]);
      previous_click = current_click;
      current_click = 2;

      if (previous_click > -1) {
        run_experiment();
      }
    });

    experiment_item_4.on('pointerup', function (pointer) {
      console.log(user_items[3]);
      previous_click = current_click;
      current_click = 3;

      if (previous_click > -1) {
        run_experiment();
      }
    });

    experiment_item_5.on('pointerup', function (pointer) {
      console.log(user_items[4]);
      previous_click = current_click;
      current_click = 4;

      if (previous_click > -1) {
        run_experiment();
      }
    });

    experiment_item_6.on('pointerup', function (pointer) {
      console.log(user_items[5]);
      previous_click = current_click;
      current_click = 5;

      if (previous_click > -1) {
        run_experiment();
      }
    });

    experiment_item_7.on('pointerup', function (pointer) {
      console.log(user_items[6]);
      previous_click = current_click;
      current_click = 6;

      if (previous_click > -1) {
        run_experiment();
      }
    });

    experiment_item_8.on('pointerup', function (pointer) {
      console.log(user_items[7]);
      previous_click = current_click;
      current_click = 7;

      if (previous_click > -1) {
        run_experiment();
      }
    });


    icon_left.on('pointerout', function (pointer) {

      this.clearTint();

    });

    icon_left.on('pointerup', function (pointer) {
      this.clearTint();
    });

    icon_right.on('pointerdown', function (pointer) {
      this.setTint(0xff0000);
    });

    icon_right.on('pointerout', function (pointer) {
      this.clearTint();
    });


    icon_left.on('pointerdown', function (pointer) {

      //this.setTint(0xff0000);


      console.log(locations[current_location].image);
      // 0 = left, 1 = right, 2 = up, 3 = down
      console.log(locations[current_location].moveTo[0]);
      current_location = locations[current_location].moveTo[0];


    });

    icon_right.on('pointerup', function (pointer) {

      console.log(locations[current_location].moveTo[1]);
      current_location = locations[current_location].moveTo[1];
      console.log(area);
      this.clearTint();

    

      

    });

    icon_experiments.on('pointerup', function (pointer) {


      if (current_location != 'experiments') {

        locations['experiments'].moveTo[0] = current_location;
        locations['experiments'].moveTo[1] = current_location;

        
        //user_items[0] = 'juice stand';
        user_items[0] = current_location;
        console.log("GOTO EXERIMENTS",current_location);
        console.log(user_items[0]);
        previous_location = current_location;
        
        icon_experiments.image = ""



        
        
        //this.add.sprite(700, 500, 'experiments').setInteractive();

        current_location = 'experiments';
      }
      else {
        current_location = locations['experiments'].moveTo[0];
      }


      console.log(area);
      this.clearTint();

    });




    experiment_item_1.on('pointerup', function (pointer) {
      console.log(user_items[1]);
      previous_click = current_click;
      current_click = 0;

      if (previous_click > -1) {
        run_experiment();
      }

    });

    cursors = this.input.keyboard.createCursorKeys();

    text = this.add.text(16, 16, 'Lemonade stand up upgrade', {
      fontSize: '32px',
      fill: '#000',
      //originX:0,
      //originY:0,
      wordWrap: { width: CONFIG_WIDTH, useAdvancedWrap: true }
    });

  }

  update() {
    // arrow key up, click or touch

    if (previous_location != current_location) {
      //logo.setVelocityY(-200);
      console.log("down");
      console.log(current_location);

      text.setText(current_location);
      locations[current_location].moveTo[0];
      image.setTexture(locations[current_location].image);
      image.alpha = 0.5;


      console.log(CONFIG_WIDTH,CONFIG_HEIGHT);
      image.dispayWidth = CONFIG_WIDTH;
      image.displayHeight = CONFIG_HEIGHT;
 //     this.add.image(this.cameras.main.width / 2, //this.cameras.main.height / 2, 'background');


      
      // hide all items slots
      item_here[0].visible = false;
      item_here[1].visible = false;
      item_here[2].visible = false;

      if (locations[current_location].screenState == 'info') {
      console.log ("info screen - hide arrows etc----");
        icon_right.visible = false;
      }
      else {
        icon_right.visible = true;
        icon_right.setInteractive();
      }

      // hide all items on experiments page (collected items)?
      //experiment_items.push(experiment_item_7); 
      console.log(experiment_items.length);
      for (let i = 0; i < experiment_items.length; i++) {
        console.log('hide items')
        experiment_items[i].visible = false;
      }


      if (locations[current_location].name == 'experiments') {
        console.log('show experiments ');
        console.log(previous_location);

        current_click = -1;
        previous_click = current_click;
        console.log("#++++++++++#");
        console.log(user_items[0]);
        console.log(user_items[1]);
        console.log(user_items[2]);

        for (let i = 0; i < user_items.length; i++) {
          if (user_items.length > 0) {
            experiment_items[i].visible = true;
            console.log('user item propose show', user_items[i]);
//experiment_items[i].setTexture(items[user_items[i]].image);

            experiment_items[i].setTexture(user_items[i]);
            experiment_items[i].setInteractive();

            experiment_items[i].displayWidth = 100;
            experiment_items[i].displayHeight = 100;
            console.log('user item show', user_items[i]);

          }
          else {
            // just in case there is no image 
            experiment_items[i].visible = false;
            experiment_items[i].setInteractive(false);
          }
        }


      }


      // then show only what the location has 
      if (locations[current_location].items.length > 0) {
        for (let i = 0; i < locations[current_location].items.length; i++) {
          if (locations[current_location].items[i].length > 0) {
            item_here[i].visible = true;
            item_here[i].setTexture(items[locations[current_location].items[i]].image);

            if (items[locations[current_location].items[i]].drawPosition !== undefined)
              {   
            item_here[i].x = items[locations[current_location].items[i]].drawPosition[0];
              item_here[i].y =items[locations[current_location].items[i]].drawPosition[1];
          }
    
            
            item_here[i].setInteractive();
            console.log(items[locations[current_location].items[i]].image);
          }
          else {
            // just in case there is no image 
            item_here[i].visible = false;
            item_here[i].setInteractive(false);
          }
        }
      }

      previous_location = current_location;

    }

/*
    else if (cursors.up.isDown || this.input.activePointer.isDown) {
      //logo.setVelocityY(-200);
      //console.log("down");
      //image.setTexture('background_002');
    }


    if (cursors.left.isDown) {
      //  logo.setVelocityX(-200);

    }

    if (cursors.right.isDown) {
      //logo.setVelocityX(200);
    }

    if (cursors.down.isDown) {
      //logo.setVelocityX(0);
    }

    if (prev_area != area) {
      //console.log(area);
      //image.visible = false;
    }
*/
  }

}