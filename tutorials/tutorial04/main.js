let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// in p5.js, the function runs on page load:
function setup() {
    createCanvas(canvasWidth, canvasHeight);

    // invoke any drawing functions inside of setup.
    // functions should all go between "createCanvas()" and "drawGrid()"
    draw5Circles();
    draw5CirclesWhile()
    draw5CirclesFor()
    drawNCircles(10)
    drawNCirclesFlexible(50, 10, 600, 200)
    drawNShapesFlexible(30, 30, 335, 0, "square");
    drawNShapesFlexible(4, 100, 120, 200, "circle");
    drawNShapesFlexible(8, 50, 725, 25, "square");
    drawNShapesDirectionFlexible(30, 30, 335, 0, "square", "column");
    drawNShapesDirectionFlexible(4, 100, 120, 200, "circle", "row");
    drawNShapesDirectionFlexible(8, 50, 725, 425, "circle", "row");
    draw5RedSquares();
    drawGrid(canvasWidth, canvasHeight);
}

// my first function
function draw5Circles() {
    noFill();
    // fill('red');
    circle(100, 200, 50); // centerX, centerY, radius
    circle(100, 250, 50);
    circle(100, 300, 50);
    circle(100, 350, 50);
    circle(100, 400, 50);
}

function draw5RedSquares() {
    fill("red");
    square(320, 200, 50); // topLeftX, topLeftY, width
    square(320, 250, 50);
    square(320, 300, 50);
    square(320, 350, 50);
    square(320, 400, 50);
}

function draw5CirclesWhile() {
    noFill();
    let count = 0;
    let x = 200;
    let y = 200;
    let diameter = 50;
    let spacing = 50; 

    while (count < 5) {
        circle(x, y, diameter);
        y += spacing;
        count++;
    }
}

function draw5CirclesFor() {
    noFill();
    let x = 400;
    let y = 200;
    let diameter = 50;
    let spacing = 50;

    for (let i = 0; i < 5; i++) {
        circle(x, y, diameter);
        y += spacing;
    }
}

function drawNCircles(n) {
    noFill();
    let x = 500; 
    let y = 200; 
    let diameter = 25;
    let spacing = 25;

    for (let i = 0; i < n; i++) {
        circle(x, y, diameter);
        y += spacing; 
    }
}

function drawNCirclesFlexible(n, size, x, y) {
    noFill();
    let spacing = size;
    for (let i = 0; i < n; i++) {
        circle(x, y, size);
        y += spacing; 
    }
}

function drawNShapesFlexible(n, size, x, y, shape) {
    noFill();
    let spacing = size;

    for (let i = 0; i < n; i++) {
        if (shape === "circle") {
            circle(x, y, size);
        } else {
            square(x, y, size);
        }
        y += spacing;
    }
}

function drawNShapesDirectionFlexible(n, size, x, y, shape, direction) {
    noFill();
    let spacing = size;

    for (let i = 0; i < n; i++) {
        if (shape === "circle") {
            circle(x, y, size);
        } else {
            square(x, y, size);
        }
        if (direction === "row") {
            x += spacing;
        } else {
            y += spacing;
        }
    }
}