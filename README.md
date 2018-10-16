
# node-mongo-rest-auth

A boilerplate for a basic restful node.js app with authentication.
Since this project is new please tell me if you notice any issues or if you want me to explain how something works!

# Table of Contents
1. [Features](#features)
2. [Built with](#built-with)
3. [Getting Started](#getting-started)
4. [Deploy with Docker Compose](#deploy-with-docker-compose)
5. [Example endpoints](#example-endpoints)
6. [How authentication works](#how-authentication-works)
7. [Acknowledgments](#acknowledgments)

## Features
- jwt authentication
- signup and login
- middleware to protect endpoints that can only be used if user is logged in
- deployment using Docker

## Built With

[<img src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/nodejs.svg?sanitize=true" height="100" width="100">](https://nodejs.org/en/) [<img src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/mongodb.svg?sanitize=true" height="100" width="100">](https://www.mongodb.com/) [<img src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/docker.svg?sanitize=true" height="100" width="100">](https://www.docker.com/)

  

## Getting Started
Follow the instructions in order to clone the repository and to get it up and running on your local machine. Look at deployment for instructions on how to deploy using docker.

### Local development/setup
First make sure that you have installed [mongodb](https://www.mongodb.com/) and that it is running on "localhost:27017".

Clone this repo
```
git clone https://github.com/kim3z/node-mongo-rest-auth.git
```
Cd into app folder
```
cd node-mongo-rest-auth
```
Install dependencies
```
npm install
```
Start the application locally like this if you have [nodemon](https://www.npmjs.com/package/nodemon) installed (recommended)
```
nodemon server.js
```
If you don't want to install nodemon you can start it with node like this:
```
node server.js
```
Now this app should be listening on ``localhost:3000``.

## Deploy with Docker Compose

For deployment make sure that you have installed both [Docker](https://www.docker.com/get-started) and [docker-compose](https://docs.docker.com/compose/install/) on your machine.

```
git clone https://github.com/kim3z/node-mongo-rest-auth.git
```
```
cd node-mongo-rest-auth
```
```
sudo docker-compose up -d
```
If everything worked the app should return a JSON message on ``http://yourmachineipaddress:3000`` or ``http://yourdomain.something:3000`` if you have a domain pointing to it.

## Example endpoints
routes/home.js:
- ``/`` index endpoint
- ``/admin`` example endpoint that requires user is logged in

routes/user.js:
- ``/user/signup`` for creating a new user
- ``/user/login`` for login
- ``/user/delete/:user_id`` for deleting a user
- ``/user/list/all`` for listing all users

## How authentication works 

Each time a user logs in the user gets a JWT token. When the client sends a request to the REST API the request needs to contain an Authorization key in the headers. The value of the key should be "token: thesecretjwttoken". The middleware splits the key value by space and checks if "thesecretjwttoken" is valid.

Right now each JWT token expires in one hour. This can be changed in routes/user.js.

## Acknowledgments

*  [Academind](https://github.com/academind) - Thank you for awesome Node JS tutorials
