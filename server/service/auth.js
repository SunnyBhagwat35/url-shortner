const jwt = require('jsonwebtoken')
const secret = "Sunny$123@"

function setUser(user){
    const payload = {
        _id: user._id,
        email: user.email,
    }
    return jwt.sign(payload, secret)
}

function getUser(token){
    if(!token) return null
    try{
        return jwt.verify(token, secret)
    }catch(error){
        return null
    }
}


// // Stateless authentication
// const sessionidToUserMap = new Map()

// function setUser(id, user){
//     sessionidToUserMap.set(id, user)
// }

// function getUser(id){
//     return sessionidToUserMap.get(id)
// }

module.exports = {
    setUser,
    getUser,
}