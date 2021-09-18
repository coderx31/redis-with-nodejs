const express = require('express');
const redis = require('redis');

const customerRouter = require('./routes/customers');

const PORT = process.env.PORT || 3000;
const REDIS_PORT = 6379;


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//redis.createClient(REDIS_PORT);

app.use('/customers',customerRouter);


app.listen(PORT, () => console.log(`server running on port ${PORT}`));