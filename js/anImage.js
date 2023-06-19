export default class AnimatedImage {
    constructor(spriteSheet, totalWidth, totalHeight, totalFrames) {
        this.image = spriteSheet;
        this.width = totalWidth;
        this.height = totalHeight;
        this.totalFrames = totalFrames;
        this.frameTime = 10;
        this.frameX = 0;
        this.frameY = 0;
        this.timer = 0;

    }
    draw(context, x, y, width, height) {
        context.drawImage(this.image, this.width * this.frameX, this.height * this.frameY,
            this.width, this.height, x, y, width, height);

        this.timer++;
        if (this.timer >= this.frameTime) {
            this.frameX = this.frameX + 1 > this.totalFrames - 1 ? 0 : this.frameX + 1;
            this.timer = 0;
        }
    }
}