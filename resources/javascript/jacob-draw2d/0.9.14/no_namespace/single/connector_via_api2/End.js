End=function(){
ImageFigure.call(this,this.type+".png");
this.inputPort=null;
this.setDimension(50,50);
return this;
};
End.prototype=new ImageFigure;
End.prototype.type="End";
End.prototype.setWorkflow=function(_2d24){
ImageFigure.prototype.setWorkflow.call(this,_2d24);
if(_2d24!=null&&this.inputPort==null){
this.inputPort=new InputPort();
this.inputPort.setWorkflow(_2d24);
this.inputPort.setBackgroundColor(new Color(115,115,245));
this.inputPort.setColor(null);
this.inputPort.setName("input");
this.addPort(this.inputPort,0,this.height/2);
}
};
