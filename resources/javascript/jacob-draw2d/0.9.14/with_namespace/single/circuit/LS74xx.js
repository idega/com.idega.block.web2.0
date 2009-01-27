draw2d.LS74xx=function(title){this.title=title;draw2d.Node.call(this);this.out1=null;this.out2=null;this.out3=null;this.out4=null;this.out5=null;this.out6=null;this.out7=null;this.out8=null;this.in1=null;this.in2=null;this.in3=null;this.in4=null;this.in5=null;this.in6=null;this.in7=null;this.in8=null;this.setColor(new draw2d.Color(255,128,255));this.setBackgroundColor(new draw2d.Color(245,245,255));this.setDimension(250,50);};draw2d.LS74xx.prototype=new draw2d.Node;draw2d.LS74xx.prototype.type="LS74xx";draw2d.LS74xx.prototype.createHTMLElement=function(){var item=draw2d.CompartmentFigure.prototype.createHTMLElement.call(this);this.label=document.createElement("div");this.label.style.position="absolute";this.label.style.left="0px";this.label.style.top="5px";this.label.style.width="100%";this.label.style.height=(this.getHeight()-10)+"px";this.label.style.font="normal 10px verdana";this.label.style.textAlign="center";this.textNode=document.createTextNode(this.title);this.label.appendChild(this.textNode);item.appendChild(this.label);this.slot=document.createElement("img");this.slot.src="slot.png";this.slot.style.position="absolute";this.slot.style.left="0px";this.slot.style.top=(this.getHeight()/2-7)+"px";item.appendChild(this.slot);return item;};draw2d.LS74xx.prototype.setWorkflow=function(_5319){draw2d.Node.prototype.setWorkflow.call(this,_5319);if(_5319!=null&&this.out1==null){var _531a=this.width/8;var dHalf=_531a/2;this.out1=new draw2d.OutputPort();this.out1.setWorkflow(_5319);this.addPort(this.out1,_531a*1-dHalf,this.height);this.out2=new draw2d.OutputPort();this.out2.setWorkflow(_5319);this.addPort(this.out2,_531a*2-dHalf,this.height);this.out3=new draw2d.OutputPort();this.out3.setWorkflow(_5319);this.addPort(this.out3,_531a*3-dHalf,this.height);this.out4=new draw2d.OutputPort();this.out4.setWorkflow(_5319);this.addPort(this.out4,_531a*4-dHalf,this.height);this.out5=new draw2d.OutputPort();this.out5.setWorkflow(_5319);this.addPort(this.out5,_531a*5-dHalf,this.height);this.out6=new draw2d.OutputPort();this.out6.setWorkflow(_5319);this.addPort(this.out6,_531a*6-dHalf,this.height);this.out7=new draw2d.OutputPort();this.out7.setWorkflow(_5319);this.addPort(this.out7,_531a*7-dHalf,this.height);this.out8=new draw2d.OutputPort();this.out8.setWorkflow(_5319);this.addPort(this.out8,_531a*8-dHalf,this.height);this.in1=new draw2d.InputPort();this.in1.setWorkflow(_5319);this.in1.setBackgroundColor(new draw2d.Color(255,128,128));this.addPort(this.in1,_531a*1-dHalf,0);this.in2=new draw2d.InputPort();this.in2.setWorkflow(_5319);this.in2.setBackgroundColor(new draw2d.Color(255,128,128));this.addPort(this.in2,_531a*2-dHalf,0);this.in3=new draw2d.InputPort();this.in3.setWorkflow(_5319);this.in3.setBackgroundColor(new draw2d.Color(255,128,128));this.addPort(this.in3,_531a*3-dHalf,0);this.in4=new draw2d.InputPort();this.in4.setWorkflow(_5319);this.in4.setBackgroundColor(new draw2d.Color(255,128,128));this.addPort(this.in4,_531a*4-dHalf,0);this.in5=new draw2d.InputPort();this.in5.setWorkflow(_5319);this.in5.setBackgroundColor(new draw2d.Color(255,128,128));this.addPort(this.in5,_531a*5-dHalf,0);this.in6=new draw2d.InputPort();this.in6.setWorkflow(_5319);this.in6.setBackgroundColor(new draw2d.Color(255,128,128));this.addPort(this.in6,_531a*6-dHalf,0);this.in7=new draw2d.InputPort();this.in7.setWorkflow(_5319);this.in7.setBackgroundColor(new draw2d.Color(255,128,128));this.addPort(this.in7,_531a*7-dHalf,0);this.in8=new draw2d.InputPort();this.in8.setWorkflow(_5319);this.in8.setBackgroundColor(new draw2d.Color(255,128,128));this.addPort(this.in8,_531a*8-dHalf,0);}};draw2d.LS74xx.prototype.setDimension=function(w,h){draw2d.Node.prototype.setDimension.call(this,w,h);if(this.label!=null){this.label.style.height=(this.getHeight()-10)+"px";this.slot.style.top=((this.getHeight()/2)-7)+"px";}if(this.out1!=null){var _531e=this.width/8;var dHalf=_531e/2;this.out1.setPosition(_531e*1-dHalf,this.height);this.out2.setPosition(_531e*2-dHalf,this.height);this.out3.setPosition(_531e*3-dHalf,this.height);this.out4.setPosition(_531e*4-dHalf,this.height);this.out5.setPosition(_531e*5-dHalf,this.height);this.out6.setPosition(_531e*6-dHalf,this.height);this.out7.setPosition(_531e*7-dHalf,this.height);this.out8.setPosition(_531e*8-dHalf,this.height);this.in1.setPosition(_531e*1-dHalf,0);this.in2.setPosition(_531e*2-dHalf,0);this.in3.setPosition(_531e*3-dHalf,0);this.in4.setPosition(_531e*4-dHalf,0);this.in5.setPosition(_531e*5-dHalf,0);this.in6.setPosition(_531e*6-dHalf,0);this.in7.setPosition(_531e*7-dHalf,0);this.in8.setPosition(_531e*8-dHalf,0);}};draw2d.LS74xx.prototype.onMouseEnter=function(){this.setColor(new draw2d.Color(255,0,255));};draw2d.LS74xx.prototype.onMouseLeave=function(){this.setColor(new draw2d.Color(255,128,255));};