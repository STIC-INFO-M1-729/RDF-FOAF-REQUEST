var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

//var models = require('./models/pop_models');
//var User = models.User;
//var Contact = models.Contact;

module.exports = function(app) {
    app.secretToken = "Calopea Rocks!";
    //require('./routes/user.js')(app);
    //require('./routes/deck.js')(app);
    //require('./routes/linkedin.js')(app);
    //require('./routes/google.js')(app);


    // Pop! authentification
    /*app.post('/auth', function(req, res) {
        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username === '' || password === '') {
            return res.send(401);
        }

        User.findOne({username: username}, function (err, user) {
            if (err || user === null) {
                console.log(err);
                return res.send(401);
            }
            console.log( user );
            user.comparePassword(password, function(isMatch) {
                if (!isMatch) {
                    console.log("Attempt failed to username with " + user.username);
                    return res.send(401);
                }

                var token = jwt.sign(user, app.secretToken, { expiresInMinutes: 60 });     
                return res.json({token:token});
            });
        });
    });*/
};
