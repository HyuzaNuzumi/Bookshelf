/* eslint-disable linebreak-style */
const { addBookshelf, getAllBookshelf, getByIdBookshelf, editByBooks, editBookshelf, deleteBooks } = require('./handler');

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
    handler: editBookshelf,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBooks,
  }
];

module.exports = routes;