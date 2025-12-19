const {bookModel, userModel} = require('../models');
const IssuedBook = require('../dto/book-dto')
exports.getAllBooks = async (req, res)=>{
    const books = await bookModel.find()

    if(books.length === 0){
        return res.status(404).json({
            success: false,
            message: "No books found system"
        })
    }

    res.status(200).json({
        success: true,
        data: books
    })
}

exports.getBookByItsID = async (req,res) =>{
    const {id} = req.params;
    const book = await bookModel.findById(id);

    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found for id: ${id}`
        })
    }
    res.status(200).json({
        success: true,
        data: book
    })
}

exports.getIssuedBooks = async (req,res)=>{
   const users = await userModel.find({
    issuedBook: {$exists: true},
   }).populate("issuedBook")

   const issuedBooks = users.map((each)=>{
        return new IssuedBook(each)
    });

    if(issuedBooks.length === 0){
        return res.status(404).json({
            success: false,
            message: "No books issued yet"
        });
    }
    res.status(200).json({
        success: true,
        data: issuedBooks
    })
}

exports.addNewBook = async (req,res) =>{
    const {data} = req.body;

    if(!data || Object.keys(data) === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide the data to add a new book"
        })
    }

    await bookModel.create(data);
    const allBooks = await bookModel.find();

    res.status(200).json({
        success: true,
        message: "Books added successfully",
        data: allBooks
    });
}

exports.updateBooksByItsId = async (req,res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const updateBook = await bookModel.findOneAndUpdate(
        {_id: id},
        data,
        {new: true}
    );

    if(!updateBook){
        return res.status(404).json({
            success: false,
            message: `Book not found for ${id}`,
        })
    }

    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: updateBook
    })
}

exports.deleteBookById = async (req,res)=>{
    const {id} = req.params;

    const book = await bookModel.findById(id);

    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found for id: ${id}`
        })
    }

    await bookModel.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: 'Book deleted successfully'
    })
}

