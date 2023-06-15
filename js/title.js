export default class Title {
    constructor(scalePercent) {
        this.image = document.getElementById("logoImage");
        this.scalePercent = scalePercent;
        this.width = 1490;
        this.height = 690;
        this.x = 0;
        this.y = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.timer = 0;
        this.scale = 1;
        //this.startingScale = scale;
    }
    draw(context) {
        
        //context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.width * this.frameX, this.height * this.frameY,
            this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);

        this.timer++;
        if (this.timer >= 10) {
            this.frameX = this.frameX + 1 > 2 ? 0 : this.frameX + 1;
            this.timer = 0;
        }
    }
    updateValues(screenWidth, menu) {
        this.scale = (Math.min(menu.width / this.width, menu.height / this.height)) * this.scalePercent;
        //this.scale = currentScale / currentScale * this.scalePercent;
        this.x = (screenWidth - screenWidth / 2) - (this.width * (this.scale)) / 2;
        this.y = (menu.height) - (menu.height);

    }

}