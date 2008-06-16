End=function(){
ImageFigure.call(this,this.type+".png");
this.inputPort=null;
this.setDimension(50,50);
};
End.prototype=new ImageFigure;
End.prototype.type="End";
End.prototype.setWorkflow=function(_2e4f){
ImageFigure.prototype.setWorkflow.call(this,_2e4f);
if(_2e4f!=null&&this.inputPort==null){
this.inputPort=new InputPort();
this.inputPort.setWorkflow(_2e4f);
this.inputPort.setBackgroundColor(new Color(115,115,245));
this.inputPort.setColor(null);
this.addPort(this.inputPort,0,this.height/2);
}
};
