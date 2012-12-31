package com.idega.block.web2.business;


import javax.ejb.CreateException;
import com.idega.business.IBOHomeImpl;

public class Web2BusinessHomeImpl extends IBOHomeImpl implements Web2BusinessHome {

	private static final long serialVersionUID = 7355513602965646962L;

	public Class<Web2Business> getBeanInterfaceClass() {
		return Web2Business.class;
	}

	public Web2Business create() throws CreateException {
		return (Web2Business) super.createIBO();
	}
}