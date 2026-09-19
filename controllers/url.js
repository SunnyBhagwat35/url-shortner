const { nanoid } = require('nanoid')
const URL =  require('../models/url') 

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body
    if (!body.url){
        return res.status(400).json({error: 'url is required'})
    }
    const shortID = nanoid(8)
    
    await URL.create({
        shortId: shortID,
        redirectUrl:body.url,
        visitHistory: []
    })

    return res.json({id: shortID})
}


async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId
    const entry = await URL.findOne({shortId})
    return res.json({
        total: entry.visitHistory.length,
        analytics: entry.visitHistory
    })
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
}