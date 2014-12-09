/**
 * Created by zorg on 09/12/14.
 */
var models = require('../models/find_model.js');
var Requete = models.Requete;
var SparqlClient = require('sparql-client');
var endpoint = 'http://dbpedia.org/sparql';
var util = require('util');
module.exports = function(app) {
app.get('/deck/search/:search_id', function(req, res) {
var nameRech = req.params.search_id;
console.log('Searching for : ' + nameRech);
var client = new SparqlClient(endpoint);



var prefixeQuery = "PREFIX : <http://dbpedia.org/resource/>";
prefixeQuery = prefixeQuery + "PREFIX foaf: <http://xmlns.com/foaf/0.1/> ";
prefixeQuery = prefixeQuery + "PREFIX dbpedia: <http://dbpedia.org/> ";
prefixeQuery = prefixeQuery + "PREFIX dbpedia2: <http://dbpedia.org/property/> ";
prefixeQuery = prefixeQuery + "PREFIX dbpedia3: <http://dbpedia.org/ontology/> ";
var selectQuery = "SELECT DISTINCT ";
selectQuery = selectQuery +"?person ?birth ?name ";
var coeurQuery = "WHERE {";
coeurQuery = coeurQuery + "?person dbpedia3:birthDate ?birth.";
coeurQuery = coeurQuery + "?person foaf:name ?name.";
coeurQuery = coeurQuery + "FILTER regex(?name, \"" + nameRech + "\")}";
var limitQuery = "LIMIT 10";
var myQuery = prefixeQuery + selectQuery + coeurQuery + limitQuery;
console.log("Query to " + endpoint);
console.log("Query: " + myQuery);


client.query(myQuery)
.execute(function(error, results) {
var tempo = util.inspect(arguments, null, 20, true);
console.log(tempo);
res.json(tempo);
});
});
app.get('/decks', function() {
console.log('user');
});
};
