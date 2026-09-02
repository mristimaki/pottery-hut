import express from 'express';
import db from '../db/database.js';

const router = express.Router();

// GET /products - alla produkter (till startsidan)
router.get('/', (req, res) => {
    const products = db.prepare(`
        SELECT * FROM products WHERE published_date <= date('now')
        `).all();

        res.json(products);
});

// GET /products/search?q=... - sökresultat
router.get('/search', (req, res) => {
    const query = req.query.q || '';

    const products = db.prepare(`
        SELECT * FROM products
        WHERE name LIKE ? AND published_date <= date('now')
        `).all(`%${query}%`);

        req.json(products);
});

// GET /products/:slug - en specifik produkt
router.get('/:slug', (req, res) => {
    const product = db.prepare(`
        SELECT * FROM products WHERE slug = ?
        `).get(req.params.slug);

        if (!product) {
            return res.status(404).json({ error: 'Produkten hittades inte' });
        }

        res.json(product);
});

export default router;