const express = require('express');
const path    = require('path');
const cors    = require('cors');
const db      = require('./database');

const app  = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Serve static files — detect SVG content even if named .jpg
app.use('/images', (req, res, next) => {
  const filePath = require('path').join(__dirname, 'public', 'images', req.path);
  if (require('fs').existsSync(filePath)) {
    const content = require('fs').readFileSync(filePath, 'utf8');
    if (content.trim().startsWith('<svg')) {
      res.setHeader('Content-Type', 'image/svg+xml');
      return res.send(content);
    }
  }
  next();
});
app.use(express.static(require('path').join(__dirname, 'public')));

// ═══════════════════════════════════════════════
//  PRODUCTS
// ═══════════════════════════════════════════════
app.get('/api/products', (req, res) => {
  const { category, brand, search, featured, offer, limit, offset } = req.query;
  const result = db.getProducts({ category, brand, search, featured, offer, limit, offset });
  res.json(result);
});

app.get('/api/products/:id', (req, res) => {
  const product = db.getProduct(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// ═══════════════════════════════════════════════
//  CATEGORIES
// ═══════════════════════════════════════════════
app.get('/api/categories', (req, res) => {
  res.json(db.getCategories());
});

// ═══════════════════════════════════════════════
//  BRANDS
// ═══════════════════════════════════════════════
app.get('/api/brands', (req, res) => {
  res.json(db.getBrands());
});

// ═══════════════════════════════════════════════
//  BANNERS
// ═══════════════════════════════════════════════
app.get('/api/banners', (req, res) => {
  res.json(db.getBanners());
});

// ═══════════════════════════════════════════════
//  OFFERS
// ═══════════════════════════════════════════════
app.get('/api/offers', (req, res) => {
  res.json(db.getOffers());
});

// ═══════════════════════════════════════════════
//  CONTACT FORM
// ═══════════════════════════════════════════════
app.post('/api/contact', (req, res) => {
  const { name, phone, email, subject, message } = req.body;
  if (!name || !message) return res.status(400).json({ error: 'Name and message are required' });
  const contact = db.addContact({ name, phone: phone || '', email: email || '', subject: subject || '', message });
  res.json({ success: true, id: contact.id, message: 'Thank you! We will contact you soon.' });
});

// ═══════════════════════════════════════════════
//  ADMIN API
// ═══════════════════════════════════════════════
app.get('/api/admin/stats', (req, res) => {
  res.json(db.getStats());
});

app.get('/api/admin/contacts', (req, res) => {
  res.json(db.getContacts());
});

app.put('/api/admin/contacts/:id/read', (req, res) => {
  db.markContactRead(req.params.id);
  res.json({ success: true });
});

app.post('/api/admin/products', (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) return res.status(400).json({ error: 'Name and price are required' });
  const product = db.addProduct({
    name: req.body.name,
    brand: req.body.brand || '',
    brand_id: Number(req.body.brand_id) || null,
    category_id: Number(req.body.category_id) || null,
    price: Number(req.body.price),
    original_price: Number(req.body.original_price) || Number(req.body.price),
    description: req.body.description || '',
    image: req.body.image || 'default.jpg',
    rating: Number(req.body.rating) || 4.5,
    reviews: 0,
    is_featured: !!req.body.is_featured,
    is_on_offer: !!req.body.is_on_offer,
    discount_percent: Number(req.body.discount_percent) || 0,
    stock: Number(req.body.stock) || 100,
  });
  res.json({ success: true, id: product.id });
});

app.put('/api/admin/products/:id', (req, res) => {
  const ok = db.updateProduct(req.params.id, {
    name: req.body.name,
    brand: req.body.brand || '',
    brand_id: Number(req.body.brand_id) || null,
    category_id: Number(req.body.category_id) || null,
    price: Number(req.body.price),
    original_price: Number(req.body.original_price) || Number(req.body.price),
    description: req.body.description || '',
    image: req.body.image || 'default.jpg',
    rating: Number(req.body.rating) || 4.5,
    is_featured: !!req.body.is_featured,
    is_on_offer: !!req.body.is_on_offer,
    discount_percent: Number(req.body.discount_percent) || 0,
    stock: Number(req.body.stock) || 100,
  });
  res.json({ success: ok });
});

app.delete('/api/admin/products/:id', (req, res) => {
  db.deleteProduct(req.params.id);
  res.json({ success: true });
});

// ═══════════════════════════════════════════════
//  SERVE PAGES
// ═══════════════════════════════════════════════
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║   🚀  Fantasy Telecom Server Started!   ║');
  console.log('╠══════════════════════════════════════════╣');
  console.log(`║   🌐  http://localhost:${PORT}              ║`);
  console.log(`║   ⚙️   http://localhost:${PORT}/admin.html   ║`);
  console.log('╚══════════════════════════════════════════╝\n');
});
