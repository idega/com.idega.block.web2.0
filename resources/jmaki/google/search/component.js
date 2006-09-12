
// Create a search control
var searchControl = new GSearchControl();

// Add in a full set of searchers
var localSearch = new GlocalSearch();
searchControl.addSearcher(localSearch);
searchControl.addSearcher(new GwebSearch());
searchControl.addSearcher(new GvideoSearch());
searchControl.addSearcher(new GblogSearch());

// Set the Local Search center point
localSearch.setCenterPoint(widget.args.centerPoint);

// Tell the searcher to draw itself and tell it where to attach
searchControl.draw(document.getElementById(widget.uuid));

// Execute an inital search
searchControl.execute(widget.args.defaultSearch);