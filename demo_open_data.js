

  world_objects = 
[
    {
        "name":"Opening Screen"
        ,"type":"info"
        ,"text": ""
            ["You are a budding entrepreneur who loves making and selling lemonade. However, You don't even have a lemon tree in your backyard. You have no sugar, no water, no cups, no stand, no customers...."
                ,"But you have a big vision. You want to turn your dreams in to not just a juice stand but an a multi national thirst quenching solution providor. You want to create the best  franchise in the world - with different flavours, fruits, up selling opportunities and multi year lock in subscriptions. You want to attract customers from all over the world and help them self actualize through your brand*" 
                ,"To achieve your vision, you need to overcome many challenges and obstacles. You need to find ways to get lemons, sugar, water, cups, and other items that will help you make your lemonade and other assorted beverages. You need to explore your neighbourhood and beyond, looking for opportunities, resources, and people who can help you. You need to interact with different characters, who can teach you, inspire you, or challenge you. You need to solve puzzles, mini-games, and quests, that will test your skills, knowledge, and creativity." 
                ,"Are you ready to take on this challenge? Are you ready to turn lemons into lemonade? Then get ready to start clicking! The world of juice "]

    }
];


/*
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
*/
  class aitem {
    constructor(name, image, upgradeTo, combineWith, addItems, addLocations, upgradeLocation, drawPosition) {
      this.name = name; //"name": "a broken TV",
      this.image = image;
      this.upgradeTo = upgradeTo; //"a slightly used TV",
      this.combineWith = combineWith;
      this.addItems = addItems;
      this.addLocations = addLocations;
      this.upgradeLocation = upgradeLocation;
      this.drawPosition = drawPosition
    }
  }


  class alocation {
    constructor(name, image, items, moveTo, upgradeLocation,screenState) {
      this.name = name;
      this.image = image;
      this.items = items; /// lets set have a max of 3
      this.moveTo = moveTo;
      this.upgradeLocation = upgradeLocation;
      this.screenState = screenState // info , experiments,location
    }
  }

/// (info, level, experiments.. other)
  class alocation_stage {
    constructor(name, image, upgradeTo, combineWith, addItems, addLocations, upgradeLocation, drawPosition) {
        this.name = name;  // 
        this.visible_items = visible_items; 
        }
    }
    



    function do_something (something){
        something += " or other";
        return something;
    }

    contacts = 
[
    {
      "name": "Craig",
      "score": "2000"
    },
    {
      "name": "Imogen",
      "score": "0"
    }
  ];
  
  items = {
    "a broken TV": new aitem("a broken TV", "a broken TV", "a slightly used TV", "spanner")
    , "a slightly used TV": new aitem("a slightly used TV", "a slightly used TV", "", "some lemon seeds", "a grumpy old man")
    , "spanner": new aitem("spanner", "spanner", "", "a broken TV")
    , "manure": new aitem("manure", "manure", "", "some lemon seeds","","","",[400,400])
    , "a bored old man": new aitem("a bored old man", "a bored old man", "some lemon seeds", "a slightly used TV")
    , "some lemon seeds": new aitem("some lemon seeds", "some lemon seeds", "a lemon tree", "manure", "")
    , "a bucket of water": new aitem("a bucket of water", "", "", "", "")
    , "a lemon tree": new aitem("a lemon tree", "a lemon tree", "", "manure", "", "", "an empty yard")
    , "some lemons": new aitem("some lemons", "some lemons", "some lemons", "manure", "")
    , "background_002": new aitem("background_002", "background_002", "some lemons", "manure", "")

  }


  locations = {
    // special locations 
    "opening screen clean": new alocation("opening screen clean", "opening screen clean", ["spanner"], ["home", "home"],"","info"),
    "experiments": new alocation("experiments", "experiments", [""], ["previous_location", "previous_location"],"","info"),//,"","experiments"),
    // regular locations 
    "home": new alocation("home", "home", ["a broken TV", "spanner"], ["juice stand", "road"]),
    //"home": new location("home", "home",["broken TV"],["juice stand","road"]),
    "juice stand": new alocation(name = "juice stand", image = "juice stand", [""], ["an empty yard", "home"]),
    "an empty yard": new alocation(name = "an empty yard", image = "an empty yard", [""], ["a hole in the yard", "juice stand"],"lemon tree in soil"),
    "a hole in the yard": new alocation(name = "a hole in the yard", image = "a hole in the yard", [""], ["a hole in the yard closer up", "an empty yard"]),
    "a hole in the yard closer up": new alocation(name = "a hole in the yard closer up", image = "a hole in the yard closer up", ["manure"], ["road", "a hole in the yard"]),
    "lemon tree in soil": new alocation(name = "lemon tree in soil", image = "lemon tree in soil", [""], ["road", "juice stand"]),
    "road": new alocation(name = "road", image = "road", ["a bored old man"], ["home", "a hole in the yard closer up"])
  }

