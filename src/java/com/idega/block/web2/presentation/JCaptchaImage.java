/*
 * $Id: JCaptchaImage.java 1.1 Sep 9, 2009 laddi Exp $
 * Created on Sep 9, 2009
 *
 * Copyright (C) 2009 Idega Software hf. All Rights Reserved.
 *
 * This software is the proprietary information of Idega hf.
 * Use is subject to license terms.
 */
package com.idega.block.web2.presentation;

import org.springframework.beans.factory.annotation.Autowired;

import com.idega.block.web2.business.Web2Business;
import com.idega.presentation.Image;
import com.idega.util.expression.ELUtil;


/**
 * 
 *  Last modified: $Date: 2004/06/28 09:09:50 $ by $Author: laddi $
 * 
 * @author <a href="mailto:laddi@idega.com">laddi</a>
 * @version $Revision: 1.1 $
 */
public class JCaptchaImage extends Image {
	
	@Autowired
	private Web2Business web2Business;
	
	public JCaptchaImage() {
		super();
		setURL(getWeb2Business().getJCaptchaImageURL());
	}

	private Web2Business getWeb2Business() {
		if (web2Business == null) {
			ELUtil.getInstance().autowire(this);
		}
		return web2Business;
	}
}