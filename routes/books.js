const express = require('express');
const {books} =  require('../data/books.json');
const {users} = require('../data/user.json');
const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the list of books in the system
 * Access: Public
 * Parameters: None
*/
router.get('/',(req,res)=>{
    res.status(200).json({
        success: true,
        data: books
    });
});

/**
 * Route: /books
 * Method: POST
 * Description: Add a new book
 * Access: Public
 * Parameters: None
*/
router.post('/',(req,res)=>{
    const {id,name,author,genre,price,publisher} = req.body
    if(!id || !name || !author || !genre || !price || !publisher){
        res.status(400).json({
            success: false,
            message: "Please provide the required details"
        });
    }
    const book = books.find(each=>each.id === id)
    if(book){
        return res.status(409).json({
            success: false,
            message: "Book Already added"
        });
    }else{
        books.push({
        id,
        name,
        author,
        genre,
        price,
        publisher
    });

    res.status(201).json({
        success: true,
        data: books,
        message: "Book added successfully"
    });
    }
});

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get a book by their id
 * Access: Public
 * Parameters: id
*/
router.get('/:id',(req,res)=>{
    const {id} = req.params;
    const book = books.find(each=>each.id === id)

    if(!book){
        res.status(404).json({
            success: false,
            data: `Book not found`
        });
    }else{
        res.status(200).json({
            success: true,
            data: book
        });
    }
});

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Update the book data by its ID
 * Access: Public
 * Parameters: id
*/
router.put('/:id',(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const book = books.find(each=>each.id === id);
    
    if(!book){
        res.status(404).json({
            success: false,
            data: `Book not found for ID: ${id}`
        });
    }else{
        const updateBook = books.map((each)=>{
            if(each.id === id){
                return{
                    ...each,
                    ...data,
                }
            }
            return each
        });

        res.status(200).json({
            success: true,
            data: updateBook,
            message: `Book updated successfully`
        });
    }
});

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Delete a user by its ID
 * Access: Public
 * Parameters: id
*/
router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    const book = books.find(each=>each.id === id);

    if(!book){
        res.status(404).json({
            success: false,
            message: `Book not found for id: ${id}`
        });
    }else{
           const deleteBook = books.filter(each=>each.id !== id);

        res.status(200).json({
            success:true,
            data: deleteBook,
            message: "Book deleted Successfully"
        });
    }
});

/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all the issued books
 * Access: Public
 * Parameters: id
*/
router.get('/issued/for-users',(req,res)=>{
    const userWithIssuedBooks = users.filter((each)=>{
        if(each.issuedBook){
            return each;
        }
    });

    const issuedBooks = [];

    userWithIssuedBooks.forEach((each)=>{
        const book = books.find((book)=>book.id === each.issuedBook);
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    });

    if(!issuedBooks === 0){
        res.status(404).json({
            success: false,
            message: "No books issued"
        });
    }

    res.status(200).json({
        success: true,
        data: issuedBooks
    });
});


module.exports = router;