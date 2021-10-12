const keyword_extractor = require("keyword-extractor");
const fetch = require('crypto-symbol');

function keywords(sentence) {
    let words = sentence.split(' ');
    let allNames = fetch.getNames();
    let allSymbols = fetch.getSymbols();

    let res = keyword_extractor.extract(sentence, {
        language: "english",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: false
    });
    for(let x = 0; x < words.length; x++) {
        for(let i = 0; i < allNames.length; i++)
        {
            if(words[x].toLowerCase() === allNames[i].toLowerCase())
            {
                res.unshift(allNames[i].toLowerCase());
            }

        }
    }
    let unique = res.filter((v, i, a) => a.indexOf(v) === i);
  return unique;
}

console.log(keywords("i hate nagacoin because of the government regulations but uei is good"));
