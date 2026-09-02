import express from 'express';
import db from '../db/database.js';

const router = express.Router();

// GET /admin/products - alla produkter till admin-tabellen
router.get('/products', (req, res) => {
    const products = db.prepare(`SELECT * FROM products`).all();
    res.json(products);
});

// POST /admin/products - skapa ny produkt
router.post('/products', (req, res) => {
    const { name, description, sku, brand, imageUrl, price, publishedDate } = req.body;

    if (!name || !sku || !imageUrl || !publishedDate) {
        return res.status(400).json({ error: 'Namn, SKU, bild-URL och publiceringsdatum är obligatoriska' });
    }

    const slug = name.toLowerCase()
    .replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o')
    .replace(/\s+/g, '-');

    const insert = db.prepare(`
        INSERT INTO products (slug, name, description, sku, brand, image_url, price, published_date)
        VALUES (@slug, @name, @description, @sku, @brand, @imageUrl, @price, @publishedDate)
        `);

        insert.run({ slug, name, description, sku, brand, imageUrl, price, publishedDate });

        res.status(201).json({ message: 'Produkt skapad', slug });
});

// DELETE /admin/products/:id - radera produkt
router.delete('/products/:id', (req, res) => {
    const result = db.prepare(`DELETE FROM products WHERE id = ?`).run(req.params.id);
    
    if (result.changes === 0) {
        return res.status(404).json({ error: 'Produkten hittades inte' });
    }

    res.json({ message: 'Produkt raderad' });
});

export default router;