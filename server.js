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