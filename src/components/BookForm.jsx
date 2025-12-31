import React, { useState } from 'react'
import { createBook, validateBook } from '../models/Book'

/**
 * Form for creating a new book
 */
export function BookForm({ onSave, onCancel }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const book = createBook(title, author)
    const validation = validateBook(book)

    if (!validation.valid) {
      setError(validation.error)
      return
    }

    onSave(book)
    // Reset form
    setTitle('')
    setAuthor('')
  }

  return (
    <div className="book-form">
      <h2>Create New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Create Book
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

