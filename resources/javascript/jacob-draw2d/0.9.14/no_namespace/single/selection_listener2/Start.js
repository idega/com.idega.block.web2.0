Start=function(){
ImageFigure.call(this,this.type+".png");
this.outputPort=null;
this.setDimension(50,50);
};
Start.prototype=new ImageFigure;
Start.prototype.type="Start";
Start.prototype.setWorkflow=function(_2d16){
ImageFigure.prototype.setWorkflow.call(this,_2d16);
if(_2d16!=null&&this.outputPort==null){
this.outputPort1=new OutputPort();
this.outputPort1.setWorkflow(_2d16);
this.outputPort1.setMaxFanOut(4);
this.outputPort1.setBackgroundColor(new Color(245,115,115));
this.outputPort1.setName("output1");
this.addPort(this.outputPort1,this.width,this.height/2);
this.outputPort2=new OutputPort();
this.outputPort2.setWorkflow(_2d16);
this.outputPort2.setMaxFanOut(4);
this.outputPort2.setBackgroundColor(new Color(245,115,115));
this.outputPort2.setName("output2");
this.addPort(this.outputPort2,this.width/2,0);
this.outputPort3=new OutputPort();
this.outputPort3.setWorkflow(_2d16);
this.outputPort3.setMaxFanOut(4);
this.outputPort3.setBackgroundColor(new Color(245,115,115));
this.outputPort3.setName("output3");
this.addPort(this.outputPort3,this.width/2,this.height);
this.outputPort4=new OutputPort();
this.outputPort4.setWorkflow(_2d16);
this.outputPort4.setMaxFanOut(4);
this.outputPort4.setBackgroundColor(new Color(245,115,115));
this.outputPort4.setName("output4");
this.addPort(this.outputPort4,0,this.height/2);
}
};
