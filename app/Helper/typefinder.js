//Import for SparqlClient
var SparqlClient = require('sparql-client');
var endpoint = 'http://dbpedia.org/sparql';

module.exports = function trouverTypes(jsonProduit, termine) {
    console.log("je fais l'étape 2");
    termine.emit('finit2',JSON.stringify(jsonProduit.results));
};

