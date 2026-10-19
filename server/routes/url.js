const express = require('express')
const { handleGenerateNewShortUrl, handleGetAnalytics, handleGetAllUrls } = require('../controllers/url')
const router = express.Router()

router.post('/', handleGenerateNewShortUrl)
router.get('/analytics/:shortId', handleGetAnalytics)
router.get('/all', handleGetAllUrls)
module.exports = router