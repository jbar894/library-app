const express = require('express');

const bookRouter = express.Router();
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');

function router(nav) {
  const books = [
    {
      title: 'book1',
      genre: 'genre1',
      author: 'author1',
      read: false
    },
    {
      title: 'book2',
      genre: 'genre2',
      author: 'author2',
      read: false
    },
    {
      title: 'book3',
      genre: 'genre3',
      author: 'author3',
      read: false
    },
    {
      title: 'book4',
      genre: 'genre4',
      author: 'author4',
      read: false
    }
  ];

  bookRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const request = new sql.Request();

        const { recordset } = await request.query('select * from books');

        res.render(
          'bookListView',
          {
            nav,
            title: 'Library',
            books: recordset
          }
        );
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();

        const { recordset } =
          await request
            .input('id', sql.Int, id)
            .query('select * from books where id = @id');
        res.render(
          'bookView',
          {
            nav,
            title: 'Library',
            book: recordset[0]
          }
        );
      }());
    });

  return bookRouter;
}

module.exports = router;
