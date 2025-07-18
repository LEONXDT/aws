<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Happy Birthday</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      background: black;
      font-family: Arial, sans-serif;
    }
    #background-text {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: 50px;
      color: #ffffff20;
      white-space: nowrap;
      overflow: hidden;
      animation: scrollBackground 30s linear infinite;
      z-index: 0;
    }
    @keyframes scrollBackground {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
    canvas {
      position: relative;
      z-index: 1;
    }
  </style>
</head>
<body>
  <div id="background-text">I LOVE YOU • I LOVE YOU • I LOVE YOU •</div>
  <canvas id="canvas"></canvas>

  <script>
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    let messages = [
      { text: "Happy Birthday", size: 130 },
      { text: "alaa", size: 110 },
      { text: "1999-27-8", size: 100 },
      { text: "Age: 26", size: 90 }
    ];

    let finalMessage = "Just like the moon, the older you get, the more beautiful you become.";
    let currentMessageIndex = 0;
    let showingHeart = false;
    let messageDone = false;

    function createTextShape(text, fontSize = 100) {
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
      tempCtx.font = `bold ${fontSize}px Arial`;
      tempCtx.fillStyle = "white";
      tempCtx.textAlign = "center";
      tempCtx.fillText(text, tempCanvas.width / 2, tempCanvas.height / 2);
      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height).data;
      const shape = [];
      for (let y = 0; y < tempCanvas.height; y += 6) {
        for (let x = 0; x < tempCanvas.width; x += 6) {
          const index = (y * tempCanvas.width + x) * 4;
          if (imageData[index + 3] > 128) {
            shape.push({ x, y });
          }
        }
      }
      return shape;
    }

    function createHeartShape() {
      const points = [];
      const steps = 120;
      for (let i = 0; i < steps; i++) {
        const angle = (Math.PI * 2 * i) / steps;
        const x = 16 * Math.pow(Math.sin(angle), 3);
        const y = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
        const posX = canvas.width / 2 + x * 15;
        const posY = canvas.height / 2 + y * 15;
        points.push({ x: posX, y: posY });
        points.push({ x: posX + 2, y: posY + 2 }); // نقطتين بدل واحدة
      }
      return points;
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.target) {
          const dx = p.target.x - p.x;
          const dy = p.target.y - p.y;
          p.x += dx * 0.08;
          p.y += dy * 0.08;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#ff69b4";
        ctx.fill();
      }
      if (showingHeart && messageDone) {
        drawTextInsideHeart(finalMessage);
      }
      requestAnimationFrame(drawParticles);
    }

    function drawTextInsideHeart(text) {
      ctx.font = "18px Arial";
      ctx.fillStyle = "#ff69b4";
      ctx.textAlign = "center";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 10);
    }

    function updateMessage() {
      if (currentMessageIndex < messages.length) {
        const current = messages[currentMessageIndex];
        const shape = createTextShape(current.text, current.size);
        assignParticles(shape);
        currentMessageIndex++;
        setTimeout(updateMessage, 3000);
      } else {
        setTimeout(() => {
          const heart = createHeartShape();
          assignParticles(heart);
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
          target: null
        });
      }
      particles = particles.slice(0, shape.length);
      for (let i = 0; i < shape.length; i++) {
        particles[i].target = shape[i];
      }
    }

    updateMessage();
    drawParticles();
  </script>
</body>
</html>
