//Import modéle Find
var models = require('../models/find_model.js');
var requete = models.Requete;

//Outil de visualisation JSON
var util = require('util');

//Import for SparqlClient
var SparqlClient = require('sparql-client');
var utilSparql = require('./sparql_request_formatteur.js');
var endpoint = 'http://dbpedia.org/sparql';

module.exports = function(app) {

    app.get('/deck/search/:search_id', function(req, res) {

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
        console.log('Call /decks ');
    });

};