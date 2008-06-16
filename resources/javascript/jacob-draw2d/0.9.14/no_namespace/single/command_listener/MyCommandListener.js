MyCommandListener=function(){
CommandStackEventListener.call(this);
};
MyCommandListener.prototype=new CommandStackEventListener;
MyCommandListener.prototype.type="MyCommandListener";
MyCommandListener.prototype.stackChanged=function(event){
var _3e4b=document.getElementById("log");
var log=document.createElement("div");
if(event.isPostChangeEvent()){
log.innerHTML="POST:";
}else{
log.innerHTML="PRE:";
}
var _3e4d=event.getDetails();
if(0!=(_3e4d&(CommandStack.PRE_EXECUTE|CommandStack.POST_EXECUTE))){
log.innerHTML=log.innerHTML+" EXECUTE";
}else{
if(0!=(_3e4d&(CommandStack.PRE_UNDO|CommandStack.POST_UNDO))){
log.innerHTML=log.innerHTML+" UNDO";
}else{
if(0!=(_3e4d&(CommandStack.PRE_REDO|CommandStack.POST_REDO))){
log.innerHTML=log.innerHTML+" REDO";
}
}
}
var _3e4e=event.getCommand();
if(_3e4e instanceof CommandAdd){
log.innerHTML=log.innerHTML+" => ADD Element";
}else{
if(_3e4e instanceof CommandConnect){
log.innerHTML=log.innerHTML+" => Connect two Ports";
}else{
if(_3e4e instanceof CommandDelete){
log.innerHTML=log.innerHTML+" => Delete Element";
}else{
if(_3e4e instanceof CommandMove){
log.innerHTML=log.innerHTML+" => Moving Element";
}else{
if(_3e4e instanceof CommandResize){
log.innerHTML=log.innerHTML+" => Resize Element";
}
}
}
}
}
_3e4b.appendChild(log);
};
