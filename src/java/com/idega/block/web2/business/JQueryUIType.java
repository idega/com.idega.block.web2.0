package com.idega.block.web2.business;

/**
 * @author <a href="mailto:civilis@idega.com">Vytautas Čivilis</a>
 * @version $Revision: 1.1 $
 *
 * Last modified: $Date: 2008/02/14 15:48:25 $ by $Author: civilis $
 */
public enum JQueryUIType  {
	
	UI_TABS {public String getFileName() { return "ui.tabs.js"; }},
	UI_TABS_CSS {public String getFileName() { return "themes/flora/flora.tabs.css"; }},
	UI_TABS_EXT {public String getFileName() { return "ui.tabs.ext.js"; }};
	
	public abstract String getFileName();
}
