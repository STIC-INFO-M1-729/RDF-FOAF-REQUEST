function generiqueToGraph(data) {

	console.log("je produit un graph depuis jsongraph.js côté client");
	console.log(data);
	var retour = {
    "nodes": [
        {
            "group": 0,
            "name": "coucou"
        },
        {
            "group": 0,
            "name": "copains"
        },
        {
            "group": 0,
            "name": "amis"
        }
    ],
    "links": [
        {
            "name": [
                "les"
            ],
            "source": {
                "group": 0,
                "name": "coucou"
            },
            "target": {
                 "group": 0,
                 "name": "amis"
            },
            "value": 2
        },
        {
            "name": [
                "les"
            ],
            "source": {
                 "group": 0,
                 "name": "coucou"
            },
            "target": {
                  "group": 0,
                  "name": "amis"
            },
            "value": 2
        }
    ],
    "relationsUsed": [
        "les"
    ]
};
	return retour;
}
