const express = require('express');
const sqlite3 = require('sqlite3');


// ### Middlewares
// parsing body
app.use(express.json());


//
const db = new sqlite3.Database('socialMedia.db', (err) => {
    if(err) {
        console.log("Error in connecting to the database", err);
    }
    else {
        console.log("Connected to the database");
    }
});




db.serialize(() => {

    // Creating user table
    db.run(`CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        ) 
    `);
    
    // Creating Posts table
    db.run(`CREATE TABLE IF NOT EXISTS posts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id);
        )`);

});



const app = express();


// Home route
app.get('/',(req, res)=>{
    res.send("Welcome to the social media app server");
})

// Listening the api on port 3000
app.listen(3000, () =>  {
    console.log("Server is running on port 3000");
})