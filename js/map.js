Map = function() {

    var ThisMap         = this;

    ThisMap.init    = function( canvas, context ) {
        ThisMap.canvas      = canvas;
        ThisMap.context     = context;
        ThisMap.map         = new Array();
        ThisMap.characters  = new Array();
    };

    ThisMap.onClick    = function(c) {
        var type;
        for ( var i = 0; i < document.settings.filltype.length; i++ ) {
            if ( document.settings.filltype[i].checked ) {
                type = document.settings.filltype[i].value;
            }
        }

        switch ( type ) {
            case 'character':
                var id = document.getElementById(type + '-id').innerText;
                if ( ! ThisMap.characters[id] ) {
                    var character   = new Character();
                    character.init( c, id, ThisMap.canvas, ThisMap.context );
                    ThisMap.characters[id] = character;
                    break;
                } else {
                    ThisMap.characters[id].place(c);
                }
            default:
                var cell    = new Cell();
                var x       = c.x - ( c.x % 50 );
                var y       = (c.y/50);
                var z       = c.z;
                a = cell.init( c, ThisMap.canvas, ThisMap.context );
                if ( ! ThisMap.map[a.z] )       ThisMap.map[a.z]        = new Array();
                if ( ! ThisMap.map[a.z][a.x] )  ThisMap.map[a.z][a.x]   = new Array();
                ThisMap.map[a.z][a.x][a.y]  = cell;
                break;
        }
    };

    ThisMap.draw = function () {
        if ( ThisMap.map.length > 0 ) {
            for ( z in ThisMap.map ) {
                for ( x in ThisMap.map[z] ) {
                    for ( y in ThisMap.map[z][x] ) {
                        ThisMap.map[z][x][y].draw(ThisMap.map[z][x][y]);
                    }
                }
            }
        }
        for (character in ThisMap.characters) {
            ThisMap.characters[character].draw(ThisMap.characters[character]);
        }
    };

    ThisMap.exportMap = function() {
        var map             = {};
        map.map         = new Array();
        map.characters   = new Array();

        if ( ThisMap.map.length > 0 ) {
            for ( z in ThisMap.map ) {
                for ( x in ThisMap.map[z] ) {
                    for ( y in ThisMap.map[z][x] ) {

                        if ( ! map.map[z] )     map.map[z]      = new Array();
                        if ( ! map.map[z][x] )  map.map[z][x]   = new Array('');
                        map.map[z][x][y] = ThisMap.map[z][x][y].exporter(ThisMap.map[z][x][y]);
                        
                    }
                }
            }
        }

        for (character in ThisMap.characters) {
            map.characters[character] = ThisMap.characters[character].exporter(ThisMap.characters[character]);
        }

        return JSON.stringify(map);
    }

    ThisMap.importMap = function(map) {
        ThisMap.characters  = new Array();
        ThisMap.map         = new Array();

        for ( z in map.map ) {
            for ( x in map.map[z] ) {
                for ( y in map.map[z][x] ) {
                    if ( ! ThisMap.map[z] )     ThisMap.map[z]      = new Array();
                    if ( ! ThisMap.map[z][x] )  ThisMap.map[z][x]   = new Array('');
                    var cell = new Cell();
                    if ( map.map[z][x][y] )     cell.restore( map.map[z][x][y], ThisMap.canvas, ThisMap.context );
                    ThisMap.map[z][x][y] = cell;
                    
                }
            }
        }




        for ( id in map.characters ) {
            var character   = new Character();
            character.restore( map.characters[id], ThisMap.canvas, ThisMap.context );
            ThisMap.characters[id] = character;
        }

        ThisMap.draw();
    };

};

