/* eslint-disable linebreak-style */
const { nanoid } = require('nanoid');
const notes = require('./notes');

const addBookshelf = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const id = nanoid(16);

  const finished = pageCount === readPage;
  const insertedAt = new Date().toDateString();
  const updated = insertedAt;

  const books = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updated,
  };

  notes.push(books);

  const isSuccess = notes.filter((books) => books.id === id).length > 0;
  if (!name){
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  } if (readPage > pageCount){
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readpage tidak boleh lebih besar dari pagecount',
    });
    response.code(400);
    return response;
  } if (isSuccess){
    const response = h .response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data:{
        booksId: id,
      },
    });
    response.code(200);
    return response;
  } if (!request.payload) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Data tidak valid',
    });
    response.code(400);
    return response;
  }
};

const getAllBookshelf = (request, h) => {
  const { id } = request.params;

  const book = notes.filter((b) => b.id ===id)[0];

  if (book !== undefined) {
    return h.response({
      status: 'success',
      data: {
        book
      },
    }).code(200);
  }
  const filteredBooks = book.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher
  }));

  return h.response({
    status: 'success',
    data: {
      books: filteredBooks,
    },
  }).code(200);
};

const getByIdBookshelf = (request, h) => {
  const { id } = request.params;

  const book = notes.filter((b) => b.id === id)[0];
  if (book !== undefined){
    return h.response({
      status: 'success',
      data: {
        book,
      },
    }).code(200);
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editByBooks = (request, h) => {
  const { id } = request.params;

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const updated  = new Date().toISOString();

  const book = notes.findIndex((note) => note.id === id);

  if (book !== -1) {
    notes[book] = {
      ...notes[book],
      name, year, author, summary, publisher, pageCount, readPage, reading, updated,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
    });
    response.code(200);
    return response;
  } if (!name){
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  } if (readPage > pageCount){
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
};

const deleteByBooks = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
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
};
module.exports = { addBookshelf, getAllBookshelf, getByIdBookshelf, editByBooks, deleteByBooks };
