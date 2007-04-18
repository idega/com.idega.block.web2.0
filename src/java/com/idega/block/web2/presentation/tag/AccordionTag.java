package com.idega.block.web2.presentation.tag;

import javax.faces.component.UIComponent;
import org.apache.myfaces.custom.tree2.TreeTag;
import com.idega.block.web2.presentation.Accordion;

public class AccordionTag extends TreeTag {

	private String accordionId;

	private boolean includeJavascript = true;

	/**
	 * @see javax.faces.webapp.UIComponentTag#getRendererType()
	 */
	public String getRendererType() {
		return null;
	}

	/**
	 * @see javax.faces.webapp.UIComponentTag#getComponentType()
	 */
	public String getComponentType() {
		return "accordion";
	}

	public void release() {
		super.release();
		this.accordionId = "";
		this.includeJavascript = true;
	}

	protected void setProperties(UIComponent component) {
		super.setProperties(component);
		if (component instanceof Accordion) {
			Accordion accordion = (Accordion) component;
			accordion.setAccordionId(accordionId);
			accordion.setIncludeJavascript(includeJavascript);
		}
	}

	public String getAccordionId() {
		return accordionId;
	}

	public void setAccordionId(String accordionId) {
		this.accordionId = accordionId;
	}

	public boolean isIncludeJavascript() {
		return includeJavascript;
	}

	public void setIncludeJavascript(boolean includeJavascript) {
		this.includeJavascript = includeJavascript;
	}
}