const express = require('express');
const {books} =  require('../data/books.json');
const {users} = require('../data/user.json');

const {userModel,bookModel} = require('../models/index');
const { getAllBooks, getBookByItsID, getIssuedBooks, addNewBook, updateBooksByItsId, deleteBookById } = require('../Controllers/book-controller');

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the list of books in the system
 * Access: Public
 * Parameters: None
*/
router.get('/',getAllBooks);

/**
 * Route: /books
 * Method: POST
 * Description: Add a new book
 * Access: Public
 * Parameters: None
*/
router.post('/',addNewBook);

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get a book by their id
 * Access: Public
 * Parameters: id
*/
router.get('/:id',getBookByItsID);

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Update the book data by its ID
 * Access: Public
 * Parameters: id
*/
router.put('/:id',updateBooksByItsId);

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Delete a user by its ID
 * Access: Public
 * Parameters: id
*/
router.delete('/:id',deleteBookById);

/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all the issued books
 * Access: Public
 * Parameters: id
*/
router.get('/issued/for-users',getIssuedBooks);


module.exports = router;