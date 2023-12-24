class aPlayer {
    constructor(name, image, currentItems, cash, currentLocationStage) {
        this.name = name;
        this.image = image;
        this.currentItems = currentItems; // will be array of collected  aItems // item 0 should also be current location
        this.cash = cash;
        this.currentLocationStage =  currentLocationStage; //  if there interactive click through or text
        // current stage could be "setup", "iterate text", "move" etc
    }
}