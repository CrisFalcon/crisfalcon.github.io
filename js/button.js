import AnimatedImage from "./anImage.js";

export default class Button {
    constructor(x, y, scale, defaultColor, colorOver, data) {
        this.x = x;
        this.y = y;
        this.width = scale;
        this.height = this.width * 0.55;
        this.defaultColor = defaultColor;
        // this.color = this.defaultColor;
        this.colorOver = colorOver;
        this.data = data;
        this.sinScale = 1;
        this.image = document.getElementById("twitterLogo");
        this.maskImg = document.getElementById("buttonMask");
        this.maskBorder = document.getElementById("buttonBorder");
        this.shadowImg = document.getElementById("buttonMaskBorder");
        this.maskFill = document.getElementById("buttonMaskFill");
        this.shadowPos = 8;
        //this.border = new AnimatedImage(document.getElementById("borderSheet"), 1490, 690, 3);
        //this.border.frameTime = 7.5;
        this.mask = new AnimatedImage(document.getElementById("maskSheet"), 1490, 690, 3);
        this.alphaMask = new AnimatedImage(document.getElementById("maskSheet"), 1490, 690, 3);
        this.shadow = new AnimatedImage(document.getElementById("maskSheet"), 1490, 690, 3);
        this.border = new AnimatedImage(document.getElementById("borderSheet"), 1490, 690, 3);
        //this.maskImg.frameTime = 15;

    }

    draw(context, x, y) {

        const mouseOver = this.isMouseOver(x, y);
        const imageAlpha = (this.isMouseOver(x, y)) ? 1 : 0.75;
        let sPos = mouseOver ? this.shadowPos / 2 : this.shadowPos;
        this.x += mouseOver ? this.shadowPos / 2 : 0;
        this.y += mouseOver ? this.shadowPos / 2 : 0;


        // Create an off-screen buffer canvas
        const bufferCanvas = document.createElement('canvas');
        bufferCanvas.width = context.canvas.width;
        bufferCanvas.height = context.canvas.height;
        const bufferContext = bufferCanvas.getContext('2d');

        //Draw Shadows
        if (mouseOver) this.shadow.draw(context, this.x + sPos, this.y + sPos, this.width, this.height);
        else context.drawImage(this.shadowImg, this.x + sPos, this.y + sPos, this.width, this.height);

        //Draw dark background for image alpha
        if (mouseOver) this.alphaMask.draw(context, this.x, this.y, this.width, this.height);
        else context.drawImage(this.maskFill, this.x, this.y, this.width, this.height);

        // Draw the button image w/ alpha
        bufferContext.drawImage(this.data.img, this.x, this.y, this.width, this.height);
        bufferContext.globalAlpha = imageAlpha;

        // Apply the mask effect on the buffer canvas
        bufferContext.globalCompositeOperation = 'destination-in';
        
        //Draw mask
        if (mouseOver) this.mask.draw(bufferContext, this.x, this.y, this.width, this.height);
        else bufferContext.drawImage(this.maskImg, this.x, this.y, this.width, this.height);

        // Draw the buffer canvas back to the main canvas
        context.drawImage(bufferCanvas, 0, 0);

        //Draws border only when selected
        if (mouseOver) this.border.draw(context, this.x, this.y, this.width, this.height);
        //context.drawImage(this.maskBorder, this.x, this.y, this.width, this.height);
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