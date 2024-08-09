const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

module.exports.add_product_get = (req, res) => {
  res.render('addProduct');
};

module.exports.add_product_post = [
  upload.single('image'), 
  async (req, res) => {
    const { name, price, description } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
      const product = await Product.create({ name, price, description, image });
      res.status(201).json({ product });
    } catch (err) {
      console.error(err); 
      res.status(400).json({ errors: err.message });
    }
  }
];

module.exports.get_products = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products', { products });
  } catch (err) {
    console.error(err); 
    res.status(400).json({ errors: err.message });
  }
};

module.exports.delete_product = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err); 
    res.status(400).json({ errors: err.message });
  }
};