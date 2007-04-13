package com.idega.block.web2.presentation;

import java.io.IOException;
import java.util.Collection;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;

import org.apache.myfaces.custom.stylesheet.Stylesheet;

import com.idega.block.web2.business.Web2Business;
import com.idega.business.IBOLookup;
import com.idega.presentation.Block;
import com.idega.presentation.IWContext;
import com.idega.presentation.Layer;
import com.idega.presentation.Page;
import com.idega.presentation.PresentationObjectUtil;
import com.idega.presentation.Script;
import com.idega.presentation.text.Text;


public class Accordion extends Block {

	protected static final String PANELS_FACET_NAME = "PANELS";
	private Collection panels = null;
	private String id = "";
	private int panelCount = 0;
	private boolean includeJavascript = true;
	private String onActiveScriptString = null;
	private String onBackgroundScriptString = null;
	
	public String getOnActiveScriptString() {
		return onActiveScriptString;
	}

	public void setOnActiveScriptString(String onActiveScriptString) {
		this.onActiveScriptString = onActiveScriptString;
	}

	public String getOnBackgroundScriptString() {
		return onBackgroundScriptString;
	}

	public void setOnBackgroundScriptString(String onBackgroundScriptString) {
		this.onBackgroundScriptString = onBackgroundScriptString;
	}

	public boolean isIncludeJavascript() {
		return includeJavascript;
	}

	public void setIncludeJavascript(boolean includeJavascript) {
		this.includeJavascript = includeJavascript;
	}

	public Accordion() {
		super();
	}

	public Accordion(String id) {
		super();
		this.id = id;
	}
	
	public void main(IWContext iwc) {
		
		Page parentPage = PresentationObjectUtil.getParentPage(this);
		if (parentPage != null) {
			try {
				if(includeJavascript == true) {
					Web2Business business = (Web2Business) IBOLookup.getServiceInstance(iwc, Web2Business.class);
					String mootoolsURI = business.getBundleURIToMootoolsLib();
					String styleURI = business.getBundleURIToMootoolsStyleFile();
					
					//hack until WFPage can add scripts and stylesheets
					if (parentPage==null || (parentPage.getClassName().indexOf("WorkspacePage")) > -1) {
//						FIXME in the workspace the parentpage.addScriptsource does nothing it seems so we have to add also!
						Script script = new Script();
						script.addScriptSource(mootoolsURI);
						this.getChildren().add(script);
						
						Stylesheet style = new Stylesheet();
						style.setPath(styleURI);
						
												
						this.getChildren().add(style);	
					}
					else{
						parentPage.addScriptSource(mootoolsURI);
						parentPage.addStyleSheetURL(styleURI);
					}
					
				}


				StringBuffer scriptString = new StringBuffer();
				scriptString.append("<script type=\"text/javascript\" > \n")
				//.append("window.onload = function() {")
				.append("function createAccordion").append(id).append("()").append("{ \n")
				.append("\tvar stretchers = $$('div.acStretch'); \n")
				.append("\tvar togglers = $$('div.acToggle'); \n")
				.append("\tvar iwAccordion").append(id).append(" = new Fx.Accordion(togglers, stretchers, { alwaysHide:true, opacity:false, transition: Fx.Transitions.quadOut, \n")
				//.append("var myAccordion = new Fx.Accordion(togglers, stretchers, { transition: Fx.Transitions.elasticOut, \n")
					.append("\t\tonActive: function(toggler, i){ \n");
					if(getOnActiveScriptString()!=null){
						scriptString.append("\t\t\t").append(getOnActiveScriptString());
						
					}
					scriptString.append("\t\t}, \n")
					.append("\t\tonBackground: function(toggler, i){ \n");
					if(getOnBackgroundScriptString()!=null){
						scriptString.append("\t\t\t").append(getOnBackgroundScriptString());
					}
					scriptString.append("\t\t} \n")
				.append("\t}); \n")
				.append("} \n");
				
				if(iwc.isSafari()){
					//method from iwcore.js, seems to clash with mootools on firefox but the latter window addEvent does not work on safari! stupid.
					//TODO find a method that works on both
					scriptString.append("addEvent(window, 'load',createAccordion").append(id).append("); \n");
				}
				else{
					scriptString.append("window.addEvent('domready',createAccordion").append(id).append("); \n");
				}
				
				scriptString.append("</script> \n");
								
				this.getChildren().add(new Text(scriptString.toString()));

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	public void addPanel(UIComponent header, UIComponent content) {
		addPanel("panel"+(panelCount++), header, content);
	}

	public void addPanel(String panelID, UIComponent header, UIComponent content) {
		//get outerlayer (facet)
		Layer panels = (Layer)this.getFacet(PANELS_FACET_NAME);
		if(panels==null){
			panels = new Layer();
			panels.setId(id);
			
			this.getFacets().put(PANELS_FACET_NAME, panels);
		}
		
		//add panel to outerlayer
		Layer l = new Layer();
		l.setId(panelID);
		
		Layer h = new Layer();
		h.setId(panelID+"Header");
		//for rapidweaver and typical mootools css
		h.setStyleClass("acToggle");
		h.getChildren().add(header);
		
		Layer c = new Layer();
		c.setId(panelID+"Content");
		c.setStyleClass("acStretch");
		c.getChildren().add(content);
		
		l.add(h);
		l.add(c);
		
		panels.add(l);

	}
	
	public void encodeBegin(FacesContext fc)throws IOException{
		super.encodeBegin(fc);
		
		Layer panels = (Layer)this.getFacet(PANELS_FACET_NAME);
		this.renderChild(fc,panels);
		
	}
	
	public Object clone(){
		Accordion obj = (Accordion) super.clone();
		obj.panels = panels;
		obj.id = id;
		return obj;
	}
	
	
	public Object saveState(FacesContext context) {
		Object values[] = new Object[3];
		values[0] = super.saveState(context);
		values[1] = this.id;
		return values;
	}
	
	public void restoreState(FacesContext context, Object state) {
		Object values[] = (Object[])state;
		super.restoreState(context, values[0]);
		this.id = (String) values[1];
	}

	public String getFamily() {
		return null;
	}

}
