const Database = require(`../database/Database`);
const firestore_database = new Database().getInstance();

const getAverages = async (email, crypto_name) => {
    try{
        const social_media_sites = await firestore_database.fetch(`Users`, email, `social_media_sites`);
        if(social_media_sites){
            for(const platform of social_media_sites){
                try{
                    const averages = await firestore_database.fetch(platform, crypto_name, `Average_Change`);
                    if(averages){

                    }
                    else
                        return Promise.reject(`Data is insufficient to plot the graph. Please check again later.`);
                }
                catch (error) {
                    return Promise.reject(error);
                }
            }
        }
        else
            return Promise.reject(`You are not following any platforms. Please follow at least one platform to view the graph.`)
    }
    catch (error){
        return Promise.reject(error);
    }
};

module.exports = {getAverages};