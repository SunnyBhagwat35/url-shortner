const {getUser} = require('../service/auth')

async function restrictLoggedinUserOnly(req, res, next){
    console.log(req)
    const userid = req.cookies?.uid

    if (!userid) return res.redirect('/login')
    
    const user = getUser(userid)
    if (!user) return res.redirect('/login')

    req.user = user
    next()
}

module.exports = {
    restrictLoggedinUserOnly
}