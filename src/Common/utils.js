export const cleanHTML = (html) => {
  return html.replace(/<[^>]*>?/gm, "");
};

export const getSeason = () => {
  const date = new Date().getMonth();
  if (date >= 2 && date <= 4) {
    return 'SPRING'
  }
  if (date >= 5 && date <= 7) {
    return 'SUMMER'
  }
  if (date >= 8 && date <= 10) {
    return 'FALL'
  }
  return 'WINTER'
}