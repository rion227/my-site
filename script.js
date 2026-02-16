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

  // 1秒ごとの更新に合わせて、ゆっくり点滅を再生
  el.classList.remove("is-blinking");
  // 再フローでアニメーションを確実にリスタート
  void el.offsetWidth;
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

function syncClockToImage() {
  const img = document.getElementById("cardImg");
  const wrap = document.querySelector(".card-wrap");
  if (!img || !wrap) return;

  const r = img.getBoundingClientRect();
  wrap.style.setProperty("--card-w", `${r.width}px`);
  wrap.style.setProperty("--card-h", `${r.height}px`);
}

window.addEventListener("load", syncClockToImage);
window.addEventListener("resize", syncClockToImage);

// 画像が遅れて読み込まれる時にも対応
const img = document.getElementById("cardImg");
if (img) img.addEventListener("load", syncClockToImage);

// さらに確実に（サイズ変化を監視）
if (window.ResizeObserver) {
  const ro = new ResizeObserver(syncClockToImage);
  const target = document.getElementById("cardImg");
  if (target) ro.observe(target);
}
