'use strict';

/*****************************************************************************************
* Part 2
****************************************************************************************/
var employees = [
        {first: "Amanda", last: "Byron", group: "Sales"},
        {first: "Ye", last: "Xia", group: "Receiving", nameOrder: "reverse"},
        {first: "Miltiades", last: "Crescens", group: "Sales"},
    ];

// Part 2 Answer Here

function organizeByGroup( array ) {
    const newObject = {
        receiving: [],
        sales: []
    };
    for( var i = 0; i < employees.length; i++ ) {
        if( employees[i].group === 'Sales' ) {
            if( employees[i].nameOrder ) {
                newObject.sales.push( { name: employees[i].last + ' ' + employees[i].first } );
            } else {
                newObject.sales.push( { name: employees[i].first + ' ' + employees[i].last } );
            }
        } else if( employees[i].group === 'Receiving') {
            if( employees[i].nameOrder ) {
                newObject.receiving.push( { name: employees[i].last + ' ' + employees[i].first } ); 
            } else {
                newObject.receiving.push( { name: employees[i].first + ' ' + employees[i].last } );
            }
        }
    }
    return newObject;
}

console.log( 'function result: ', organizeByGroup( employees ) );

/*****************************************************************************************
* Part 3
****************************************************************************************/

// Part 3 Anwser Here

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const boundingBox = canvas.getBoundingClientRect();
const xOffset = boundingBox.left;
const yOffset = boundingBox.top;
const canvasHeight = boundingBox.height;
const canvasWidth = boundingBox.width;
const rabbitArr = [];
let currentGen = 0;

// Create a Rabbit Class that is an object with pointers to parents and children.
class Rabbit {
    constructor( gen, x, y, w, h ) {
        this.generation = gen,
        this.height = h,
        this.width = w,
        this.xCoor = x,
        this.yCoor = y,
        this.parents = [],
        this.children = []
    }

    createRabbit() {
        // Fill rectangle with color  
        context.fillStyle = "#DAA520";
        // Draw rectangle on the canvas
        context.fillRect( this.xCoor, this.yCoor, this.width, this.height);

        // Add created rabbit to rabbit array
        rabbitArr.push( this );
        console.log('rabbit array: ', rabbitArr);
    }    
}

// Start with three rabbits on the canvas in a random location.
for( var i = 0; i < 3; i++ ) {
    // Generate random coordinates
    let xCoor = Math.floor( Math.random() * (canvasWidth - 30) );
    let yCoor = Math.floor( Math.random() * (canvasHeight - 25) );

    let r = new Rabbit( currentGen, xCoor, yCoor, 30, 25 );
    r.createRabbit();
}

function generate() {
    currentGen++;

    for( var i = 0; i < rabbitArr.length; i++ ) {
        if( rabbitArr[i].generation === (currentGen - 1) ) {
            // Generate between 0 and 5 new rabbits
            let babies = Math.floor( Math.random() * 5 );
            console.log( 'babies: ', babies);
            for( var j = 0; j < babies; j++ ) {
                // Generate random coordinates
                let xCoor = Math.floor( Math.random() * (canvasWidth - 30) );
                let yCoor = Math.floor( Math.random() * (canvasHeight - 25) );
                // Offspring must be 2/3 the size of their parents
                const babyHeight = rabbitArr[i].height * (2 / 3);
                const babyWidth = rabbitArr[i].width * (2 / 3);
                // Use Gaussian curve so that children will be more likely closer than farther from parent
                // Did not get this fully worked out
                const gaussNum = Math.cos(2 * Math.PI * Math.random());
                const newXCoor = rabbitArr[i].xCoor + (0.5 - gaussNum) * 50;
                const newYCoor = rabbitArr[i].yCoor + (0.5 - gaussNum) * 50;
                // Create new baby rabbit
                let r = new Rabbit( currentGen, newXCoor, newYCoor, babyWidth, babyHeight );
                r.createRabbit();
                // Add baby to its parent's children array
                rabbitArr[i].children.push( r );
                // Add baby's parent to its parents array
                r.parents.push( rabbitArr[i] );
            }
        }
    }
}

// Create an onClick handler that changes the color of clicked rabbit's parents and children.
function changeColor(e) {
    e.preventDefault();
    e.stopPropagation();
    const xMouse = e.clientX - xOffset;
    const yMouse = e.clientY - yOffset;
    for( var i = 0; i < rabbitArr.length; i++ ) {
        if( xMouse >= rabbitArr[i].xCoor && xMouse <= rabbitArr[i].xCoor + rabbitArr[i].width && yMouse >= rabbitArr[i].yCoor && yMouse <= rabbitArr[i].yCoor + rabbitArr[i].height ) {
            // Make white border around clicked rabbit
            context.strokeStyle = '#ffffff';
            context.strokeRect( rabbitArr[i].xCoor, rabbitArr[i].yCoor, rabbitArr[i].width, rabbitArr[i].height );
            // Make children yellow
            context.fillStyle = 'yellow';
            for( var j = 0; j < rabbitArr[i].children.length; j++ ) {
                context.fillRect( rabbitArr[i].children[j].xCoor, rabbitArr[i].children[j].yCoor, rabbitArr[i].children[j].width, rabbitArr[i].children[j].height );
            }
            // Make parents blue
            context.fillStyle = 'blue';
            for( var k = 0; k < rabbitArr[i].parents.length; k++ ) {
                context.fillRect( rabbitArr[i].parents[k].xCoor, rabbitArr[i].parents[k].yCoor, rabbitArr[i].parents[k].width, rabbitArr[i].parents[k].height );
            }
        }
    }
}

canvas.onmousedown = changeColor;
