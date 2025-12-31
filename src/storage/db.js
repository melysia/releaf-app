// IndexedDB storage layer
// Abstracts all database operations for offline-first persistence

const DB_NAME = 'BookSectionsDB'
const DB_VERSION = 1
const BOOKS_STORE = 'books'
const SECTIONS_STORE = 'sections'

let db = null

/**
 * Opens the IndexedDB database
 * Returns a promise that resolves when DB is ready
 */
function openDB() {
  if (db) {
    return Promise.resolve(db)
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      db = request.result
      resolve(db)
    }

    request.onupgradeneeded = (event) => {
      const database = event.target.result

      // Create books store
      if (!database.objectStoreNames.contains(BOOKS_STORE)) {
        const booksStore = database.createObjectStore(BOOKS_STORE, { keyPath: 'id' })
        booksStore.createIndex('title', 'title', { unique: false })
      }

      // Create sections store
      if (!database.objectStoreNames.contains(SECTIONS_STORE)) {
        const sectionsStore = database.createObjectStore(SECTIONS_STORE, { keyPath: 'id' })
        sectionsStore.createIndex('bookId', 'bookId', { unique: false })
        sectionsStore.createIndex('pageNumber', 'pageNumber', { unique: false })
      }
    }
  })
}

/**
 * Books API
 */
export const booksDB = {
  async getAll() {
    const database = await openDB()
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([BOOKS_STORE], 'readonly')
      const store = transaction.objectStore(BOOKS_STORE)
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  },

  async get(id) {
    const database = await openDB()
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([BOOKS_STORE], 'readonly')
      const store = transaction.objectStore(BOOKS_STORE)
      const request = store.get(id)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  },

  async save(book) {
    const database = await openDB()
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([BOOKS_STORE], 'readwrite')
      const store = transaction.objectStore(BOOKS_STORE)
      const request = store.put(book)

      request.onsuccess = () => resolve(book)
      request.onerror = () => reject(request.error)
    })
  },

  async delete(id) {
    const database = await openDB()
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([BOOKS_STORE], 'readwrite')
      const store = transaction.objectStore(BOOKS_STORE)
      const request = store.delete(id)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }
}

/**
 * Sections API
 */
export const sectionsDB = {
  async getByBookId(bookId) {
    const database = await openDB()
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([SECTIONS_STORE], 'readonly')
      const store = transaction.objectStore(SECTIONS_STORE)
      const index = store.index('bookId')
      const request = index.getAll(bookId)

      request.onsuccess = () => {
        // Sort by pageNumber
        const sections = request.result.sort((a, b) => a.pageNumber - b.pageNumber)
        resolve(sections)
      }
      request.onerror = () => reject(request.error)
    })
  },

  async get(id) {
    const database = await openDB()
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([SECTIONS_STORE], 'readonly')
      const store = transaction.objectStore(SECTIONS_STORE)
      const request = store.get(id)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  },

  async save(section) {
    const database = await openDB()
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([SECTIONS_STORE], 'readwrite')
      const store = transaction.objectStore(SECTIONS_STORE)
      const request = store.put(section)

      request.onsuccess = () => resolve(section)
      request.onerror = () => reject(request.error)
    })
  },

  async delete(id) {
    const database = await openDB()
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([SECTIONS_STORE], 'readwrite')
      const store = transaction.objectStore(SECTIONS_STORE)
      const request = store.delete(id)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }
}

