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

    const phase = Math.floor(elapsedTotal / secondsPerSide) % 4;
    const progress = (elapsedTotal % secondsPerSide) / secondsPerSide;

    let x, y;
    switch (phase) {
        case 0: // bottom left -> top left (breathe in)
            x = margin;
            y = margin + size * (1 - progress);
            instructionEl.textContent = 'Breathe in';
            break;
        case 1: // top left -> top right (hold)
            x = margin + size * progress;
            y = margin;
            instructionEl.textContent = 'Hold';
            break;
        case 2: // top right -> bottom right (breathe out)
            x = margin + size;
            y = margin + size * progress;
            instructionEl.textContent = 'Breathe out';
            break;
        case 3: // bottom right -> bottom left (hold)
            x = margin + size * (1 - progress);
            y = margin + size;
            instructionEl.textContent = 'Hold';
            break;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSquare();
    drawCircle(x, y);
    requestAnimationFrame(update);
}

range.addEventListener('input', () => {
    secondsPerSide = parseInt(range.value, 10);
    speedValue.textContent = secondsPerSide;
    elapsedTotal = 0;
    lastTimestamp = null;
    instructionEl.textContent = 'Breathe in';
});

speedValue.textContent = secondsPerSide;
requestAnimationFrame(update);

