var Scriptaculous={Version:"1.7.0",require:function(_30a3){
document.write("<script type=\"text/javascript\" src=\""+_30a3+"\"></script>");
},load:function(){
if((typeof Prototype=="undefined")||(typeof Element=="undefined")||(typeof Element.Methods=="undefined")||parseFloat(Prototype.Version.split(".")[0]+"."+Prototype.Version.split(".")[1])<1.5){
throw ("script.aculo.us requires the Prototype JavaScript framework >= 1.5.0");
}
$A(document.getElementsByTagName("script")).findAll(function(s){
return (s.src&&s.src.match(/scriptaculous\.js(\?.*)?$/));
}).each(function(s){
var path=s.src.replace(/scriptaculous\.js(\?.*)?$/,"");
var _30a7=s.src.match(/\?.*load=([a-z,]*)/);
(_30a7?_30a7[1]:"builder,effects,dragdrop,controls,slider").split(",").each(function(_30a8){
Scriptaculous.require(path+_30a8+".js");
});
});
}};
Scriptaculous.load();
