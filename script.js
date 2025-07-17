const countdownEl = document.getElementById("countdown");
const messageEl = document.getElementById("message");

let count = 3;
const messages = [
  "🎉 Happy Birthday! 🎉",
  "alaa💖",
  "You are now 26!",
  "",
`     ***   ***
   *************
  ***************
  ***************
   *************
    ***********
     *********
       *****
        ***
         * `,
  "All good things come to you 💫"
];

function startCountdown() {
  const timer = setInterval(() => {
    countdownEl.innerText = count;
    count--;
    if (count < 0) {
      clearInterval(timer);
      countdownEl.style.opacity = 0;
      showMessages(0);
    }
  }, 1000);
}

function showMessages(index) {
  if (index >= messages.length) return;
  messageEl.style.display = "block";
  messageEl.innerText = messages[index];
  setTimeout(() => {
    showMessages(index + 1);
  }, 2500);
}

function startMatrix() {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.getElementById("matrix").appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const letters = "HAPPYBIRTHDAY".split("");
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#a020f0";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 33);
}

startMatrix();
startCountdown();
