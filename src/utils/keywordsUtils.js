export function formatKeywords(keywords, limit = 5) {
  return keywords.slice(0, limit).join(', ');
}
