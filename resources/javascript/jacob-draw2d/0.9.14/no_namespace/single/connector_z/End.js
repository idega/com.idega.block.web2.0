End=function(){
ImageFigure.call(this,this.type+".png");
this.inputPort=null;
this.setDimension(50,50);
};
End.prototype=new ImageFigure;
End.prototype.type="End";
End.prototype.setWorkflow=function(_32a3){
ImageFigure.prototype.setWorkflow.call(this,_32a3);
if(_32a3!=null&&this.inputPort==null){
this.inputPort=new InputPort();
this.inputPort.setWorkflow(_32a3);
this.inputPort.setBackgroundColor(new Color(115,115,245));
this.inputPort.setColor(null);
this.addPort(this.inputPort,0,this.height/2);
}
};
