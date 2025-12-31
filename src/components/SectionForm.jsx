import React, { useState, useEffect } from 'react'
import { createSection, validateSection } from '../models/Book'

/**
 * Form for creating or editing a section
 */
export function SectionForm({ bookId, section, onSave, onCancel }) {
  const [pageNumber, setPageNumber] = useState('')
  const [quote, setQuote] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  // If editing, populate form with existing data
  useEffect(() => {
    if (section) {
      setPageNumber(section.pageNumber.toString())
      setQuote(section.quote)
      setNotes(section.notes || '')
    }
  }, [section])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const sectionData = section
      ? { ...section, pageNumber: Number(pageNumber), quote: quote.trim(), notes: notes.trim() }
      : createSection(bookId, pageNumber, quote, notes)

    const validation = validateSection(sectionData)

    if (!validation.valid) {
      setError(validation.error)
      return
    }

    onSave(sectionData)
    
    // Reset form if creating new
    if (!section) {
      setPageNumber('')
      setQuote('')
      setNotes('')
    }
  }

  return (
    <div className="section-form">
      <h3>{section ? 'Edit Section' : 'Add New Section'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pageNumber">Page Number</label>
          <input
            id="pageNumber"
            type="number"
            min="0"
            value={pageNumber}
            onChange={(e) => setPageNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quote">Quote</label>
          <textarea
            id="quote"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            required
            rows="5"
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes (optional)</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="3"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {section ? 'Save Changes' : 'Add Section'}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

