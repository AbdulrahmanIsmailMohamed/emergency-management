# 🚀 Emergency Management Project in Zagazig City

<h3 align="center">Emergency management built using NodeJS & EJS & Express & MongoDB</h3>


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="project-overview">Project Overview</a>
    </li>
     <li>
      <a href="#file-structure">File Structure</a>
    </li>
    <li>
      <a href="#key-features">Key Features</a>
    </li>
    <li>
      <a href="#build-with">Build With</a>
    </li>
    <li>
      <a href="#installation">Installation</a>
    </li>
    <li>
      <a href="#known-bugs">Known Bugs</a>
    </li>
    <li>
      <a href="#contact">Contact</a>
    </li>
  </ol>
</details>

## Project Overview
This project aims to develop a system for emergency management in Zagazig City using Geographic Information Systems (GIS) technologies and various programming languages.
The project aims to facilitate and expedite emergency response operations and improve medical and rescue services in the city.

## file structure

![GitHub Logo](/readme_img/file_structure.jpg)

# Environment Variables

&nbsp;

```ENV
# app
PORT = '3000'
NODE_ENV= 'developement'

# jwt
JWT_SECRET=

# passport
SECRET_SESSION = 

# db
MONGO_URL = 

# cloudinary
CLOUD_NAME =
CLOUD_API_SECRET =
CLOUD_API_KEY = 

```

&nbsp;

## Key Features

- Authentication
  - Login [Public]
  - SignUp [Public]
  - Tokens [User]
- User
  - Get Logged User Profile [User]
  - Update logged User Profile (name, email, national id, profile image) [User]
- Emergency
  - Get Emergency Basemap [User]
  - The best path between two points [User]
  - Show services on the map [User]
  - Show the metadata about the services [User]
  - View the service profile [User]
  - Get My location [User]
  - Communicate with the service [User]
- Favourites
  - Add Emergency To favourite list [User]
  - Get All Emergency from favourite list [User]
  - Delete Emergency From favourite [User]

## Built With

List of any major frameworks used to build the project.

* [NodeJS](https://nodejs.org/) - JS runtime environment
* [ExpressJS](https://expressjs.com/) - The NodeJS framework used
* [MongoDB](https://www.mongodb.com/) - NoSQL Database uses JSON-like documents with optional schemas
* [Mongoose](https://mongoosejs.com/) - Object Data Modeling (ODM) library for MongoDB and NodeJS
* [Bcrypt](https://www.npmjs.com/package/bcrypt) - Encryption & Decryption Algorithm
* [Dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from a . env file into process. env
* [JWT](https://jwt.io/) - Compact URL-safe means of representing claims to be transferred between two parties
* [Multer](https://www.npmjs.com/package/multer) - NodeJS middleware for handling multipart/form-data
* [Express-Validator](https://www.npmjs.com/package/express-validator) - A library of string validators and sanitizers.
* [cloudinary](https://www.npmjs.com/package/cloudinary) - Allow us to store image in cloud
* [connect-flash](https://www.npmjs.com/package/connect-flash) - to show messages
* [connect-mongodb-session](https://www.npmjs.com/package/connect-mongodb-session) - Allow us to store session
* [ejs](https://www.npmjs.com/package/ejs) - Template engine
* [leaflet-routing-machine](https://www.npmjs.com/package/leaflet-routing-machine) - to make best route between 2 point
* [passport](https://www.npmjs.com/package/passport) - passport


## Installation

You can fork the app or you can git-clone the app into your local machine. Once done that, please install all the
dependencies by running
```
$ npm install
set your env variables
$ npm run start
``` 

## Known Bugs
Feel free to email me at abdulrahman.ismail.mohammed@gmail.com if you run into any issues or have questions, ideas or concerns.n into any issues or have questions, ideas or concerns.
Please enjoy and feel free to share your opinion, constructive criticism, or comments about my work. Thank you! 🙂

<!-- CONTACT -->
## Contact

Email - [abdulrahman.ismail.mohammed@gmail.com](abdulrahman.ismail.mohammed@gmail.com)

LinkedIN - [Abdulrahman Ismail](https://www.linkedin.com/in/abdulrahman-ismail-ab6a84209)

Project: [https://github.com/AbdulrahmanIsmailMohamed/nodejs-emergency-managment](https://github.com/AbdulrahmanIsmailMohamed/nodejs-emergency-managment)
