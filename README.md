# Book Sections App

An offline-first web application for managing books and their sections/quotes. Built with React and IndexedDB.

## Features

- Create up to 3 books with title and author
- Add sections to each book with page numbers, quotes, and optional notes
- View sections in a swipeable interface (one section per screen)
- Edit existing sections
- Fully offline - no internet connection required
- Data persists locally using IndexedDB

## How to Run Locally

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

4. Build for production:
```bash
npm run build
```

## How Data is Stored

The app uses **IndexedDB** (a browser database) to store all data locally on your device.

### Database Structure

- **Database Name**: `BookSectionsDB`
- **Version**: 1

### Object Stores

1. **books** store
   - Key: `id` (string)
   - Indexes: `title`

2. **sections** store
   - Key: `id` (string)
   - Indexes: `bookId`, `pageNumber`

### Data Location

- **Chrome/Edge**: `chrome://indexeddb-internals/` (dev tools)
- **Firefox**: `about:preferences#privacy` → Storage tab
- Data is stored per-origin (per domain)

### Data Persistence

- Data persists across browser sessions
- Data is stored on your local device only
- No data is sent to any server
- Clearing browser data will delete all stored books and sections

## Known Limitations

1. **Maximum 3 books**: The app enforces a limit of 3 books as per requirements
2. **No search**: Search functionality is not implemented in the MVP
3. **No export**: There's no way to export or backup your data
4. **No sync**: Data is only stored locally - no cloud sync
5. **Browser-specific**: Data is tied to the browser you use
6. **No authentication**: Single-user app, no login required
7. **No deletion**: Books cannot be deleted (only sections can be edited)

## Technical Details

- **Framework**: React 18
- **Build Tool**: Vite
- **Storage**: IndexedDB
- **No external dependencies** beyond React

## Architecture Decisions

1. **IndexedDB over localStorage**: Chosen for better performance with larger datasets and structured data
2. **Simple component structure**: Flat component hierarchy for clarity
3. **No state management library**: Using React's built-in state management
4. **Touch events for swiping**: Native touch events for mobile-friendly navigation
5. **Offline-first**: All functionality works without network connection

## Development

The app follows a simple structure:
- `src/models/` - Data models and validation
- `src/storage/` - Database abstraction layer
- `src/components/` - React components
- `src/styles/` - CSS styles

All database operations are abstracted through the `db.js` module, making it easy to swap storage backends if needed.

