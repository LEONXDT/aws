const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let messageIndex = 0;

// الرسائل بترتيبك
const messages = [
  "Happy Birthday",
  "alaa",
  "1999-27-8",
  "Age: 26",
  "You are the light that makes everything better."
];

class Particle {
  constructor(x, y, tx, ty) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.tx = tx;
    this.ty = ty;
    this.size = 2;
    this.color = "#ff69b4"; // اللون الوردي
  }

  update() {
    this.x += (this.tx - this.x) * 0.05;
    this.y += (this.ty - this.y) * 0.05;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

// رسم الخلفية المتحركة مثل الماتريكس
const matrixChars = "HAPPYBIRTHDAYALAAYOUARETHELIGHT1999278";
const fontSize = 16;
const columns = canvas.width / fontSize;
let drops = Array(Math.floor(columns)).fill(1);

function drawMatrixBackground() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#a020f0";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

// تحويل نص إلى نقاط
function textToParticles(message) {
  particles = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "bold 80px sans-serif";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(message, canvas.width / 2, canvas.height / 2);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < imageData.height; y += 6) {
    for (let x = 0; x < imageData.width; x += 6) {
      const i = (y * imageData.width + x) * 4;
      if (imageData.data[i + 3] > 128) {
        particles.push(new Particle(x, y, x, y));
      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  drawMatrixBackground();

  particles.forEach(p => {
    p.update();
    p.draw();
  });
}

// تغيير النص كل فترة
function showNextMessage() {
  if (messageIndex < messages.length) {
    textToParticles(messages[messageIndex]);
    messageIndex++;
    setTimeout(showNextMessage, 4000);
  }
}

animate();
setTimeout(showNextMessage, 1000);
