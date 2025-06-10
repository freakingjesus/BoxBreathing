const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const instructionEl = document.getElementById('instruction');
const range = document.getElementById('speedRange');
const speedValue = document.getElementById('speedValue');

let secondsPerSide = parseInt(range.value, 10);
let lastTimestamp = null;
let elapsedTotal = 0;

const size = 200; // square size
const margin = 50; // offset from canvas edges

function drawCircle(x, y) {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
}

function drawSquare() {
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(margin, margin, size, size);
}

function update(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const delta = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;
    elapsedTotal += delta;

    const cycleTime = secondsPerSide * 4;
    const elapsed = elapsedTotal % cycleTime;
    const t = elapsed / secondsPerSide; // 0-4

    let x, y;
    if (t < 1) { // top: left -> right (breathe in)
        x = margin + size * t;
        y = margin;
        instructionEl.textContent = 'Breathe in';
    } else if (t < 2) { // right: top -> bottom (hold)
        x = margin + size;
        y = margin + size * (t - 1);
        instructionEl.textContent = 'Hold';
    } else if (t < 3) { // bottom: right -> left (breathe out)
        x = margin + size * (3 - t);
        y = margin + size;
        instructionEl.textContent = 'Breathe out';
    } else { // left: bottom -> top (hold)
        x = margin;
        y = margin + size * (4 - t);
        instructionEl.textContent = 'Hold';
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSquare();
    drawCircle(x, y);
    requestAnimationFrame(update);
}

range.addEventListener('input', () => {
    secondsPerSide = parseInt(range.value, 10);
    speedValue.textContent = secondsPerSide;
});

speedValue.textContent = secondsPerSide;
requestAnimationFrame(update);
