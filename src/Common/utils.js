export const cleanHTML = (html) => {
  return html?.replace(/<[^>]*>?/gm, "");
};

export const getSeason = () => {
  const date = new Date().getMonth();
  if (date >= 2 && date <= 4) {
    return "SPRING";
  }
  if (date >= 5 && date <= 7) {
    return "SUMMER";
  }
  if (date >= 8 && date <= 10) {
    return "FALL";
  }
  return "WINTER";
};

export const getQuotes = () => {
  return import("../__mock_data__/quotes.mock.json")
    .then((res) => {
      return res?.default?.[
        Math.floor(Math.random() * (res.default?.length - 1))
      ];
    })
    .catch((err) => ({
      anime: "Naruto",
      character: "Yashamaru",
      quote:
        "Physical wounds will definitely bleed and may look painful \nbut over time they heal by themselves and if you apply medicine, \nthey will heal faster. What's troublesome are wounds of the heart. Nothing is harder to heal.",
    }));
};

export const getRandomeColor = () => {
  return `#${Math.floor(Math.random() * 0xfffff)}`;
};

export function secondsToDhms(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);

  // var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  // var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  // var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  // var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  // return {dDisplay, hDisplay, mDisplay, sDisplay};
  return { d, h, m, s };
}
