const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



public_users.post("/register", (req,res) => {
    const username = req.body.username; // Retrieve username from request body
    const password = req.body.password; // Retrieve password from request body

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if the username already exists
    if (users.some(user => user.username === username)) {
        return res.status(400).json({ message: "Username already exists" });
    }

    // Register the new user
    users.push({ username, password });
    return res.status(200).json({ message: "User successfully registered" });
  //Write your code here
  
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
// Importer Axios
const axios = require('axios');

// URL de l'API pour récupérer les détails d'un livre par ISBN
const apiUrl = 'https://nouahay-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title';

// Fonction pour récupérer les détails d'un livre avec Promises
function getBookDetailsWithPromises(isbn) {
  axios.get(`${apiUrl}/${isbn}`)
    .then(response => {
      console.log('Détails du livre (Promises) :', response.data);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des détails du livre :', error);
    });
}

// Appeler la fonction avec un ISBN spécifique
getBookDetailsWithPromises(Fairy tales); // Remplacez 1 par l'ISBN souhaité
// Importer Axios

module.exports.general = public_users;
