var mongoose = require('mongoose');

var Requete = mongoose.Schema(
    {
        last_requetes       : {type: Object}
    }
);
exports.Requete                    = mongoose.model('Requete', Requete);


