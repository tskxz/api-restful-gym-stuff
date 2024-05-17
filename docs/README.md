# Create Basic API Restful Express.js
Basic API Restful with Express.js that manages members and machines from gym

## ER Model
![img](./api%20gym%20stuff.png)

## Startup
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