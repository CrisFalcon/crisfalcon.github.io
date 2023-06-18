export default class Inputs {
    constructor(canvas) {
        this.mouse = { x: 0, y: 0, hold: false, clicked: false }
        this.canvas = canvas;
        this.clickTimer = 0;
        this.clickedTimer = 0;
    }
    mouseEvents(event) {
        if(this.clicked)
        {
            this.clicked = false;
        }
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = event.clientX - rect.left;
        this.mouse.y = event.clientY - rect.top;

        if (event.type === 'mousedown') {
            this.mouse.hold = true;
        }
        else if (event.type === 'mouseup') {
            this.mouse.hold = false;
            this.mouse.clicked = true;
            this.clickTimer = 0;
        }
    }
    update() {
        if (this.mouse.hold) {
            this.clickTimer++;
        }
        if(this.mouse.clicked)
        {
            this.clickedTimer++;
            if(this.clickedTimer >= 2)
            {
                this.mouse.clicked = false;
                this.clickedTimer = 0;
            }
        }
    }
}
