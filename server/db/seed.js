import db from "./database.js";

const products = [
    // Mud Collection
    { theme: 'Mud', type: 'Vas', price: 249, sku: 'MUD001', image: 'mud-vase.png', publishedDate: '2026-06-10' },
    { theme: 'Mud', type: 'Skål', price: 149, sku: 'MUD002', image: 'mud-bowl.png', publishedDate: '2026-06-10' },
    { theme: 'Mud', type: 'Mugg', price: 179, sku: 'MUD003', image: 'mud-mug.png', publishedDate: '2026-05-20' },
    { theme: 'Mud', type: 'Serveringsfat', variant: 'Small', price: 299, sku: 'MUD004', image: 'mud-serving-bowl-small.png', publishedDate: '2026-05-20' },
    { theme: 'Mud', type: 'Serveringsfat', variant: 'Large', price: 499, sku: 'MUD005', image: 'mud-serving-bowl-large.png', publishedDate: '2026-05-20' },
    { theme: 'Mud', type: 'Tallrik', price: 279, sku: 'MUD006', image: 'mud-plate.png', publishedDate: '2026-07-01' },

    // Sand Collection
    { theme: 'Sand', type: 'Mugg', price: 259, sku: 'SAN001', image: 'sand-mug.png', publishedDate: '2026-04-15' },
    { theme: 'Sand', type: 'Skål', price: 329, sku: 'SAN002', image: 'sand-bowl.png', publishedDate: '2026-04-15' },
    { theme: 'Sand', type: 'Tallrik', price: 289, sku: 'SAN003', image: 'sand-plate.png', publishedDate: '2026-04-15' },

    // Grass Collection
    { theme: 'Grass', type: 'Mugg', price: 179, sku: 'GRA001', image: 'grass-mug.png', publishedDate: '2026-03-01' },
    { theme: 'Grass', type: 'Skål', price: 219, sku: 'GRA002', image: 'grass-bowl.png', publishedDate: '2026-03-01' },
    { theme: 'Grass', type: 'Tallrik', price: 279, sku: 'GRA003', image: 'grass-plate.png', publishedDate: '2026-03-01' },

    // Ocean Collection (nyligen publicerade – triggar "Nyhet")
    { theme: 'Ocean', type: 'Mugg', variant: 'Lång', price: 289, sku: 'OCE001', image: 'ocean-mug.png', publishedDate: '2026-08-28' },
    { theme: 'Ocean', type: 'Mugg', variant: 'Rund', price: 289, sku: 'OCE002', image: 'ocean-mug-round.png', publishedDate: '2026-08-28' },
    { theme: 'Ocean', type: 'Vas', price: 649, sku: 'OCE003', image: 'ocean-vase.png', publishedDate: '2026-08-28' },
    { theme: 'Ocean', type: 'Serveringsfat', price: 549, sku: 'OCE004', image: 'ocean-serving-plate.png', publishedDate: '2026-08-28' },
    { theme: 'Ocean', type: 'Skål', price: 339, sku: 'OCE005', image: 'ocean-bowl.png', publishedDate: '2026-08-28' },
    { theme: 'Ocean', type: 'Tallrik', price: 279, sku: 'OCE005', image: 'ocean-plate.png', publishedDate: '2026-08-28' },

    // Cloud Collection (en framtida – testar "dold produkt"-logiken)
    { theme: 'Cloud', type: 'Mugg', price: 269, sku: 'CLO001', image: 'cloud-mug.png', publishedDate: '2026-02-10' },
    { theme: 'Cloud', type: 'Skål', price: 319, sku: 'CLO002', image: 'cloud-bowl.png', publishedDate: '2026-02-10' },
    { theme: 'Cloud', type: 'Tallrik', price: 289, sku: 'CLO003', image: 'cloud-plate.png', publishedDate: '2026-09-15' },

    // Tropical Collection
    { theme: 'Tropical', type: 'Mugg', price: 279, sku: 'TRO001', image: 'tropical-mug.png', publishedDate: '2026-01-15' },
    { theme: 'Tropical', type: 'Skål', price: 339, sku: 'TRO002', image: 'tropical-bowl.png', publishedDate: '2026-01-15' },
    { theme: 'Tropical', type: 'Serveringsfat', price: 579, sku: 'TRO003', image: 'tropical-serving-plate.png', publishedDate: '2026-01-15' },
    { theme: 'Tropical', type: 'Serveringsskål', price: 459, sku: 'TRO004', image: 'tropical-serving-bowl.png', publishedDate: '2026-01-15' },
    { theme: 'Tropical', type: 'Tallrik', price: 299, sku: 'TRO005', image: 'tropical-plate.png', publishedDate: '2026-01-15' },
];

const descriptions = {
    Mugg: (theme) => `Handgjord mugg ur ${theme} Collection, perfekt för morgonkaffet. Varje mugg är unik och formad för hand.`,
    Skål: (theme) => `Handgjord skål ur ${theme} Collection, mångsidig för både mat och dekor.`,
    Tallrik: (theme) => `Handgjord tallrik ur ${theme} Collection, med en unik yta där ingen är den andra lik.`,
    Vas: (theme) => `Handgjord vas ur ${theme} Collection, en vacker detalj till hemmet`,
    Serveringsskål: (theme) => `Handgjord serveringsskål ur ${theme} Collection, perfekt för middagsbjudningar och dekor.`,
    Serveringsfat: (theme) => `Handgjord serveringsskål ur ${theme} Collection, perfekt för middagsbjudningar och dekor.`
};

const insert = db.prepare(`
    INSERT INTO products (slug, name, description, sku, brand, image_url, price, published_date)
    VALUES (@slug, @name, @description, @sku, @brand, @imageUrl, @price, @publishedDate)
`);

for (const p of products) {
    const name = p.variant ? `${p.theme} ${p.type} ${p.variant}` : `${p.theme} ${p.type}`
    const slug = name.toLowerCase().replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/\s+/g, '-');

    insert.run({
        slug,
        name,
        description: descriptions[p.type](p.theme),
        sku: p.sku,
        brand: `${p.theme} Collection`,
        imageUrl: `/products/${p.image}`,
        price: p.price,
        publishedDate: p.publishedDate,
    });
}

console.log(`${products.length} produkter tillagda i databasen!`)