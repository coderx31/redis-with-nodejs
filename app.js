const express = require('express');
const redis = require('redis');

const customerRouter = require('./routes/customers');

const PORT = process.env.PORT || 3000;


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/customers',customerRouter);


app.listen(PORT, () => console.log(`server running on port ${PORT}`));