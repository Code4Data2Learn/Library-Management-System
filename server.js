const usersRouter = require('./routes/user');
const booksRouter = require('./routes/books');
const express = require('express');
const app = express();
const PORT = 8081;

app.use(express.json())

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
