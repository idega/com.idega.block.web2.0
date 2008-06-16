 window.addEvent('domready', function() {
	// Create an interactive Canvas
	//
	var workflow  = new draw2d.Workflow("workflow");
	
	// Add an simple annotation to the canvas
	//
	var annotation = new draw2d.Annotation("NOTE: Drag&Drop the red port to any blue port to create a connection with arrow decoration.");
	annotation.setDimension(300,70);
	workflow.addFigure(annotation,100,200);
	
	// Add a simple PropertyDialog to the Canvas
	// This will display the properties of the current select object
	var dialog = new draw2d.VectorPropertyWindow();
	workflow.showDialog(dialog,400,10);
	
	// Add the Tool Window to the screen
	var w = new draw2d.GUIPalette();
	workflow.setToolWindow(w);
	// move the tool palette 
	w.setPosition(20,140);
	
	var menu = new draw2d.FlowMenu(workflow);
  	workflow.addSelectionListener(menu);
  	workflow.setEnableSmoothFigureHandling(true);
  	 
	
	// Add the start,end,connector to the canvas
	//
	var startObj = new draw2d.Start();
	workflow.addFigure(startObj, 450,350);
	
	var task  = new draw2d.Task();
	workflow.addFigure(task,450,450);
	
	var endObj   = new draw2d.End();
	workflow.addFigure(endObj,450,550);
	
	//todo make the label editable
	var a = new draw2d.LabelConnection();
	a.setRouter(new draw2d.ManhattanConnectionRouter());
	a.setSource(startObj.getPort("output"));
	a.setTarget(task.getPort("input"));
	//a.setTargetDecorator(new draw2d.BranchConnectionDecorator());
	//a.setSourceDecorator(new draw2d.CrossConnectionDecorator());
	workflow.addFigure(a);
	
	var b = new draw2d.LabelConnection();
	b.setRouter(new draw2d.ManhattanConnectionRouter());
	b.setSource(task.getPort("output"));
	b.setTarget(endObj.getPort("input"));
	//b.setTargetDecorator(new draw2d.BranchConnectionDecorator());
	//b.setSourceDecorator(new draw2d.CrossConnectionDecorator());
	workflow.addFigure(b);
	
	/*
	var c = new draw2d.Connection();
	c.setRouter(new draw2d.NullConnectionRouter());
	c.setSource(startObj.getPort("output"));
	c.setTarget(endObj2.getPort("input"));
	c.setTargetDecorator(new draw2d.PolygonConnectionDecorator());
	c.setSourceDecorator(new draw2d.CrossConnectionDecorator());
	workflow.addFigure(c);
	*/
	
	// Don't forget to register the CommandStackEventListener if you want to receive events ;-)
	workflow.getCommandStack().addCommandStackEventListener(new draw2d.MyCommandListener());
	
 });
