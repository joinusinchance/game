
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

let old_game_state ="";
let current_game_stage ="info"; /// (info, level, experiments)
let current_game_stage_state = 0; // used for  clicking through texts etc 
let this_background;
let this_text;
let click_state = 0;

let info_text = ["You are a budding entrepreneur who has decided to make and sell lemonade. However, you don't even have a lemon tree in your backyard. You have no sugar, no water, no cups, no stand, no customers...."
    ,"But you have a big vision. You want to turn your dreams into not just a juice stand but an a multi-national thirst-quenching solution providor. You want to create the best franchise in the world - with different flavours, fruits, up-selling opportunities and multi-year lock-in subscriptions. You want to attract customers from all over the world and help them self actualize through your brand" 
    ,"To achieve your vision, you need to overcome many challenges and obstacles. You need to find ways to get lemons, sugar, water, cups, and other items that will help you make your lemonade and other assorted beverages. You need to explore your neighbourhood and beyond, looking for opportunities, resources, and people who can help you. You need to interact with different characters who can teach, inspire or challenge you. You need to solve puzzles, mini-games, and quests that will test your skills, knowledge and creativity." 
    ,"Are you ready to take on this challenge? Are you ready to turn lemons into lemonade? Then get ready to start clicking! The world of juice awaits you!"
];


info_text.push(contacts[0].name);

console.log (items["a broken TV"].image);
console.log (do_something("with this"));

class location_stage {
constructor(name, image, upgradeTo, combineWith, addItems, addLocations, upgradeLocation, drawPosition) {
    this.name = name; //"name": "a broken TV",
    this.visible_items = visible_items; 
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

function initScene() { }

function preloadScene() {
    this.load.image("open_screen", "assets/opening_screen_clean.png");
}

function createScene() {
    this_background = this.add.image(0, 0, "open_screen");
    this_background.alpha  = 1;
    this_background.setOrigin (0,0);
    this_background.displayWidth = 800;
    this_background.displayHeight = 600;

    this_text = this.add.text(40, 100, info_text[0], {
            fontSize: '32px',
            fill: '#000',      
            wordWrap: { width: 760, useAdvancedWrap: true }
        });
    this_text.alpha = 0;

}






function updateScene() {
    //console.log("here");
        opening_update() ; 

        if (this.input.activePointer.isDown && click_state ==0) {
            console.log ("pointer down");
            click_state = 1;
        }
        else if (!this.input.activePointer.isDown && click_state ==1)
        {
            console.log ("pointer up");
            click_state = 0;
            progress_game_state (current_game_stage, current_game_stage_state);
        }


    }


function progress_game_state (current_game_stage, current_game_stage_stage) {

        if (current_game_stage =="info"  && current_game_stage_state < info_text.length)
        current_game_stage_state +=1;
        this_text.text = info_text [current_game_stage_stage];
        console.log (current_game_state_stage, info_text [current_game_state_stage]);
        /// else route to next screen
    }


function opening_update() {
    
    if (current_game_state_stage = -1 && this_background.alpha>0.15) {
        this_background.alpha = this_background.alpha - 0.005;
        this_text.alpha += 0.1 ;

    } 

}
