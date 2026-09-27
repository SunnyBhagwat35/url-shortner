const {getUser} = require('../service/auth')

async function restrictLoggedinUserOnly(req, res, next){
    const userid = req.cookies?.uid

    if (!userid) return res.redirect('/login')
    
    const user = getUser(userid)
    if (!user) return res.redirect('/login')

    req.user = user
    next()
}

async function checkAuth(req, res, next){
    const userUid = req.cookies?.uid;
    const user = getUser(userUid)

    req.user = user
    next()
}

module.exports = {
    restrictLoggedinUserOnly,
    checkAuth
}