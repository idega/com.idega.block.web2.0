package com.idega.block.web2.presentation;

import com.idega.presentation.Block;
import com.idega.presentation.IWContext;
import com.idega.presentation.Layer;
import com.idega.presentation.text.Link;
import com.idega.presentation.text.Text;

public class AccordionTest extends Block {

	public void main(IWContext iwc) throws Exception {

		Accordion acc =new Accordion("gimmi");
		acc.setHeight("100");
		acc.addPanel(new Text("gimmi1"), new Text("gimmi 1 texxt"));
		acc.addPanel(new Text("gimmi2"), new Text("gimmi 2 texxt"));
		acc.addPanel(new Text("gimmi3"), new Text("gimmi 3 texxt"));
		acc.addPanel(new Text("Svana"), new Text("Svana 3 texxt"));
		acc.addPanel(new Text("Svana1"), new Text("Svana 4 texxt"));
		
		Layer l = new Layer();
		l.setID("1");
		Layer l1 = new Layer();
		l1.setID("2");
		l1.add(new Link("mbl", "http://www.mbl.is"));

		Layer l2 = new Layer();
		l2.setID("3");
	
		Layer l3 = new Layer();
		l3.setID("4");
		
		Layer l4 = new Layer();
		l4.setID("5");
		l4.add(new Link("nba", "http://www.nba.com"));
		
		Layer l5 = new Layer();
		l5.setID("6");
		
		l.add(l1);
		l1.add(l2);
		l.add(l3);
		l3.add(l4);
		l4.add(l5);
		
		acc.addPanel(new Text("MultiLayered Content"), l);
		
		add(acc);
	}
}
