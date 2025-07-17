const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const columns = Math.floor(canvas.width / 20);
const drops = Array(columns).fill(1);
const fontSize = 20;
const matrixChars = "HAPPYBIRTHDAY1999278ALAA0123456789";

function drawMatrixBackground() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#9b59b6"; // بنفسجي ناعم
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

class Particle {
  constructor(x, y) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.destX = x;
    this.destY = y;
    this.radius = 2;
    this.speed = Math.random() * 5 + 1;
  }

  update() {
    const dx = this.destX - this.x;
    const dy = this.destY - this.y;
    this.x += dx * 0.05;
    this.y += dy * 0.05;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#ff69b4"; // وردي
    ctx.fill();
  }
}

function getTextCoordinates(text) {
  const offscreen = document.createElement("canvas");
  const offCtx = offscreen.getContext("2d");
  offscreen.width = canvas.width;
  offscreen.height = canvas.height;
  offCtx.font = "80px Arial";
  offCtx.fillStyle = "white";
  offCtx.textAlign = "center";
  offCtx.textBaseline = "middle";
  offCtx.fillText(text, canvas.width / 2, canvas.height / 2);

  const imageData = offCtx.getImageData(0, 0, canvas.width, canvas.height);
  const coordinates = [];
  for (let y = 0; y < imageData.height; y += 10) {
    for (let x = 0; x < imageData.width; x += 10) {
      const index = (y * imageData.width + x) * 4;
      if (imageData.data[index + 3] > 128) {
        coordinates.push({ x, y });
      }
    }
  }
  return coordinates;
}

function drawParticles(text, callback) {
  const coords = getTextCoordinates(text);
  const particles = coords.map(c => new Particle(c.x, c.y));

  let frame = 0;
  function animateParticles() {
    drawMatrixBackground();
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    frame++;
    if (frame < 500) {
      requestAnimationFrame(animateParticles);
    } else {
      if (callback) callback();
    }
  }
  animateParticles();
}

function drawHeartFromParticles(callback) {
  const heartCoords = [];
  const scale = 12;
  for (let t = 0; t < Math.PI * 2; t += 0.05) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    heartCoords.push({
      x: canvas.width / 2 + x * scale,
      y: canvas.height / 2 - y * scale,
    });
  }
  const particles = heartCoords.map(c => new Particle(c.x, c.y));

  let frame = 0;
  function animateHeart() {
    drawMatrixBackground();
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    frame++;
    if (frame < 500) {
      requestAnimationFrame(animateHeart);
    } else {
      drawParticles("Wishing you joy and love!", () => {});
    }
  }
  animateHeart();
}

// تسلسل العرض
drawParticles("Happy Birthday", () => {
  drawParticles("alaa", () => {
    drawParticles("1999-27-8", () => {
      drawParticles("26 years old", () => {
        drawHeartFromParticles();
      });
    });
  });
});
