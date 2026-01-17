function formatDate(dateStr) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    weekday: "long"
  }).format(date);
}
function formatAmount($amount) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN"
  }).format($amount);
}
function nullToEmptyString(arg) {
  return arg ?? "";
}

export { formatAmount as a, formatDate as f, nullToEmptyString as n };
