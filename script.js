const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let textIndex = 0;
const texts = [
  "8.27.1999",
  "Happy 26",
  "alaa",
  "All good things come to you",
  "Happy Birthday"
];

const particles = [];
const density = 5;

function createParticlesFromText(text) {
  particles.length = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.font = 'bold 80px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < imageData.height; y += density) {
    for (let x = 0; x < imageData.width; x += density) {
      const index = (y * imageData.width + x) * 4;
      if (imageData.data[index + 3] > 128) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          tx: x,
          ty: y,
          vx: 0,
          vy: 0
        });
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    let dx = p.tx - p.x;
    let dy = p.ty - p.y;
    p.vx += dx * 0.01;
    p.vy += dy * 0.01;
    p.vx *= 0.9;
    p.vy *= 0.9;
    p.x += p.vx;
    p.y += p.vy;

    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(animateParticles);
}

function showNextText() {
  createParticlesFromText(texts[textIndex]);
  textIndex = (textIndex + 1) % texts.length;
}

showNextText();
animateParticles();
setInterval(showNextText, 4000);
