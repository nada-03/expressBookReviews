const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "9780743273565" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "9780061120084" },
    { id: 3, title: "1984", author: "George Orwell", isbn: "9780451524935" },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", isbn: "9780141439518" },
    { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", isbn: "9780316769488" }
];

public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify({books}, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn; // Retrieve ISBN from request parameters
    const book = books.find(b => b.isbn === isbn); // Find the book with the matching ISBN

    if (book) {
        // Return the book details as a JSON response
        res.status(200).json(book);
    } else {
        // Return a 404 error if the book is not found
        res.status(404).json({ message: "Book not found" });
    }
  //Write your code here
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
