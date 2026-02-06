export function validateText(text) {
  if (!text) {
    return 'Text is required';
  }

  if (text.trim().length < 10) {
    return 'Text must be at least 10 characters';
  }

  if (text.length > 2000) {
    return 'Text is too long';
  }

  return null; // valid
}
