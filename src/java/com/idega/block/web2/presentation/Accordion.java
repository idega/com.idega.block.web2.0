package com.idega.block.web2.presentation;

import java.io.IOException;
import java.util.Collection;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;

import org.apache.myfaces.renderkit.html.util.AddResource;
import org.apache.myfaces.renderkit.html.util.AddResourceFactory;

import com.idega.block.web2.business.Web2Business;
import com.idega.business.IBOLookup;
import com.idega.presentation.Block;
import com.idega.presentation.IWContext;
import com.idega.presentation.Layer;
import com.idega.presentation.text.Text;


public class Accordion extends Block {

	protected static final String PANELS_FACET_NAME = "PANELS";
	private Collection panels = null;
	private String id = "";
	private int panelCount = 0;
	private boolean includeJavascript = true;
	private String onActiveScriptString = null;
	private String onBackgroundScriptString = null;
	private String scriptString = null;
	
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

	/**
	 * Sometimes needed if you want or need to manually add the script after or before a conflicting script
	 * @param includeJavascript
	 */
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
	
		//Page parentPage = PresentationObjectUtil.getParentPage(this);
		//if (parentPage != null) {
			try {
				Web2Business business = (Web2Business) IBOLookup.getServiceInstance(iwc, Web2Business.class);
				String styleURI = business.getBundleURIToMootoolsStyleFile();
				AddResource resourceAdder = AddResourceFactory.getInstance(iwc.getRequest());
				
//				add style
				resourceAdder.addStyleSheet(iwc, AddResource.HEADER_BEGIN,styleURI);

				
				
				if(includeJavascript == true) {
					String mootoolsURI = business.getBundleURIToMootoolsLib();
					//add a javascript to the header :)
					resourceAdder.addJavaScriptAtPosition(iwc, AddResource.HEADER_BEGIN,mootoolsURI);
//						parentPage.addScriptSource(mootoolsURI);
//						parentPage.addStyleSheetURL(styleURI);	
				}


				
				if (getScriptString()==null) {
					StringBuffer scriptString = new StringBuffer();
					scriptString.append("<script type=\"text/javascript\" > \n")
							.append("window.onload = function() {")
							//.append("function createAccordion").append(id).append("()").append("{ \n")
							.append("\tvar stretchers = $$('div.acStretch'); \n")
							.append("\tvar togglers = $$('div.acToggle'); \n")
							.append("\tvar iwAccordion")
							.append(id)
							.append(" = new Fx.Accordion(togglers, stretchers, { alwaysHide:true, opacity:false, transition: Fx.Transitions.quadOut, \n");
					
					scriptString.append("\t\tonActive: function(toggler, i){ \n");
					if (getOnActiveScriptString() != null) {
						scriptString.append("\t\t\t").append(getOnActiveScriptString());
					}
					
					scriptString.append("\t\t}, \n").append("\t\tonBackground: function(toggler, i){ \n");
						if (getOnBackgroundScriptString() != null) {
							scriptString.append("\t\t\t").append(getOnBackgroundScriptString());
					}
					
					scriptString.append("\t\t} \n").append("\t}); \n").append(
							"} \n");
					scriptString.append("</script> \n");
					setScriptString(scriptString.toString());
				}				
				this.getChildren().add(new Text(getScriptString()));

			} catch (Exception e) {
				e.printStackTrace();
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
			if("".equals(id)){
				id = "accordionContainer";
			}
			panels.setId(id);
			panels.setStyleClass("accordionContainer");
			
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
		obj.panels = this.panels;
		obj.id = this.id;
		obj.includeJavascript = this.includeJavascript;
		obj.onActiveScriptString = this.onActiveScriptString;
		obj.onBackgroundScriptString = this.onBackgroundScriptString;
		obj.scriptString = this.scriptString;
		return obj;
	}
	
	
	public Object saveState(FacesContext context) {
		Object values[] = new Object[3];
		values[0] = super.saveState(context);
		values[1] = this.id;
		//todo add the other params?
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

	public String getScriptString() {
		return scriptString;
	}

	public void setScriptString(String scriptString) {
		this.scriptString = scriptString;
	}

}

