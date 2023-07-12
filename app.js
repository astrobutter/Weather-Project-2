const bodyParser = require('body-parser')
const express = require('express')

const https = require('https');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/', function (req, res) {
    res.sendFile(__dirname+'/index.html');
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port: 3000")
})