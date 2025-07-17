const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const fontSize = 12;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

const messages = [
  "Happy Birthday",
  "alaa",
  "1999-27-8",
  "26",
  "Wishing you joy and love"
];

let particles = [];
let currentMsgIndex = 0;
const delayBetweenTexts = 3000;

function drawBackground() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#b84eff";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = String.fromCharCode(0x30A0 + Math.random() * 96);
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

function createTextParticles(text) {
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  tempCtx.font = "140px Arial"; // حجم الخط صار أكبر
  tempCtx.fillStyle = "white";
  tempCtx.textAlign = "center";
  tempCtx.fillText(text, centerX, centerY);
  const imageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height);

  let targetPoints = [];
  for (let y = 0; y < canvas.height; y += 12) {
    for (let x = 0; x < canvas.width; x += 12) {
      const i = (y * canvas.width + x) * 4;
      if (imageData.data[i + 3] > 128) {
        targetPoints.push({ x, y });
      }
    }
  }

  particles = targetPoints.map(p => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    targetX: p.x,
    targetY: p.y,
    color: "pink"
  }));
}

function createHeartShape() {
  const heartPoints = [];
  const scale = 20; // كبرنا حجم القلب

  for (let t = 0; t < Math.PI * 2; t += 0.05) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    heartPoints.push({
      x: canvas.width / 2 + x * scale,
      y: canvas.height / 2 - y * scale,
    });
  }

  particles = heartPoints.map(p => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    targetX: p.x,
    targetY: p.y,
    color: "pink"
  }));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();

  for (let p of particles) {
    p.x += (p.targetX - p.x) * 0.1;
    p.y += (p.targetY - p.y) * 0.1;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); // حجم النقطة صار أكبر
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

function showMessagesSequentially() {
  if (currentMsgIndex < messages.length) {
    createTextParticles(messages[currentMsgIndex]);
    currentMsgIndex++;
    setTimeout(showMessagesSequentially, delayBetweenTexts);
  } else {
    setTimeout(() => {
      createHeartShape();
    }, delayBetweenTexts);
  }
}

createTextParticles(messages[0]);
animate();
showMessagesSequentially();
setInterval(drawBackground, 33);
