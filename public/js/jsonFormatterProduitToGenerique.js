Array.prototype.unique = function()
{
	var n = {},r=[];
	for(var i = 0; i < this.length; i++) 
	{
		if (!n[this[i]]) 
		{
			n[this[i]] = true; 
			r.push(this[i]); 
		}
	}
	return r;
}


function produitToGenerique(data) {

    var listOfNodes = [];
    var listOfRelations = [];
    var graph = [];
    
    data.forEach(function(entry) {
        listOfNodes.push(entry.slabel);
        listOfRelations.push(entry.rlabel);
        listOfNodes.push(entry.olabel);
    });
    
    listOfNodes = listOfNodes.unique();
    listOfRelations = listOfRelations.unique();
        
    listOfNodes.forEach(function(entry,index) {
        graph[index] = {
            noeud:index
        }
    });
    
    data.forEach(function(entry) {
        if (graph[listOfNodes.indexOf(entry.slabel)][entry.rlabel]) {
            graph[listOfNodes.indexOf(entry.slabel)][entry.rlabel]
                    .push(
                        listOfNodes.indexOf(entry.olabel)
                    );
        }
        else {
            graph[listOfNodes.indexOf(entry.slabel)][entry.rlabel] =
                    [ listOfNodes.indexOf(entry.olabel) ];
        }
    });
    
    var noeuds = [];
    listOfNodes.forEach(function(entry,index) {
        noeuds.push({id:index, nom:entry});
    });
    

    var retour = {
        "noeuds": noeuds ,
        "relations": listOfRelations,
        "graphe":graph 
    };
    
    return retour;
}
