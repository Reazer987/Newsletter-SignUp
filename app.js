const express = require('express');
const request = require('request');
const bodyParser = require(`body-parser`);
const https = require('https');
const { url } = require('inspector');

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))


app.post('/',function (req,res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

        const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    }
    const jsonData = JSON.stringify(data);

    const url = "https://us13.api.mailchimp.com/3.0/lists/69f519af8b";

    const options = {
        method: "POST",
        auth: "teo:be47379ee53eac22699ab7eb6e447382-us13"
    }

    const request = https.request(url, options, function (response) {
        
        if (response.statusCode === 200) {
            res.sendFile(__dirname + '/success.html')
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
        
        response.on("data", function (data) {
            console.log(JSON.parse(data));
            
        })
        
    })
    
    request.write(jsonData);
    request.end();
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/signup.html');

})

app.post('/failure', function (req, res) {
    res.redirect('/')
    
})




app.listen(process.env.PORT || 3000, function (req, res) {
    console.log('Listening to port 3000');
    
})

//API KEY
//be47379ee53eac22699ab7eb6e447382-us13

//List Id
//69f519af8b