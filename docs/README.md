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
npm i express sequelize-cli sequelize bcrypt nodemon express-session
```
```bash
npm install mysql2 --save
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
    "password": "rot",
    "database": "gymstuff",
    "host": "127.0.0.1",
    "dialect": "mysql"
}
```

## Creating the Machine Model (and Migratin)
```bash
npx sequelize-cli model:generate --name Machine --attributes name:string,description:string,status:string
```

You should see an similiar output
```bash
New model was created at api-restful-gym-stuff/models/machine.js .
New migration was created at api-restful-gym-stuff/migrations/20240518181311-create-machine.js .
```

## Running Migrations
```bash
npx sequelize-cli db:migrate
```

If you go to mysql, you should see that the tables were created

```bash
MariaDB [gymstuff]> show tables;
+--------------------+
| Tables_in_gymstuff |
+--------------------+
| Machines           |
| SequelizeMeta      |
+--------------------+
2 rows in set (0.001 sec)
```