Searcher = function() {};

Searcher.prototype.effectuerRecherche = function(recherche) {
    
    var jsonProduit = [ 
        {"slabel":recherche, "rlabel":"les", "olabel":"copains"}, 
        {"slabel":"coucou", "rlabel":"les", "olabel":"amis"} 
    ];
    
    return jsonProduit;
};

exports.Searcher = Searcher;