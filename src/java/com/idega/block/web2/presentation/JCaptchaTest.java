/*
 * $Id: JCaptchaTest.java 1.1 Sep 6, 2009 laddi Exp $
 * Created on Sep 6, 2009
 *
 * Copyright (C) 2009 Idega Software hf. All Rights Reserved.
 *
 * This software is the proprietary information of Idega hf.
 * Use is subject to license terms.
 */
package com.idega.block.web2.presentation;

import javax.faces.context.FacesContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.idega.block.web2.business.Web2Business;
import com.idega.presentation.IWBaseComponent;
import com.idega.presentation.IWContext;
import com.idega.presentation.Image;
import com.idega.presentation.text.Text;
import com.idega.presentation.ui.Form;
import com.idega.presentation.ui.HiddenInput;
import com.idega.presentation.ui.SubmitButton;
import com.idega.presentation.ui.TextInput;
import com.idega.util.expression.ELUtil;

public class JCaptchaTest extends IWBaseComponent {

	private static final String PARAMETER_ACTION = "prm_action";
	private static final String PARAMETER_CAPTCHA = "prm_captcha";

	private static final int ACTION_FORM = 1;
	private static final int ACTION_RESULT = 2;
	
	@Autowired
	private Web2Business web2Business;

	/* (non-Javadoc)
	 * @see com.idega.presentation.IWBaseComponent#initializeComponent(javax.faces.context.FacesContext)
	 */
	@Override
	protected void initializeComponent(FacesContext context) {
		IWContext iwc = IWContext.getIWContext(context);
		
		switch (parseAction(iwc)) {
			case ACTION_RESULT:
				viewResults(iwc);
				break;
			default:
				viewForm(iwc);
				break;
		}
	}
	
	private int parseAction(IWContext iwc) {
		int action = ACTION_FORM;
		if (iwc.isParameterSet(PARAMETER_ACTION)) {
			action = Integer.parseInt(iwc.getParameter(PARAMETER_ACTION));
		}
		
		return action;
	}
	
	private void viewForm(IWContext iwc) {
		Form form = new Form();
		form.add(new HiddenInput(PARAMETER_ACTION, String.valueOf(ACTION_RESULT)));
		add(form);
		
		Image image = new Image(getWeb2Business().getJCaptchaImageURL());
		form.add(image);
		
		TextInput input = new TextInput(PARAMETER_CAPTCHA);
		form.add(input);
		
		SubmitButton submit = new SubmitButton("Verify");
		form.add(submit);
	}
	
	private void viewResults(IWContext iwc) {
		Form form = new Form();
		form.add(new HiddenInput(PARAMETER_ACTION, String.valueOf(ACTION_FORM)));
		add(form);

		String userCaptchaResponse = iwc.getParameter(PARAMETER_CAPTCHA);
		if (getWeb2Business().validateJCaptcha(iwc.getRequest(), userCaptchaResponse)) {
			form.add(new Text("Match!"));
		}
		else {
			form.add(new Text("No match!"));
		}

		SubmitButton submit = new SubmitButton("Back");
		form.add(submit);
	}
	
	private Web2Business getWeb2Business() {
		if (web2Business == null) {
			ELUtil.getInstance().autowire(this);
		}
		return web2Business;
	}
}