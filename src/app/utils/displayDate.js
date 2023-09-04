export function displayDate(createdAt) {
  const arrDate = [
    { lag: 60000, str: "1 минуту" },
    { lag: 300000, str: "5 минут" },
    { lag: 600000, str: "10 минут" },
    { lag: 1800000, str: "30 минут" },
    { lag: 3600000, str: "час" },
    { lag: 86400000, str: "день" },
    { lag: 31536000000, str: "год" },
    { lag: 315360000000000000000, str: "очень много лет" }
  ];
  const lag = Date.now() - createdAt;
  return arrDate.find((item) => item.lag >= lag).str;
}
