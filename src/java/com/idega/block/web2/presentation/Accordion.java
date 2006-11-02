package com.idega.block.web2.presentation;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;
import java.util.Vector;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;

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

	public Accordion(String id) {
		super();
		this.id = id;
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
				

				
				StringBuffer b = new StringBuffer();
				b.append("<script> \n")
				.append("\tvar onloads = new Array();\n")
				.append("\tfunction bodyOnLoad() {\n")
				.append("\t\tnew Rico.Effect.Round( null, 'roundNormal' );\n")
				.append("\t\tnew Rico.Effect.Round( null, 'roundCompact', {compact:true} );\n")
				.append("\t\tfor ( var i = 0 ; i < onloads.length ; i++ )\n")
				.append("\t\t\tonloads[i]();\n")
				.append("\t}\n")
				.append("</script>\n");
				this.getChildren().add(new Text(b.toString()));

				StringBuffer b2 = new StringBuffer();
				b2.append("<script> onloads.push( accord ); function accord() { new Rico.Accordion( '"+id+"', {panelHeight:"+height+"} ); }  </script>");
				
				this.getChildren().add(new Text(b2.toString()));

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		if (!panels.isEmpty()) {
			Iterator i = panels.iterator();
			Layer l = new Layer();
			l.setId(id);
			while (i.hasNext()) {
				l.addChild((Layer) i.next());
			}
			this.getChildren().add(l);
		}
	
		
	}
	

	public void addPanel(String panelID, UIComponent header, UIComponent content) {
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
		
		l.getChildren().add(h);
		l.getChildren().add(c);
		
		if (panels == null) {
			panels = new Vector();
		}
		panels.add(l);
	}
	
	public void encodeBegin(FacesContext fc)throws IOException{
		super.encodeBegin(fc);
	}
	
	public Object clone(){
		Accordion obj = (Accordion) super.clone();
		obj.panels = panels;
		obj.id = id;
		obj.height = height;
		return obj;
	}
	
	
	public Object saveState(FacesContext context) {
		Object values[] = new Object[4];
		values[0] = super.saveState(context);
		values[1] = this.panels;
		values[2] = this.id;
		values[3] = this.height;
		return values;
	}
	
	public void restoreState(FacesContext context, Object state) {
		Object values[] = (Object[])state;
		super.restoreState(context, values[0]);
		this.panels = (Collection) values[1];
		this.id = (String) values[2];
		this.height = (String) values[3];
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

}
