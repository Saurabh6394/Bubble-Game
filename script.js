let score = 0;
let timeLeft = 60;
let hitNumber = 0;
let timerInterval;
let gameActive = false;

const bubbleArea = document.getElementById("bubbleArea");
const hitNumberEl = document.getElementById("hitNumber");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const gameOverEl = document.getElementById("gameOver");
const finalScoreEl = document.getElementById("finalScore");
const gameMessageEl = document.getElementById("gameMessage");

/* 🔥 Dynamic bubble count so last row is always filled */
function getBubbleCount() {
    const bubbleSize = 60; // bubble + gap (match CSS)

    const areaWidth = bubbleArea.clientWidth;
    const areaHeight = bubbleArea.clientHeight;

    const columns = Math.floor(areaWidth / bubbleSize);
    let rows = Math.floor(areaHeight / bubbleSize);

    rows = Math.max(rows - 3, 1); // 🔥 remove 3 rows safely

    return columns * rows;
}



function createBubbles() {
    bubbleArea.innerHTML = "";
    const count = getBubbleCount();

    for (let i = 0; i < count; i++) {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.innerText = Math.floor(Math.random() * 10) + 1;
        bubble.addEventListener("click", handleBubbleClick);
        bubbleArea.appendChild(bubble);
    }
}

function setHitNumber() {
    hitNumber = Math.floor(Math.random() * 10) + 1;
    hitNumberEl.innerText = hitNumber;
}

function handleBubbleClick(e) {
    if (!gameActive) return;

    const clicked = Number(e.target.innerText);

    if (clicked === hitNumber) {
        score += 10;
        scoreEl.innerText = score;
        createBubbles();
        setHitNumber();
    } else {
        endGame("wrong");
    }
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.innerText = timeLeft;

        if (timeLeft === 0) {
            endGame("timeout");
        }
    }, 1000);
}

function endGame(reason) {
    gameActive = false;
    clearInterval(timerInterval);
    bubbleArea.innerHTML = "";

    if (reason === "wrong") {
        gameMessageEl.innerText = "❌ Wrong Hit!";
        gameMessageEl.className = "wrong";
    } else {
        gameMessageEl.innerText = "⏱ Time's Up!";
        gameMessageEl.className = "timeout";
    }

    finalScoreEl.innerText = score;
    gameOverEl.classList.remove("hidden");
}

function startGame() {
    score = 0;
    timeLeft = 60;
    gameActive = true;

    scoreEl.innerText = score;
    timerEl.innerText = timeLeft;
    gameOverEl.classList.add("hidden");

    createBubbles();
    setHitNumber();
    startTimer();
}

window.addEventListener("resize", () => {
    if (gameActive) createBubbles();
});

startGame();
