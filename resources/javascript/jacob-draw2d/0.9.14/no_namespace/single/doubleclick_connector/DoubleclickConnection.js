DoubleclickConnection=function(){
Connection.call(this);
this.sourcePort=null;
this.targetPort=null;
this.lineSegments=new Array();
this.setColor(new Color(0,0,115));
this.setLineWidth(2);
this.setColor(new Color(128,255,128));
this.isHighlight=false;
};
DoubleclickConnection.prototype=new Connection();
DoubleclickConnection.prototype.onDoubleClick=function(){
this.isHighlight=!this.isHighlight;
if(this.isHighlight){
this.setLineWidth(5);
this.setColor(new Color(255,128,128));
}else{
this.setLineWidth(2);
this.setColor(new Color(128,255,128));
}
};
