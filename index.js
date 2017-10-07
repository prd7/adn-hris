
var express = require('express')
var app = express()
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var cors = require('cors');

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

//Allow CORS Requests

app.use(cors());

// Process application/json
app.use(bodyParser.json())


app.use(express.static(__dirname));
// Index route

// for Facebook verification
app.get('/', function (req, res) {
    //res.send('Hello 404!')
    //res.redirect('/login.html');
    	res.end();
})

app.set('view engine', 'html');

app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})


//connect your app to parse server


app.post('/api/mail', function (req, res) {
  console.log(req);
  console.log(req.body.subject);
  console.log(req.body.body);
  console.log(req.body.to);
  console.log("post request");
  sendMail();
  res.json({message:'Action Performed Successfully!',status:'OK'});  
});

 // create reusable transporter object using the default SMTP transport
 var transporter = nodemailer.createTransport({
        host: 'mail.fluidonomics.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        tls: {rejectUnauthorized:false},
		auth: {
            user: "dev@fluidonomics.com", // generated ethereal user
            pass: "fluidonomics@2016"  // generated ethereal password
        }
    });

function sendMail(){
	    // setup email data with unicode symbols
	    console.log("Sending email");
	var mailOptions = {
        from: '"Admin fluidonomics" <dev@fluidonomics.com>', // sender address
        to: 'techsud95@gmail.com, theprithvirajdeshmukh@gmail.com , m.mayur404@gmail.com', // list of receivers
        subject: 'Hello Guys✔', // Subject line
        text: 'Hello world this is our server?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                
    });
} 