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
draw2d.XMLSerializer_01=function()
{
}

/** @private **/
draw2d.XMLSerializer_01.prototype.type="XMLSerializer_01";

/**
 * Return the draw2d document as XML
 *
 * @param {Document} document The Draw2D document
 * @type String
 * @see ToolSave
 **/
draw2d.XMLSerializer_01.prototype.toXML=function(/*:Document*/ document)
{
  var xml = '<?xml version="1.0" encoding="ISO-8859-1"?>\n';

  xml = xml+'<form>\n';
  var figures = document.getFigures();
  for(var i=0;i< figures.getSize(); i++)
  {
    var figure = figures.get(i);
    xml = xml +'<'+figure.type+' x="'+figure.getX()+'" y="'+figure.getY()+'" id="'+figure.getId()+'">\n';
    xml = xml +this.getPropertyXML(figure,"   ");
    if(figure instanceof draw2d.CompartmentFigure)
    {
       xml = xml + this.getChildXML(figure,"   ");
    }
    xml = xml +'</'+figure.type+'>\n';
  }

  xml = xml +'</form>\n'
  return xml;
}

/**
 * Recursive call to all children of a ComparmtentFigure
 *
 * @param {CompartmentFigure} The CompartmentFigure for the XML serialization
 * @param {String} suffix Some spaces used to pretty print the XML
 * @type String
 **/
draw2d.XMLSerializer_01.prototype.getChildXML=function(/*:CompartmentFigure*/ compartmentFigure, /*:String*/ suffix)
{
  var xml = "";
  var figures = compartmentFigure.getChildren();
  for(var i=0;i< figures.getSize(); i++)
  {
    var figure = figures.get(i);
    xml = xml +suffix+'<'+figure.type+' x="'+figure.getX()+'" y="'+figure.getY()+'" id="'+figure.getId()+'">\n';
    xml = xml +this.getPropertyXML(figure,"   "+suffix);
    if(figure instanceof draw2d.CompartmentFigure)
    {
       xml = xml + this.getChildXML(figure,"   "+suffix);
    }
    xml = xml +suffix+'</'+figure.type+'>\n';
  }
  return xml;
}

/**
 * Serialize the user defined properties to XML/String
 *
 * @param {draw2d.Figure} The Figure which stores the properties.
 * @param {String} suffix Some spaces used to pretty print the XML
 * @type String
 **/
draw2d.XMLSerializer_01.prototype.getPropertyXML=function(/*:draw2d.Figure*/ figure, /*:String*/ suffix)
{
  var xml = "";
  var properties = figure.getProperties();
  for(key in properties)
  {
    var value = properties[key];
    if(value!=null)
    {
       xml = xml +suffix+'<property name="'+key+'" value="'+value+'">\n';
    }
  }
  return xml;
}