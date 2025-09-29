const { nanoid } = require('nanoid');
const notes = require('./notes');

const addBookshelf = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toDateString();
  const updatedAt = insertedAt;

  const books = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
  };

  notes.push(books);

  const isSuccess = notes.filter((books) => books.id === id).length > 0;
  if (!name) {
    const response = h.response({
      status : 'fail',
      message : 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  } if (readPage > pageCount) {
    const response = h.response({
      status : 'fail',
      message : 'Gagal menambahkan buku. readpage tidak boleh lebih besar dari pagecount',
    });
    response.code(400);
  } if (isSuccess) {
    const response = h.response({
      status : 'success',
      message : 'Buku berhasil ditambahkan',
      data : {
        booksId : id,
      },
    });
    response.code(200);
    return response;
  } if (!payload.payload) {
    const response = h.response({
      status : 'fail',
      message : 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
 };

const getAllBookshelf = (request, h) => {
  const { booksId } = request.params;

  const book = notes.filter((b) => b.id === booksId)[0];
  if (book !== undefined) {
    return response({
      status : 'success',
      data : {
        book,
      },
    }).code(200);
  }
  const filterBooks = notes.map((book) => ({
    id : book.id,
    name : book.name,
    publisher : book.publisher
  }));

  return h.response({
    status : 'success',
    data : {
      book : filterBooks,
    },
  }).code(200);
};

const getByIdBookshelf = (request, h) => {
  const {booksId} = request.params;

  const book = notes.filter((b) => b.id === booksId)[0];
  if (book !== undefined) {
    return h.response({
      status : 'success',
      data : {
        book,
      },
    }).code(200);
  }
  const response = h.response({
    status : 'fail',
    message : 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
}

const editBookshelf = (request, h) => {
  const { booksId } = request.params;

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const updatedAt = new Date().toDateString();

  const book = notes.findIndex((books) => books.id === booksId);

  if(book === -1) {
    notes[book] = {
      ...notes[book],
      name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt,
    };

    const response = h.response({
      status : 'success',
      message : 'Buku berhasil ditambahkan',
    });
    response.code(200);
    return response;
  }if (!name) {
    const response = h.response({
      status : 'fail',
      message : 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  } if (readPage > pageCount) {
    const respones = h.response({
      status : 'fail',
      message : 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  } 
};

const deleteBooks = (request, h) => {
  const { booksId } = request.params;

  const index = books.findIndex((book) => book.id === booksId);
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status : 'success',
      message : 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status : 'fail',
    message : 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = { addBookshelf, getAllBookshelf, getByIdBookshelf, editBookshelf, deleteBooks };