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
MyCommandListener=function()
{
  CommandStackEventListener.call(this);
}

MyCommandListener.prototype = new  CommandStackEventListener;
MyCommandListener.prototype.type="MyCommandListener";


/**
 * Sent when an event occurs on the command stack. CommandStackEvent.getDetail() 
 * can be used to identify the type of event which has occurred.
 * 
 **/
MyCommandListener.prototype.stackChanged=function(/*:CommandStackEvent*/ event)
{
  // VERY SIMPLE logging of the events.
  var console = document.getElementById("log");
  var log = document.createElement("div");

  // Below some analytic code of the event.
  // 

  // Is the Event a PRE of POST event?
  //
  if(event.isPostChangeEvent())
     log.innerHTML="POST:";
  else
     log.innerHTML="PRE:";

  // EXECUTE, UNDO or REDO?
  //
  var details = event.getDetails();
  if(0 != (details & (CommandStack.PRE_EXECUTE | CommandStack.POST_EXECUTE)))
  {
    log.innerHTML = log.innerHTML+" EXECUTE";
  }
  else if(0 != (details & (CommandStack.PRE_UNDO | CommandStack.POST_UNDO)))
  {
    log.innerHTML = log.innerHTML+" UNDO";
  }
  else if(0 != (details & (CommandStack.PRE_REDO | CommandStack.POST_REDO)))
  {
    log.innerHTML = log.innerHTML+" REDO";
  }

  // What kind of event
  var command = event.getCommand();
  if(command instanceof CommandAdd)
    log.innerHTML = log.innerHTML+" => ADD Element";
  else if(command instanceof CommandConnect)
    log.innerHTML = log.innerHTML+" => Connect two Ports";
  else if(command instanceof CommandDelete)
    log.innerHTML = log.innerHTML+" => Delete Element";
  else if(command instanceof CommandMove)
    log.innerHTML = log.innerHTML+" => Moving Element";
  else if(command instanceof CommandResize)
    log.innerHTML = log.innerHTML+" => Resize Element";

  console.appendChild(log);
}
