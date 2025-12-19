const mongoose = require('mongoose');

const DbConnection = async () =>{
        try {
            await mongoose.connect("mongodb://localhost:27017/");
            console.log("MongoDB connected successfully");
        } catch (error) {
            console.error("MongoDB connection failed:", error.message);
            process.exit(1)
        }
}

module.exports = DbConnection;