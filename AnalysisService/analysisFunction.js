const natural = require('natural');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');
const aposToLexForm = require('apos-to-lex-form');
const spellCorrector = new SpellCorrector();
const a = require('extract-emoji');
const emojiUnicode = require("emoji-unicode")
const name = require("emoji-name-map");
const Database = require('./database/Database');
const firestore_db = new Database().getInstance();

var sentiment = require('node-sentiment');

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
            console.log("Before")
            console.log(post)
            const emoji_object= name.emoji;
            for (let k in emoji_object) {
                if(emoji_object[k]==i)
                {
                    post =post.replace(i,k);
                }
            }
            console.log("After")
            console.log(post)
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
                firestore_db.saveData(SocialMedia,cryptocurrency,{Old_Average: doc.data().Average})
            }
        })
    });
}
const saveToDB = async (arr, socialmedia , crypto)=> {
    let mini=Math.min.apply(Math, arr)
    let maxi = Math.max.apply(Math, arr)
    const age = arr => arr.reduce((acc,v) => acc + v)
    let average = age(arr)
    firestore_db.saveData(socialmedia,crypto,{Analysis_score: arr ,Min: mini,Max: maxi,Average: average})
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
    if(cryptos === null || socialmedias === null)
        return {status: `Bad Request`, error: `Malformed request. Please check your parameters`};

    const crypto =cryptos;
    const socialmedia = socialmedias;
    let Bigdata = null
    saveOld(socialmedia,crypto).then(data=>{
        console.log('old average saved')
    })
    try{
        await getData(socialmedia,crypto).then(crypto_Data=>{
            Bigdata= crypto_Data;
        })
    }
    catch (err){
        return {status:`Internal server error`, error: err};
    }
    console.log('analysis started')
    console.log(Bigdata)
    const analysisArr = [];
    let i=0;
    try {
        await Bigdata.forEach(element =>
            convertion(element).then(comment => {
                splits(comment).then(newWording => {
                    spellingc(newWording).then(filteredwords => {
                        analysewords(filteredwords).then(analysis => {
                            console.log(analysis)
                            if (isNaN(analysis)) {
                                analysis = 0;
                            }
                            analysisArr.push(analysis * 10);
                            i++;
                            if (i === Bigdata.length) {
                                saveToDB(analysisArr,socialmedia,crypto).then(data=>{
                                    console.log('returning data')
                                    console.log(data)
                                    return data;
                                })
                            }
                        })
                    })
                })
            })
        );
    }

    catch(err){
        return {status:`Internal server error`, error: err};
    }
}
const analyseArticle =async(Article)=>{
    return  new Promise(function (resolve, reject) {
        convertion(Article).then(comment => {
            splits(comment).then(newWording => {
                spellingc(newWording).then(filtered => {
                    analysewords(filtered).then(analysis => {
                        console.log(analysis)
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
module.exports = {analyseArticle,splits,convertion,analysewords,spellingc,saveToDB,sentimentAnalysis}

