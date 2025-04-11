const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')
const path = require('path')

__dirname = path.resolve();

connectToMongo();
const app = express();

// Middleware
app.use(express.json())

//CORS
app.use(cors());

// Available Routes
app.use('/api/auth', require('./routes/Auth'))
app.use('/api/note', require('./routes/Note'))

app.use(express.static(path.join(__dirname,'/frontend/dist')))

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
}) 

app.listen(process.env.PORT,()=>{
    console.log(`listening at http://localhost:${process.env.PORT}`)
})

