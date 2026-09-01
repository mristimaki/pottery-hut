import express from 'express';
import cors from 'cors';
import db from './db/database.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Pottery Hut API is running');
});

app.listen(port, () => {
    console.log(`Server running om http://localhost:${port}`);
});