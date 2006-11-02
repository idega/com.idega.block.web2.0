/*
 * $Id: Web2Business.java,v 1.5 2006/11/02 15:27:54 gimmi Exp $
 * Created on May 4, 2006
 *
 * Copyright (C) 2006 Idega Software hf. All Rights Reserved.
 *
 * This software is the proprietary information of Idega hf.
 * Use is subject to license terms.
 */
package com.idega.block.web2.business;

import com.idega.business.IBOService;


/**
 * 
 *  Last modified: $Date: 2006/11/02 15:27:54 $ by $Author: gimmi $
 * 
 * @author <a href="mailto:eiki@idega.com">eiki</a>
 * @version $Revision: 1.5 $
 */
public interface Web2Business extends IBOService {

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToBehaviourLib
	 */
	public String getBundleURIToBehaviourLib() throws java.rmi.RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToReflectionLib
	 */
	public String getBundleURIToReflectionLib() throws java.rmi.RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToPrototypeLib
	 */
	public String getBundleURIToPrototypeLib() throws java.rmi.RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToPrototypeLib
	 */
	public String getBundleURIToPrototypeLib(String scriptaculousLibraryVersion) throws java.rmi.RemoteException;


	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToRico
	 */
	public String getBundleURIToRico();

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToScriptaculousLib
	 */
	public String getBundleURIToScriptaculousLib() throws java.rmi.RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToScriptaculousLib
	 */
	public String getBundleURIToScriptaculousLib(String scriptaculousLibraryVersion) throws java.rmi.RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToScriptaculousLibRootFolder
	 */
	public String getBundleURIToScriptaculousLibRootFolder() throws java.rmi.RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToScriptaculousLibRootFolder
	 */
	public String getBundleURIToScriptaculousLibRootFolder(String scriptaculousLibraryVersion)
			throws java.rmi.RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToScriptsFolder
	 */
	public String getBundleURIToScriptsFolder() throws java.rmi.RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIWithinScriptsFolder
	 */
	public String getBundleURIWithinScriptsFolder(String uriExtension) throws java.rmi.RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleIdentifier
	 */
	public String getBundleIdentifier() throws java.rmi.RemoteException;
	
	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToJMakiWidgetsFolder
	 */
	public String getBundleURIToJMakiWidgetsFolder() throws java.rmi.RemoteException;
	
	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToJMakiLib
	 */
	public String getBundleURIToJMakiLib() throws java.rmi.RemoteException;
}
