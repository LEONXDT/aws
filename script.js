const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let messages = ["Happy Birthday", "alaa", "1999-27-8", "Age: 26"];
let finalMessage = "Just like the moon, the older you get, the more beautiful you become.";
let currentMessageIndex = 0;
let currentShape = [];
let showingHeart = false;
let messageDone = false;

function createTextShape(text, fontSize = 60) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let shape = [];
  for (let y = 0; y < canvas.height; y += 8) {
    for (let x = 0; x < canvas.width; x += 8) {
      let index = (y * canvas.width + x) * 4;
      if (imageData[index + 3] > 128) {
        shape.push({ x, y });
      }
    }
  }
  return shape;
}

function createHeartShape() {
  let points = [];
  let steps = 90;
  for (let i = 0; i < steps; i++) {
    let angle = (Math.PI * 2 * i) / steps;
    let x = 16 * Math.pow(Math.sin(angle), 3);
    let y = -(
      13 * Math.cos(angle) -
      5 * Math.cos(2 * angle) -
      2 * Math.cos(3 * angle) -
      Math.cos(4 * angle)
    );
    let posX = canvas.width / 2 + x * 15;
    let posY = canvas.height / 2 + y * 15;

    // نقطتين بكل خطوة
    points.push({ x: posX, y: posY });
    points.push({ x: posX + 2, y: posY + 2 });
  }
  return points;
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // خلفية Matrix
  drawMatrixBackground();

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    if (p.target) {
      let dx = p.target.x - p.x;
      let dy = p.target.y - p.y;
      p.x += dx * 0.1;
      p.y += dy * 0.1;
    }
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#ffc0cb"; // pink
    ctx.fill();
  }

  // آخر خطوة: نرسم الجملة داخل القلب
  if (messageDone && showingHeart) {
    drawTextInsideHeart(finalMessage);
  }

  requestAnimationFrame(drawParticles);
}

function drawTextInsideHeart(text) {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#ffc0cb";
  ctx.textAlign = "center";
  ctx.fillText(
    text,
    canvas.width / 2,
    canvas.height / 2 + 10
  );
}

function updateMessage() {
  if (currentMessageIndex < messages.length) {
    currentShape = createTextShape(messages[currentMessageIndex]);
    assignParticles(currentShape);
    currentMessageIndex++;
    setTimeout(updateMessage, 3000);
  } else {
    setTimeout(() => {
      // شكل القلب
      currentShape = createHeartShape();
      assignParticles(currentShape);
      showingHeart = true;
      messageDone = true;
    }, 3000);
  }
}

function assignParticles(shape) {
  while (particles.length < shape.length) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    });
  }

  for (let i = 0; i < shape.length; i++) {
    particles[i].target = shape[i];
  }
}

// خلفية Matrix
let matrixLetters = "アァイィウヴエェオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ";
matrixLetters = matrixLetters.split("");
let drops = Array(Math.floor(canvas.width / 20)).fill(1);

function drawMatrixBackground() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#9932cc"; // purple
  ctx.font = "14px monospace";
  for (let i = 0; i < drops.length; i++) {
    let text = matrixLetters[Math.floor(Math.random() * matrixLetters.length)];
    ctx.fillText(text, i * 20, drops[i] * 20);
    if (drops[i] * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}

updateMessage();
drawParticles();
