
export const getSlug = (text) => {
    return text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');
  };