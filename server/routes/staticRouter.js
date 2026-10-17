const express = require('express')
const { restrictTo } = require("../middlewares/auth")
const URL = require('../models/url')

const router = express.Router()

router.get('/', restrictTo(["NORMAL"]), async (req, res)=>{
    // if(!req.user) return r   es.redirect("/login")
    // console.log(req.uer)
    const allurls = await URL.find({createdBy: req.user._id})
    // console.log(allurls)
    return res.render(
        'home',
        {
        urls: allurls,
        }
    )
})

router.get('/signup', async (req, res) => {
    return res.render('signup')
})
router.get('/login', async (req, res) => {
    return res.render('login')
})

module.exports = router