/* eslint-disable linebreak-style */
const { addBookshelf, getAllBookshelf, getByIdBookshelf, editByBooks, deleteByBooks } = require('./handler');

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
    path: '/books/{bookId}',
    handler: getByIdBookshelf,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler:  editByBooks,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteByBooks,
  },
];


module.exports = routes;