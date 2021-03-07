this.wimpy = this.wimpy || {};
this.wimpy.extension = this.wimpy.extension || {};
this.wimpy.extension.eq = this.wimpy.extension.eq || {};
this.wimpy.extension.eq.renderers = this.wimpy.extension.eq.renderers || {};

(function() {

    /**
     * Creates a custom graphic equalizer for a wimpy player.
     *
     * @class NightLake
     * @package  wimpy.audio.extensions.eq.renderers
     * @constructor
     * 
     * @param {GraphicEq} 	controller 		- The base GraphicEq class that constructs this renderer.
     * @param {object} 		originalParams 	- The original configuration object used during setup.
     * 
     */
    function NightLake(controller, originalParams) {
    	this._rangeBuilt = false;
    }

    NightLake.defaultOpts = {
        backgroundColor: "#000000",
        //'fillColor: ["#ffffff", "#62B9FD", "#536AA3", "#000000"]
        fillColor: ["#ffffff", "#ffd624", "#f16f63", "#d4338e", "#8d0da6", "#451a88", "#2c1876", "#000000"]
    }




    var p = NightLake.prototype;

    p.controller = null;
    p.width = null;
    p.height = null;
    p.canvas = null;
    p.canvasCtx = null;

    p.backgroundColor = null;
    p.lineColor = null;
    p.lineWidth = null;


    /**
     * Called by the controller to render the animation. Called on each tick.
     *
     * @method loop
     * @param  {array} data - An array of frequency data normalized to values between 0 and 1. If the user defined a "scale" configuration property, the value may be larger than 1.
     */

    p.loop = function(data) {
        var ctx = this.canvasCtx;
        var canvas = this.canvas;
        var WIDTH = canvas.width;
        var HEIGHT = canvas.height;
        var HALF_HEIGHT = HEIGHT / 2;

        var bufferLength = data.length;
        var unitSize = Math.ceil(WIDTH / bufferLength);
        var totalUnits = WIDTH / unitSize;


        var avgData = this._avgData || 0;

        ctx.globalAlpha = .0001 / (avgData); // highr = faster
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        ctx.globalAlpha = 0.2; // highr = faster


        var bob = 10 * (1 - avgData);

        var dX1 = -bob * avgData;
        var dY1 = bob;
        var dW1 = WIDTH - bob * (avgData);
        var dH1 = HEIGHT;

        var dX2 = -bob / 2;
        var dY2 = bob;
        var dW2 = WIDTH;
        var dH2 = HEIGHT / avgData - bob;

        var sX1 = -bob * avgData;
        var sY1 = bob * avgData;
        var sW1 = WIDTH - bob;
        var sH1 = HEIGHT;

        var sX2 = -bob * avgData / 2;
        var sY2 = -bob * avgData;
        var sW2 = WIDTH;
        var sH2 = HEIGHT / avgData - bob;


        for (var i = 1; i <= 6; i++) {
            var flip = i % 2 ? -1 : 1;
            ctx.drawImage(canvas, dX1, dY1 * flip, dW1, dH1, sX1, sY1, sW1, sH1);
            ctx.drawImage(canvas, dX2, dY2 * flip, dW2, dH2, sX2, sY2, sW2, sH2);
        }

        ctx.globalAlpha = 1;
        var specSize = 10 * (this._avgData); //unitSize;

        if (!this._rangeBuilt) {
            this.fillColor = this.controller.tweenGradient(this.fillColor, 100);
            this._rangeBuilt = true;
        }
        var fillColor = this.fillColor; // localize
        var fillColorRange = fillColor.length - 1;

        var x = 0;
        var y = HEIGHT;
        var firstY = HALF_HEIGHT;
        var startPos = HALF_HEIGHT;

        for (var i = 0; i < bufferLength; i++) {

            var val = data[i];
            avgData += val;
            var colorIdx = Math.round(fillColorRange - fillColorRange * val);
            var color = fillColor[colorIdx];
            ctx.fillStyle = color;
            ctx.fillRect(x, startPos + (0.5 - val), unitSize, specSize * val);
            x += unitSize;
        };

        avgData = avgData / bufferLength;
        this._avgData = avgData;



    }


    p.reset = function() {
        var ctx = this.canvasCtx;
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, this.width, this.height);
    }

    wimpy.extension.eq.renderers.NightLake = NightLake;

}());
