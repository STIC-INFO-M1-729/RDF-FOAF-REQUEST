/**
 * Created by zorg on 09/12/14.
 */
var models = require('../models/find_model.js');
var requete = models.Requete;

//Outil de visualisation JSON
var util = require('util');

//Import for SparqlClient
var SparqlClient = require('sparql-client');
var utilSparql = require('./sparql_request_formatteur.js');
var endpoint = 'http://dbpedia.org/sparql';


module.exports = function(app) {

    app.get('/search/:search_id', function(req, res) {

		 //user choice
        var nameRech = req.params.search_id;
        var option = req.body.options;

        //Use client for sparql search
        var client = new SparqlClient(endpoint);

		var prefixeQuery = "PREFIX : <http://dbpedia.org/resource/>";
		prefixeQuery = prefixeQuery + "PREFIX foaf: <http://xmlns.com/foaf/0.1/> ";
		prefixeQuery = prefixeQuery + "PREFIX dbpedia: <http://dbpedia.org/> ";
		prefixeQuery = prefixeQuery + "PREFIX dbpedia2: <http://dbpedia.org/property/> ";
		prefixeQuery = prefixeQuery + "PREFIX dbpedia3: <http://dbpedia.org/ontology/> ";
		var selectQuery = "SELECT DISTINCT ";
		//selectQuery = selectQuery +"?person ?birth ?name ";
		selectQuery = selectQuery +"?person ?name ?birth ?birthplace ?descro ";
		var coeurQuery = "WHERE {";
		coeurQuery = coeurQuery + "?person dc:description ?descro.";
		coeurQuery = coeurQuery + "?person dbpedia2:placeOfBirth ?birthplace.";
        coeurQuery = coeurQuery + "?person dbpedia3:birthDate ?birth.";
		coeurQuery = coeurQuery + "?person foaf:name ?name.";
		coeurQuery = coeurQuery + "FILTER regex(?name, \"" + nameRech + "\")}";
		var limitQuery = "LIMIT 100";
		var myQuery = prefixeQuery + selectQuery + coeurQuery + limitQuery;

		// -- DEBUG --
		//console.log("Query to " + endpoint);
		//console.log("Query: " + myQuery);


        ////Before save new params search on mongoDB (Find if exist --> Update / also --> create new)
        //var condition = { search: nameRech };
        //var update = {
        //    search          : nameRech,     // mandatory
        //    searchOptions   : option
        //};
        //requete.findOneAndUpdate(condition, update, {upsert:true}, function(err, contact) {
        //    if (err || contact === undefined) {
        //        console.log(err);
        //    }
        //    console.log( 'Requetes ' + requete.search + ' created.');
        //});


        //--DEBUG--
        //console.log('Searching for : ' + nameRech + ' -- With option : ' + option);

        //Execute Request on Saprql end-point
        client.query(myQuery)
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
                //console.log('Le resultat Brut : ');
                console.log(JSON.stringify(results));
			    //Binding results
			    //Suppression doublons dans les URI


                res.json(results.results.bindings);

			}
	    });
     });

     app.get('/search', function(req, res){

        console.log('Call /searchs --> return filter for search person value');

        //Get alls previous request and parse
        //use mongoose to get all previous request in the database
        requete.find(function(err, request) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            //console.log(request);
            res.json(request); // return all users in JSON format
        });

    });
};