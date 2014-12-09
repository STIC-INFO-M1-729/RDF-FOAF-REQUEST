var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser());
var SparqlClient = require('sparql-client');
var endpoint = 'http://dbpedia.org/sparql';

//Création d'une recherche avec une relation donnée
function block(relation,recherche) {
	var askedLabel = "";
	if (recherche != "") {
		askedLabel = "?s rdfs:label \"" + recherche + "\"@en. ";
	}
	return "{" +
		"?s " + relation + " ?o. " +
		askedLabel +
 		"?s rdfs:label ?slabel. " +
 		relation + " rdfs:label ?rlabel. " +
 		"?o rdfs:label ?olabel. " +
		"?o rdf:type foaf:Person. " +
		"FILTER(lang(?slabel) = 'en')." +
		"FILTER(lang(?rlabel) = 'en')." +
		"FILTER(lang(?olabel) = 'en')." +
		"}" +
		"UNION" +
		"{" +
		"?s " + relation + " ?o. " +
		askedLabel +
 		"?s rdfs:label ?slabel. " +
 		relation + " rdfs:label ?rlabel. " +
 		"?o rdfs:label ?olabel. " +
		"?s rdf:type foaf:Person. " +
		"FILTER(lang(?slabel) = 'en')." +
		"FILTER(lang(?rlabel) = 'en')." +
		"FILTER(lang(?olabel) = 'en')." +
		"}";
}

//Formulaire proposant les options possibles
var form = '<form method="post">' + 
				'<h2>Entrez un mot recherché (ou rien du tout si vous voulez centrer la recherche sur les relations)</h2>' +
				'<input type="text" name="recherche" /><br/>' + 

				'<h2>Oeuvre // Personne</h2>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/property/writer>" id="writer"/>' +
				'<label for="writer">Writer</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/property/cinematography>" id="cinematography"/>' +
				'<label for="cinematography">Cinematography</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/property/director>" id="director"/>' +
				'<label for="director">Director</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/property/music>" id="music"/>' +
				'<label for="music">Music</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/property/narrator>" id="narrator"/>' +
				'<label for="narrator">Narrator</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/property/starring>" id="starring"/>' +
				'<label for="starring">Starring</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/property/musicComposer>" id="musicComposer"/>' +
				'<label for="musicComposer">Music Composer</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/property/artist>" id="artist"/>' +
				'<label for="artist">Artist</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/property/author>" id="author"/>' +
				'<label for="author">Author</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/ontology/executiveProducer>" id="executiveProducer"/>' +
				'<label for="executiveProducer">Executive Producer</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/ontology/artist>" id="performer"/>' +
				'<label for="performer">Performer</label><br/>' +

				'<h2>Personne // Personne</h2>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/property/associatedActs>" id="associatedActs"/>' +
				'<label for="associatedActs">Associated Acts</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/ontology/associatedBand>" id="associatedBand"/>' +
				'<label for="associatedBand">Associated Band</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/ontology/associatedMusicalArtist>" id="associatedMusicalArtist"/>' +
				'<label for="associatedMusicalArtist">Associated Musical Artist</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/property/appointer>" id="appointer"/>' +
				'<label for="appointer">Appointer</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/property/nominator>" id="nominator"/>' +
				'<label for="nominator">Nominator</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/ontology/child>" id="child"/>' +
				'<label for="child">Child / Parent</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/property/influences>" id="influences"/>' +
				'<label for="influences">Influences / Influenced By</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/property/spouse>" id="spouse"/>' +
				'<label for="spouse">Spouse</label><br/>' +

				'<h2>Evenement // Personne</h2>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/property/candidate>" id="candidate"/>' +
				'<label for="candidate">Candidate</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/ontology/guest>" id="guest"/>' +
				'<label for="guest">Guest</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/property/opentheme>" id="opentheme"/>' +
				'<label for="opentheme">Opentheme</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/ontology/battle>" id="battle"/>' +
				'<label for="battle">Battle</label><br/>' +

				'<h2>Lieux // Personne</h2>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/property/leaderName>" id="leaderName"/>' +
				'<label for="leaderName">Leader Name</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/property/commander>" id="commander"/>' +
				'<label for="leaderName">commander</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/property/commanderInChief>" id="commanderInChief"/>' +
				'<label for="commanderInChief">Commander In Chief</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/ontology/birthPlace>" id="birthPlace"/>' +
				'<label for="birthPlace">Birth Place</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/ontology/restingPlace>" id="restingPlace"/>' +
				'<label for="restingPlace">Resting Place</label><br/>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/property/deathPlace>" id="deathPlace"/>' +
				'<label for="deathPlace">Death Place</label><br/>' +


				'<h2>Objet // Personne</h2>' +
				'<input type="checkbox" name="options" value="<http://dbpedia.org/property/endorsedBy>" id="endorsedBy"/>' +
				'<label for="endorsedBy">Endorsed By</label><br/>' +

				'<h2>Toutes les relations</h2>' +
				'<input type="checkbox" name="options" value="?r" id="all"/>' +
				'<label for="all">All</label><br/>' +
				'<input type="submit" />' + 
				'</form>';

//Construire requete :
function construireRequete(options, recherche) {
	var query = "SELECT DISTINCT ?slabel ?rlabel ?olabel FROM <http://dbpedia.org> WHERE { {} ";
	if (!Array.isArray(options)) { query += "UNION" + block(options,recherche);	 }
	else { 
		options.forEach(function(opt) {
			query += "UNION" + block(opt,recherche);	
		});
	}
	query += "} LIMIT 5";
	return query;
}

//Effectuer requete :
function effectuerRequete(requete) {
	var client = new SparqlClient(endpoint);
	var retour;
	client.query(requete).execute(function(error, results) {
		retour = JSON.stringify(results);
		console.log(retour);
	});
	console.log(retour);
	return retour;
}


//Requête GET : on affiche le formulaire
app.get('/', function (req, res) {
  res.send(form);
});

//Requête POST : Construire et exécuter la requête, afficher les résultats puis afficher le formulaire
app.post('/', function (req, res) {

	var client = new SparqlClient(endpoint);
	var query = construireRequete(req.body.options, req.body.recherche);
	console.log(query);

	var resultat = effectuerRequete(query);
	console.log(resultat);

	/*client.query(query).execute(function(error, results) {
			console.log("début exécution");
			console.log(error);
			console.log(results);
			if (results == null) { displayResult = "fail"; }
			else { var resultat = results.results.bindings; }			

			var resultatComplet = [];
			resultat.forEach(function(entry) {
					resultatComplet.push([entry.slabel.value,entry.rlabel.value,entry.olabel.value]);
					if (entry.slabel.value == req.body.recherche) {
						var tmpquery = construireRequete("?r", entry.olabel.value);
					}
					else {
						var tmpquery = construireRequete("?r", entry.slabel.value);
					}
					var tmpclient = new SparqlClient(endpoint);
					tmpclient.query(tmpquery).execute(function(tmperror, tmpresults) {
						console.log("nouvelle exécution");
						tmpresults.results.bindings.forEach(function(myEntry) {
							resultatComplet.push([myEntry.slabel.value,myEntry.rlabel.value,myEntry.olabel.value]);
						});
					});
				});

			console.log("fin exécution");
	});*/

	/*resultat.forEach(function(entry) {
		resultatComplet.push([entry.slabel.value,entry.rlabel.value,entry.olabel.value]);
		if (entry.slabel.value == req.body.recherche) {
			var tmpquery = construireRequete("?r", entry.olabel.value);
		}
		else {
			var tmpquery = construireRequete("?r", entry.slabel.value);
		}
		client.query(tmpquery).execute(function(tmperror, tmpresults) {
			console.log("nouveau résultat");
			tmpresults.results.bindings.forEach(function(myEntry) {
				resultatComplet.push([myEntry.slabel.value,myEntry.rlabel.value,myEntry.olabel.value]);
			});
		});
	});*/

	displayResult = '<table><tr><th>s</th><th>---</th><th>r</th><th>---</th><th>o</th></tr>'; //<th>---</th><th>jsonres</th>
	/*resultatComplet.forEach(function(entry) {
			displayResult += '<tr><td>' + entry[0] + '</td><td>&nbsp;|&nbsp;</td>';
			displayResult += '<td>' + entry[1] + '</td><td>&nbsp;|&nbsp;</td>';
			displayResult += '<td>' + entry[2] + '</td></tr>';//<td>&nbsp;|&nbsp;</td>';
	});*/
	displayResult += '</table>';

	res.send('Résultats de la requête <strong>' + req.body.recherche + '</strong>: <br/>' +
				displayResult + form);

});


//Démarrage du serveur
var server = app.listen(8090, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});

