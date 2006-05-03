/*
 * $Id: Web2BusinessHome.java,v 1.1 2006/05/03 14:55:22 eiki Exp $
 * Created on May 3, 2006
 *
 * Copyright (C) 2006 Idega Software hf. All Rights Reserved.
 *
 * This software is the proprietary information of Idega hf.
 * Use is subject to license terms.
 */
package com.idega.block.web2.business;

import com.idega.business.IBOHome;


/**
 * 
 *  Last modified: $Date: 2006/05/03 14:55:22 $ by $Author: eiki $
 * 
 * @author <a href="mailto:eiki@idega.com">eiki</a>
 * @version $Revision: 1.1 $
 */
public interface Web2BusinessHome extends IBOHome {

	public Web2Business create() throws javax.ejb.CreateException, java.rmi.RemoteException;
}
