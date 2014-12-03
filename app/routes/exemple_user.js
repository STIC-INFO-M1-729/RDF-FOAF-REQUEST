var expressJwt = require('express-jwt');
var models = require('../models/pop_models');
var User = models.User;
var Deck = models.Deck;
var Contact = models.Contact;

module.exports = function(app) {

    //--- CRUD USER -----------------------------------------------------------
    // get all users
    app.get('/users', expressJwt({secret: app.secretToken}), function(req, res) {

        // use mongoose to get all users in the database
        User.find(function(err, users) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(users); // return all users in JSON format
        });
    });

    // CREATE user and send back all users after creation
    app.put('/user', function(req, res) {

        // create a user, information comes from AJAX request from Angular
        User.create({
            name : req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            login: req.body.login
        }, function(err, user) {
            if (err || user === undefined)
                res.send(err);

            console.log( 'user ' + user + ' created.');
            // authenticate as this user
            // return authentication token

            // get and return all the users after you create another
            User.find(function(err, users) {
                if (err)
                    res.send(err);
                res.json(users);
            });
        });

    });

    // RETRIEVE user info
    app.get('/user/:user_id', expressJwt({secret: app.secretToken}), function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);

            return res.json(user);
        });
    });

    // UPDATE a user
    app.post('/user/:user_id', expressJwt({secret: app.secretToken}), function(req, res) {
        console.log(req.body);
        //TODO: check if user is editing itself or if it is admin

        User.findById(req.params.user_id, function(err, u) {

            if (err)
                res.send(err);

            // update the user info
            if( "name" in req.body ) {
                u.name = req.body.name;
            } 
            if( "email" in req.body ) {
                u.email = req.body.email;
            }
            if( 'username' in req.body ) {
                u.username = req.body.username;
            }
            if( 'password' in req.body ) {
                u.password = req.body.password;
            }
            if( 'admin' in req.body ) {
                u.admin = req.body.admin;
            }
            u.update_date = Date.now();

            // save the user
            u.save(function(err) {
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'user ' + u.name + ' updated!' });
            });
        });
    });

    // DELETE a user
    app.delete('/user/:user_id', expressJwt({secret: app.secretToken}), function(req, res) {
        User.remove({
            _id : req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);

            // get and return all the users after you create another
            User.find(function(err, users) {
                if (err)
                    res.send(err);
                res.json(users);
            });
        });
    });

    //--- CRUD Contacts ---
    // GET ALL
    app.get('/contacts', expressJwt({secret: app.secretToken}), function(req, res) {
        console.log('user ' + req.user.username + ' is calling /contacts');
        // get all contacts of the required deck
        Contact.find({owner: req.user._id}, function(err, contacts) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(contacts); // return all contacts of the connected user in JSON format
        });
    });

    app.put('/contact', expressJwt({secret: app.secretToken}), function(req, res) {
        console.log('user ' + req.user.username + ' is calling PUT /deck/'+req.params.deck_id+'/contact');

        Contact.create({
            name        : req.body.name,                // mandatory
            email       : req.body.email,               // mandatory
            picture     : req.body.picture || null,
            comment     : req.body.comment || null,
            tags        : req.body.tags.split(',').map(Function.prototype.call, String.prototype.trim),
            owner       : req.user._id
        }, function(err, contact) {
            if (err || contact === undefined)
                res.send(err);

            console.log( 'contact ' + contact + ' created.');

            // get and return all the users after you create another
            Contact.find({owner: req.user._id}, function(err, contacts) {
                if (err)
                    res.send(err);
                res.json(contacts);
            });
        });
    });

    // RETRIEVE - TODO
    // app.get('/contact', expressJwt({secret: app.secretToken}), function(req, res) {
    // });
    // UPDATE - TODO
    // app.post('/contact/:contact_id', expressJwt({secret: app.secretToken}), function(req, res) {
    // });
    app.get('/contact/search', expressJwt({secret: app.secretToken}), function(req, res) {
        console.log('user ' + req.user.username + ' is calling get /contact/search');
    });
    // DELETE
    app.delete('/contact/:contact_id', expressJwt({secret: app.secretToken}), function(req, res) {
        console.log('user ' + req.user.username + ' is calling DELETE /contact');
        Contact.remove({
            _id : req.params.contact_id,
            owner: req.user._id
        }, function(err, contact) {
            if (err)
                res.send(err);

            // get and return all the contacts
            Contact.find({ owner: req.user._id }, function(err, contacts) {
                if (err)
                    res.send(err);
                res.json(contacts);
            });
        });
    });

};