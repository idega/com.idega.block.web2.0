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
draw2d.SelectionHighlighter=function(/*:workflow*/ workflow)
{
   this.workflow = workflow;
   this.counter = 0;

   this.black = new draw2d.Color(0,0,0);
   this.gray  = new draw2d.Color(200,200,200);
}


/** @private **/
draw2d.SelectionHighlighter.prototype.type="SelectionHighlighter";


/**
 * Call back method of the framework if the selected object has been changed.
 *
 * @param {draw2d.Figure} figure the object which has been selected.
 **/
draw2d.SelectionHighlighter.prototype.onSelectionChanged=function(/*:draw2d.Figure*/ figure)
{
   this.counter++;
   debugLabel.setText("Count:"+this.counter);
   var alpha = (figure==null)?1.0:0.2;
   var color = (figure==null)?this.black:this.gray;
   // be in mind: A Figure is not a Line. This mus be handled in another case.
   var doc = this.workflow.getDocument();

   var figures = doc.getFigures();
   for(var i=0;i<figures.getSize();i++)
   {
      figures.get(i).setAlpha(alpha);
   }

   var lines = doc.getLines();
   for(var i=0;i<lines.getSize();i++)
   {
      lines.get(i).setColor(color);
   }

   if(figure!=null)
   {
      figure.setAlpha(1.0);
      // find all inbound/outbound connections of this figure
      //
      if(figure instanceof draw2d.Node)
      {
         var ports = figure.getPorts();
         for(var i=0;i<ports.getSize();i++)
         {
            var port = ports.get(i);
            // get all connections of the port and set alpha to 1.0
            //
            var connections = port.getConnections();
            for(var j=0; j<connections.getSize();j++)
            {
               connections.get(j).setColor(this.black);
            }
        }
      }
   }
}

