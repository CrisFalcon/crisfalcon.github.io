const FILL_WIDTH_PERCENT = 0.8;
const FILL_HEIGHT_PERCENT = 1;

export default class Menu {
    constructor(w, h, c) {
        this.width = w * FILL_WIDTH_PERCENT;
        this.height = h * FILL_HEIGHT_PERCENT;
        this.centerX = (w / 2) - (this.width / 2);
        this.centerY = (h / 2) - (this.height / 2);
        this.color = c;
    }
    updateValues(width, height) {
        this.width = width * FILL_WIDTH_PERCENT;
        this.height = height * FILL_HEIGHT_PERCENT;
        this.centerX = (width / 2) - (this.width / 2);
        this.centerY = (height / 2) - (this.height / 2);
    }
    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.centerX, this.centerY, this.width, this.height);
    }
}