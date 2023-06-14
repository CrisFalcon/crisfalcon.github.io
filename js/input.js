export default class Inputs {
    constructor(canvas) {
        this.mouse = { x: 0, y: 0, hold: false }
        this.canvas = canvas;
    }
    mouseEvents(event) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = event.clientX - rect.left;
         this.mouse.y = event.clientY - rect.top;
 
         if (event.type === 'mousedown') {
             this.mouse.hold = true;
         }
         else if (event.type === 'mouseup') {
             this.mouse.hold = false;
         }

    }
}
