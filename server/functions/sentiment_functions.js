const Database = require(`../database/Database`);
const firestore_database = new Database().getInstance();

const getAverages = async (email, crypto_name) => {
    let averages = [];

    try{
        const social_media_sites = await firestore_database.fetch(`Users`, email, `social_media_sites`);
        if(social_media_sites){
            for(const platform of social_media_sites){
                try{
                    let average = await firestore_database.fetch(platform, crypto_name, `Average_Change`);
                    if(average) {
                        if(averages.length > 0){
                            for(const [index,element] of average.entries()) {
                                if(averages[index])
                                    averages[index] = Math.round(((element + averages[index]) / 2) * 100) / 100;
                            }
                        }
                        else
                            averages = averages.concat(average);
                    }
                }
                catch (error) {
                    return Promise.reject(error);
                }
            }

            if(averages.length < 0)
                return Promise.reject(`Not enough data at the moment to plot the graph. Check again later.`);

            return averages;
        }
        else
            return Promise.reject(`You are not following any platforms. Please follow at least one platform to view the graph.`)
    }
    catch (error){
        return Promise.reject(error);
    }
};

getAverages(`alekarzeeshan92@gmail.com`, `Bitcoin`).then(res => console.log(res));

module.exports = {getAverages};