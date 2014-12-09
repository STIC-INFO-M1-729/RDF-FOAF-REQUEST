var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser());
var SparqlClient = require('sparql-client');
var endpoint = 'http://dbpedia.org/sparql';

var EventEmitter = require('events').EventEmitter;
var termine = new EventEmitter();

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

//Requête GET : on affiche le formulaire
app.get('/', function (req, res) {
  res.send(form);
});

function construireRequete(options,recherche) {
	var query = "" 
	+ "SELECT DISTINCT ?slabel ?rlabel ?olabel ?r1label ?o1label ?r2label ?o2label WHERE {"
  + "?s ?r ?o. "
  + "?o ?r1 ?o1. "
  + "?o1 ?r2 ?o2. "
  + "?s rdfs:label \"" + recherche + "\"@en. "
  + "?s rdfs:label ?slabel. "
  + "?r rdfs:label ?rlabel. "
  + "?o rdfs:label ?olabel. "
  + "?r1 rdfs:label ?r1label. "
  + "?o1 rdfs:label ?o1label. "
  + "?r2 rdfs:label ?r2label. "
  + "?o2 rdfs:label ?o2label. "
  + "?o1 rdf:type foaf:Person. "
  + "?o2 rdf:type foaf:Person. "
  + "FILTER(lang(?slabel) = 'en'). "
  + "FILTER(lang(?rlabel) = 'en'). "
  + "FILTER(lang(?olabel) = 'en'). "
  + "FILTER(lang(?r1label) = 'en'). "
  + "FILTER(lang(?o1label) = 'en'). "
  + "FILTER(lang(?r2label) = 'en'). "
  + "FILTER(lang(?o2label) = 'en'). "
	+ "} LIMIT 10";
}

function effectuerRequete(requete) {
	var client = new SparqlClient(endpoint);
	client.query(requete).execute(function(error, results) {
		retour = JSON.stringify(results);
	});
}

//Requête POST : Construire et exécuter la requête, afficher les résultats puis afficher le formulaire
app.post('/', function (req, res) {

	var client = new SparqlClient(endpoint);
	var query = construireRequete(req.body.options, req.body.recherche);

	effectuerRequete(query);

	termine.on('finit',function(message) { 
		displayResult = message;
		/*displayResult = '<table><tr><th>s</th><th>---</th><th>r</th><th>---</th><th>o</th><th>---</th><th>r1</th><th>---</th><th>o1</th><th>---</th><th>r2</th><th>---</th><th>o2</th></tr>';
		resultat = JSON.parse(message);
		resultat.forEach(function(entry) {
				displayResult += '<tr><td>' + entry.slabel.value + '</td><td>&nbsp;|&nbsp;</td>';
				displayResult += '<td>' + entry.rlabel.value + '</td><td>&nbsp;|&nbsp;</td>';
				displayResult += '<td>' + entry.olabel.value + '</td><td>&nbsp;|&nbsp;</td>';
				displayResult += '<td>' + entry.r1label.value + '</td><td>&nbsp;|&nbsp;</td>';
				displayResult += '<td>' + entry.o1label.value + '</td><td>&nbsp;|&nbsp;</td>';
				displayResult += '<td>' + entry.r2label.value + '</td><td>&nbsp;|&nbsp;</td>';
				displayResult += '<td>' + entry.o2label.value + '</td></tr>';*/
		});
		/*displayResult += '</table>';*/
		res.send('<div id="resultat">' + displayResult + '</div>' + form); 

	});
});


//Démarrage du serveur
var server = app.listen(8090, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});

