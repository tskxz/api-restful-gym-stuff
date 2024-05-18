# Create Basic API Restful Express.js
Basic API Restful with Express.js that manages members and machines from gym

## ER Model
![img](./api%20gym%20stuff.png)

## Creating the project

### Startup
```bash
npm init -y
```

Add the following line at package.json

```bash
"start": "nodemon server.js"
```

Your package.json should look like this
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },
```

Install the following packages
```bash
npm i express sequelize-cli sequelize sqlite3 bcrypt nodemon express-session
```

### Create your first express application
Create server.js file

This is a minimal expressjs application with /ping get method route

```js
const express = require('express')

const app = express()

app.get('/ping', (req, res) => {
    res.send('pong')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
```

Go to the http://localhost:3000/ping
You should see 'pong' on the page

## Setup Database Connection
```bash
npx sequelize-cli init
```

Go to mysql and create a database

```sql
CREATE DATABASE gymstuff
```

At config/config.json, put your credentials and name of the database
It should look like this

```json
"development": {
    "username": "root",
    "password": null,
    "database": "gymstuff",
    "host": "127.0.0.1",
    "dialect": "mysql"
}
```