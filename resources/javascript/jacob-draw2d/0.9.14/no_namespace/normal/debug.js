/**************************************************************************************************/
/*                                                                                                */
/* Functions to handle debug message in javascript and service side calls for the                 */
/* jACOB application server                                                                       */
/*                                                                                                */
/* usage: trace('this is a message');                                                             */
/*                                                                                                */
/**************************************************************************************************/


/**
 * Show a trace message in a seperate Explorer Window
 *
**/
function trace( message)
{
    var debugWindow = openwindow("about:blank",700,400);
    debugWindow.document.writeln("<pre>"+message+"</pre>");
}

function openwindow(url, width, height)
{
    var left     = (screen.width  - width)  / 2;
    var top      = (screen.height - height) / 2;

    property = 'left='+left+', top='+top+', toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,alwaysRaised,width='+width+',height='+height;
    return window.open(url, "_blank", property);
}



function dumpObject(obj)
{
    trace("----------------------------------------------------------------------------");
    trace("- Object dump");
    trace("----------------------------------------------------------------------------");
    for (var i in obj)
    {
        try
        {
            if(typeof obj[i] != "function")
                trace(i + " --&gt; " + obj[i]);
         }
         catch(e)
         {
         }
    }
    for (var i in obj)
    {
        try
        {
            if(typeof obj[i] == "function")
                trace(i + " --&gt; " + obj[i]);
        }
        catch(e)
        {
        }
    }
    trace("----------------------------------------------------------------------------");
}

