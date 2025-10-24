// Game Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const crashMessage = document.getElementById('crashMessage');

let gameLoopId;
let gameRunning = false;

// Input Elements
const thrustInput = document.getElementById('thrustInput');
const gravityInput = document.getElementById('gravityInput');
const maxSpeedInput = document.getElementById('maxSpeedInput');

// Game State Variables (Initialized from inputs later)
let GRAVITY = parseFloat(gravityInput.value);
let UP_THRUST = -parseFloat(thrustInput.value);
let MAX_SPEED = parseFloat(maxSpeedInput.value);

// Helicopter State
const helicopter = {
    x: 50,
    y: canvas.height / 2,
    width: 30,
    height: 15,
    dy: 0, // Velocity on the Y axis
    color: 'red'
};

// Physics/Environment Constants
const WALL_WIDTH = 50;
const WALL_GAP_HEIGHT = 120;
const WALL_SPEED = 3;
let walls = [];
let nextWallX = canvas.width;
let isThrusting = false;

// --- Helper Functions ---

function drawHelicopter() {
    ctx.fillStyle = helicopter.color;
    ctx.fillRect(helicopter.x, helicopter.y, helicopter.width, helicopter.height);
}

function drawWall(wall) {
    ctx.fillStyle = 'green';
    // Top Wall
    ctx.fillRect(wall.x, 0, WALL_WIDTH, wall.topHeight);
    // Bottom Wall
    ctx.fillRect(wall.x, wall.bottomY, WALL_WIDTH, canvas.height - wall.bottomY);
}

function generateWall() {
    const minHeight = 20;
    const maxHeight = canvas.height - WALL_GAP_HEIGHT - minHeight;
    const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
    const bottomY = topHeight + WALL_GAP_HEIGHT;

    walls.push({
        x: nextWallX,
        topHeight: topHeight,
        bottomY: bottomY
    });

    nextWallX += WALL_WIDTH + 150;
}

// --- Game Logic ---

function updatePhysics() {
    // Read and update physics values from text boxes on every frame (allows "live" tuning)
    GRAVITY = parseFloat(gravityInput.value) || 0.3;
    UP_THRUST = -parseFloat(thrustInput.value) || -6;
    MAX_SPEED = parseFloat(maxSpeedInput.value) || 8;

    if (isThrusting) {
        helicopter.dy = UP_THRUST;
    } else {
        helicopter.dy += GRAVITY;
    }

    // Clamp speed
    helicopter.dy = Math.min(Math.max(helicopter.dy, -MAX_SPEED), MAX_SPEED);
    helicopter.y += helicopter.dy;

    // Environment/Wall Update
    walls.forEach(wall => {
        wall.x -= WALL_SPEED;
    });

    walls = walls.filter(wall => wall.x + WALL_WIDTH > 0);

    // Generate new walls
    if (nextWallX < canvas.width + WALL_WIDTH) {
        generateWall();
    }
}

function checkCollision() {
    let isCrashed = false;

    // Screen Bounds Collision
    if (helicopter.y < 0 || helicopter.y + helicopter.height > canvas.height) {
        isCrashed = true;
    }

    // Wall Collision (AABB detection)
    walls.forEach(wall => {
        // Check for X overlap
        if (helicopter.x + helicopter.width > wall.x && helicopter.x < wall.x + WALL_WIDTH) {
            // Check for Y overlap with TOP wall OR BOTTOM wall
            if (helicopter.y < wall.topHeight || helicopter.y + helicopter.height > wall.bottomY) {
                isCrashed = true;
            }
        }
    });

    if (isCrashed) {
        gameOver();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    walls.forEach(drawWall);
    drawHelicopter();
}

function loop() {
    if (!gameRunning) return;

    updatePhysics();
    checkCollision();
    draw();
    gameLoopId = requestAnimationFrame(loop);
}

// --- Game Flow Control ---

function startGame() {
    if (gameRunning) return;
    
    // Hide start screen and reset messages
    startScreen.style.display = 'none';
    crashMessage.style.display = 'none';
    
    // Reset state
    helicopter.y = canvas.height / 2;
    helicopter.dy = 0;
    walls = [];
    nextWallX = canvas.width;
    isThrusting = false;
    gameRunning = true;
    
    // Generate initial walls
    generateWall(); 
    generateWall();
    
    // Start the game loop
    loop();
}

function gameOver() {
    gameRunning = false;
    cancelAnimationFrame(gameLoopId);
    
    // Show the attract screen with crash message
    crashMessage.style.display = 'block';
    startScreen.style.display = 'flex';
}

// --- Input Handling ---

// Keyboard Events
document.addEventListener('keydown', (e) => {
    if (gameRunning && (e.key === 'ArrowUp' || e.key === ' ')) {
        isThrusting = true;
    } else if (!gameRunning && e.key === ' '){
        startGame(); // Start game with Spacebar from the attract screen
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === ' ') {
        isThrusting = false;
    }
});

// On-Screen Button Events
const upButton = document.getElementById('upButton');

upButton.addEventListener('mousedown', () => { 
    if (!gameRunning) startGame(); 
    isThrusting = true; 
});
upButton.addEventListener('mouseup', () => { isThrusting = false; });
upButton.addEventListener('touchstart', (e) => { 
    e.preventDefault(); 
    if (!gameRunning) startGame();
    isThrusting = true; 
}, { passive: false });
upButton.addEventListener('touchend', (e) => { 
    e.preventDefault(); 
    isThrusting = false; 
}, { passive: false });

// Start Button Handler
startButton.addEventListener('click', startGame);

// --- Initialization ---
// Display the attract screen when the page loads
draw(); 
// The game will start when the user clicks the "START GAME" button.
