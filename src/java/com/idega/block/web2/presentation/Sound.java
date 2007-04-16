package com.idega.block.web2.presentation;

import javax.faces.context.FacesContext;

import org.apache.myfaces.renderkit.html.util.AddResource;
import org.apache.myfaces.renderkit.html.util.AddResourceFactory;

import com.idega.block.web2.business.Web2Business;
import com.idega.business.IBOLookup;
import com.idega.presentation.Block;
import com.idega.presentation.IWContext;
import com.idega.presentation.Page;
import com.idega.presentation.PresentationObjectUtil;
import com.idega.presentation.text.Text;


public class Sound extends Block {

	private String id = "";

	public Sound() {
		super();
	}

	public Sound(String id) {
		super();
		this.id = id;
	}
	
	public void main(IWContext iwc) {
		
		Page parentPage = PresentationObjectUtil.getParentPage(this);
		if (parentPage != null) {
			try {

				Web2Business business = (Web2Business) IBOLookup.getServiceInstance(iwc, Web2Business.class);

				String soundURI = business.getBundleURIToSoundManager2Lib();
				String flashFile = business.getBundleURIToSoundManager2FlashFile();

				//hack until WFPage can add scripts and stylesheets
				//TODO remove when myfaces extensions filter in Script works
				AddResource resourceAdder = AddResourceFactory.getInstance(iwc);
				//add a javascript to the header :)
				resourceAdder.addJavaScriptAtPosition(iwc, AddResource.HEADER_BEGIN,soundURI);

				StringBuffer scriptString = new StringBuffer();
				scriptString.append("<script type=\"text/javascript\" > \n")
				.append("\tsoundManager.url = '").append(flashFile).append("'; \n")
				.append("soundManager.onload = function() {")
				.append("//function playSound").append(id).append("()").append("{ \n")
				.append("//soundManager.defaultOptions.debugMode = false; // disable debug output \n")
				.append("\tsoundManager.play('mySound','"+flashFile.substring(0,flashFile.lastIndexOf("/")+1)+"cameraclick.mp3'); \n")
				.append("} \n");

//				if(iwc.isSafari()){
//				//method from iwcore.js, seems to clash with mootools on firefox but the latter window addEvent does not work on safari! stupid.
//				//TODO find a method that works on both
//				scriptString.append("addEvent(window, 'load',playSound").append(id).append("); \n");
//				}
//				else{
//				scriptString.append("window.addEvent('domready',playSound").append(id).append("); \n");
//				}

				scriptString.append("</script> \n");

				this.getChildren().add(new Text(scriptString.toString()));

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	public Object clone(){
		Sound obj = (Sound) super.clone();
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
