const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    return username && username.trim() !== "" && /^[a-zA-Z0-9_]+$/.test(username);//returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ 
    return users.some(user => user.username === username && user.password === password);//returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username; // Retrieve username from request body
    const password = req.body.password; // Retrieve password from request body

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Find the user in the users array
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Generate a JWT for the session
        const token = jwt.sign({ username }, "secretKey", { expiresIn: "1h" }); // Replace "secretKey" with a secure key
        return res.status(200).json({ message: "Login successful", token });
    } else {
        return res.status(401).json({ message: "Invalid username or password" });
    }
  //Write your code here
 
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    let filtered_book = books[isbn]
    if (filtered_book) {
        let review = req.query.review;
        let reviewer = req.session.authorization['username'];
        if(review) {
            filtered_book['reviews'][reviewer] = review;
            books[isbn] = filtered_book;
        }
        res.send(`The review for the book with ISBN  ${isbn} has been added/updated.`);
    }
    else{
        res.send("Unable to find this ISBN!");
    }
    
});
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the header

    if (!token) {
        return res.status(401).json({ message: "User not logged in" });
    }

    try {
        const decoded = jwt.verify(token, "secretKey"); // Verify the token
        req.user = decoded; // Attach the decoded user information to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    
    // Check if the user is logged in
    if (!req.session || !req.session.authorization) {
        return res.status(403).json({ message: "User not logged in" });
    }

    const username = req.session.authorization.username; // Get the username from the session

    // Check if the book exists
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Get the book's reviews
    let reviews = books[isbn].reviews;

    // Check if the user has a review to delete
    if (!reviews[username]) {
        return res.status(404).json({ message: "Review not found" });
    }

    // Delete the user's review
    delete reviews[username];

    return res.json({ message: "Review deleted successfully", reviews });
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
