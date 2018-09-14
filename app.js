
var express = require('express');
var app = express();
// this is for making the http request to the ABS service to get the token
const request = require('request');
// this is for generating the unique user ID
const uuidv1 = require('uuid/v1')


// set the view engine to ejs
app.set('view engine', 'ejs');

//app.use(express.static('public'))

// index page 
app.get('/', function(req, res) {

    // TODO: You need to replace this secret string with your Directline secret
    secret = "aAbB-5ccDDd.eeF.GHI.jklMnOpqRsTuVwxY79ZaBcD-EFghI9jKlmNO9PqRstU"

    const options = {
        method: 'POST',
        uri: 'https://directline.botframework.com/v3/directline/tokens/generate',
        headers: {
            'Authorization': 'Bearer ' + secret
            },
        json: {
            // TODO: You need to replace the trusted origins with the location(s) where you will host the view
            // for example if you host at https://contosowebchat.azurewebsites.com/views and also test from localhost on port 3500 
            // you would add 'https://contosowebchat.azurewebsites.com', 'http://localhost:3500' here
            TrustedOrigins: [
                'http://localhost:3000', 
                'https://1679f5f5.ngrok.io']
                }
        };
        request.post(options, (error, response, body) => {
        if (!error && response.statusCode < 300) {

            // use res.render to render the webchat ejs view file passing in the token and userId as data
            // Note: res.render will look in the views folder for the ejs file
            res.render('index', { 
                    token: body.token,
                    userId: uuidv1()
                });
        }
        else {
            res.status(500).send('Call to retrieve token from DirectLine failed');
        } 
    });
    
});
app.listen(3000, () => console.log('Webchat viewer app listening on port 3000!'))

