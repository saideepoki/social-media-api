# social-media-api


This is a **Node.js CRUD API** for managing **users and posts** using **Express** and **SQLite3**. It allows creating, reading, updating, and deleting users and their corresponding posts.


## **Installation**

   ```bash
   git clone https://github.com/saideepoki/social-media-api.git
   cd social-media-api
   npm install
   node server.js
   ```

## **Database Schema**

The database schema consists of two tables: **Users** and **Posts**.

---

### **Users Table** (`users`)
- **`id`**: Primary key (integer, auto-increment).
- **`name`**: User's name (text, required).
- **`email`**: User's email (unique, text, required).

---

### **Posts Table** (`posts`)
- **`id`**: Primary key (integer, auto-increment).
- **`title`**: Post title (text, required).
- **`content`**: Post content (text, required).
- **`userId`**: Foreign key referencing `users.id` (integer, optional).

## **API Endpoints**

### **Users Endpoints**

| **Method** | **Endpoint**  | **Description**          | **Example Request Body**                                         |
|-------------|---------------|-------------------------|------------------------------------------------------------------|
| `POST`     | `/users`       | Create a new user        | `{ "name": "Saideep", "email": "deeps2657@gmail.com" }`            |
| `GET`      | `/users`       | Get all users            | -                                                                |   
| `PUT`      | `/users/:id`   | Update user details by ID| `{ "name": "Saideepuu", "email": "deeps2657@gmail.com" }`     |
| `DELETE`   | `/users/:id`   | Delete a user by ID      | -                                                                |

---

### **Posts Endpoints**

| **Method** | **Endpoint**  | **Description**          | **Example Request Body**                                         |
|-------------|---------------|-------------------------|------------------------------------------------------------------|
| `POST`     | `/posts`       | Create a new post        | `{ "title": "rtetert", "content": "rtetre", "userId": 1 }` |
| `GET`      | `/posts`       | Get all posts with user info | -                                                          |
| `PUT`      | `/posts/:id`   | Update a post by ID      | `{ "title": "Uty", "content": "Uenure", "userId": 1 }` |
| `DELETE`   | `/posts/:id`   | Delete a post by ID      | -                                                                |

---

### **Users info along with Posts**

| **Method** | **Endpoint**      | **Description**                                   |
|-------------|------------------|--------------------------------------------------|
| `GET`      | `/users/posts`| Get users information along with their posts       |

### **Application Information**
- The application will run on **port 3000**.
- When you run the app for the rirst time, a file named socialMedia.db will be created, that's where the data will persist



   
