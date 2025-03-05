// Constants for images
const IMAGES = {
    cactus: "cactus.png",
    silver: "silver.png",
    gold: "gold.png",
    snake: "snake.png",
    pottery: "pottery.png"
};

// Game state variables
const ids = [];
let score = 0;
let locationsVisited = 0;
let lastLocation = 0;
let gameOver = false;

// Special item locations
const silverLocations = [2, 5, 11, 21, 32];
const goldLocation = 15;
const snakeLocation = 20;

// Initialize Game Board
function createBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < 35; i++) {
        let img = document.createElement("img");
        img.src = IMAGES.cactus;  // Default image
        img.id = "img" + i;  // Unique ID
        img.onclick = () => check(i);  // Assign click event
        board.appendChild(img);
        ids.push(img.id);
    }
}

// Function to check clicked location
function check(position) {
    if (gameOver) return;  // Stop if game is over

    let imgElement = document.getElementById(ids[position]);

    if (silverLocations.includes(position)) {
        imgElement.src = IMAGES.silver;
        score += 3;
    } else if (position === goldLocation) {
        imgElement.src = IMAGES.gold;
        score += 5;
    } else if (position === snakeLocation) {
        imgElement.src = IMAGES.snake;
        score -= 3;
        gameOver = true;
    } else {
        imgElement.src = IMAGES.pottery;
        score += 1;
    }

    locationsVisited++;
    lastLocation = position;

    document.getElementById("locations").innerText = `Number of locations checked: ${locationsVisited}`;
    document.getElementById("score").innerText = `Score: ${score}`;
}

// Function to provide hints (Help)
function help() {
    let nearbyPositions = [
        lastLocation - 1, lastLocation + 1, 
        lastLocation - 7, lastLocation + 7 
    ];

    nearbyPositions = nearbyPositions.filter(pos => pos >= 0 && pos < 35);

    let hint = "wind";  // Default hint

    for (let pos of nearbyPositions) {
        if (silverLocations.includes(pos)) {
            hint = "clink";
            break;
        }
    }

    let snakeRow = Math.floor(snakeLocation / 7);
    let snakeCol = snakeLocation % 7;
    let lastRow = Math.floor(lastLocation / 7);
    let lastCol = lastLocation % 7;

    if (Math.abs(snakeRow - lastRow) <= 1 && Math.abs(snakeCol - lastCol) <= 1) {
        hint = "rattle";
    }

    document.getElementById("help").innerText = `Help report: ${hint}`;
}

// Run on page load
window.onload = createBoard;
