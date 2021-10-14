const express = require('express');
const productsController = require('../controllers/products.controller');

const router = express.Router();

router.post('/add-products', productsController.addProduct);
router.get('/get', productsController.getAllProducts);
router.put('/changeStatus/:id', productsController.changeStatus);
router.delete('/delete-product/:id', productsController.deleteProduct);
router.put('/edit-product/:id', productsController.editProduct);

module.exports = router;