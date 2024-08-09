const { Router } = require('express');
const productController = require('../controllers/productController');
const router = Router();

router.get('/add-product', productController.add_product_get);
router.post('/add-product', productController.add_product_post);
router.get('/products', productController.get_products);
router.delete('/products/:id', productController.delete_product);

module.exports = router;