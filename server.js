const app = require('./app')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

// connect to datatabase
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('Connected to DB')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('Its running on port 3000');
})