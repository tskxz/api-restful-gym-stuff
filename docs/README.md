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

## API Machine
Create routes and controllers folder
Create a new file at routes/machines.js

Set a simple post method to create a machine

```js
var express = require('express');
var router = express.Router();

const machineController = require('../controllers/machine')

router.post('/create', machineController.create);

module.exports = router
```

Create a new file at controllers/machine.js
This is a function that creates a machine from request body.

```js
const models = require('../models');
const Machine = models.Machine

const create = async(req, res) => {
    const data = req.body;
    const machine = await Machine.create(data);
    res.json(machine);
}

module.exports = {
    create
}
```

Update your server.js to use json parser middleware and set up the machine routes

```js
const machinesRouter = require('./routes/machines')
app.use(express.json())
app.use('/machines', machinesRouter);
```

Your server.js should look like this
```js
const express = require('express')
const machinesRouter = require('./routes/machines')

const app = express()

app.use(express.json())
app.use('/machines', machinesRouter);

app.get('/ping', (req, res) => {
    res.send('pong')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
```

You can test API with Postman
So we try to insert a machine with some data with json
![img](./api-create-machine.png)

If we check at our database, you will see the row that we added
![img](./mysql-machines-view01.png)

Add the following function at controllers/machine.js to see all machines
```js
const view = async(req, res) => {
    const machines = await Machine.findAll();
    res.json(machines);
}
```

controllers/machine.js
```js
const models = require('../models');
const Machine = models.Machine

const create = async(req, res) => {
    const data = req.body;
    const machine = await Machine.create(data);
    res.json(machine);
}

const view = async(req, res) => {
    const machines = await Machine.findAll();
    res.json(machines);
}

module.exports = {
    create,
    view
}
```
  
We created another machine  
![img](./api-create-machine2.png)

If we test it at postman, you will see all machines
![img](./api-view-machines.png)


Add the following update function at controllers/machine.js
```js
const update = async(req, res) => {
    const data = req.body;
    await Machine.update({
        name: data.name,
        description: data.description,
        status: data.status
    }, {where: {id: req.params.id}})
    const machine_updated = await Machine.findOne({where: {id: req.params.id}})
    res.json(machine_updated);
}
```

Dont forget to add the function at module.exports
```js
module.exports = {
    create,
    view,
    update
}
```

At routes/machines.js add the following line, :id its a parameter that needs to be included to be able to update a specific machine
```js
router.put('/update/:id', machineController.update);
```

We updated the status of the machine with id 2
![img](./api-update-machine.png)

Add the following function to delete a machine
```js
const deleteMachine = async(req, res) => {
    await Machine.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({message: 'Machine deleted successfully'});
}
```

Add this route
```js
router.delete('/delete/:id', machineController.deleteMachine)
```
We deleted the machine with id 1  
![img](./api-delete-machine.png)  

We can't see the machine with id 1  
![img](./api-view-machines-after-delete.png)  
Now we have a full CRUD API for machines  

## API Member
Create model and migration
```bash
npx sequelize-cli model:generate --name Member --attributes username:string,first_name:string,last_name:string,phone_num:string,email:string,password:string
```

Implement hash password at models/member.js
```js
validPassword(password){
      return bcrypt.compareSync(password, this.password)
}
```

```js
hooks: {
      beforeCreate: (member) => {
        const salt = bcrypt.genSaltSync();
        member.password = bcrypt.hashSync(member.password, salt)
      }
},
```
Member model should look like this
```js
'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    validPassword(password){
      return bcrypt.compareSync(password, this.password)
    }
  }
  Member.init({
    username: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_num: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (member) => {
        const salt = bcrypt.genSaltSync();
        member.password = bcrypt.hashSync(member.password, salt)
      }
    },
    sequelize,
    modelName: 'Member',
  });
  return Member;
};
```

Run the migration
```bash
npx sequelize-cli db:migrate
```

Create a new file controllers/members.js
```js
const models = require('../models')
const Member = models.Member

const create = async(req, res) => {
    const data = req.body;
    const member = await Member.create(data);
    res.json(member);
}

module.exports = {
    create
}
```
Create routes/members.js

```js
var express = require('express');
var router = express.Router();

const memberController = require('../controllers/member')
router.post('/create', memberController.create);

module.exports = router
```

Add this route at server.js
```js
app.use('/members', membersRouter);
```
![img](./api-create-member.png)

Check credentials
Add this following controller  
```js
const checkCredentials = async(req, res) => {
    const data = req.body;
    const member = await Member.findOne({where: {username: data.username}})
    if(!member){
        res.status(404).json({message: 'Member not found'})
    } else if(!member.validPassword(data.password)){
        res.status(401).json({message: 'Invalid password'})
    } else {
        res.json({member})
    }
}
```

Add this route
```js
router.post('/checkcredentials', memberController.checkCredentials);
```
![img](./api-wrongpass.png)
![img](./api-checkcredentials.png)

Update member

```js
const update = async(req, res) => {
    const id = req.params.id;
    const data = req.body;
    await Member.update(data, {where: {id: id}, individualHooks: true});
    const member = await Member.findOne({where: {id: req.params.id}})
    res.json(member)
}
```

```js
router.put('/update/:id', memberController.update);
```
We created a new member  
![img](./api-create-member-update.png)  
We updated member  
![img](./api-update-member.png)  
We checked the old credentials  
![img](./api-update-test-checkcredentials.png)  
And now we check the new updated credentials  
![img](./api-check-updated.png)  