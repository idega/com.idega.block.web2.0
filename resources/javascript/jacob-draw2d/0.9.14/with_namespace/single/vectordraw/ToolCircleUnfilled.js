draw2d.ToolCircleUnfilled=function(_4999){draw2d.ToolGeneric.call(this,_4999);};draw2d.ToolCircleUnfilled.prototype=new draw2d.ToolGeneric;draw2d.ToolCircleUnfilled.prototype.type="ToolCircleUnfilled";draw2d.ToolCircleUnfilled.prototype.execute=function(x,y){var _499c=new draw2d.Circle();_499c.setDimension(100,100);this.palette.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.palette.workflow,_499c,x,y));draw2d.ToolGeneric.prototype.execute.call(this,x,y);};