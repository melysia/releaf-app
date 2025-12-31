// Data models for Book and Section
// Keeping models simple - just type definitions and validation helpers

/**
 * Book model
 * @typedef {Object} Book
 * @property {string} id - Unique identifier
 * @property {string} title - Book title
 * @property {string} author - Book author
 */

/**
 * Section model
 * @typedef {Object} Section
 * @property {string} id - Unique identifier
 * @property {string} bookId - Parent book ID
 * @property {number} pageNumber - Page number
 * @property {string} quote - Quote text
 * @property {string} [notes] - Optional notes
 */

/**
 * Creates a new book object
 */
export function createBook(title, author) {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    author: author.trim(),
    createdAt: Date.now()
  }
}

/**
 * Creates a new section object
 */
export function createSection(bookId, pageNumber, quote, notes = '') {
  return {
    id: crypto.randomUUID(),
    bookId,
    pageNumber: Number(pageNumber),
    quote: quote.trim(),
    notes: notes.trim(),
    createdAt: Date.now()
  }
}

/**
 * Validates a book object
 */
export function validateBook(book) {
  if (!book.title || !book.author) {
    return { valid: false, error: 'Title and author are required' }
  }
  if (book.title.length > 200 || book.author.length > 200) {
    return { valid: false, error: 'Title and author must be under 200 characters' }
  }
  return { valid: true }
}

/**
 * Validates a section object
 */
export function validateSection(section) {
  if (!section.quote) {
    return { valid: false, error: 'Quote is required' }
  }
  if (section.pageNumber < 0) {
    return { valid: false, error: 'Page number must be non-negative' }
  }
  return { valid: true }
}

