const express = require('express')
const machinesRouter = require('./routes/machines')
const membersRouter = require('./routes/members')
const instructorsRouter = require('./routes/instructors')
const memberinstructorsRouter = require('./routes/members_instructors')

const app = express()

app.use(express.json())
app.use('/machines', machinesRouter);
app.use('/members', membersRouter);
app.use('/instructors', instructorsRouter);
app.use('/memberinstructors', memberinstructorsRouter);

app.get('/ping', (req, res) => {
    res.send('pong')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})