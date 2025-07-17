const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ضبط حجم الكانفاس
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const heartPoints = [];
const message = "Just like the moon, the older you get, the more beautiful you become.";
const fontSize = 18;

// إعداد النص للقياس
ctx.font = `${fontSize}px Arial`;
const textWidth = ctx.measureText(message).width;
const centerX = canvas.width / 2 - textWidth / 2;
const centerY = canvas.height / 2 + fontSize / 2;

// توليد نقاط القلب (نقطتين لكل خطوة)
function generateHeartPoints() {
  heartPoints.length = 0;
  for (let t = 0; t < Math.PI * 2; t += 0.05) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    
    const baseX = canvas.width / 2 + x * 15;
    const baseY = canvas.height / 2 - y * 15;

    // نقطتين بكل خطوة
    heartPoints.push({ x: baseX, y: baseY });
    heartPoints.push({ x: baseX + 2, y: baseY + 2 });
  }
}

// رسم النقاط وجملة داخل القلب
function drawTextInHeart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // رسم نقاط القلب
  for (let i = 0; i < heartPoints.length; i++) {
    ctx.beginPath();
    ctx.arc(heartPoints[i].x, heartPoints[i].y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#ff69b4"; // لون وردي واضح
    ctx.fill();
  }

  // رسم النص داخل القلب
  ctx.fillStyle = "#ff69b4";
  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = "center";
  ctx.fillText(message, canvas.width / 2, canvas.height / 2 + 10);
}

// تكرار الرسم
function animate() {
  drawTextInHeart();
  requestAnimationFrame(animate);
}

// تشغيل البداية
generateHeartPoints();
animate();
