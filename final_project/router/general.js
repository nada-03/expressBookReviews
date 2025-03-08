const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



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
    const book = books[isbn]; // Access the book directly using the ISBN as a key

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
    const author = req.params.author; // Retrieve author from request parameters
    const booksByAuthor = Object.values(books).filter(b => b.author === author); // Convert books to an array and filter by author

    if (booksByAuthor.length > 0) {
        // Return the list of books by the author as a JSON response
        res.status(200).json(booksByAuthor);
    } else {
        // Return a 404 error if no books are found for the author
        res.status(404).json({ message: "No books found for the specified author" });
    }
    
  //Write your code here
 
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title; // Retrieve title from request parameters
    const booksByTitle = Object.values(books).filter(b => b.title === title); // Convert books to an array and filter by title

    if (booksByTitle.length > 0) {
        // Return the list of books by the title as a JSON response
        res.status(200).json(booksByTitle);
    } else {
        // Return a 404 error if no books are found for the title
        res.status(404).json({ message: "No books found for the specified title" });
    }
  //Write your code here


});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn; // Retrieve ISBN from request parameters
    const book = books[isbn]; // Access the book directly using the ISBN as a key

    if (book && book.reviews) {
        // Return the reviews for the book as a JSON response
        res.status(200).json(book.reviews);
    } else {
        // Return a 404 error if the book or reviews are not found
        res.status(404).json({ message: "No reviews found for the specified ISBN" });
    }
  //Write your code here
  
});

module.exports.general = public_users;
