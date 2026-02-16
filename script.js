function formatJST(date) {
  const parts = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type) => parts.find(p => p.type === type)?.value ?? "";
  return `${get("year")}年${get("month")}月${get("day")}日 ` +
         `${get("hour")}時${get("minute")}分${get("second")}秒`;
}

function render() {
  const el = document.getElementById("clock");
  if (!el) return;

  el.textContent = formatJST(new Date());

  // 1秒ごとの更新に合わせて点滅を再生（不要ならここ消してOK）
  el.classList.remove("is-blinking");
  void el.offsetWidth; // reflow
  el.classList.add("is-blinking");
}

function startClock() {
  render();
  const ms = 1000 - new Date().getMilliseconds();
  setTimeout(() => {
    render();
    setInterval(render, 1000);
  }, ms);
}
startClock();

/* 画像の表示サイズに合わせてCSS変数を更新（時計とキラーン範囲がズレない） */
function syncToImage() {
  const img = document.getElementById("cardImg");
  const wrap = document.querySelector(".card-wrap");
  if (!img || !wrap) return;

  const r = img.getBoundingClientRect();
  wrap.style.setProperty("--card-w", `${r.width}px`);
  wrap.style.setProperty("--card-h", `${r.height}px`);
}

window.addEventListener("load", syncToImage);
window.addEventListener("resize", syncToImage);

const img = document.getElementById("cardImg");
if (img) img.addEventListener("load", syncToImage);

if (window.ResizeObserver) {
  const ro = new ResizeObserver(syncToImage);
  const target = document.getElementById("cardImg");
  if (target) ro.observe(target);
}
