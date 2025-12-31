import React from 'react'

/**
 * Displays list of books
 * Clicking a book opens it for viewing sections
 */
export function BookList({ books, onSelectBook, onCreateBook }) {
  // Limit to 3 books as per requirements
  const canCreateMore = books.length < 3

  return (
    <div className="book-list">
      <div className="book-list-header">
        <h1>My Books</h1>
        {canCreateMore && (
          <button onClick={onCreateBook} className="btn-primary">
            + New Book
          </button>
        )}
        {!canCreateMore && (
          <p className="limit-message">Maximum 3 books reached</p>
        )}
      </div>

      {books.length === 0 ? (
        <div className="empty-state">
          <p>No books yet. Create your first book to get started!</p>
        </div>
      ) : (
        <div className="books-grid">
          {books.map(book => (
            <div
              key={book.id}
              className="book-card"
              onClick={() => onSelectBook(book)}
            >
              <h2>{book.title}</h2>
              <p className="author">by {book.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

