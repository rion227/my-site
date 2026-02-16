// JSTの年月日時分秒（常に日本時間）
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
  return `${get("year")}年${get("month")}月${get("day")}日 `
       + `${get("hour")}時${get("minute")}分${get("second")}秒`;
}

function renderClock() {
  const el = document.getElementById("clock");
  if (el) el.textContent = formatJST(new Date());
}

// 秒ぴったりで更新開始
function startClock() {
  renderClock();
  const ms = 1000 - new Date().getMilliseconds();
  setTimeout(() => {
    renderClock();
    setInterval(renderClock, 1000);
  }, ms);
}

/* 画像の「表示サイズ」をCSS変数へ反映（追従の要） */
function syncCardSizeVars() {
  const wrap = document.getElementById("cardWrap");
  const img = document.getElementById("cardImg");
  if (!wrap || !img) return;

  const rect = img.getBoundingClientRect();
  wrap.style.setProperty("--card-w", `${rect.width}px`);
  wrap.style.setProperty("--card-h", `${rect.height}px`);
}

window.addEventListener("load", () => {
  startClock();

  const img = document.getElementById("cardImg");
  if (img) {
    // 画像の読み込み完了時点で一度合わせる
    if (img.complete) syncCardSizeVars();
    img.addEventListener("load", syncCardSizeVars);
  }

  // 画面回転・リサイズ・アドレスバー出入り等でも追従
  window.addEventListener("resize", syncCardSizeVars, { passive: true });
  window.addEventListener("orientationchange", syncCardSizeVars);
});
