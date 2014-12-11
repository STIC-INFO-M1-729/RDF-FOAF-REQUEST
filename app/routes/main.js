module.exports = function(app) {

	console.log("fichier routes/main.js");

	app.get('/recherche', function(req,res) {
		console.log("Je vais faire une recherche, je produit un jsonp côté serveur");
		res.json([ {"slabel":"coucou", "rlabel":"les", "olabel":"copains"}, {"slabel":"coucou", "rlabel":"les", "olabel":"amis"} ]);
	});

	app.get('/home', function(req, res) {
		console.log("app get /home, côté serveur je lance le côté client");
		res.sendfile('./public/index.html');
	});

}
