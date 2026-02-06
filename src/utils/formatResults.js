export function formatResults(raw) {
  return {
    summary: raw?.summary || 'No summary available',
    sentiment: raw?.sentiment || 'unknown',
    keywords: Array.isArray(raw?.keywords) ? raw.keywords : [],
  };
}
