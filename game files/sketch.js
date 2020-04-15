let cells, ctr, flg, newcells;
function setup() {
    width = 600;
    height = 600;
    scale = 25;
    cells = [];
    ctr = 0;
    newcells = [];
    flg = 0;
    createCanvas(width, height);
    // Generate Cells
    for (let i = 0; i < height; i += scale) {
        for (let j = 0; j < width; j += scale) {
            cells[ctr] = new Cells(i, j);
            newcells[ctr++] = new Cells(i, j);
        }
    }
    frameRate(5);
}

function draw() {
    background(255);
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].alive == 1) {
            fill(255, 255, 0);
        }
        else {
            fill(0, 0, 0);
        }
        cells[i].show();
    }
    if(flg == 1) {
        copyState(cells, newcells);
        changeState();
        copyState(newcells, cells);
    }
}

function keyPressed() {
    if(keyCode == 32) {
        flg = !flg;
    }
}

function copyState(source, destination) {
    for(let i = 0; i < source.length; i++) {
        destination[i].alive = source[i].alive;
    }
}

function changeState() {
    for(let i = 0; i < cells.length; i++) {
        neighbours = getNeighbours(i);
        alive = getAlive(neighbours);
        if(!cells[i].alive) {
            if(alive == 3) {
                newcells[i].alive = 1;
            }
        }
        else {
            if(alive < 2 || alive > 3) {
                newcells[i].alive = 0;
            }
        }
    }
}

function getAlive(positions) {
    let ctr = 0;
    for(let i = 0; i < positions.length; i++) {
        if(cells[positions[i]].alive) {
            ctr++;
        }
    }
    return ctr;
}
function getCellPosition(x, y) {
    xCoordinate = floor(x / scale);
    yCoordinate = floor(y / scale);
    let pos = yCoordinate * (width / scale) + xCoordinate;
    return pos;
}

function getNeighbours(pos) {
    xPos = cells[pos].x;
    yPos = cells[pos].y;

    //Loop to construct factors
    factors = [];
    for(var j = -1; j < 2; j++) {
        for(var i = -1; i < 2; i++) {
            factors.push([i, j]);
        }
    }

    neighbours = [];
    for(let i = 0; i < factors.length; i++) {
        newXPos = xPos + scale * factors[i][0];
        newYPos = yPos + scale * factors[i][1];
        if((newXPos != xPos || newYPos != yPos) && (newXPos >= 0 && newYPos >= 0) && (newXPos < width && newYPos < height)) {
            pos = getCellPosition(newXPos, newYPos);
            if (pos >= 0) {
                neighbours.push(pos);
            }
        }
    }
    return neighbours;
}

function mousePressed() {
    pos = getCellPosition(mouseX, mouseY);
    cells[pos].alive = !cells[pos].alive;
    console.log(getNeighbours(pos));
}

class Cells {
    constructor(i, j) {
        this.x = j;
        this.y = i;
        this.alive = 0;
    }

    show() {
        stroke(255, 255, 255);
        strokeWeight(2);
        rect(this.x, this.y, scale, scale);
    }
}