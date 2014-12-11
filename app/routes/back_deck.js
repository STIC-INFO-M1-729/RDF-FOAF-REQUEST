



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
