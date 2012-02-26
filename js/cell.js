Cell = function( c ) {

    ThisCell        = this;

    ThisCell.init = function( c, canvas, context ) {
        ThisCell.canvas     = canvas;
        ThisCell.context    = context;
        ThisCell.x          = c.x - ( c.x % 50 );
        ThisCell.y          = c.y - ( c.y % 50 );
        ThisCell.z          = c.z;
        ThisCell.address    = {
            x: ThisCell.x/50,
            y: ThisCell.y/50,
            z: ThisCell.z
        };
        ThisCell.type   = ThisCell.getFillType();
        ThisCell.fill   = ThisCell.getFill();
        return ThisCell.address;
    };

    ThisCell.restore = function( c, canvas, context ) {
        ThisCell.canvas     = canvas;
        ThisCell.context    = context;
        ThisCell.x          = c.x;
        ThisCell.y          = c.y;
        ThisCell.z          = c.z;
        ThisCell.address    = {
            x: ThisCell.x/50,
            y: ThisCell.y/50,
            z: ThisCell.z
        };
        ThisCell.type   = c.type;
        ThisCell.fill   = c.fill;
        return ThisCell;
    };
    ThisCell.exporter = function(cell) {
        ecell           = {};
        ecell.x         = cell.x;
        ecell.y         = cell.y;
        ecell.z         = cell.z;
        ecell.address   = cell.address;
        ecell.type      = cell.type;
        ecell.fill      = cell.fill;
        return ecell;
    };

    ThisCell.getFill    = function() {
        for ( var i = 0; i < document.settings.cellfill.length; i++ ) {
            if ( document.settings.cellfill[i].checked ) {
                return document.settings.cellfill[i].value;
            }
        }
    };

    ThisCell.getFillType   = function() {
        for ( var i = 0; i < document.settings.filltype.length; i++ ) {
            if ( document.settings.filltype[i].checked ) {
                return document.settings.filltype[i].value;
            }
        }
    };

    ThisCell.draw = function(cell) {
        switch ( cell.type ) {
            case 'color':
                ThisCell.context.fillStyle = cell.fill;
                ThisCell.context.fillRect( cell.x, cell.y, 50, 50 );
                break;
            case 'image':
                var img = document.getElementById( cell.fill );
                ThisCell.context.drawImage( img, cell.x, cell.y );
                break;
            default:
                break;
        }
    };

    return ThisCell;

}

