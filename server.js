const usersRouter = require('./routes/user');
const booksRouter = require('./routes/books');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const DbConnection = require('./databaseConnection');

const app = express();
const PORT = 8081;

app.use(express.json())

DbConnection();

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "Home Page"
    });
});

app.use('/users',usersRouter);
app.use('/books',booksRouter);

app.listen(PORT,()=>{
    console.log(`Server is up and running on http://localhost:${PORT}`);
});
