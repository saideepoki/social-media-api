const express = require('express');
const sqlite3 = require('sqlite3');


const app = express();

// ### Middlewares
// parsing body
app.use(express.json());




// Initializing the database using the given filename
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
        email TEXT UNIQUE NOT NULL
        ) 
    `);
    
    // Creating Posts table
    db.run(`CREATE TABLE IF NOT EXISTS posts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id)
        )`);

});


// Home route
app.get('/',(req, res)=>{
    res.send("Welcome to the social media app server");
})


// #####  CRUD operations for users #####

// Create a User
app.post('/users',(req, res) => {
    const {name, email}  = req.body;
    const query = `INSERT INTO users(name, email) VALUES(?,?)`;
    db.run(query, [name, email], (err) => {
        if(err) {
            return res.status(400).json(
                {
                    error: "Failed to create the user",
                    message: err.message
                }
            )
        }
        res.status(201).json({
            message: "User created successfully",
            user: {
                name,
                email
            }
        })
    })
});


// Get all users
app.get('/users',(req,res) => {
    const query = `SELECT * FROM users`;
    db.all(query,(err, users) => {
        if(err) {
            return res.status(400).json(
                {
                    error: "failed to get users",
                    message: err.message
                }
            )
        }
        res.json(users);
    })
})

// Update a User by providing the id
app.put("/users/:id",(req,res) => {
    const { id } = req.params;
    const {name, email} = req.body;
    const query = `UPDATE users set name = ?, email = ? WHERE id = ?`;
    db.run(query, [name, email, id], (err) => {
        if(err) {
            return res.status(400).json(
                {
                    error: "Failed to update the user",
                    message: err.message
                }
            )
        }
        res.json({
            message:"User updates successfully",
        })
    })
});

// Delete a User by providing the id
app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM users WHERE id = ?`;
    db.run(query, [id], (err) => {
        if(err) {
            return res.status(400).json(
                {
                    error: "Failed to delete the user",
                    message: err.message
                }
            )
        }
        res.json({
            message: "User deleted successfully"
        })
    })
})

// #####  CRUD operations for users #####

// Create a Post and link it to a user
app.post('/posts',(req, res) => {
    const {title, content, user_id} = req.body;
    const query = `INSERT INTO posts(title, content, user_id) VALUES(?,?,?)`;
    db.run(query, [title, content, user_id], (err) => {
        if(err) {
            return res.status(400).json(
                {
                    error: "Failed to create the post",
                    message: err.message
                }
            )
        }
        res.json({
            message: "Post created successfully",
            post: {
                title,
                content,
                user_id
            }
        })
    })
})

// Listening the api on port 3000
app.listen(3000, () =>  {
    console.log("Server is running on port 3000");
})