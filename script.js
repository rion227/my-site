function pad2(n) {
  return String(n).padStart(2, "0");
}

function formatJST(date) {
  // JSTで「年月日 時分秒」を作る
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

function tick() {
  const el = document.getElementById("clock");
  if (!el) return;
  el.textContent = formatJST(new Date());
}

tick();
setInterval(tick, 1000);
