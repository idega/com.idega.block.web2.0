package com.idega.block.web2.presentation;

import java.io.IOException;
import java.util.Collection;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.el.ValueBinding;

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

	private Collection panels = null;
	private String id = null;
	private String height = "200";
	private int panelCount = 0;
	private String currentPanel;
	
	public Accordion() {
		super();
	}

	public Accordion(String id) {
		super();
		this.id = id;
		this.currentPanel = "0";
	}
	
	public void main(IWContext iwc) {
		
		Page parentPage = PresentationObjectUtil.getParentPage(this);
		if (parentPage != null) {
			try {
				Web2Business business = (Web2Business) IBOLookup.getServiceInstance(iwc, Web2Business.class);
				String protoURI = business.getBundleURIToPrototypeLib();
				String ricoURI = business.getBundleURIToRico();
	
				Script s = parentPage.getAssociatedScript();
				s.addScriptSource(protoURI);
				s.addScriptSource(ricoURI);

				parentPage.addScriptSource(protoURI);
				parentPage.addScriptSource(ricoURI);
				
				// THIS HAS TO BE ADDED TO THE <BODY> in the html, if not it does not work in Safari
				parentPage.setOnLoad("javascript:bodyOnLoad()");
				
				this.getChildren().add(s);


				StringBuffer b2 = new StringBuffer();
//				b2.append("<script> onloads.push( accord ); function accord() { new Rico.Accordion( '"+id+"', {panelHeight:"+height+"} ); }  </script>");
				b2.append("<script type=\"text/javascript\" > \t\tnew Rico.Effect.Round( null, 'roundNormal' );\n")
				.append("\t\tnew Rico.Effect.Round( null, 'roundCompact', {compact:true} );\n")
				.append("var acc = new Rico.Accordion( $('"+id+"'), {panelHeight:"+height+"} );\n");
				
				ValueBinding vb = getValueBinding("currentPanel");
				if(vb != null) {
					currentPanel = (String) vb.getValue(iwc);
					if(currentPanel != null) {
						b2.append("acc.showTabByIndex(" + currentPanel + ",false);\n");
					}
				}
				b2.append("</script>\n");

				this.getChildren().add(new Text(b2.toString()));

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
		Layer panels = (Layer)this.getFacet("PANELS");
		if(panels==null){
			panels = new Layer();
			panels.setId(id);
			
			this.getFacets().put("PANELS", panels);
		}
		
		//add panel to outerlayer
		Layer l = new Layer();
		l.setId(panelID);
		
		Layer h = new Layer();
		h.setId(panelID+"Header");
		h.setStyleClass("accordionTabTitleBar");
		h.getChildren().add(header);
		
		Layer c = new Layer();
		c.setId(panelID+"Content");
		c.setStyleClass("accordionTabContentBox");
		c.getChildren().add(content);
		
		l.add(h);
		l.add(c);
		
		panels.add(l);

	}
	
	public void encodeBegin(FacesContext fc)throws IOException{
		super.encodeBegin(fc);
		
		Layer panels = (Layer)this.getFacet("PANELS");
		this.renderChild(fc,panels);
		
	}
	
	public Object clone(){
		Accordion obj = (Accordion) super.clone();
		obj.panels = panels;
		obj.id = id;
		obj.height = height;
		return obj;
	}
	
	
	public Object saveState(FacesContext context) {
		Object values[] = new Object[3];
		values[0] = super.saveState(context);
		values[1] = this.id;
		values[2] = this.height;
		return values;
	}
	
	public void restoreState(FacesContext context, Object state) {
		Object values[] = (Object[])state;
		super.restoreState(context, values[0]);
		this.id = (String) values[1];
		this.height = (String) values[2];
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	public String getFamily() {
		return null;
	}

	public String getCurrentPanel() {
		return currentPanel;
	}

	public void setCurrentPanel(String currentPanel) {
		this.currentPanel = currentPanel;
	}

}
