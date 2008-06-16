/* This notice must be untouched at all times.

Open-jACOB Draw2D
The latest version is available at
http://www.openjacob.org

Copyright (c) 2006 Andreas Herz. All rights reserved.
Created 5. 11. 2006 by Andreas Herz (Web: http://www.freegroup.de )

LICENSE: LGPL

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License (LGPL) as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA,
or see http://www.gnu.org/copyleft/lesser.html
*/

/**
 * 
 * @version 0.9.14
 * @author Andreas Herz
 * @constructor
 */
draw2d.ColorDialog=function()
{
  /** @private **/
  this.maxValue={'h':'359','s':'100','v':'100'};
  /** @private **/
  this.HSV={0:359,1:100,2:100};
  /** @private **/
  this.slideHSV={0:359,1:100,2:100};

  /** @private **/
  this.SVHeight=165;
  /** @private **/
  this.wSV=162;
  /** @private **/
  this.wH=162;

  draw2d.Dialog.call(this,"Color Chooser");

  this.loadSV();
  this.setColor(new  draw2d.Color(255,0,0));

  this.setDimension(219,244);
}

draw2d.ColorDialog.prototype = new draw2d.Dialog;
  /** @private **/
draw2d.ColorDialog.prototype.type="ColorDialog";


/**
 * @private
 **/
draw2d.ColorDialog.prototype.createHTMLElement=function()
{
  var oThis = this;
  var item = draw2d.Dialog.prototype.createHTMLElement.call(this);

  this.outerDiv = document.createElement("div");
  this.outerDiv.id="plugin";
  this.outerDiv.style.top ="15px";
  this.outerDiv.style.left ="0px";
  this.outerDiv.style.width="201px";
  this.outerDiv.style.position="absolute";
  this.outerDiv.style.padding="9px";
  this.outerDiv.display="block";
  this.outerDiv.style.background="#0d0d0d";

  this.plugHEX = document.createElement("div");
  this.plugHEX.id = "plugHEX";
  this.plugHEX.innerHTML="F1FFCC";
  this.plugHEX.style.color="white";
  this.plugHEX.style.font="normal 10px verdana";
  this.outerDiv.appendChild(this.plugHEX);


  this.SV = document.createElement("div");
  this.SV.onmousedown=function(event){oThis.mouseDownSV(oThis.SVslide,event);};
  this.SV.id ="SV";
  this.SV.style.cursor="crosshair";
  this.SV.style.background="#FF0000 url(SatVal.png)";
  this.SV.style.position="absolute";
  this.SV.style.height="166px";
  this.SV.style.width="167px";
  this.SV.style.marginRight="10px";
  this.SV.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='SatVal.png', sizingMethod='scale')";
  this.SV.style['float']="left";
  this.outerDiv.appendChild(this.SV);

  this.SVslide = document.createElement("div");
  this.SVslide.onmousedown=function(event){oThis.mouseDownSV(event)};
  this.SVslide.style.top = "40px";
  this.SVslide.style.left= "40px";
  this.SVslide.style.position="absolute";
  this.SVslide.style.cursor="crosshair";
  this.SVslide.style.background="url(slide.gif)";
  this.SVslide.style.height="9px";
  this.SVslide.style.width="9px";
  this.SVslide.style.lineHeight="1px";
  this.outerDiv.appendChild(this.SVslide);

  this.H = document.createElement("form");
  this.H.id="H";
  this.H.onmousedown=function(event){oThis.mouseDownH(event)};
  this.H.style.border="1px solid #000000";
  this.H.style.cursor="crosshair";
  this.H.style.position="absolute";
  this.H.style.width="19px";
  this.H.style.top="28px";
  this.H.style.left="191px";
  this.outerDiv.appendChild(this.H);

  this.Hslide = document.createElement("div");
  this.Hslide.style.top = "-7px";
  this.Hslide.style.left= "-8px";
  this.Hslide.style.background= "url(slideHue.gif)";
  this.Hslide.style.height= "5px";
  this.Hslide.style.width = "33px";
  this.Hslide.style.position= "absolute";
  this.Hslide.style.lineHeight= "1px";
  this.H.appendChild(this.Hslide);

  this.Hmodel = document.createElement("div");
  this.Hmodel.style.height= "1px";
  this.Hmodel.style.width= "19px";
  this.Hmodel.style.lineHeight= "1px";
  this.Hmodel.style.margin= "0px";
  this.Hmodel.style.padding= "0px";
  this.Hmodel.style.fontSize= "1px";
  this.H.appendChild(this.Hmodel);

  item.appendChild(this.outerDiv);

  return item;
}

/**
 *
 **/
draw2d.ColorDialog.prototype.onOk=function()
{
  draw2d.Dialog.prototype.onOk.call(this);
}



draw2d.browser=function(v) { return(Math.max(navigator.userAgent.toLowerCase().indexOf(v),0)); }

/**
 * @private
 **/
draw2d.ColorDialog.prototype.showColor=function(c)
{
  this.plugHEX.style.background="#"+c;
  this.plugHEX.innerHTML=c;
}

/**
 * @private
 **/
draw2d.ColorDialog.prototype.getSelectedColor=function()
{
  var rgb = this.hex2rgb(this.plugHEX.innerHTML);
  return new  draw2d.Color(rgb[0],rgb[1],rgb[2]);
}

/**
 * @private
 **/
draw2d.ColorDialog.prototype.setColor=function(/*:draw2d.Color*/ color)
{
  if(color==null)
    color = new  draw2d.Color(100,100,100);
  var hex = this.rgb2hex(Array(color.getRed(),color.getGreen(),color.getBlue()));
  this.updateH(hex);
}

/**
 * @private
 **/
draw2d.ColorDialog.prototype.XY=function(e,v)
{ 
  var z=draw2d.browser('msie')?Array(event.clientX+document.body.scrollLeft,event.clientY+document.body.scrollTop):Array(e.pageX,e.pageY); 
  return z[v];
}

/**
 * @private
 **/
draw2d.ColorDialog.prototype.mkHSV=function(a,b,c) 
{
    return(Math.min(a,Math.max(0,Math.ceil((parseInt(c)/b)*a)))); 
}

/**
 * @private
 **/
draw2d.ColorDialog.prototype.ckHSV=function(a,b)
{
  if(a>=0 && a<=b)
    return(a); 
  else if(a>b) 
    return(b); 
  else if(a<0)
    return('-'+oo);
}

/**
 * @private
 **/
draw2d.ColorDialog.prototype.mouseDownH=function(e)
{
    this.slideHSV[0]=this.HSV[0];
    var oThis = this;
    this.H.onmousemove=function(e){oThis.dragH(e)};
    this.H.onmouseup=function(e){oThis.H.onmousemove=''; oThis.H.onmouseup='';};
    this.dragH(e);
}

/**
 * @private
 **/
draw2d.ColorDialog.prototype.dragH=function(e)
{
    var y=this.XY(e,1)-this.getY()-40;
    this.Hslide.style.top=(this.ckHSV(y,this.wH)-5)+'px'; 
    this.slideHSV[0]=this.mkHSV(359,this.wH,this.Hslide.style.top);
    this.updateSV();
    this.showColor(this.commit());
    this.SV.style.backgroundColor='#'+this.hsv2hex(Array(this.HSV[0],100,100));
}

/**
 * @private
 **/
draw2d.ColorDialog.prototype.mouseDownSV=function(o,e)
{
    this.slideHSV[0]=this.HSV[0];
    var oThis = this;
    function reset()
    {
       oThis.SV.onmousemove=''; 
       oThis.SV.onmouseup='';
       oThis.SVslide.onmousemove=''; 
       oThis.SVslide.onmouseup=''; 
    };
    this.SV.onmousemove=function(e){oThis.dragSV(e)};
    this.SV.onmouseup=reset;
    this.SVslide.onmousemove=function(e){oThis.dragSV(e)};
    this.SVslide.onmouseup=reset;

    this.dragSV(e);
}

/**
 * @private
 **/
draw2d.ColorDialog.prototype.dragSV=function( e)
{
    var x=this.XY(e,0)-this.getX()-1;
    var y=this.XY(e,1)-this.getY()-20;
    this.SVslide.style.left=this.ckHSV(x,this.wSV)+'px'; 
    this.SVslide.style.top=this.ckHSV(y,this.wSV)+'px';
    this.slideHSV[1]=this.mkHSV(100,this.wSV,this.SVslide.style.left); 
    this.slideHSV[2]=100-this.mkHSV(100,this.wSV,this.SVslide.style.top); 
    this.updateSV();
}


/**
 * @private
 **/
draw2d.ColorDialog.prototype.commit=function()
{
  var r='hsv';
  var z={};
  var j='';
  for(var i=0; i<=r.length-1; i++) 
  {
    j=r.substr(i,1);
    z[i]=(j=='h')?this.maxValue[j]-this.mkHSV(this.maxValue[j],this.wH,this.Hslide.style.top):this.HSV[i];
  }
  return(this.updateSV(this.hsv2hex(z)));
}


/**
 * @private
 **/
draw2d.ColorDialog.prototype.updateSV=function(v) 
{
  this.HSV=v?this.hex2hsv(v):Array(this.slideHSV[0],this.slideHSV[1],this.slideHSV[2]);
  if(!v)
    v=this.hsv2hex(Array(this.slideHSV[0],this.slideHSV[1],this.slideHSV[2]));
  this.showColor(v);
  return v;
}

/**
 * @private
 **/
draw2d.ColorDialog.prototype.loadSV=function() 
{ 
  var z='';
  for(var i=this.SVHeight; i>=0; i--)
    z+="<div style=\"background:#"+this.hsv2hex(Array(Math.round((359/this.SVHeight)*i),100,100))+";\"><br/><\/div>";
  this.Hmodel.innerHTML=z;
}

/**
 * @private
 **/
draw2d.ColorDialog.prototype.updateH=function(v) 
{ 
  this.plugHEX.innerHTML=v;
  this.HSV=this.hex2hsv(v);
  this.SV.style.backgroundColor='#'+this.hsv2hex(Array(this.HSV[0],100,100)); 
  this.SVslide.style.top= (parseInt(this.wSV-this.wSV*(this.HSV[1]/100))+20)+'px';
  this.SVslide.style.left=(parseInt(this.wSV*(this.HSV[1]/100))+5)+'px';
  this.Hslide.style.top=(parseInt(this.wH*((this.maxValue['h']-this.HSV[0])/this.maxValue['h']))-7)+'px';
}


/**
 * @private
 **/
draw2d.ColorDialog.prototype.toHex=function(v) 
{
  v=Math.round(Math.min(Math.max(0,v),255));
  return("0123456789ABCDEF".charAt((v-v%16)/16)+"0123456789ABCDEF".charAt(v%16));
}

/**
 * @private
 **/
draw2d.ColorDialog.prototype.hex2rgb=function(r) 
{
  return(
         {0:parseInt(r.substr(0,2),16),
          1:parseInt(r.substr(2,2),16),
          2:parseInt(r.substr(4,2),16)}
         );
}

/**
 * @private
 **/
draw2d.ColorDialog.prototype.rgb2hex=function(r) 
{ 
  return(this.toHex(r[0])+this.toHex(r[1])+this.toHex(r[2])); 
}

/**
 * @private
 **/
draw2d.ColorDialog.prototype.hsv2hex=function(h) 
{ 
  return(this.rgb2hex(this.hsv2rgb(h))); 
}

/**
 * @private
 **/
draw2d.ColorDialog.prototype.hex2hsv=function(v) 
{
  return(this.rgb2hsv(this.hex2rgb(v)));
}

/**
 * @private
 **/
draw2d.ColorDialog.prototype.rgb2hsv=function(r)
{
  var max=Math.max(r[0],r[1],r[2]);
  var delta=max-Math.min(r[0],r[1],r[2]);
  var H;
  var S;
  var V;

  if(max!=0) 
  { 
    S=Math.round(delta/max*100);
    if(r[0]==max)
      H=(r[1]-r[2])/delta;
    else if(r[1]==max)
      H=2+(r[2]-r[0])/delta;
    else if(r[2]==max)
      H=4+(r[0]-r[1])/delta;
    var H=Math.min(Math.round(H*60),360);
    if(H<0) 
      H+=360;
   }
   return({0:H?H:0,1:S?S:0,2:Math.round((max/255)*100)});
}

/**
 * @private
 **/
draw2d.ColorDialog.prototype.hsv2rgb=function(r) 
{
  var R;
  var B;
  var G;
  var S=r[1]/100;
  var V=r[2]/100;
  var H=r[0]/360;
  if(S>0) 
  { 
    if(H>=1) 
      H=0;

    H=6*H; 
    F=H-Math.floor(H);
    A=Math.round(255*V*(1.0-S));
    B=Math.round(255*V*(1.0-(S*F)));
    C=Math.round(255*V*(1.0-(S*(1.0-F))));
    V=Math.round(255*V); 

    switch(Math.floor(H)) 
    {
      case 0: R=V; G=C; B=A; break;
      case 1: R=B; G=V; B=A; break;
      case 2: R=A; G=V; B=C; break;
      case 3: R=A; G=B; B=V; break;
      case 4: R=C; G=A; B=V; break;
      case 5: R=V; G=A; B=B; break;
    }
    return({0:R?R:0,1:G?G:0,2:B?B:0});
  }
  else 
    return({0:(V=Math.round(V*255)),1:V,2:V});
}