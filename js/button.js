export default class Button {
    constructor(x, y, scale, defaultColor, colorOver, data) {
        this.x = x;
        this.y = y;
        this.width = scale;
        this.height = this.width * 0.55;
        this.defaultColor = defaultColor;
        this.color = this.defaultColor;
        this.colorOver = colorOver;
        this.data = data;
        this.sinScale = 1;
        this.image = document.getElementById("twitterLogo");
        this.mask = document.getElementById("buttonMask");
        this.maskBorder = document.getElementById("buttonBorder");
        this.shadow = document.getElementById("buttonMaskBorder");
        this.maskFill = document.getElementById("buttonMaskFill");
        this.shadowPos = 8;

    }

    draw(context, x, y) {

        let sPos = this.shadowPos / 2;        
        if (this.isMouseOver(x, y)) {
            this.color = this.colorOver;
            this.x += this.shadowPos / 2;
            this.y += this.shadowPos / 2;
        }
        else
        {
            this.color = this.defaultColor;
            sPos = this.shadowPos;
        }


        // Create an off-screen buffer canvas
        const bufferCanvas = document.createElement('canvas');
        bufferCanvas.width = context.canvas.width;
        bufferCanvas.height = context.canvas.height;
        const bufferContext = bufferCanvas.getContext('2d');


        context.drawImage(this.shadow, this.x + sPos, this.y + sPos, this.width, this.height);
        // Draw the image on the buffer canvas  
        const imageAlpha = (this.isMouseOver(x, y)) ? 1 : 0.75;

        bufferContext.drawImage(this.data.img, this.x, this.y, this.width, this.height);
        bufferContext.globalAlpha = imageAlpha;

        context.drawImage(this.maskFill, this.x, this.y, this.width, this.height);

        // Apply the mask effect on the buffer canvas
        bufferContext.globalCompositeOperation = 'destination-in';
        bufferContext.drawImage(this.mask, this.x, this.y, this.width, this.height);

        // Draw the buffer canvas back to the main canvas
        context.drawImage(bufferCanvas, 0, 0);
        // Draw the mask border on top of the masked image
        context.drawImage(this.maskBorder, this.x, this.y, this.width, this.height);
    }
    isMouseOver(x, y) {
        return (x >= this.x && x <= this.x + this.width
            && y >= this.y && y <= this.y + this.height);
    }
    changePosition(x, y) {
        this.x = x;
        this.y = y;
    }
    changeScale(scale) {
        this.width = scale;
        this.height = this.width * 0.55;
    }

}