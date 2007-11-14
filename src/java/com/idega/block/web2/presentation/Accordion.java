package com.idega.block.web2.presentation;

import java.io.IOException;
import java.rmi.RemoteException;
import java.util.List;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;

import org.apache.myfaces.renderkit.html.util.AddResource;
import org.apache.myfaces.renderkit.html.util.AddResourceFactory;

import com.idega.block.web2.business.Web2Business;
import com.idega.business.SpringBeanLookup;
import com.idega.presentation.Block;
import com.idega.presentation.IWContext;
import com.idega.presentation.Layer;
import com.idega.presentation.text.Text;


public class Accordion extends Block {

	protected static final String PANELS_FACET_NAME = "PANELS";
	
	private List<UIComponent> panels = null;
	
	private int panelCount = 0;
	
	private String accordionId = "";
	private String onActiveScriptString = null;
	private String onBackgroundScriptString = null;
	private String scriptString = null;
	
	private boolean useSound = true;
	private boolean includeJavascript = true;
	
	public String getOnActiveScriptString() {
		return onActiveScriptString;
	}

	public boolean isUseSound() {
		return useSound;
	}

	public void setUseSound(boolean useSound) {
		this.useSound = useSound;
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
		this.accordionId = id;
	}
	
	public void main(IWContext iwc) {
		Web2Business business = (Web2Business) SpringBeanLookup.getInstance().getSpringBean(iwc, Web2Business.class);
		
		String styleURI = null;
		try {
			styleURI = business.getBundleURIToMootoolsStyleFile();
		} catch (RemoteException e) {
			e.printStackTrace();
		}
		AddResource resourceAdder = AddResourceFactory.getInstance(iwc.getRequest());
		//	add style
		resourceAdder.addStyleSheet(iwc, AddResource.HEADER_BEGIN, styleURI);

		if (includeJavascript) {
			String mootoolsURI = null;
			try {
				mootoolsURI = business.getBundleURIToMootoolsLib();
			} catch (RemoteException e) {
				e.printStackTrace();
			}
			//	add a javascript to the header :)
			resourceAdder.addJavaScriptAtPosition(iwc, AddResource.HEADER_BEGIN, mootoolsURI);
		}

		//add sounds :)
		if (useSound) {
			Sound sound = new Sound();
			this.add(sound);
			StringBuffer soundPlay = new StringBuffer();
			soundPlay.append("\tif(canStartUsingSound){  \n")
				.append("\t").append(sound.getPlayScriptlet("clicksound", sound.getTestSoundURI(),"volume:10,pan:-50"))
				.append("\t} \n")
				.append("\tcanStartUsingSound=true; \n");
			
			setOnActiveScriptString(soundPlay.toString());				
		}

		if (getScriptString() == null) {
			StringBuffer scriptString = new StringBuffer();
			scriptString.append("<script type=\"text/javascript\" > \n")
						.append("var iwAccordion")
						.append(accordionId)
						.append(" = null; \n")
						.append("var canStartUsingSound = false; \n")
						.append("function setAccordion"+accordionId+"() { \n")
						.append("\tvar stretchers = $$('div.acStretch").append(this.accordionId).append("'); \n")
						.append("\tvar togglers = $$('div.acToggle").append(this.accordionId).append("'); \n")
						.append("\tiwAccordion")
						.append(accordionId)
						.append(" = new Accordion(togglers, stretchers, {opacity: false, show: 0, transition: Fx.Transitions.quadOut, \n");
					
			scriptString.append("\t\tonActive: function(toggler, element){ \n");
			
			if (getOnActiveScriptString() != null) {
				scriptString.append("\t\t").append(getOnActiveScriptString());
			}
					
			scriptString.append("\t\t}, \n").append("\t\tonBackground: function(toggler, element){ \n");
			if (getOnBackgroundScriptString() != null) {
				scriptString.append("\t\t").append(getOnBackgroundScriptString());
			}
					
			scriptString.append("\t\t} \n").append("\t}, $('").append(accordionId).append("')); \n")
						.append("} \n");
			
			scriptString.append("registerEvent(window, 'load', setAccordion"+accordionId+");");
			scriptString.append("</script> \n");
			setScriptString(scriptString.toString());
		}
				
		this.add(new Text(getScriptString()));
		
	}
	
	public void addPanel(UIComponent header, UIComponent content) {
		addPanel("panel"+(panelCount++), header, content);
	}

	public void addPanel(String panelID, UIComponent header, UIComponent content) {
		//get outerlayer (facet)
		Layer panels = (Layer) this.getFacet(PANELS_FACET_NAME);
		if (panels==null) {
			panels = new Layer();
			if("".equals(accordionId)){
				accordionId = "accordionContainer";
			}
			panels.setId(accordionId);
			panels.setStyleClass("accordionContainer");
			
			this.getFacets().put(PANELS_FACET_NAME, panels);
		}
		
		//add panel to outerlayer
		Layer l = new Layer();
		l.setId(panelID);
		
		Layer h = new Layer();
		h.setId(panelID+"Header");
		//for rapidweaver and typical mootools css
		h.setStyleClass("acToggle acToggle"+accordionId);
		h.getChildren().add(header);
		
		Layer c = new Layer();
		c.setId(panelID+"Content");
		c.setStyleClass("acStretch acStretch"+accordionId);
		c.getChildren().add(content);
		
		l.add(h);
		l.add(c);
		
		panels.add(l);

	}
	
	public void encodeBegin(FacesContext fc)throws IOException{
		super.encodeBegin(fc);
		
		UIComponent panels = (UIComponent)this.getFacet(PANELS_FACET_NAME);
		this.renderChild(fc,panels);
		
	}
	
	public Object clone(){
		Accordion obj = (Accordion) super.clone();
		obj.panels = this.panels;
		obj.accordionId = this.accordionId;
		obj.includeJavascript = this.includeJavascript;
		obj.onActiveScriptString = this.onActiveScriptString;
		obj.onBackgroundScriptString = this.onBackgroundScriptString;
		obj.scriptString = this.scriptString;
		return obj;
	}
	
	
	public Object saveState(FacesContext context) {
		Object values[] = new Object[3];
		values[0] = super.saveState(context);
		values[1] = this.accordionId;
		//todo add the other params?
		return values;
	}
	
	public void restoreState(FacesContext context, Object state) {
		Object values[] = (Object[])state;
		super.restoreState(context, values[0]);
		this.accordionId = (String) values[1];
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

	public String getAccordionId() {
		return accordionId;
	}

	public void setAccordionId(String accordionId) {
		this.accordionId = accordionId;
	}

}

