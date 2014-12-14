/**
 * Created by zorg on 14/12/14.
 */

//Import for SparqlClient
var SparqlClient = require('sparql-client');
var endpoint = 'http://dbpedia.org/sparql';


Array.prototype.unique = function ()
{
    var n = {}, r = [];
    for (var i = 0; i < this.length; i++)
    {
        if (!n[this[i]])
        {
            n[this[i]] = true;
            r.push(this[i]);
        }
    }
    return r;
}

function trouverType(listOfNodes) {
    var listOfTypes = {};
    listOfNodes.forEach(function (entry) {
        console.log(entry);
        listOfTypes[entry] = "T " + entry;
    });
    console.log("je vais émettre le signal");
}

function oneLineType(subject) {
    return "UNION { <" + subject + "> rdf:type ?type ; rdfs:label ?slabel. " +
            "?type rdfs:label ?typelabel . " +
            "FILTER(lang(?typelabel) = 'en'). " +
            "FILTER(lang(?slabel) = 'en'). " +
        "} ";
}

module.exports = function effectuerRecherche(recherche, termine) {

    var client = new SparqlClient(endpoint);

    var requete = "SELECT DISTINCT * " +
            "WHERE { {} UNION {" +
            "?s ?r ?o ; rdfs:label \"Barack Obama\"@en, ?slabel . " +
            "?o ?r1 ?o1 ; rdfs:label ?olabel . " +
            "?o1 ?r2 ?o2 ; rdfs:label ?o1label . " +
            "?o2 rdfs:label ?o2label .  " +
            "?r rdfs:label ?rlabel .  " +
            "?r1 rdfs:label ?r1label . " +
            "?r2 rdfs:label ?r2label . " +
            "FILTER(lang(?slabel) = 'en'). " +
            "FILTER(lang(?rlabel) = 'en'). " +
            "FILTER(lang(?olabel) = 'en'). " +
            "FILTER(lang(?r1label) = 'en'). " +
            "FILTER(lang(?o1label) = 'en'). " +
            "FILTER(lang(?r2label) = 'en'). " +
            "FILTER(lang(?o2label) = 'en'). " +
            "} " +
            "} LIMIT 3";
    //console.log(requete);
    console.log("requete définie");

    client.query(requete).execute(function (error, results) {
        console.log("requete exécutée");
        //console.log(results.results.bindings);
        var jsonProduit = [];
        if (error) {
            jsonProduit = [
                {slabel: "error", stype: "error", rlabel: "invalid", olabel: "request", otype: "error"}
            ];
            return jsonProduit;
        }
        var listOfNodes = [];
        results.results.bindings.forEach(function (entry) {
            listOfNodes.push(entry.s.value);
            listOfNodes.push(entry.o.value);
            listOfNodes.push(entry.o1.value);
            listOfNodes.push(entry.o2.value);
        });

        listOfNodes = listOfNodes.unique();

        var requeteTypes = "SELECT * WHERE { {} ";
        listOfNodes.forEach(function(entry) {
           requeteTypes += oneLineType(entry); 
        });
        requeteTypes += "}";
        
        console.log(requeteTypes);
        
        client.query(requeteTypes).execute(function (error, resTypes) {
            
            console.log(resTypes.results.bindings);
            var listOfTypes = {};
            
            resTypes.results.bindings.forEach( function(entry) {
                if (!listOfTypes[entry.slabel.value]) {
                    listOfTypes[entry.slabel.value] = entry.typelabel.value;
                }
            });
            
            results.results.bindings.forEach(function (entry) {
                var ligne1 = {
                    slabel: entry.slabel.value,
                    stype: listOfTypes[entry.slabel.value],
                    rlabel: entry.rlabel.value,
                    olabel: entry.olabel.value,
                    otype: listOfTypes[entry.olabel.value]

                };
                var ligne2 = {
                    slabel: entry.olabel.value,
                    stype: listOfTypes[entry.olabel.value],
                    rlabel: entry.r1label.value,
                    olabel: entry.o1label.value,
                    otype: listOfTypes[entry.o1label.value]
                };
                var ligne3 = {
                    slabel: entry.o1label.value,
                    stype: listOfTypes[entry.o1label.value],
                    rlabel: entry.r2label.value,
                    olabel: entry.o2label.value,
                    otype: listOfTypes[entry.o2label.value]
                };
                jsonProduit.push(ligne1);
                jsonProduit.push(ligne2);
                jsonProduit.push(ligne3);

            });
            termine.emit('finit', JSON.stringify(jsonProduit));
        });

    });



};
