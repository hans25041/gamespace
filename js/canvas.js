/*
 * Canvas
 * @author Chris Hanson

 * Do not confuse the Canvas class with HTML DOM canvas element. The Canvas class is a wrapper for this page's
 * interactions with the HTML DOM canvas element. All interactions with the canvas should be controlled here.

 * methods:
 * * getCursorPosition: pixel position of cursor.
 * * onClick: 
 */
Canvas = function() {

    var ThisCanvas = this;

    ThisCanvas.init = function( components ) {
        ThisCanvas.canvas       = document.getElementById("canvas");
        ThisCanvas.context      = ThisCanvas.canvas.getContext("2d");
        ThisCanvas.components = new Array()
        for ( component in components ) {
            ThisCanvas[component] = components[component];
            ThisCanvas.components.push(component);
            ThisCanvas[component].init( ThisCanvas.canvas, ThisCanvas.context );
        }
        ThisCanvas.canvas.addEventListener("click", ThisCanvas.onClick, false);

    }

    /*
     * Canvas.getCursorPosition

     * This method returns the position of the cursor on the canvas element. It uses e (a click event object)
     * to determine the coordinates of the cursor from the top left of the canvas in pixels. It returns an object
     * with the coordinates in the form {x,y,z}. The return coordinates are in pixels.

     * @param click_event_object e
     * @returns xyz_position_object
     */
    ThisCanvas.getCursorPosition = function(e) {
        var x, y, z;
        if ( e.pageX || e.pageY ) {
            x = e.pageX;
            y = e.pageY;
        } else {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.body.scrollTop;
        }
        x -= ThisCanvas.canvas.offsetLeft;
        y -= ThisCanvas.canvas.offsetTop;
        z  = document.getElementById('layer').value;
        return { 'x': x, 'y': y, 'z': z };
    }

    /*
     * Canvas.onClick

     * Hanles the onMouseClick event.
     */
    ThisCanvas.onClick  = function(e) {
        var c = ThisCanvas.getCursorPosition(e);

        for ( component in ThisCanvas.components ) {
            key = ThisCanvas.components[component];
            if ( typeof ThisCanvas[key].onClick === 'function' ) {
                ThisCanvas[key].onClick(c);
            }
        }

        ThisCanvas.draw();
        return true;
    }

    /*
     * Canvas.draw
     * Calls the draw object on all necessary objects.
     */    
    ThisCanvas.draw = function() {
        ThisCanvas.context.clearRect( 0, 0, ThisCanvas.canvas.width, ThisCanvas.canvas.height );
        for ( component in ThisCanvas.components ) {
            key = ThisCanvas.components[component];
            if ( typeof ThisCanvas[key].draw === 'function' ) {
                ThisCanvas[key].draw();
            }
        }
        return true;
    }
};

