import React, { useState, useEffect } from 'react'
import { SectionForm } from './SectionForm'

/**
 * Horizontal swipe viewer for sections
 * One section per screen, swipe left/right to navigate
 */
export function SectionViewer({ book, sections, onBack, onSectionUpdate, onSectionAdd }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // Reset to first section when sections change
  useEffect(() => {
    setCurrentIndex(0)
  }, [sections.length])

  const currentSection = sections[currentIndex]

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentIndex < sections.length - 1) {
      // Swipe left - next section
      setCurrentIndex(currentIndex + 1)
    }

    if (isRightSwipe && currentIndex > 0) {
      // Swipe right - previous section
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < sections.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = (updatedSection) => {
    onSectionUpdate(updatedSection)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  if (sections.length === 0) {
    return (
      <div className="section-viewer">
        <div className="viewer-header">
          <button onClick={onBack} className="btn-back">← Back</button>
          <h2>{book.title}</h2>
        </div>
        <div className="empty-sections">
          <p>No sections yet. Add your first section!</p>
          <SectionForm
            bookId={book.id}
            onSave={onSectionAdd}
            onCancel={() => {}}
          />
        </div>
      </div>
    )
  }

  if (isEditing) {
    return (
      <div className="section-viewer">
        <div className="viewer-header">
          <button onClick={handleCancel} className="btn-back">← Cancel</button>
          <h2>Edit Section</h2>
        </div>
        <SectionForm
          bookId={book.id}
          section={currentSection}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    )
  }

  return (
    <div className="section-viewer">
      <div className="viewer-header">
        <button onClick={onBack} className="btn-back">← Back</button>
        <h2>{book.title}</h2>
        <div className="section-counter">
          {currentIndex + 1} / {sections.length}
        </div>
      </div>

      <div
        className="section-content"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="section-card">
          <div className="page-number">Page {currentSection.pageNumber}</div>
          <div className="quote">{currentSection.quote}</div>
          {currentSection.notes && (
            <div className="notes">
              <strong>Notes:</strong>
              <p>{currentSection.notes}</p>
            </div>
          )}
        </div>

        <div className="section-actions">
          <button onClick={handleEdit} className="btn-secondary">
            Edit
          </button>
        </div>
      </div>

      <div className="navigation-controls">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="nav-btn"
        >
          ← Prev
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === sections.length - 1}
          className="nav-btn"
        >
          Next →
        </button>
      </div>
    </div>
  )
}

