var express = require("express");
var app = express();
let server = require('http').Server(app);
var passport = require('passport'),
bodyParser = require('body-parser'),
localStrategy = require('passport-local'),
passportLocalMongoose = require('passport-local-mongoose'),
user = require('./app/models/user'),
expressSession = require('express-session');


var mongoose = require('mongoose');
//Database connection
mongoose.connect("mongodb+srv://cdepena:VGG8C095Gt8a52Fi@cluster0-jek9d.mongodb.net/test?retryWrites=true")
    .then(() => {
        console.log("connected");
    }).catch(() => {
        console.log("Not connected");
    });

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(require('express-session')({
        secret: "This is a test",
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(user.serializeUser());
    passport.deserializeUser(user.deserializeUser());
//Serving files 
// TODO: Use webpack 2.0
app.use('/public', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/public', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect JS bootstrap
app.use('/public', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jquery
app.use('/public', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/css')); // redirect FontAwesome css
app.use('/public', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/js')); // redirect FontAwesome js
app.use('/public', express.static(__dirname + '/app/assets/css')); // redirect css
app.use('/public', express.static(__dirname + '/app/assets/img')); // redirect imgs
app.use('/public', express.static(__dirname + '/node_modules/angular')); // redirect Angular
app.use('/public', express.static(__dirname + '/node_modules/angular-ui-router')); // redirect Angular Ui-Router
app.use('/public', express.static(__dirname + '/app')); // redirect App
app.use('/public', express.static(__dirname + '/app/partials')); // redirect App
app.use('/public', express.static(__dirname + '/app/controllers/landing-page'));
app.use('/public', express.static(__dirname + '/app/controllers/order-page')); // redirect App
app.use('/public', express.static(__dirname + '/node_modules/underscore'))

//Routes
app.get("/products.json", function(req, res, next) {
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    res.sendFile(__dirname + "/app/products.json");
});

app.post("/register", function(req, res) {
    user.register(new user({username: req.body.username}), req.body.password, function(err, user){
        if (err) {
            console.log(err);
            return res.sender('register');
        }
        
        passport.authenticate("local")(req, res, function() {
            res.redirect("/order");
        });
    });
})

app.post("/login", function(req, res, next) {
    res.sendfile(__dirname + "/app/partials/login-page.html");
});

app.get("*", function(req, res, next) {
    res.sendfile(__dirname + "/app/index.html");
});

// app.get("*", function(req, res) {
//     res.send("La ruta que esta buscando no existe...");
// });

const port = process.env.PORT || 8000;

server.listen(port, () => {
    console.log("App is running on port " + port);
});