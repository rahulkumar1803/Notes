const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')
const path = require('path')

__dirname = path.resolve();

connectToMongo();
const app = express();

// Middleware
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

//CORS
app.use(cors({
    origin: "https://notes-by-rahul.vercel.app",
    credentials: true,
}));


// Available Routes
app.use('/api/auth', require('./routes/Auth'))
app.use('/api/note', require('./routes/Note'))

app.listen(process.env.PORT,()=>{
    console.log(`listening at http://localhost:${process.env.PORT}`)
})

