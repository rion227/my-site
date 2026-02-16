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
