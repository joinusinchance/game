function item_initialisation() {
    console.log("Initialising items");
}

    // so we can keep the lookups simple, location names = image names -- eventually only have one field for name & image

    items = {
        // items we can pick up
        "broken_tv": new aItem
            (
                type = "small_item"
                , name = "broken_tv"
                , image = undefined
                , upgradeTo = "slightly_used_tv"
                , combineWith = "spanner"
                , addItems = undefined
                , addLocations = undefined
                , upgradeLocation = undefined
                , drawPosition = [] // consider depreciating as covered by sprite object
                , items = undefined
                , nextTo = undefined
                , layout = undefined
                , text = undefined
                , sprite = undefined
                , currentStatus = 'on shelf'
                , previousStatus = ''
            ) ,


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
                , drawPosition = [] //[shelf_space.x[2], shelf_space.y[2]] // consider depreciating as covered by sprite object
                , items = undefined
                , nextTo = undefined
                , layout = undefined
                , text = undefined
                , sprite = undefined
                , currentStatus = 'on shelf'
                , previousStatus = ''
            ),

        "spanner": new aItem
            (
                type = "small_item"
                , name = "spanner"
                , image = undefined
                , upgradeTo = undefined
                , combineWith = "broken_tv"
                , addItems = undefined
                , addLocations = undefined
                , upgradeLocation = undefined
                , drawPosition = [] // consider depreciating as covered by sprite object
                , items = undefined
                , nextTo = undefined
                , layout = undefined
                , text = undefined
                , sprite = undefined
                , currentStatus = 'on shelf'
                , previousStatus = ''
            ),

        "manure": new aItem
            (
                type = "small_item"
                , name = "manure"
                , image = undefined
                , upgradeTo = undefined
                , combineWith = undefined
                , addItems = undefined
                , addLocations = undefined
                , upgradeLocation = undefined
                , drawPosition = [400, 400] //[shelf_space.x[2], shelf_space.y[2]] // consider depreciating as covered by sprite object
                , items = undefined
                , nextTo = undefined
                , layout = undefined
                , text = undefined
                , sprite = undefined
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
                , drawPosition = [] // consider depreciating as covered by sprite object
                , items = undefined
                , nextTo = undefined
                , layout = undefined
                , text = undefined
                , sprite = undefined
                , currentStatus = 'on shelf'
                , previousStatus = ''
            ),

        "lemon_seeds": new aItem
            (
                type = "small_item"
                , name = "lemon_seeds"
                , image = undefined
                , upgradeTo = "lemon_tree"
                , combineWith = "manure"
                , addItems = undefined
                , addLocations = undefined
                , upgradeLocation = undefined
                , drawPosition = [] //[shelf_space.x[2], shelf_space.y[2]] // consider depreciating as covered by sprite object
                , items = undefined
                , nextTo = undefined
                , layout = undefined
                , text = undefined
                , sprite = undefined
                , currentStatus = 'on shelf'
                , previousStatus = ''
            ),
        "lemon_tree": new aItem
            (
                type = "small_item"
                , name = "lemon_tree"
                , image = undefined
                , upgradeTo = undefined
                , combineWith = undefined
                , addItems = undefined
                , addLocations = undefined
                , upgradeLocation = undefined
                , drawPosition = [] //[shelf_space.x[2], shelf_space.y[2]] // consider depreciating as covered by sprite object
                , items = undefined
                , nextTo = undefined
                , layout = undefined
                , text = undefined
                , sprite = undefined
                , currentStatus = 'on shelf'
                , previousStatus = ''
            ),
        "a bucket of water": new aItem
            (
                type = "small item"
                , name = "a bucket of water"
                , image = "a bucket of water"
                , combineWith = "some sugar"
            ), "some sugar": new aItem
            (
                type = "small item"
                , name = "some sugar"
                , image = "some sugar"
                , upgradeTo = "sugary water"
                , combineWith = "a bucket of water"
            ),
         "some sugary water": new aItem
            (
                type = "small item"
                , name = "some sugary water"
                , image = "some sugary water"
                , upgradeTo = "sugary water"
                , combineWith = "some lemons"
            ), 
            "some lemons": new aItem
            (
                type = "small item"
                , name = "some lemons"
                , image = "some lemons"
                , upgradeTo = "lemmonade"
                , combineWith = "sugary water"
            ),
            "lemmonade": new aItem
            (
                type = "small item"
                , name = "lemmonade"
                , image = "lemmonade"
            ), 
      
        // item type - locations
        // special locations 
        // (type, name, image, upgradeTo, combineWith, addItems, addLocations, upgradeLocation, drawPosition, items, nextTo, layout)
      
        "opening screen clean": new aItem
            (
                type = "location"
                , name = "opening screen clean"
                , image = "opening screen clean"
                , upgradeTo = undefined
                , combineWith = undefined
                , addItems = undefined
                , addLocations = undefined
                , upgradeLocation = undefined
                , drawPosition = undefined
                , items = ["spanner"]
                , nextTo = ["home", "home"]
                , layout = "info"
                , text =  ["You are a budding entrepreneur who has decided to make and sell lemonade. However, you don't even have a lemon tree in your backyard. You have no sugar, no water, no cups, no stand, no customers...."
    ,"But you have a big vision. You want to turn your dreams into not just a juice stand but an a multi-national thirst-quenching solution provider. You want to create the best franchise in the world - with different flavours, fruits, up-selling opportunities and multi-year lock-in subscriptions. You want to attract customers from all over the world and help them self-actualize through your brand." 
    ,"To achieve your vision, you need to overcome many challenges. You need to find ways to get lemons, sugar, water, cups, and other items that will help you make your lemonade and other assorted beverages. You need to explore your neighbourhood, looking for opportunities, resources, and people. You need to interact with characters who can teach, inspire or challenge you. You need to solve puzzles, mini-games, and quests that will test your skills, knowledge and creativity." 
    ,"Are you ready to take on this challenge? Are you ready to turn lemons into lemonade? Then get ready to start clicking! The world of juice awaits you!"]
                
            ),
        
        "experiments": new aItem
            (
                type = "location"
                , name = "experiments"
                , image = "experiments"
                , upgradeTo = undefined
                , combineWith = undefined
                , addItems = undefined
                , addLocations = undefined
                , upgradeLocation = undefined
                , drawPosition = undefined
                , items = ""
                , nextTo = ["previous_location", "previous_location"]
                , layout = "experiments"
            ),
        // regular locations 

        "home": new aItem
            (
                type = "location"
                , name = "home"
                , image = "home"
                , upgradeTo = undefined
                , combineWith = undefined
                , addItems = undefined
                , addLocations = undefined
                , upgradeLocation = undefined
                , drawPosition = []
                , items = ["home","broken_tv", "spanner"]
                , nextTo = ["juice stand", "road"]
                , layout = "location"
                , text = undefined
                , sprite = undefined
                , currentStatus = 'on shelf'
                , previousStatus = ''
            ),
             "juice stand": new aItem
            (
                type = "location"
                , name = "juice stand"
                , image = "juice stand"
                , upgradeTo = undefined
                , combineWith = undefined
                , addItems = undefined
                , addLocations = undefined
                , upgradeLocation = undefined
                , drawPosition = []
                , items = ["juice stand"]
                , nextTo = ["an_empty_yard", "home"]
                , layout = "location"
            ),
            "an_empty_yard": new aItem
            (
                type = "location"
                , name = "an_empty_yard"
                , image = undefined
                , upgradeTo = "a_lemon_tree_in_soil"
                , combineWith = "lemon_tree"
                , addItems = undefined
                , addLocations = undefined
                , upgradeLocation = undefined
                , drawPosition = [] // consider depreciating as covered by sprite object
                , items = ["an_empty_yard"]
                , nextTo = ["a hole in the yard", "juice stand"]
                , layout = "location"
                , text = undefined
                , sprite = undefined
                , currentStatus = 'on shelf'
                , previousStatus = ''
            )




        , "a hole in the yard": new aItem
            (
                type = "location"
                , name = "a hole in the yard"
                , image = "a hole in the yard"
                , upgradeTo = undefined
                , combineWith = undefined
                , addItems = undefined
                , addLocations = undefined
                , upgradeLocation = undefined
                , drawPosition = []
                , items = ["a hole in the yard"]
                , nextTo = ["a hole in the yard closer up", "an_empty_yard"]
                , layout = "location"
            ), 
            "a hole in the yard closer up": new aItem
            (
                type = "location"
                , name = "a hole in the yard closer up"
                , image = "a hole in the yard closer up"
                , upgradeTo = undefined
                , combineWith = undefined
                , addItems = undefined
                , addLocations = undefined
                , upgradeLocation = undefined
                , drawPosition = []
                , items = ["a hole in the yard closer up","manure"]
                , nextTo = ["road", "a hole in the yard"]
                , layout = "location"
            ),
        
            "a_lemon_tree_in_soil": new aItem
            (
                type = "location"
                , name = "a_lemon_tree_in_soil"
                , image = "a_lemon_tree_in_soil"
                , upgradeTo = undefined
                , combineWith = undefined
                , addItems = undefined
                , addLocations = undefined
                , upgradeLocation = undefined
                , drawPosition = [] // consider depreciating as covered by sprite object
                , items = ["a_lemon_tree_in_soil"]//,"bee_hive"]
                , nextTo = ["a hole in the yard", "juice stand"]
                , layout = "location"
                , text = ["... You have got to your first milestone... you now have a lemon tree!!!... (tap to continue) ","... What next?  Only time  will tell... Get ready for the next chapter of Juice Tycoon available soon!! (tap to continue)"," THE END... for now... where do you think the story should go next?"]
                , sprite = undefined
                , currentStatus = 'on shelf'
                , previousStatus = ''
            ),

        "road": new aItem
            (
                type = "location"
                , name = "road"
                , image = "road"
                , upgradeTo = undefined
                , combineWith = undefined
                , addItems = undefined
                , addLocations = undefined
                , upgradeLocation = undefined
                , drawPosition = []
                , items = ["road","bored_old_man"]
                , nextTo = ["home", "a hole in the yard closer up"]
                , layout = "location"
            )
    }
