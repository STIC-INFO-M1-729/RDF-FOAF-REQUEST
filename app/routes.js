//var models = require('./models/find_model.js');
//var requete = models.Requete;

var models = require('./models/find_model');
var requete = models.Requete;

module.exports = function(app) {
    require('./routes/deck.js')(app);
};
