export function displayDate(createdAt) {
  const date = new Date(createdAt);
  const arrDate = [
    { lag: 60000, str: "1 минуту назад" },
    { lag: 300000, str: "5 минут назад" },
    { lag: 600000, str: "10 минут назад" },
    { lag: 1800000, str: "30 минут назад" },
    { lag: 3600000, str: String(date.getHours() + ":" + date.getMinutes()) },
    {
      lag: 86400000,
      str: String(
        date.toLocaleString("default", { month: "long", day: "numeric" })
      )
    },
    {
      lag: 31536000000,
      str: String(
        date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
      )
    },
    { lag: 315360000000000000000, str: "очень много лет тому назад" }
  ];
  const lag = Date.now() - createdAt;
  // const lag = 315360000000000000000;
  return arrDate.find((item) => item.lag >= lag).str;
}
