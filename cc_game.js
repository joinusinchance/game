// Game Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gameLoopId;

// Helicopter State (Simple Pixel Art: a rectangle)
const helicopter = {
    x: 50,
    y: canvas.height / 2,
    width: 30,
    height: 15,
    dy: 0, // Velocity on the Y axis
    color: 'red'
};

// Physics Constants
const GRAVITY = 0.3;
const UP_THRUST = -6;
const MAX_SPEED = 8;
let isThrusting = false; // Flag for continuous up movement

// Game Environment - Simple continuous obstacles (like the classic 'Copter' game)
let walls = [];
const WALL_WIDTH = 50;
const WALL_GAP_HEIGHT = 120;
const WALL_SPEED = 3;
let nextWallX = canvas.width;

// --- Helper Functions ---

// Function to draw the helicopter
function drawHelicopter() {
    ctx.fillStyle = helicopter.color;
    ctx.fillRect(helicopter.x, helicopter.y, helicopter.width, helicopter.height);
}

// Function to draw one wall segment
function drawWall(wall) {
    ctx.fillStyle = 'green'; // Destructive environment color
    // Top Wall
    ctx.fillRect(wall.x, 0, WALL_WIDTH, wall.topHeight);
    // Bottom Wall
    ctx.fillRect(wall.x, wall.bottomY, WALL_WIDTH, canvas.height - wall.bottomY);
}

// Function to generate a new wall segment
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

    // Plan for the next wall position
    nextWallX += WALL_WIDTH + 150; // Wall width + space between walls
}

// --- Game Logic ---

function update() {
    // 1. **Physics Update**
    if (isThrusting) {
        helicopter.dy = UP_THRUST;
    } else {
        // Apply gravity
        helicopter.dy += GRAVITY;
    }

    // Clamp speed (optional, for stability)
    helicopter.dy = Math.min(Math.max(helicopter.dy, -MAX_SPEED), MAX_SPEED);

    // Apply velocity to position
    helicopter.y += helicopter.dy;

    // 2. **Environment/Wall Update**
    walls.forEach(wall => {
        wall.x -= WALL_SPEED;
    });

    // Remove off-screen walls
    walls = walls.filter(wall => wall.x + WALL_WIDTH > 0);

    // Generate new walls
    if (nextWallX < canvas.width + WALL_WIDTH) {
        generateWall();
    }

    // 3. **Collision Detection**
    let isCrashed = false;

    // Screen Bounds Collision
    if (helicopter.y < 0 || helicopter.y + helicopter.height > canvas.height) {
        isCrashed = true;
    }

    // Wall Collision (Simple AABB-based detection)
    walls.forEach(wall => {
        // Check for X overlap
        if (helicopter.x + helicopter.width > wall.x && helicopter.x < wall.x + WALL_WIDTH) {
            // Check for Y overlap with TOP wall
            if (helicopter.y < wall.topHeight) {
                isCrashed = true;
            }
            // Check for Y overlap with BOTTOM wall
            if (helicopter.y + helicopter.height > wall.bottomY) {
                isCrashed = true;
            }
        }
    });

    if (isCrashed) {
        cancelAnimationFrame(gameLoopId);
        alert('Crashed! Game Over. Press OK to restart.');
        initGame(); // Simple restart
    }
}

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Walls
    walls.forEach(drawWall);

    // Draw Helicopter
    drawHelicopter();
}

function loop() {
    update();
    draw();
    gameLoopId = requestAnimationFrame(loop);
}

// --- Input Handling ---

// Keyboard Events (Arrow Keys)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === ' ') {
        isThrusting = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === ' ') {
        isThrusting = false;
    }
});

// On-Screen Button Events
const upButton = document.getElementById('upButton');

upButton.addEventListener('mousedown', () => { isThrusting = true; });
upButton.addEventListener('mouseup', () => { isThrusting = false; });
upButton.addEventListener('touchstart', (e) => { e.preventDefault(); isThrusting = true; }, { passive: false });
upButton.addEventListener('touchend', (e) => { e.preventDefault(); isThrusting = false; }, { passive: false });


// --- Initialization ---

function initGame() {
    // Reset state
    helicopter.y = canvas.height / 2;
    helicopter.dy = 0;
    walls = [];
    nextWallX = canvas.width;
    isThrusting = false;
    
    // Generate initial walls
    generateWall(); 
    generateWall();
    
    // Start the game loop
    if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
    }
    loop();
}

// Start the game for the first time
initGame();
