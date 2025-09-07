// import asyncHandler from 'express-async-handler';
// import Product from '../models/Product.js';

// // GET /api/products
// export const getAll = asyncHandler(async (req, res) => {
//   const items = await Product.find().sort('-createdAt');
//   res.json(items);
// });

// // GET /api/products/:id
// export const getOne = asyncHandler(async (req, res) => {
//   const item = await Product.findById(req.params.id);
//   if (!item) { res.status(404); throw new Error('Product not found'); }
//   res.json(item);
// });

// // POST /api/products
// export const createOne = asyncHandler(async (req, res) => {
//   const item = await Product.create(req.body);
//   res.status(201).json(item);
// });

// // PUT /api/products/:id
// export const updateOne = asyncHandler(async (req, res) => {
//   const item = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   if (!item) { res.status(404); throw new Error('Product not found'); }
//   res.json(item);
// });

// // DELETE /api/products/:id
// export const removeOne = asyncHandler(async (req, res) => {
//   const item = await Product.findByIdAndDelete(req.params.id);
//   if (!item) { res.status(404); throw new Error('Product not found'); }
//   res.json({ message: 'Product deleted' });
// });



import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

// GET /api/products
export const getAll = asyncHandler(async (req, res) => {
  const items = await Product.find().sort('-createdAt');
  res.json(items);
});

// GET /api/products/:id
export const getOne = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // نجرب نجيب المنتج بالـ _id الرئيسي
  let item = await Product.findById(id);

  // لو مش موجود، ممكن نجرب نبحث جوا ar أو en لو عندك المنتجات متعددة اللغات
  if (!item) {
    item = await Product.findOne({ $or: [{ 'ar._id': id }, { 'en._id': id }] });
  }

  if (!item) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(item);
});

// POST /api/products
export const createOne = asyncHandler(async (req, res) => {
  // Validate that image URLs are provided
  const { ar, en } = req.body;
  
  if (ar && ar.length > 0) {
    for (let item of ar) {
      if (!item.img) {
        res.status(400);
        throw new Error('Image is required for Arabic content');
      }
    }
  }
  
  if (en && en.length > 0) {
    for (let item of en) {
      if (!item.img) {
        res.status(400);
        throw new Error('Image is required for English content');
      }
    }
  }
  
  const item = await Product.create(req.body);
  res.status(201).json(item);
});

// PUT /api/products/:id
export const updateOne = asyncHandler(async (req, res) => {
  const item = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(item);
});

// DELETE /api/products/:id
export const removeOne = asyncHandler(async (req, res) => {
  const item = await Product.findByIdAndDelete(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ message: 'Product deleted' });
});
