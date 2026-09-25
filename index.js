const express = require('express')
const path = require('path')
const cookieParser = require("cookie-parser")

const {restrictLoggedinUserOnly} = require("./middlewares/auth")
const {connectMongoDB} = require('./connect')
const URL = require('./models/url')

const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')

const app = express()
const PORT = 8001

connectMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=> console.log("mongodb connected"))

app.set('view engine', "ejs")
app.set('views', path.resolve("./views"))


//middleware 
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())


//routes
app.use('/url', restrictLoggedinUserOnly, urlRoute)
app.use('/', staticRoute)
app.use('/user', userRoute)

app.get('url/:shortId', async (req, res)=>{
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate(
    {
        shortId
    },
    {
        $push:{
            visitHistory:{
                timestamp:  Date.now()
            },
        }
    })

    res.redirect(entry.redirectUrl)
})

app.listen(PORT, ()=> {
    console.log(`Server started at PORT: ${PORT}`)
})