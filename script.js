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

  const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
  return (
    `${get("year")}年${get("month")}月${get("day")}日 ` +
    `${get("hour")}時${get("minute")}分${get("second")}秒`
  );
}

function renderClock() {
  const el = document.getElementById("clock");
  if (!el) return;

  el.textContent = formatJST(new Date());

  // 1秒更新に合わせて点滅を毎回リスタート
  el.classList.remove("is-blinking");
  void el.offsetWidth; // reflow
  el.classList.add("is-blinking");
}

function startClock() {
  renderClock();
  const ms = 1000 - new Date().getMilliseconds();
  setTimeout(() => {
    renderClock();
    setInterval(renderClock, 1000);
  }, ms);
}

/* 画像の「表示サイズ」をCSS変数へ反映（時計/キラーン位置の要） */
function syncToImage() {
  const img = document.getElementById("cardImg");
  const wrap = document.getElementById("cardWrap");
  if (!img || !wrap) return;

  const r = img.getBoundingClientRect();
  wrap.style.setProperty("--card-w", `${r.width}px`);
  wrap.style.setProperty("--card-h", `${r.height}px`);
}

window.addEventListener("load", () => {
  startClock();

  const img = document.getElementById("cardImg");
  if (img) {
    if (img.complete) syncToImage();
    img.addEventListener("load", syncToImage);
  }

  window.addEventListener("resize", syncToImage, { passive: true });
  window.addEventListener("orientationchange", syncToImage);

  // サイズ変化監視（iPhoneのアドレスバー出入り等にも強い）
  if (window.ResizeObserver && img) {
    new ResizeObserver(syncToImage).observe(img);
  }
});
