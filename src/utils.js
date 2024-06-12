const truncateText = (text, maxLength) => {
  if (!text) return ''; // If text is undefined or null, return an empty string
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};
export default truncateText;
