shape.uml.Actor=function(name){
VectorFigure.call(this);
this.setName(name);
this.setDimension(50,90);
};
shape.uml.Actor.prototype=new VectorFigure;
shape.uml.Actor.prototype.type="shape.uml.Actor";
shape.uml.Actor.prototype.setName=function(name){
this.label.innerHTML=name;
};
shape.uml.Actor.prototype.setWorkflow=function(_3e2a){
VectorFigure.prototype.setWorkflow.call(this,_3e2a);
if(_3e2a!=null&&this.portRight==null){
this.portRight=new Port();
this.portRight.setWorkflow(_3e2a);
this.addPort(this.portRight,this.width,this.height/2);
this.portLeft=new Port();
this.portLeft.setWorkflow(_3e2a);
this.addPort(this.portLeft,0,this.height/2);
}
};
shape.uml.Actor.prototype.createHTMLElement=function(){
var item=Figure.prototype.createHTMLElement.call(this);
this.label=document.createElement("div");
this.label.style.width="100%";
this.label.style.height="20px";
this.label.style.position="absolute";
this.label.style.textAlign="center";
this.label.style.top="0px";
this.label.style.left="0px";
this.label.style.fontSize="8pt";
return item;
};
shape.uml.Actor.prototype.setDimension=function(w,h){
VectorFigure.prototype.setDimension.call(this,w,h);
if(this.portRight!=null){
this.portRight.setPosition(this.width,this.height/2);
this.portLeft.setPosition(0,this.height/2);
}
};
shape.uml.Actor.prototype.paint=function(){
VectorFigure.prototype.paint.call(this);
var _3e2e=this.getWidth()/2;
var _3e2f=this.getWidth()/4;
var _3e30=this.getHeight()/2;
var _3e31=parseInt(this.label.style.height);
var _3e32=this.getWidth()*0.2;
var _3e33=this.getHeight()*0.1;
this.graphics.drawOval(_3e2e-_3e32/2,0,_3e32,_3e33);
this.graphics.drawLine(_3e2e,_3e33,_3e2e,_3e30);
this.graphics.drawLine(_3e2f,_3e33*2,this.getWidth()-_3e2f,_3e33*2);
this.graphics.drawLine(_3e2e,_3e30,_3e2f,this.getHeight()-_3e31);
this.graphics.drawLine(_3e2e,_3e30,this.getWidth()-_3e2f,this.getHeight()-_3e31);
this.graphics.paint();
this.label.style.top=(this.getHeight()-_3e31)+"px";
this.html.appendChild(this.label);
};
