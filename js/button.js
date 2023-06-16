export default class Button {
    constructor(x, y, scale, defaultColor, colorOver, url) {
        this.x = x;
        this.y = y;
        this.width = scale;
        this.height = this.width * 0.55;
        this.defaultColor = defaultColor;
        this.color = this.defaultColor;
        this.colorOver = colorOver;
        this.url = url;
        this.sinScale = 1;
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
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    isMouseOver(x, y) {
        return (x >= this.x && x <= this.x + this.width
            && y >= this.y && y <= this.y + this.height);
    }
    changePosition(x, y) {
        this.x = x;
        this.y = y;
    }
    changeScale(scale)
    {
        this.width = scale;
        this.height = this.width * 0.55;
    }
}