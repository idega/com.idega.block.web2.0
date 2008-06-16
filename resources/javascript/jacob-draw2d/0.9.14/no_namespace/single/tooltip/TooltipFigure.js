TooltipFigure=function(){
Node.call(this);
this.setColor(new Color(255,128,255));
this.setBackgroundColor(new Color(255,150,255));
this.setDimension(50,50);
};
TooltipFigure.prototype=new Node;
TooltipFigure.prototype.type="TooltipFigure";
TooltipFigure.prototype.onMouseEnter=function(){
this.getWorkflow().showTooltip(new Tooltip("Juhu, I'm a tooltip"),true);
};
