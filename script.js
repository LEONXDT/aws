const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);
let matrixChars = "HAPPYBIRTHDAY1234567890".split("");

function drawMatrixBackground() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#8a2be2";
  ctx.font = `${fontSize}px monospace`;
  for (let i = 0; i < drops.length; i++) {
    const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

function drawParticles(text, yOffset = 0, delay = 0, callback = null) {
  return new Promise((resolve) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawMatrixBackground();

      ctx.font = "bold 80px Arial";
      const textWidth = ctx.measureText(text).width;
      const x = (canvas.width - textWidth) / 2;
      const y = canvas.height / 2 + yOffset;
      const particles = [];

      for (let i = 0; i < text.length; i++) {
        particles.push({
          x: x + i * 60,
          y: y,
          r: 2,
          color: "#ff69b4"
        });
      }

      let frame = 0;
      function animateParticles() {
        drawMatrixBackground();
        ctx.fillStyle = "#ff69b4";
        particles.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });

        frame++;
        if (frame < 60) {
          requestAnimationFrame(animateParticles);
        } else {
          if (callback) callback();
          resolve();
        }
      }

      animateParticles();
    }, delay);
  });
}

function drawHeartFromParticles(callback = null) {
  const heart = [];
  const scale = 12;
  for (let t = 0; t < Math.PI * 2; t += 0.05) {
    const x = scale * 16 * Math.pow(Math.sin(t), 3);
    const y =
      -scale *
      (13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t));
    heart.push({ x, y });
  }

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2 + 40;

  function animateHeartParticles() {
    drawMatrixBackground();
    heart.forEach(p => {
      ctx.beginPath();
      ctx.arc(centerX + p.x, centerY + p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#ff69b4";
      ctx.fill();
    });

    ctx.font = "28px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Wishing you a wonderful day full of love!", centerX - 230, centerY);

    if (callback) callback();
  }

  animateHeartParticles();
}

async function startSequence() {
  await drawParticles("Happy Birthday", -150, 0);
  await drawParticles("alaa", -50, 1000);
  await drawParticles("1999-27-8", 50, 1000);
  await drawParticles("26", 150, 1000);
  setTimeout(() => drawHeartFromParticles(), 1000);
}

function animate() {
  drawMatrixBackground();
  requestAnimationFrame(animate);
}

animate();
startSequence();
