import AnimatedImage from "./anImage.js";

export default class Title {
    constructor(scalePercent) {
        this.scalePercent = scalePercent;
        this.width = 1489.7;
        this.height = 690;
        this.x = 0;
        this.y = 0;
        this.scale = 1;
        this.yPadding = 50 * scalePercent;
        this.img = new AnimatedImage(document.getElementById("logoImage"), this.width, this.height, 3);
        this.img.frameTime = 14;
    }
    draw(context) {
        this.img.draw(context, this.x, this.y, this.width * this.scale, this.height * this.scale);
    }
    updateValues(screenWidth, menu) {
        this.scale = (Math.min(menu.width / this.width, menu.height / this.height)) * this.scalePercent;
        this.x = (screenWidth - screenWidth / 2) - (this.width * (this.scale)) / 2;
        this.y = menu.centerY + (menu.height - menu.height) + (this.yPadding * this.scale);
    }

}