const {getUser} = require('../service/auth')


function checkAuthenticaction(req, res, next){
    const authorizationHeader = req.headers['authorization']
    req.user = null

    if (
        !authorizationHeader ||
        !authorizationHeader.startsWith("Bearer")
    )
        return next();

    const token = authorizationHeader.split('Bearer ')[1]
    const user = getUser(token);

    req.user = user;
    return next()

}

function restrictTo(roles = []){
    return function(req, res, next){
        if (!req.user) return res.redirect("/login");

        if (!roles.includes(req.user.role)) return res.end('UnAuthorized');

        next();
    };
}

// async function restrictLoggedinUserOnly(req, res, next){
//     // const userid = req.cookies?.uid
//     const token = req.headers['authorization']
//     const userid = token.split('Bearer ')[1]
//     if (!userid) return res.redirect('/login')
    
//     const user = getUser(userid)
//     if (!user) return res.redirect('/login')

//     req.user = user
//     next()
// }


// async function checkAuth(req, res, next){
//     // const userUid = req.cookies?.uid;
//     const token = req.headers['authorization']
//     const userid = token.split('Bearer ')[1]
//     const user = getUser(userid)

//     req.user = user
//     next()
// }

module.exports = {
    checkAuthenticaction,
    restrictTo,
}