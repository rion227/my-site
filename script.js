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
  if (el) el.textContent = formatJST(new Date());
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


// --- debug: clockに強制スタイルを当てる（CSSが壊れてても確実） ---
window.addEventListener("load", () => {
  const el = document.getElementById("clock");
  if (!el) return;

  el.style.position = "absolute";
  el.style.left = "50%";
  el.style.transform = "translateX(-50%)";
  el.style.bottom = "46px";           // ←ここで位置が変わるはず
  el.style.color = "white";
  el.style.fontWeight = "700";
  el.style.outline = "2px solid red"; // ←赤枠が出るはず
  el.style.zIndex = "9999";
});
