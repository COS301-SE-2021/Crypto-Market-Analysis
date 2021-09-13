const natural = require('natural');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');
const aposToLexForm = require('apos-to-lex-form');
const spellCorrector = new SpellCorrector();
const a = require('extract-emoji');
const emojiUnicode = require("emoji-unicode")
const name = require("emoji-name-map");
require("dotenv").config();
const Database = require('./database/Database');
const firestore_db = new Database().getInstance();

spellCorrector.loadDictionary();
const extract_emoji = async (post)=>{
    const arr = a.extractEmoji(post);
    return arr;
}
const convertion = async (post)=> {
    if(post==null)
    {
        return Promise.reject(new Error('null value'));
    }
    let data= extract_emoji(post);
    data.then(s=>{

        for(const i of s)
        {
            const emoji_object= name.emoji;
            for (let k in emoji_object) {
                if(emoji_object[k]==i)
                {
                    post =post.replace(i,k);
                }
            }
        }

    });
    const contractions = aposToLexForm(post);//convert word to contractions
    const cLcase = contractions.toLowerCase();//convert to lowercases
    const value = cLcase.replace(/[^a-zA-Z\s]+/g, '');//remove stop word


    return value //post converted ready to be read
}

//spliting post/comment into individual words
const splits = async (comment)=>{
    if(comment==null)
    {
        return Promise.reject(new Error('null value'));
    }
    const { WordTokenizer } = natural;
    const words = new WordTokenizer();
    const Splited = words.tokenize(comment);
    return Splited;
}
const getData = async (socialmedia , crypto)=>{
    const bigdata = await firestore_db.fetch(socialmedia,crypto);
    const docs = await bigdata.data().post;
    return docs;
}
//correcting spelling errors
const spellingc = async(newWording)=>{
    if(newWording==null)
    {
        return Promise.reject(new Error('null value'));
    }
    newWording.forEach((word, index) => {
        newWording[index] = spellCorrector.correct(word);
    })
    const filteredwords = SW.removeStopwords(newWording); //removeStopwords
    return filteredwords;

}
const saveOld = async(SocialMedia , cryptocurrency)=>{
    await firestore_db.getUsers(SocialMedia).onSnapshot((documents) => {
        documents.forEach((doc) => {
            if (typeof doc.id !== "undefined" && doc.id === cryptocurrency) {
                if(typeof doc.data().Average!== "undefined"){
                    firestore_db.saveData(SocialMedia,cryptocurrency,{Old_Average: doc.data().Average})
                }
                else{
                    firestore_db.saveData(SocialMedia,cryptocurrency,{Old_Average: 0})
                }
            }
        })
    });
}
const saveToDB = async (axis,arr, socialmedia , crypto)=> {
    let mini=Math.min.apply(Math, arr)
    let maxi = Math.max.apply(Math, arr)
    const age = arr => arr.reduce((acc,v) => acc + v)
    let average = age(arr)
    firestore_db.saveData(socialmedia,crypto,{xaxis:axis,Analysis_score: arr ,Min: mini,Max: maxi,Average: average})
    return {Analysis_score: arr ,Min: mini,Max: maxi,Average: average};
}
//return analysis value
const analysewords = async (filteredwords)=>{
    if(filteredwords==null)
    {
        return Promise.reject(new Error('null value'));
    }
    const { SentimentAnalyzer, PorterStemmer } = natural;
    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');//using afinn dictionary may change
    const analysis = analyzer.getSentiment(filteredwords);
    return analysis;

}
const sentimentAnalysis = async (cryptos,socialmedias)=>{
    return  new Promise(async function (resolve, reject) {
        if (cryptos === null || socialmedias === null)
            reject(`Malformed request. Please check your parameters`);

        const crypto = cryptos;
        const socialmedia = socialmedias;
        let Bigdata = null
       try{
            await saveOld(socialmedia, crypto).then(data => {
       })}
        catch {
            console.log('no old')
        }
        try {
           await getData(socialmedia, crypto).then(crypto_Data => {
                Bigdata = crypto_Data;
            })
        } catch (err) {
            reject(`Internal server error`);
        }
        const analysisArr = [];
        const axis = [];
        let i = 0;
        try {
            await Bigdata.forEach(element =>
                convertion(element).then(comment => {
                    splits(comment).then(newWording => {
                        spellingc(newWording).then(filteredwords => {
                            analysewords(filteredwords).then(analysis => {
                                if (isNaN(analysis)) {
                                    analysis = 0;
                                }
                                analysisArr.push(analysis);

                                i++;
                                axis.push(i);
                                if (i === Bigdata.length) {
                                    saveToDB(axis,analysisArr, socialmedia, crypto).then(data => {
                                        resolve(data);
                                    }).catch(err=>{
                                        console.log(err+" :Error saving to database")
                                    })
                                }
                            })
                        })
                    })
                })
            );
        } catch (err) {
            reject(`Internal server error`);
        }
    })
}
const get_Doc_id =async(Social_media)=>{

    let arrayofdocuments = [];
    return  new Promise(function (resolve, reject) {
        firestore_db.getUsers(Social_media).onSnapshot(async (documents) => {
            await documents.forEach((doc) => {
                if (typeof doc.id !== "undefined") {
                    arrayofdocuments.push(doc.id);
                }
            })
            resolve(arrayofdocuments)
        });
    })
}
const get_Doc_by_User_id =async(cryptocurrency)=>{
    let arrayofdocuments = [];
    return  new Promise( function (resolve, reject) {
        let i=1;
       firestore_db.getUsers('Users').onSnapshot((documents) => {
            documents.forEach(async (doc) => {
                if (typeof doc.data().crypto_name !== "undefined" && doc.data().crypto_name.includes(cryptocurrency)) {
                    arrayofdocuments.push(doc.data());
                }
                if(i === documents._size )
                {
                    resolve(arrayofdocuments);
                }
                 i++;
            })
        })

    })
}

const analyseArticle =async(Article)=>{
    return  new Promise(function (resolve, reject) {
        convertion(Article).then(comment => {
            splits(comment).then(newWording => {
                spellingc(newWording).then(filtered => {
                    analysewords(filtered).then(analysis => {
                        if (analysis > 0) {
                            resolve('positive') ;
                        } else if (analysis < 0) {
                            resolve('negative');
                        } else
                           resolve('neutral');
                    })
                })
            })
        })
    })
}
module.exports = {get_Doc_by_User_id,get_Doc_id,analyseArticle,splits,convertion,analysewords,spellingc,saveToDB,sentimentAnalysis}

