const Database = require(`../database/Database`);
const firestore_database = new Database().getInstance();

const getAverages = async (email, crypto_name) => {
    //let averages = {};

    try{
        const social_media_sites = await firestore_database.fetch(`Users`, email, `social_media_sites`);
        if(social_media_sites){
            /*for(const platform of social_media_sites){
                try{
                    averages[`${platform}_Averages`] = await firestore_database.fetch(platform, crypto_name, `Average`);
                }
                catch (error) {
                    return Promise.reject(error);
                }
            }

            return averages;*/
            let iterations = Math.floor(Math.random() * (24 - 1) + 1);
            let averages = [];
            while(iterations > 0) {
                let random_number = Math.random() * (5 - (-5)) + (-5);
                let average = Math.round((random_number+ Number.EPSILON) * 100) / 100;
                averages.push(average);
                iterations--;
            }

            return averages;
        }
        else
            return Promise.reject(`You are not following any platforms. Please follow at least one platform to view the graph.`)
    }
    catch (error){
        return Promise.reject(error);
    }
};

module.exports = {getAverages};