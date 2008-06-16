/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

TooltipFigure=function(){Node.call(this);this.setColor(new Color(255,128,255));this.setBackgroundColor(new Color(255,150,255));this.setDimension(50,50);};TooltipFigure.prototype=new Node;TooltipFigure.prototype.type="TooltipFigure";TooltipFigure.prototype.onMouseEnter=function(){this.getWorkflow().showTooltip(new Tooltip("Juhu, I'm a tooltip"),true);};