const express = require("express");
const router = express.Router();
const analysisFunction = require("../analysisFunction")
router.post("/ArticleAnalytics", async (request,response)=>{
    const articles = request.body.article;
    if(articles=== null) {
        return response.status(401).json({status: `error`, error: `Malformed request. Please check your parameters`});
    }
    else{
        await analysisFunction.analyseArticle(articles).then(data=>{
            console.log('waiting for data')
            console.log(data)
            return response.status(200).json(data);
        }).catch(err=>{
            return response(401).json({status:`error`, error: err})
        })
    }
});
module.exports = router