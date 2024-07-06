function user_parameters() {
    console.log("Initialising user");
}

parameters = {
    // navigation items 
    "player_01": new user
        (
            type = "player"
            , name = "Jack"
            , image = ""
            , cash = 0 -- points or cash??
            , status = 0
            , won = []
            , treasure_Location = [] --[0.0000,0.0000]
            , current_Person = "unknown"
            , discover_location = [] --[0.0000,0.0000]
            ------
            -- cohabitation and boss levels can be managed in score section
            -- score section 
            , wealth = 0 -- max 24?
            , promotions = 0 -- 32?
            , competition = 0 --9?
            , treasure = 0 -- 9 
            , people = 0 -- 16
            , discoveries = 16 
            , cohabitation = 0 -- 10 
            , boss = 0 -- 10
          )
}
}
