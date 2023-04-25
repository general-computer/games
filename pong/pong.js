const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const PADDLE_SPEED = 5;
const BALL_SIZE = 10;
const BALL_SPEED = 4;

let leftPaddleY = (canvas.height - PADDLE_HEIGHT) / 2;
let rightPaddleY = (canvas.height - PADDLE_HEIGHT) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = BALL_SPEED;
let ballSpeedY = BALL_SPEED;

function drawPaddle(x, y, width, height) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, width, height);
}

function drawBall(x, y, size) {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
}

function drawNet() {
    ctx.fillStyle = '#fff';
    ctx.setLineDash([5, 3]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);
}
function movePaddles() {
    if (leftPaddleY + PADDLE_SPEED < ballY && leftPaddleY + PADDLE_HEIGHT > canvas.height / 2) {
        leftPaddleY += PADDLE_SPEED;
    } else if (leftPaddleY - PADDLE_SPEED > ballY && leftPaddleY < canvas.height / 2) {
        leftPaddleY -= PADDLE_SPEED;
    }

    if (rightPaddleY + PADDLE_SPEED < ballY && rightPaddleY + PADDLE_HEIGHT > canvas.height / 2) {
        rightPaddleY += PADDLE_SPEED;
    } else if (rightPaddleY - PADDLE_SPEED > ballY && rightPaddleY < canvas.height / 2) {
        rightPaddleY -= PADDLE_SPEED;
    }
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY - BALL_SIZE / 2 <= 0 || ballY + BALL_SIZE / 2 >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX - BALL_SIZE / 2 <= PADDLE_WIDTH && ballY > leftPaddleY && ballY < leftPaddleY + PADDLE_HEIGHT ||
        ballX + BALL_SIZE / 2 >= canvas.width - PADDLE_WIDTH && ballY > rightPaddleY && ballY < rightPaddleY + PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX - BALL_SIZE / 2 <= 0 || ballX + BALL_SIZE / 2 >= canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawNet();
    drawPaddle(0, leftPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);
    drawPaddle(canvas.width - PADDLE_WIDTH, rightPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);
    drawBall(ballX, ballY, BALL_SIZE);

    movePaddles();
    moveBall();

    requestAnimationFrame(gameLoop);
}

gameLoop();

