export default class Snow {
    constructor(posX, posY, clr) {
        this.x = posX;
        this.y = posY;
        this.size = (Math.random() * 7) + 3;
        this.ySpeed = (Math.random() * 5) + 2;
        this.xSpeed = (Math.random() * 2) + 1;
        this.position = (this.x, this.y);
        this.color = clr;
        this.canUpdate = true;
    }
    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
    }
    update(canvasHeight, canvasWidth) {
        this.x -= this.xSpeed;
        this.y += this.ySpeed;

        this.y = this.y + this.size / 2 > canvasHeight ? 0 : this.y;
        this.x = this.x + this.size / 2 <= 0 ? canvasWidth : this.x;
    }
}