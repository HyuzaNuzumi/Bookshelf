const { nanoid } = require('nanoid');
const books = require('./books');

const addBookshelf = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toDateString();
  const finished = pageCount === readPage;
  const updatedAt = insertedAt;

  const book = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
  };
  books.push(book);

  const 
};