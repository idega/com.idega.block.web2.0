/*
 * $Id: Web2BusinessHome.java,v 1.3 2006/05/04 13:16:17 eiki Exp $
 * Created on May 4, 2006
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
 *  Last modified: $Date: 2006/05/04 13:16:17 $ by $Author: eiki $
 * 
 * @author <a href="mailto:eiki@idega.com">eiki</a>
 * @version $Revision: 1.3 $
 */
public interface Web2BusinessHome extends IBOHome {

	public Web2Business create() throws javax.ejb.CreateException, java.rmi.RemoteException;
}
