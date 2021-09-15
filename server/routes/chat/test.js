const sentiment = require('wink-sentiment');
let response = sentiment("love");
if(response.score<0)
{
    sent = "negative";
}
else if(response.score>0)
{
    sent = "positive";
}else{
    sent = "neutral";
}
    console.log("wink sentiment is " + sent);
