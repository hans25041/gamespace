
Character = function() {

    var ThisCharacter       = this;

    ThisCharacter.init  = function( c, id, canvas, context ) {
        ThisCharacter.canvas    = canvas;
        ThisCharacter.context   = context;
        ThisCharacter.id        = id;
        ThisCharacter.x         = c.x - ( c.x % 50 );
        ThisCharacter.y         = c.y - ( c.y % 50 );
        ThisCharacter.z         = c.z;
        ThisCharacter.mobility  = 50;
        ThisCharacter.speed     = 2;
        ThisCharacter.direction = 'Up';
        ThisCharacter.sprite    = ThisCharacter.getSprite();
        ThisCharacter.updateParameters();
    };

    ThisCharacter.restore = function( character, canvas, context ) {
       for ( key in character ) {
            ThisCharacter[key]=character[key];
        }
        ThisCharacter.canvas    = canvas;
        ThisCharacter.context   = context;
    };

    ThisCharacter.exporter = function( character ) {
        var echar       = {};
        for ( key in character ) {
            if( typeof character[key] !== 'function' && typeof character[key] !== 'object' )
                echar[key] = ThisCharacter[key];
        }
        return echar;
    }

    ThisCharacter.getSprite = function() {

        for ( var i = 0; i < document.settings.cellfill.length; i++ ) {
            if ( document.settings.cellfill[i].checked ) {
                return document.settings.cellfill[i].value;
            }
        }

    };

    ThisCharacter.place = function( c ) {
        ThisCharacter.x         = c.x - ( c.x % 50 );
        ThisCharacter.y         = c.y - ( c.y % 50 );
        ThisCharacter.z         = c.z;
        ThisCharacter.updateParameters();
    }

    ThisCharacter.Up = function () {
        ThisCharacter.y -= ThisCharacter.speed;
        canvas.draw();
        if ( ThisCharacter.y > ThisCharacter.startY - ThisCharacter.mobility ) setTimeout( ThisCharacter.Up, 10);
    };
    ThisCharacter.Down = function() {
        ThisCharacter.y += ThisCharacter.speed;
        canvas.draw();
        if ( ThisCharacter.y < ThisCharacter.startY + ThisCharacter.mobility ) setTimeout( ThisCharacter.Down, 10 );
    };
    ThisCharacter.Left = function() {
        ThisCharacter.x -= ThisCharacter.speed;
        canvas.draw();
        if ( ThisCharacter.x > ThisCharacter.startX - ThisCharacter.mobility ) setTimeout( ThisCharacter.Left, 10 );
    };
    ThisCharacter.Right = function() {
        ThisCharacter.x += ThisCharacter.speed;
        canvas.draw();
        if ( ThisCharacter.x < ThisCharacter.startX + ThisCharacter.mobility ) setTimeout( ThisCharacter.Right, 10 );
    };

    ThisCharacter.move = function(canvas) {

        ThisCharacter.startY = ThisCharacter.y;
        ThisCharacter.startX = ThisCharacter.x;
        ThisCharacter[ThisCharacter.direction]();
        ThisCharacter.updateParameters();
    };

    ThisCharacter.draw = function(character) {
        var img = document.getElementById( character.sprite );
        ThisCharacter.context.drawImage( img, character.x, character.y );
    };

    ThisCharacter.updateParameters = function() {

        directions = {
            'Up':   '',
            'Down': '',
            'Left': '',
            'Right':''
        };
        directions[ThisCharacter.direction] = 'selected';

        var directionBox  = '<label for="character-direction-selector">Direction: </label>';
            directionBox += '<select id="character-direction-selector" name="character-direction-selector" onchange="javascript:directionChange()">';
            directionBox += '<option '+directions['Up']+'>Up</option>';
            directionBox += '<option '+directions['Down']+'>Down</option>';
            directionBox += '<option '+directions['Left']+'>Left</option>';
            directionBox += '<option '+directions['Right']+'>Right</option>';
            directionBox += '</select>';

        document.getElementById('character-id').innerText       = ThisCharacter.id;
        document.getElementById('character-position').innerText = 'x: ' + ThisCharacter.x + ', ' +
                                                                  'y: ' + ThisCharacter.y + ', ' +
                                                                  'z: ' + ThisCharacter.z;
        document.getElementById('character-motion-mobility').innerText  = 'Mobility: ' + ThisCharacter.mobility;
        document.getElementById('character-motion-speed').innerText     = 'Speed: ' + ThisCharacter.speed;
        document.getElementById('character-motion-direction').innerHTML = directionBox;

    }

    return ThisCharacter;

}

