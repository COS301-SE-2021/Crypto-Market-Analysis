const Database = require(`../database/Database`);
const firestore_database = new Database().getInstance();

const getAverages = async (crypto_name, social_media_site) => {
    const averages = await firestore_database.fetch();
};

module.exports = {getAverages};