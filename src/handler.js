const { nanoid } = require('nanoid');
const bok = require('./bok');

const addBookshelf = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  } if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    })
  }
  const id = nanoid(16);
  const insertedAt = new Date().toDateString();
  const finished = pageCount === readPage;
  const updatedAt = insertedAt;

  const book = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
  };
  bok.push(book);

  const isSuccess = bok.filter((books) => books.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambakan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
}

const getAllBookshelf = (request, h) => {
  const { id } = request.params;

  const books = bok.filter((b) => b.id === id)[0];

  if ( !books) {
    return h.response({
      status: 'success',
      data: {
        books
      },
    }).code(200);
  }
  const filterBooks = bok.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));
  return h.response({
    status: 'success',
    data: {
      books: filterBooks
    },
  }).code(200);
};

const getByIdBookshelf = (request, h) => {
  const { bookId } = request.params;
  
  const books = bok.filter((b) => b.id === bookId)[0];

  if (!books) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    });
    response.code(404);
    return response;
  }
  return h.response({
    status: 'success',
    data: {
      books,
    },
  }).code(200);
};

const editByBooks = (request, h) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const updatedAt = new Date().toDateString();
  
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const index = bok.findIndex((b) => b.id === bookId);
  if (index === -1) {
    bok[index] = {
      ...bok[index],
      name, year, author, summary, publisher, pageCount, readPage, reading , updatedAt
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
}

  const deleteByBooks = (request, h) => {
    const { bookId } = request.params;
    const index = bok.findIndex((book) => book.id === bookId);

    if (index !== -1) {
      bok.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

module.exports = { addBookshelf, getAllBookshelf, getByIdBookshelf, editByBooks, deleteByBooks };