export function timeStrToMins(strTime) {
  if (!strTime) return 1;
  const [h, m] = strTime.split(":");
  return Number(h) * 60 + Number(m);
}

export function minsToTimeStr(val) {
  const sign = val > 0 ? "" : "-";
  val = val > 0 ? val : -val;
  let m = val % 60;
  let h = (val - m) / 60;

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;

  return `${sign}${h}:${m}`;
}

