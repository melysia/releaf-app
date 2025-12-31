import React, { useState, useEffect } from 'react'
import { booksDB, sectionsDB } from './storage/db'
import { BookList } from './components/BookList'
import { BookForm } from './components/BookForm'
import { SectionViewer } from './components/SectionViewer'
import { SectionForm } from './components/SectionForm'
import './styles/app.css'

/**
 * Main app component
 * Manages navigation between views: book list, book form, section viewer
 */
function App() {
  const [books, setBooks] = useState([])
  const [sections, setSections] = useState([])
  const [currentView, setCurrentView] = useState('list') // 'list', 'create-book', 'view-book', 'add-section'
  const [selectedBook, setSelectedBook] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load books on mount
  useEffect(() => {
    loadBooks()
  }, [])

  // Load sections when a book is selected
  useEffect(() => {
    if (selectedBook) {
      loadSections(selectedBook.id)
    }
  }, [selectedBook])

  const loadBooks = async () => {
    try {
      const allBooks = await booksDB.getAll()
      setBooks(allBooks)
    } catch (error) {
      console.error('Failed to load books:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadSections = async (bookId) => {
    try {
      const bookSections = await sectionsDB.getByBookId(bookId)
      setSections(bookSections)
    } catch (error) {
      console.error('Failed to load sections:', error)
    }
  }

  const handleCreateBook = () => {
    setCurrentView('create-book')
  }

  const handleSaveBook = async (book) => {
    try {
      await booksDB.save(book)
      await loadBooks()
      setCurrentView('list')
    } catch (error) {
      console.error('Failed to save book:', error)
      alert('Failed to save book. Please try again.')
    }
  }

  const handleSelectBook = (book) => {
    setSelectedBook(book)
    setCurrentView('view-book')
  }

  const handleBackToList = () => {
    setSelectedBook(null)
    setSections([])
    setCurrentView('list')
  }

  const handleAddSection = () => {
    setCurrentView('add-section')
  }

  const handleSaveSection = async (section) => {
    try {
      await sectionsDB.save(section)
      await loadSections(section.bookId)
      setCurrentView('view-book')
    } catch (error) {
      console.error('Failed to save section:', error)
      alert('Failed to save section. Please try again.')
    }
  }

  const handleUpdateSection = async (section) => {
    try {
      await sectionsDB.save(section)
      await loadSections(section.bookId)
      setCurrentView('view-book')
    } catch (error) {
      console.error('Failed to update section:', error)
      alert('Failed to update section. Please try again.')
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  // Render based on current view
  if (currentView === 'create-book') {
    return (
      <div className="app">
        <BookForm
          onSave={handleSaveBook}
          onCancel={() => setCurrentView('list')}
        />
      </div>
    )
  }

  if (currentView === 'add-section') {
    return (
      <div className="app">
        <div className="viewer-header">
          <button onClick={() => setCurrentView('view-book')} className="btn-back">
            ← Back
          </button>
          <h2>Add Section to {selectedBook?.title}</h2>
        </div>
        <SectionForm
          bookId={selectedBook.id}
          onSave={handleSaveSection}
          onCancel={() => setCurrentView('view-book')}
        />
      </div>
    )
  }

  if (currentView === 'view-book' && selectedBook) {
    return (
      <div className="app">
        <SectionViewer
          book={selectedBook}
          sections={sections}
          onBack={handleBackToList}
          onSectionUpdate={handleUpdateSection}
          onSectionAdd={handleSaveSection}
        />
        <div className="add-section-fab">
          <button onClick={handleAddSection} className="btn-fab" title="Add Section">
            +
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <BookList
        books={books}
        onSelectBook={handleSelectBook}
        onCreateBook={handleCreateBook}
      />
    </div>
  )
}

export default App

