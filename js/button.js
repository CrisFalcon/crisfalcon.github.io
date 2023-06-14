export default class Button {
    constructor(x, y, size, defaultColor, colorOver, url) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.defaultColor = defaultColor;
        this.color = this.defaultColor;
        this.colorOver = colorOver;
        this.url = url;
        this.sinScale = 1;
        this.startScale = this.size;
    }

    draw(context, x, y) {
        if (this.isMouseOver(x, y)) {
            this.color = this.colorOver;
            //this.sinScale += 0.1;
        }
        else
            this.color = this.defaultColor;

       // this.size = this.startScale * Math.abs(Math.sin(this.sinScale)) + 20;

        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
    }
    isMouseOver(x, y) {
        return (x >= this.x && x <= this.x + this.startScale
            && y >= this.y && y <= this.y + this.startScale);
    }
    changePosition(x, y) {
        this.x = x;
        this.y = y;
    }
}