import express from 'express';
require('dotenv').config();

const app = express();
const port = process.env.PORT; //.env file 

app.listen(port, () => console.log(`listening on ${port}`))