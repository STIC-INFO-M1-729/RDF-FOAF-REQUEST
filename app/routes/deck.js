//Import modéle Find
var models = require('../models/find_model.js');
//var searcher = require('../Helper/searcher.js');
//Voir erreur lignes 22 - 23
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
        console.log(req.body);
        //On appelle le modèle searcher.js pour qu'il produise le json répondant à la requête
        console.log(searcher);
        //var mySearcher = searcher(req.body.recherche);
        //TypeError: Object function () {} has no method 'effectuerRecherche'

        console.log(mySearcher);


        var jsonRes = [
            {"slabel": req.body.recherche, "rlabel": "les", "olabel": "copains"},
            {"slabel": "coucou", "rlabel": "les", "olabel": "amis"}
        ];
        //On renvoie ce json en résultat, il sera pris en charge
        //côté client par public/js/deck.js
        res.json(mySearcher);
    });

    /*app.get('/deck/search/:search_id', function(req, res) {
     
     //Use client for sparql search
     var client = new SparqlClient(endpoint);
     
     //user choice
     var nameRech = req.params.search_id;
     var option = req.body.options;
     
     //Before save new params search on mongoDB (Find if exist --> Update / also --> create new)
     var condition = { search: nameRech };
     var update = {
     search          : nameRech,     // mandatory
     searchOptions   : option
     };
     requete.findOneAndUpdate(condition, update, {upsert:true}, function(err, contact) {
     if (err || contact === undefined) {
     console.log(err);
     }
     console.log( 'Requetes ' + requete.search + ' created.');
     });
     
     
     //--DEBUG--
     console.log('Searching for : ' + nameRech + ' -- With option : ' + option);
     
     //Prepare query
     var query = "SELECT DISTINCT ?slabel ?rlabel ?olabel FROM <http://dbpedia.org> WHERE { {} ";
     
     //Upgrade query with user option
     if (!Array.isArray(req.body.options)) {
     query += "UNION" + utilSparql(option,nameRech);
     }
     else {
     req.body.options.forEach(function(opt) {
     query += "UNION" + utilSparql(nameRech);
     });
     }
     
     //Limit the number of response
     query += "} LIMIT 500";
     
     console.log(query);
     
     //Execute Request on Saprql end-point
     client.query(query)
     .execute(function(error, results) {
     
     // -- DEBUG --
     //console.log(req.body);
     
     //Prepare Return Results
     var displayResult;
     
     if (results == null) {
     //On error
     displayResult = "fail";
     }
     else {
     
     //Binding results
     var resultat = results.results.bindings;
     
     
     //Format DATA with JSON-Generique parser
     displayResult = '<table><tr><th>s</th><th>---</th><th>r</th><th>---</th><th>o</th></tr>'; //<th>---</th><th>jsonres</th>
     
     resultat.forEach(function(entry) {
     displayResult += '<tr><td>' + entry.slabel.value + '</td><td>&nbsp;|&nbsp;</td>';
     displayResult += '<td>' + entry.rlabel.value + '</td><td>&nbsp;|&nbsp;</td>';
     displayResult += '<td>' + entry.olabel.value + '</td></tr>';//<td>&nbsp;|&nbsp;</td>';
     });
     
     displayResult += '</table>';
     
     }
     console.log(results);
     //res.send('Résultats de la requête <strong>' + req.body.recherche + '</strong>: <br/>' +
     //displayResult + form);
     });
     });
     
     app.get('/decks', function(req, res){
     
     console.log('Call /decks --> return previous search value');
     
     //Get alls previous request and parse
     //use mongoose to get all previous request in the database
     requete.find(function(err, request) {
     
     // if there is an error retrieving, send the error. nothing after res.send(err) will execute
     if (err)
     res.send(err);
     
     console.log("Je vais faire une recherche, je produit un jsonp côté serveur");
     res.json([ {"slabel":"coucou", "rlabel":"les", "olabel":"copains"}, {"slabel":"coucou", "rlabel":"les", "olabel":"amis"} ]);
     //console.log(request);
     //res.json(request); // return all users in JSON format
     });
     
     });
     
     app.get('/deck/resultSimple_id', function(req, res){
     
     console.log('Call /deck/+data --> return previous search value');
     
     //Get alls previous request and parse
     //use mongoose to get all previous request in the database
     requete.find(function(err, request) {
     
     // if there is an error retrieving, send the error. nothing after res.send(err) will execute
     if (err)
     res.send(err);
     
     //console.log(request);
     res.json(request); // return all users in JSON format
     });
     
     });*/
};



