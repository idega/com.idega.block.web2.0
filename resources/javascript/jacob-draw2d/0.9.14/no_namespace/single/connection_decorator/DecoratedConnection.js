DecoratedConnection=function(){
Connection.call(this);
this.setTargetDecorator(new ArrowConnectionDecorator());
this.setRouter(new FanConnectionRouter());
};
DecoratedConnection.prototype=new Connection();
DecoratedConnection.prototype.type="DecoratedConnection";
