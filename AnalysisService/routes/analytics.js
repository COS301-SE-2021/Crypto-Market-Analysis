const express = require("express");
const router = express.Router();
const analysisFunction = require("../analysisFunction");

router.post("/ArticleAnalytics", async (request,response)=>{
    const articles = request.body.article;
    if(articles=== null) {
        return response.status(401).json({status: `error`, error: `Malformed request. Please check your parameters`});
    }
    else{
        await analysisFunction.analyseArticle(articles).then(data=>{
            return response.status(200).json(data);
        }).catch(err=>{
            return response(401).json({status:`error`, error: err})
        })
    }
});
router.get('/', (req, res) => { res.send('AnalysisService started running you can start making request') });
module.exports = router