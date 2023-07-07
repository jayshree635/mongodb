const express = require('express')
const app = express()
const config = require('./config/db.config')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
//const exp = require('constants')
require('./helpers/global')

app.use(express.json());
app.use(express.urlencoded({extended : false}));
//app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json({limit : "50mb"}))
app.use(cors())


//.................call database connection function.....
config.dbConnection()

//..........routes
const route = require('./routes/user/user.route');
const admin = require('./routes/admin/admin.route')
const comment = require('./routes/comment/comment.route')
const postData = require('./routes/post/post.route')
app.use('/api/v1/',route)
app.use('/api/v1/',admin)
app.use('/api/v1/',comment)
app.use('/api/v1/',postData)

//.................create Server..................
let server 
if (config.protocol == "https") {
    const https = require('https')
    const options = {
        key : fs.readFileSync(config.sslCertificates.privkey),
        cert : fs.readFileSync(config.sslCertificates.fullchain)
    }
    server = https.createServer(options,app)
} else {
    const http = require('http')
    server = http.createServer(app)
    console.log("http");
}

app.get('/',(req,res)=>{
    console.log("hello");
    res.send("welcome")
})

const port = process.env.PORT || 3000;

server.listen(port,()=>{
    console.log(`server running on port ${port}`);
})

