function produitToGenerique(data) {

	var retour = {
		"noeuds": [
			{ "id": 1, "nom": "coucou" },
			{ "id": 2, "nom": "copains" },
			{ "id": 3, "nom": "amis" },
			{ "id": 4, "nom": "friends" }
		],
		"relations": ["les", "means"],
		"graphe":[
			{
				"noeud":1,
				"les":[2,3],
			},
			{
				"noeud":3,
				"means":[4],
			}
		]
	};
	return retour;
}
