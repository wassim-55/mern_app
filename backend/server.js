require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const dbConnect = require('./mongoDB/db');
const authRoute = require('./routes/authRoute');

//connection to mongoDB
dbConnect();

//built-in middlewares
app.use(express.json());
app.use(cors());

//routes
app.use('/api/auth', authRoute);


const listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening on port ${listener.address().port}`);
});
