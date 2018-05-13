const express = require('express');

const bookRouter = express.Router();

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
      res.render(
        'bookListView',
        {
          nav,
          title: 'Library',
          books
        }
      );
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render(
        'bookView',
        {
          nav,
          title: 'Library',
          book: books[id]
        }
      );
    });

  return bookRouter;
}

module.exports = router;
