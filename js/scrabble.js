/*
File: scrabble.js
GUI Assignment: HW5
Created on: 12/15/2022
Description: Contains javascript code for scrabble game
Kyle Gaudet, UMass Lowell Computer Science, kyle_gaudet@student.uml.edu
Copyright (c) 2022 by Kyle Gaudet. All rights reserved.
Updated by KG on 12/18/2022
*/

/* Sources Used:

https://stackoverflow.com/questions/1254665/jquery-draggable-droppable-how-to-snap-dropped-element-to-dropped-on-element

https://www.youtube.com/watch?v=LynjytfeY4U

https://jqueryui.com/droppable/#revert

https://stackoverflow.com/questions/35948669/how-to-check-if-a-value-exists-in-an-object-using-javascript

*/


/* associative array for tiles */
var tiles = [] ;
tiles["A"] = { "value" : 1,  "dist" : 9,  "count" : 9  } ;
tiles["B"] = { "value" : 3,  "dist" : 2,  "count" : 2  } ;
tiles["C"] = { "value" : 3,  "dist" : 2,  "count" : 2  } ;
tiles["D"] = { "value" : 2,  "dist" : 4,  "count" : 4  } ;
tiles["E"] = { "value" : 1,  "dist" : 12, "count" : 12 } ;
tiles["F"] = { "value" : 4,  "dist" : 2,  "count" : 2  } ;
tiles["G"] = { "value" : 2,  "dist" : 3,  "count" : 3  } ;
tiles["H"] = { "value" : 4,  "dist" : 2,  "count" : 2  } ;
tiles["I"] = { "value" : 1,  "dist" : 9,  "count" : 9  } ;
tiles["J"] = { "value" : 8,  "dist" : 1,  "count" : 1  } ;
tiles["K"] = { "value" : 5,  "dist" : 1,  "count" : 1  } ;
tiles["L"] = { "value" : 1,  "dist" : 4,  "count" : 4  } ;
tiles["M"] = { "value" : 3,  "dist" : 2,  "count" : 2  } ;
tiles["N"] = { "value" : 1,  "dist" : 6,  "count" : 6  } ;
tiles["O"] = { "value" : 1,  "dist" : 8,  "count" : 8  } ;
tiles["P"] = { "value" : 3,  "dist" : 2,  "count" : 2  } ;
tiles["Q"] = { "value" : 10, "dist" : 1,  "count" : 1  } ;
tiles["R"] = { "value" : 1,  "dist" : 6,  "count" : 6  } ;
tiles["S"] = { "value" : 1,  "dist" : 4,  "count" : 4  } ;
tiles["T"] = { "value" : 1,  "dist" : 6,  "count" : 6  } ;
tiles["U"] = { "value" : 1,  "dist" : 4,  "count" : 4  } ;
tiles["V"] = { "value" : 4,  "dist" : 2,  "count" : 2  } ;
tiles["W"] = { "value" : 4,  "dist" : 2,  "count" : 2  } ;
tiles["X"] = { "value" : 8,  "dist" : 1,  "count" : 1  } ;
tiles["Y"] = { "value" : 4,  "dist" : 2,  "count" : 2  } ;
tiles["Z"] = { "value" : 10, "dist" : 1,  "count" : 1  } ;
tiles["_"] = { "value" : 0,  "dist" : 2,  "count" : 2  } ;

// letter array for tile generation
var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','_'];

// arrays for board and rack to track if they are filled with a tile 
// in a given spot/square

var board = [];
board["s0"] = false;
board["s1"] = false;
board["s2"] = false;
board["s3"] = false;
board["s4"] = false;
board["s5"] = false;
board["s6"] = false;
board["s7"] = false;
board["s8"] = false;
board["s9"] = false;
board["s10"] = false;
board["s11"] = false;
board["s12"] = false;
board["s13"] = false;
board["s14"] = false;
board["s15"] = false;

var rack = [];
rack["r0"] = true;
rack["r1"] = true;
rack["r2"] = true;
rack["r3"] = true;
rack["r4"] = true;
rack["r5"] = true;
rack["r6"] = true;

// by default there are no tiles placed on board
var placed = false;

// score starts at 0 
var score = 0;

// there are initially 93 tiles remaining since 7 are already on rack
var STARTINGREMAINDING = 93;
var remainingTiles = STARTINGREMAINDING;


// setup game once website is loaded and ready
$(document).ready(function() {
    // generate 7 tiles to fill rack
    genTiles(7);

    // set interval for info refreshing
    setInterval(refresh, 100);

    // setting droppable properties for tile holder divs and board divs
    $('.tilediv, .boardSquare, .wordMultBoardSquare, .letterMultBoardSquare').droppable({
        drop: function(temp, ui) {
            var dropped = ui.draggable;
            var droppedOn = $(this);
            // append dropped element to div its dropped on
            $(dropped).css({top: 0,left: 0}).appendTo(droppedOn);

            // set spot tile was dropped on to true
            if(!$(this).hasClass('tilediv')) {
                board[$(this).attr('id')] = true;
            } else {
                rack[$(this).attr('id')] = true;
            }
        },
        accept: function(ui){
            // acceptance for board
            if(!$(this).hasClass('tilediv')) {

                // check board to see if a tile is placed
                var count = 0;
                Object.keys(board).forEach(function(val) {
                    if(board[val] == true)
                        count++;
                });
                // if there is a tile on board there is a tile placed
                if(count > 0)
                    placed = true;
                
                // check if current spot is empty 
                var empty = false;
                if($(this).children().length == 0)
                    empty = true;

                // if there is a tile placed and the current div is empty 
                if(placed && empty) {
                    // if a tile is placed on the rack then there must be a tile to the left or right of the spot
                    if(board[$(this).prev().attr('id')] == true || board[$(this).next().attr('id')] == true) {
                        return noGaps();
                    }
                }
                // if there are no tiles placed always accept
                if(!placed)
                    return true;
                return false;
            }
            // only accept drop if tile rack div is empty
            if($(this).children().length == 0)
                return noGaps();
            return false;
        }
    });
});


// get number of tiles on the tile rack
function rackCount() {
    var count = 0;
    Object.keys(rack).forEach(function(val) {
        count += rack[val];
    });
    return count;
}


// event handler for click of the submit word button
$("#submit").click(function() {
    // update score
    score += getTempScore();

    var usedTiles = 7-rackCount();

    // clear tiles from board and generate new tiles onto rack
    clearBoard();
    if(usedTiles <= remainingTiles) {
        genTiles(usedTiles);
    }
    else {
        genTiles(remainingTiles);
    }

    // update remaining tiles
    remainingTiles -= usedTiles;
    // prevents remaining Tiles from displaying negative at end of game
    if(remainingTiles < 0)
        remainingTiles = 0;
});


// refresh the game info displayed on the top of the board
function refresh() {

    var tempWord = "";
    var infoStr ="";

    // get all letters in board (in order)
    $('#boarddiv').children().children('.tile').each(function () {
        tempWord += $(this).attr('id');
    });

    // create string to set text to
    infoStr += "Current Score: ";
    infoStr += score + getTempScore();
    infoStr += " (+" + getTempScore() + ")         Current Word: ";
    infoStr += tempWord;
    infoStr += "         Tiles Remaining: ";
    infoStr += remainingTiles;

    $('#infotext').text(infoStr);
}


// get score for the current word
function getTempScore() {
    var tempScore = 0;
    var wordMult = false;

    // for all tiles in the board
    $('#boarddiv').children().children('.tile').each(function () {
        // if normal square add points
        if($(this).parent().hasClass('boardSquare'))
            tempScore += tiles[$(this).attr('id')].value;

        // if letter mult square add double points
        if($(this).parent().hasClass('letterMultBoardSquare'))
            tempScore += (tiles[$(this).attr('id')].value*2);

        // if word mult square add points, and set wordMult flag
        if($(this).parent().hasClass('wordMultBoardSquare')) {
            tempScore += tiles[$(this).attr('id')].value;
            wordMult = true;
        }
    });
    // if a tile is on a word score multiplier
    if(wordMult)
        tempScore *= 2;
    return tempScore;
};


// remove tiles from board
function clearBoard() {
    // empty divs in board
    $('#boarddiv').children().each(function () {
        $(this).empty();
    });

    // reset placed variable
    placed = false;

    // reset all board values
    Object.keys(board).forEach(function(val) {
        board[val] = false;
    });
};


// remove tiles from rack
function clearRack() {
    // empty divs in rack
    $('#rackdiv').children().each(function () {
        $(this).empty();
    });

    // reset all board values
    Object.keys(rack).forEach(function(val) {
        rack[val] = false;
    });
};


// generate tiles onto rack
function genTiles (num){
    // for all divs in rack
    $('#rackdiv').children().each(function () {
        // if you have not generated more tiles than are available
        if(num > 0) {
            // if theres no tile in div generate new tile
            if($(this).children().length == 0){
                // generate random letter
                var letter = randChar();
                // regenerate until it is a letter that has tiles left
                while(tiles[letter].count == 0) {
                    letter = randChar();
                }

                // decrement count of remaining letter of current type
                tiles[letter].count--;

                // create tile image 
                var imgSource = "images/"+letter+".jpg";
                var img = $('<img alt="text" class="tile">'); 
                img.attr('src', imgSource);
                img.attr('id', letter);

                // append tile
                $(this).append(img);

                // set image to draggable
                $(img).draggable({
                    cursor: "grabbing",
                    snap: true,
                    snapTolerance: 20,
                    revert: "invalid",
                    start: function() {
                        // if rack is full there is no tile placed on board
                        if(rackCount() >=6)
                            placed = false;

                        // flag parent as empty once draggable is moved out
                        if($(this).parent().hasClass('tilediv')) {
                            rack[$(this).parent().attr('id')] = false;
                        } else {
                            board[$(this).parent().attr('id')] = false;
                        }
                    },
                    stop: function() {
                        // flag parent as filled once draggable is moved in
                        if($(this).parent().hasClass('tilediv')) {
                            rack[$(this).parent().attr('id')] = true;
                        } else {
                            board[$(this).parent().attr('id')] = true;
                        }
                    }
                }); 
                num--;
            }
        }
    });

    // overide all rack values to true
    Object.keys(rack).forEach(function(val) {
        rack[val] = true;
    });
};


function randChar() {
    // generate number from 0-26 and return corresponding letter
    return letters[Math.floor(Math.random() * 27)];
};


// event handler for click of the submit word button
$("#reset").click(function() {
    // update score and remaining tiles
    score = 0;
    remainingTiles = STARTINGREMAINDING;

    // clear tiles from board and generate new tiles onto rack
    clearBoard();
    clearRack();

    // overide all rack values to true
    Object.keys(rack).forEach(function(val) {
        rack[val] = true;
    });

    // reset counts of tiles to their original distribution
    for(var temp in tiles) {
        tiles[temp].count = tiles[temp].dist;
    }

    // refill rack with new tiles
    genTiles(7);
});

// checks to see if there is a gap in the tiles currently on the tile rack
function noGaps() {
    var boardVec =[];

    // put true/false board values into vector
    Object.keys(board).forEach(function(val) {
        boardVec.push(board[val]);
    });

    // cant be a gap with 2 or less tiles on board
    if(boardVec.length <= 2)
        return true;

    // check the board for gaps in tiles
    for(var i = 0; i < boardVec.length-2; i++) {
        // if there is a false between trues, there is a gap
        if(boardVec[i] == true && boardVec[i+1] == false && boardVec[i+2] == true)
            return false;
    }
    return true;

};
