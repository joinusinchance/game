
class aItem {
    constructor(type, name, image, upgradeTo, combineWith, addItems, addLocations, upgradeLocation, drawPosition, items, nextTo, layout, text, sprite, currentStatus,previousStatus) {
        this.type = type; // for the moment either "location" or "item"
        this.name = name; //"name": "a broken TV",
        this.image = image;
        this.upgradeTo = upgradeTo; //"a slightly used TV", (or upgradeLocation)
        this.combineWith = combineWith;
        this.addItems = addItems;
        this.addLocations = addLocations; // depreciate
        this.upgradeLocation = upgradeLocation; // depreciate 
        this.drawPosition = drawPosition;
        // can we merge items and locations?
        this.items = items; // consider how this works for non location item items 
        this.nextTo = nextTo; // consider how this works for non location item items
        this.layout = layout; // info, experiments, location    }
        this.text = text;
        this.sprite = sprite;
        this.currentStatus = currentStatus
        this.previousStatus = previousStatus
    }
}

// consider moving below to a new file





function configure_layout(current_Location, display_items, navigation_items, experiment_items) {
    console.log("configure layout", current_Location.name);
    if (current_Location.layout == "info") {
        console.log("configure --info-- layout");
        // to do hide all items
    }
    else if (current_Location.layout == "experiments") {
        console.log("configure --experiments-- layout ");
        // to do hide navigation items
        // show experiment items
    }
    else if (current_Location.layout == "location") {
        console.log("configure --location-- layout")
        // hide experiment items
        // show items at current location
    }
}
