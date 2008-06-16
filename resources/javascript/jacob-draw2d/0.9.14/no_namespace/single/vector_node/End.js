End=function(){
Oval.call(this);
this.inputPort=null;
this.setDimension(50,50);
this.setColor(new Color(128,128,255));
this.setLineWidth(2);
};
End.prototype=new Oval;
End.prototype.type="End";
End.prototype.setWorkflow=function(_40a3){
Oval.prototype.setWorkflow.call(this,_40a3);
if(this.workflow!=null&&this.inputPort==null){
this.inputPort=new InputPort();
this.inputPort.setWorkflow(_40a3);
this.inputPort.setBackgroundColor(new Color(115,115,245));
this.addPort(this.inputPort,0,this.height/2);
}
};
End.prototype.setDimension=function(w,h){
Oval.prototype.setDimension.call(this,w,h);
if(this.inputPort!=null){
this.inputPort.setPosition(0,this.height/2);
}
};
