//Import modéle Find
var models = require('../models/find_model.js');
var searcher = require('../Helper/searcher.js');
var requete = models.Requete;

//Outil de visualisation JSON
var util = require('util');

//Import for SparqlClient
var SparqlClient = require('sparql-client');
var utilSparql = require('../Helper/sparql_request_formatteur.js');
var endpoint = 'http://dbpedia.org/sparql';

module.exports = function (app) {

    //C'est cette fonction qui est appelée dans public/js/deck.js
    app.post('/decks/searchInitial', function (req, res) {

        //On appelle le modèle searcher.js pour qu'il produise le json répondant à la requête
        var jsonRes = searcher(req.body.recherche);

        //On renvoie ce json en résultat, il sera pris en charge
        //côté client par public/js/deck.js
        res.json(jsonRes);
    });
};



