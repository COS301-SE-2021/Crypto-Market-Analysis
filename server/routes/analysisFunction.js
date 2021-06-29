const natural = require('natural');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');
const aposToLexForm = require('apos-to-lex-form');
const spellCorrector = new SpellCorrector();
const a = require('extract-emoji');
const emojiUnicode = require("emoji-unicode")
spellCorrector.loadDictionary();
const extract_emoji = async (post)=>{
    const arr = a.extractEmoji(post);
    return arr;
}
const convertion = async (post)=>{
    if(post==null)
    {
        return Promise.reject(new Error('null value'));
    }
    let data= extract_emoji(post);
    data.then(s=>{
        for(const i of s)
        {
            console.log(emojiUnicode(i));
            let unicodeText= emojiUnicode(i)
            let unicodeChar = JSON.parse(`["\\u${unicodeText}"]`)[0];
            console.log(unicodeChar)
            let unicodeToStr = unicodeText.codePointAt(0).toString(16)
            console.log(unicodeToStr)
            post = post.replace(i, "");
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

module.exports = {analysewords, convertion,spellingc,splits,extract_emoji }