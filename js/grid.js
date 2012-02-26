Grid = function() {

    var ThisGrid        = this;

    ThisGrid.init   = function( canvas, context ) {
        ThisGrid.canvas     = canvas;
        ThisGrid.context    = context;
        ThisGrid.visible    = true;
    }

    ThisGrid.draw   = function() {
        if ( ! ThisGrid.visible ) return false;
        for ( var x = 0.5; x <= 500.5; x += 50 ) {
            x = ( x === 500.5 ? x - 1 : x );
            ThisGrid.context.moveTo(x, 0);
            ThisGrid.context.lineTo(x, 500);
        }
        for ( var y = 0.5; y <= 500.5; y += 50 ) {
            y = ( y === 500.5 ? y - 1 : y );
            ThisGrid.context.moveTo(0, y);
            ThisGrid.context.lineTo(500, y);
        }
        ThisGrid.context.stroke();

    };
}


