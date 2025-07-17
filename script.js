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
  "Wishing you joy and love",
  "26",
  "<3"
];

let particles = [];
let currentMsgIndex = 0;
let frame = 0;

function drawBackground() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#b84eff"; // لون الخلفية المتحركة (بنفسجي)
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
  particles = [];
  ctx.font = "40px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(text, centerX, centerY);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y += 6) {
    for (let x = 0; x < canvas.width; x += 6) {
      const index = (y * canvas.width + x) * 4;
      if (imageData.data[index + 3] > 128) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          targetX: x,
          targetY: y,
          color: "pink" // لون النقاط اللي تكون النص
        });
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();

  for (let p of particles) {
    const dx = p.targetX - p.x;
    const dy = p.targetY - p.y;
    p.x += dx * 0.05;
    p.y += dy * 0.05;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  frame++;
  if (frame < 200) {
    requestAnimationFrame(animateParticles);
  } else {
    currentMsgIndex++;
    if (currentMsgIndex < messages.length) {
      frame = 0;
      createTextParticles(messages[currentMsgIndex]);
      requestAnimationFrame(animateParticles);
    }
  }
}

createTextParticles(messages[currentMsgIndex]);
animateParticles();
setInterval(drawBackground, 33);
