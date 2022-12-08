export const cleanHTML = (html) => {
  return html.replace(/<[^>]*>?/gm, "");
};
