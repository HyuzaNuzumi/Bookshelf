/* eslint-disable linebreak-style */
const { addBookshelf, getAllBookshelf, getByIdBookshelf, editByBooks } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookshelf,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookshelf,
  },
  {
    method: 'GET',
    path: '/books/{booksId}',
    handler: getByIdBookshelf,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editByBooks,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: () => {},
  }
];

module.exports = routes;