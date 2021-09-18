const { Router } = require('express');

const { getCustomer, addCustomer, updateCustomer, deleteCustomer } = require('../controllers/customers');

const customerRouter = Router();

customerRouter.get('/get/:username', getCustomer);
customerRouter.post('/add',addCustomer);
customerRouter.put('/update/:username',updateCustomer);
customerRouter.delete('/delete', deleteCustomer);

module.exports = customerRouter;