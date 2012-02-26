
function fillTypeSetting( type ) {

    var selections = {
        color:      'color-selection',
        image:      'image-selection',
        character:  'character-selection',
    };
    var parameters = {
        character: 'character-parameters'
    };

    for ( selection in selections ) {
        document.getElementById(selections[selection]).hidden = ( selection === type ? false : true );            
    }
    for ( parameter in parameters ) {
        document.getElementById(parameters[parameter]).hidden = ( parameter === type ? false : true );            
    }

}

function gridSetting( value ) {

    switch( value ) {
        case 'on':
            var disable = document.getElementById( 'grid-on' );
            var enable  = document.getElementById( 'grid-off' );
            canvas.grid.visible = true;
            canvas.draw();
            break;
        case 'off':
            var disable = document.getElementById( 'grid-off' );
            var enable  = document.getElementById( 'grid-on' );
            canvas.grid.visible = false;
            canvas.draw();
            break;
        default:
            break;
    }

    disable.disabled    = true;
    enable.disabled     = false;
    return true;
}

function recoverMaps() {
    var levels = new Array();
    var mapCount = localStorage['gamespace.scroller.mapCount'];
    if ( ! mapCount ) return false;
    for ( var i = 0; i < mapCount; i++ ) {
        levels[i] = localStorage['gamespace.scroller.maps.' + i];
    }
    return levels;
}

function saveMap() {

    map =  canvas.map.exportMap();
    var mapCount = localStorage['gamespace.scroller.mapCount'];
    if ( ! mapCount ) mapCount = 0;
    localStorage['gamespace.scroller.maps.' + mapCount] = map;
    mapCount++;
    localStorage['gamespace.scroller.mapCount'] = mapCount;
    
}

function exportMap() {
    var map                 = canvas.map.exportMap();
    var levelWrapper        = document.getElementById('level-wrapper');
    levelWrapper.innerHTML  = map + '<br><input type="button" value="Save Map" onclick="javascript:saveMap();">';
}

function importMap( canvas ) {
    for ( var i = 0; i < document.importForm.level.length; i++ ) {
        if ( document.importForm.level[i].checked ) {
            level = document.importForm.level[i].value;
        }
    }

    if ( level === 'text' ) {
        var map = JSON.parse( document.getElementById('map-text').value );
    } else {
        level--;
        var map = JSON.parse(localStorage['gamespace.scroller.maps.' + level]);
    }

    canvas.map.importMap(map);
}

function showImportForm(canvas) {
    maps = recoverMaps();

    var importForm = '<form name="importForm">';

    for ( map in maps ) {
        map++;
        importForm += '<p><input type="radio" name="level" value="'+map+'" id="level-'+map+'"><label for="level-'+map+'">Level '+map+'</label></p>';
    }

    importForm += '<p><input type="radio" name="level" value="text" id="level-text" checked><label for="level-text">Level from text</label></p>';
    importForm += '<textarea cols="40" id="map-text"></textarea><input type="button" value="Import Now" onclick="javascript:importMap(canvas)"></form>';

    var levelWrapper        = document.getElementById('level-wrapper');
    levelWrapper.innerHTML  = importForm;

}

function demo() {
    for ( character in canvas.map.characters ) {
        canvas.map.characters[character].move(canvas);
    }
}

function updateParameters( type, id ) {

    var position    = '';
    var mobility    = '';
    var speed       = '';
    var direction   = '';
    var id          = id;

    if ( canvas.map.characters[id] ) {
        directions = {
            'Up':   '',
            'Down': '',
            'Left': '',
            'Right':''
        };
        directions[canvas.map.characters[id].direction] = 'selected';

        var directionBox  = '<label for="character-direction-selector">Direction: </label>';
            directionBox += '<select id="character-direction-selector" name="character-direction-selector" onchange="javascript:directionChange()">';
            directionBox += '<option '+directions['Up']+'>Up</option>';
            directionBox += '<option '+directions['Down']+'>Down</option>';
            directionBox += '<option '+directions['Left']+'>Left</option>';
            directionBox += '<option '+directions['Right']+'>Right</option>';
            directionBox += '</select>';

        position    =   'x:' + canvas.map.characters[id].x + ', ' +
                        'y:' + canvas.map.characters[id].y + ', ' +
                        'z:' + canvas.map.characters[id].z;
        mobility    =   'Mobility: ' + canvas.map.characters[id].mobility;
        speed       =   'Mobility: ' + canvas.map.characters[id].speed;
    }
    document.getElementById(type + '-id').innerText                 = id;
    document.getElementById(type + '-position').innerText           = position;
    document.getElementById(type + '-motion-mobility').innerText    = mobility;
    document.getElementById(type + '-motion-speed').innerText       = speed;
    document.getElementById(type + '-motion-direction').innerHTML   = directionBox;

}

function directionChange() {
    var id          = document.getElementById('character-id').innerText;
    var direction   = document.getElementById('character-direction-selector').value;
    canvas.map.characters[id].direction = direction;
}
