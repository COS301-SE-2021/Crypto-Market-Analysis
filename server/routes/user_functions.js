const Database = require('../database/Database');
const firestore_db = new Database().getInstance();

firestore_db.save(`Cryptocurrency`, `Twitter`, `id`, `9988556632`);