import Database from 'better-sqlite3';

/**
 * Schema for the database
 *
 * The database contains:
 * - `Feedback`: Stores user feedback with a unique ID and text content.
 * - `Highlight`: Stores highlights associated with feedback, linking each highlight to a feedback entry.
 */
const sqlSchema = `
    CREATE TABLE IF NOT EXISTS Feedback
    (
        id   INTEGER PRIMARY KEY,
        text TEXT
    );

    CREATE TABLE IF NOT EXISTS Highlight
    (
        id         INTEGER PRIMARY KEY,
        quote      TEXT,
        summary    TEXT,
        feedbackId INTEGER,
        FOREIGN KEY (feedbackId) REFERENCES Feedback (id)
    );
`;

/**
 * Initializes the in-memory SQLite database and executes the schema.
 *
 * This instance runs entirely in memory, meaning data will not persist after the application exits.
 * The schema is executed upon initialization to ensure necessary tables exist.
 */
const db = new Database(':memory:');
db.exec(sqlSchema);

export default db;
