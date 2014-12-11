function produitToGenerique(data) {

	console.log("je produit un gen depuis jsongen.js côté client");
	console.log(data);
	var retour = {
		"noeuds": [
			{ "id": 1, "nom": "coucou" },
			{ "id": 2, "nom": "copains" },
			{ "id": 3, "nom": "amis" }
		],
		"relations": ["les"],
		"graphe":[
			{
				"noeud":1,
				"les":[2,3],
			}
		]
	};
	return retour;
}
