/*
 * $Id: Web2BusinessBean.java,v 1.1 2006/05/03 14:55:22 eiki Exp $
 * Created on May 3, 2006
 *
 * Copyright (C) 2006 Idega Software hf. All Rights Reserved.
 *
 * This software is the proprietary information of Idega hf.
 * Use is subject to license terms.
 */
package com.idega.block.web2.business;

import com.idega.business.IBOServiceBean;
import com.idega.idegaweb.IWBundle;


public class Web2BusinessBean extends IBOServiceBean implements Web2Business{
	
	
	public static final String SCRIPTACULOUS_LATEST_VERSION = Web2BusinessBean.SCRIPTACULOUS_VERSION_1_6_1;

	public static final String SCRIPTACULOUS_VERSION_1_5_1 = "1.5.1";
	public static final String SCRIPTACULOUS_VERSION_1_6_1 = "1.6.1";
	
	public static final String SCRIPTACULOUS_ROOT_FOLDER_NAME_PREFIX = "scriptaculous-js-";
	public static final String SCRIPTACULOUS_JS_FILE_NAME = "scriptaculous.js";
	public static final String PROTOTYPE_JS_FILE_NAME = "prototype.js";
	public static final String BEHAVIOUR_JS_FILE_NAME = "behaviour.js";

	public static final String WEB2_BUNDLE_IDENTIFIER = "com.idega.block.web2.0";

	protected String rootScriptsFolderBundleURI;
	
	
	/**
	 * 
	 * @return The full URI with context to the latest version of the behaviour library (special modified version to work alongside Scriptaculous)
	 */
	public String getBundleURIToBehaviourLib(){
		return getBundleURIToPrototypeLib(SCRIPTACULOUS_LATEST_VERSION);
	}
	
	/**
	 * 
	 * @return The full URI with context to the latest version of the prototype.js library (within the latest Scriptaculous folder) 
	 */
	public String getBundleURIToPrototypeLib(){
		return getBundleURIToPrototypeLib(SCRIPTACULOUS_LATEST_VERSION);
	}
	
	/**
	 * 
	 * @return The full URI with context to the prototype.js library of a specific version of the Scriptaculous library 
	 */
	public String getBundleURIToPrototypeLib(String scriptaculousLibraryVersion){
		StringBuffer buf = new StringBuffer(getBundleURIToScriptaculousLibRootFolder(scriptaculousLibraryVersion));
		buf.append("/lib/").append(PROTOTYPE_JS_FILE_NAME);
		return buf.toString();
	}
	
	/**
	 * 
	 * @return The full URI with context to the latest version of the scriptaculous.js
	 */
	public String getBundleURIToScriptaculousLib(){
		return getBundleURIToScriptaculousLib(SCRIPTACULOUS_LATEST_VERSION);
	}
	
	/**
	 * 
	 * @return The full URI with context to the specific version of the scriptaculous.js
	 */
	public String getBundleURIToScriptaculousLib(String libraryVersion){
		StringBuffer buf = new StringBuffer(getBundleURIToScriptaculousLibRootFolder(libraryVersion));
		buf.append("/src/").append(SCRIPTACULOUS_JS_FILE_NAME);
		return buf.toString();
	}
	
	/**
	 * 
	 * @return The full URI with context to the latest version of the scriptaculous.js root folder, usually ../ from scriptaculous.js
	 */
	public String getBundleURIToScriptaculousLibRootFolder(){
		return getBundleURIToScriptaculousLibRootFolder(SCRIPTACULOUS_LATEST_VERSION);
	}
	
	/**
	 * 
	 * @return The full URI with context to the specific version of the scriptaculous.js root folder, usually ../ from scriptaculous.js
	 */
	public String getBundleURIToScriptaculousLibRootFolder(String libraryVersion){
		StringBuffer buf = new StringBuffer();
		buf.append(SCRIPTACULOUS_ROOT_FOLDER_NAME_PREFIX).append(libraryVersion).append("/");
		return buf.toString();
	}
	
	/**
	 * 
	 * @return The full URI with context to the all the script's parent folder e.g. web2.0.bundle/resources/javascript/
	 */
	public String getBundleURIToScriptFolder(){
		if(rootScriptsFolderBundleURI == null){
			IWBundle iwb = this.getBundle();
			rootScriptsFolderBundleURI = iwb.getResourcesPath()+"javascript/";
		}
		return rootScriptsFolderBundleURI;
	}
	
	
	/**
	 * @param uriExtension a path within the scripts folder
	 * @return The full URI with context to a resource within the parent script folder e.g. uriExtension="scriptaculous-js-1.6.1/test/" would result in "...web2.0.bundle/resources/javascript/scriptaculous-js-1.6.1/test/"
	 */
	public String getBundleURIWithinScriptFolder(String uriExtension){
		StringBuffer buf = new StringBuffer(getBundleURIToScriptFolder());
		buf.append(uriExtension);
		return buf.toString();
	}
	
	public String getBundleIdentifier(){
		return WEB2_BUNDLE_IDENTIFIER;
	}
	
}
