Start=function(){
ImageFigure.call(this,this.type+".png");
this.outputPort1=null;
this.outputPort2=null;
this.setDimension(50,60);
};
Start.prototype=new ImageFigure;
Start.prototype.type="Start";
Start.prototype.setWorkflow=function(_4086){
ImageFigure.prototype.setWorkflow.call(this,_4086);
if(_4086!=null&&this.outputPort==null){
this.outputPort1=new OutputPort(new ImageFigure("port1.png"));
this.outputPort1.setMaxFanOut(1);
this.outputPort1.setWorkflow(_4086);
this.outputPort1.setDimension(10,10);
this.addPort(this.outputPort1,this.width,this.height/4);
this.outputPort2=new OutputPort(new ImageFigure("port2.png"));
this.outputPort2.setMaxFanOut(1);
this.outputPort2.setDimension(10,10);
this.outputPort2.setWorkflow(_4086);
this.addPort(this.outputPort2,this.width,this.height/4*3);
}
};
