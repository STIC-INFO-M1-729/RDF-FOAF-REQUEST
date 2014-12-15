//Construire requete :
module.exports = function construireRequete(options, recherche) {

  var query = "SELECT DISTINCT ?slabel ?rlabel ?olabel ?r1label ?o1label ?r2label ?o2label FROM <http://dbpedia.org> WHERE { {} ";
  var optQuery = "";

  //Construct with Option
  if(typeof options !== 'undefined'){

    for(var attributename in options){
            if(attributename !== 'limitQuery'){
                optQuery += "UNION" + block(options[attributename],recherche);
            }
        }
  }

  if(optQuery == ""){

    optQuery += "UNION" + block("?r",recherche);
  }


  query = query + optQuery +  "} LIMIT " + options.limitQuery;
  return query;
};

//Création d'une recherche avec une relation donnée
function block(relation,recherche) {
    var askedLabel = "";

	return "{" +
		// ----------
		"?s " + relation + " ?o. " +
		"?o ?r1 ?o1. " +
		"?o1 ?r2 ?o2. " +
		"?o1 ?r2 ?o2. " +
		"?s rdfs:label \""+ recherche +"\"@en." +
 		"?s rdfs:label ?slabel. " +
 		relation + " rdfs:label ?rlabel. " +
  		"?o rdfs:label ?olabel. " +
  		"?r1 rdfs:label ?r1label. " +
  		"?o1 rdfs:label ?o1label. " +
  		"?r2 rdfs:label ?r2label. " +
  		"?o2 rdfs:label ?o2label. " +
  		"?o1 rdf:type foaf:Person. " +
  		"?o2 rdf:type foaf:Person. " +
  		"FILTER(lang(?slabel) = 'en'). " +
  		"FILTER(lang(?rlabel) = 'en'). " +
  		"FILTER(lang(?olabel) = 'en'). " +
  		"FILTER(lang(?r1label) = 'en'). " +
  		"FILTER(lang(?o1label) = 'en'). " +
  		"FILTER(lang(?r2label) = 'en'). " +
  		"FILTER(lang(?o2label) = 'en'). " +
		"}"
		+"UNION" +
		"{" +
        "?o1 ?r2 ?o2." +
        "?o ?r1 ?o1." +
        "?o" + relation +"?s." +
        "?o2 rdfs:label ?o2label." +
        "?r2 rdfs:label ?r2label." +
        "?o1 rdfs:label ?o1label." +
        "?r1 rdfs:label ?r1label." +
        "?o rdfs:label ?olabel." +
        "?r rdfs:label ?rlabel." +
        "?s rdfs:label ?slabel." +
        "?o2 rdfs:label \""+ recherche +"\"@en." +
        "FILTER(lang(?o2label) = 'en')." +
        "FILTER(lang(?r2label) = 'en')." +
        "FILTER(lang(?o1label) = 'en')." +
        "FILTER(lang(?r1label) = 'en')." +
        "FILTER(lang(?olabel) = 'en')." +
        "FILTER(lang(?rlabel) = 'en')." +
        "FILTER(lang(?slabel) = 'en')." +
  		"}";
}
