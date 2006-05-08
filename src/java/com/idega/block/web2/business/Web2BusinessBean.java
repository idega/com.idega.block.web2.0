/*
 * $Id: Web2BusinessBean.java,v 1.9 2006/05/08 11:20:09 laddi Exp $
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

/**
 * A service bean with handy methods for getting paths to Web 2.0 script libraries and more.
 * Scripts include<br>
 * Scriptaculous - Effects and drag and drop, just include prototype.js file first then scriptaculous.js file, <a href="http://script.aculo.us/">http://script.aculo.us/</a><br/> 
 * Prototype - Dom search and manipulation and Ajax and OOP addons for javascript, just include the prototype.js file, <a href="http://prototype.conio.net/ ">http://prototype.conio.net/</a> , a quick guide http://particletree.com/features/quick-guide-to-prototype/<br/> 
 * Behaviour - Get clean HTML by registering javascript unto CSS classes, just include the behaviour.js file,  <a href="http://bennolan.com/behaviour/">http://bennolan.com/behaviour/</a><br/>
 * Reflection - Create a reflection effect for your images, include the reflection.js file and add the css class "reflect" to your image, <a href="http://cow.neondragon.net/stuff/reflection/">http://cow.neondragon.net/stuff/reflection/</a>
 * 
 * Last modified: $Date: 2006/05/08 11:20:09 $ by $Author: laddi $
 * 
 * @author <a href="mailto:eiki@idega.com">Eirikur S. Hrafnsson</a>
 * @version $Revision: 1.9 $
 */
public class Web2BusinessBean extends IBOServiceBean implements Web2Business{
	
	
	public static final String SCRIPTACULOUS_LATEST_VERSION = Web2BusinessBean.SCRIPTACULOUS_VERSION_1_6_1;

	public static final String SCRIPTACULOUS_VERSION_1_5_1 = "1.5.1";
	public static final String SCRIPTACULOUS_VERSION_1_6_1 = "1.6.1";
	
	public static final String SCRIPTACULOUS_ROOT_FOLDER_NAME_PREFIX = "scriptaculous-js-";
	public static final String SCRIPTACULOUS_JS_FILE_NAME = "scriptaculous.js";
	public static final String PROTOTYPE_JS_FILE_NAME = "prototype.js";
	public static final String BEHAVIOUR_JS_FILE_NAME = "behaviour.js";
	public static final String REFLECTION_JS_FILE_NAME = "reflection.js";

	public static final String WEB2_BUNDLE_IDENTIFIER = "com.idega.block.web2.0";

	protected String rootScriptsFolderBundleURI;
	protected String behaviourScriptPath;
	protected String reflectionScriptPath;
	protected String scriptaculousScriptPath;
	protected String prototypeScriptPath;
	
	//private static final String REFLECTION_FOLDER_NAME = "reflection";	
	
	/**
	 * 
	 * @return The full URI with context to the latest version of the behaviour.js library (special modified version to work alongside Scriptaculous)
	 */
	public String getBundleURIToBehaviourLib(){
		if(this.behaviourScriptPath==null){
			this.behaviourScriptPath = getBundleURIWithinScriptsFolder(BEHAVIOUR_JS_FILE_NAME);
		}
		
		return this.behaviourScriptPath;
	}
	
	/**
	 * 
	 * @return The full URI with context to the latest version of the reflection.js library, works with all browser that support the "canvas" tag
	 */
	public String getBundleURIToReflectionLib(){
		if(this.reflectionScriptPath==null){
			StringBuffer buf = new StringBuffer();
			buf.append("REFLECTION_FOLDER_NAME").append("/").append(REFLECTION_JS_FILE_NAME);
			
			this.reflectionScriptPath = getBundleURIWithinScriptsFolder(buf.toString());
		}
		return this.reflectionScriptPath;
	}
	
	/**
	 * 
	 * @return The full URI with context to the latest version of the prototype.js library (within the latest Scriptaculous folder) 
	 */
	public String getBundleURIToPrototypeLib(){
		if(this.prototypeScriptPath==null){
			this.prototypeScriptPath =  getBundleURIToPrototypeLib(SCRIPTACULOUS_LATEST_VERSION);
		}
		
		return this.prototypeScriptPath;
	}
	
	/**
	 * @param scriptaculousLibraryVersion The version for the scriptaculous library
	 * @return The full URI with context to the prototype.js library of a specific version of the Scriptaculous library 
	 */
	public String getBundleURIToPrototypeLib(String scriptaculousLibraryVersion){
		StringBuffer buf = new StringBuffer(getBundleURIToScriptaculousLibRootFolder(scriptaculousLibraryVersion));
		buf.append("lib/").append(PROTOTYPE_JS_FILE_NAME);
		return buf.toString();
	}
	
	/**
	 * 
	 * @return The full URI with context to the latest version of the scriptaculous.js, ATTENTION scriptaculous needs prototype.js added before it!
	 */
	public String getBundleURIToScriptaculousLib(){
		if(this.scriptaculousScriptPath==null){
			this.scriptaculousScriptPath =  getBundleURIToScriptaculousLib(SCRIPTACULOUS_LATEST_VERSION);
		}
		
		return this.scriptaculousScriptPath;
	}
	
	/**
	 * @param scriptaculousLibraryVersion The version for the scriptaculous library
	 * @return The full URI with context to the specific version of the scriptaculous.js, ATTENTION scriptaculous needs prototype.js added before it!
	 */
	public String getBundleURIToScriptaculousLib(String scriptaculousLibraryVersion){
		StringBuffer buf = new StringBuffer(getBundleURIToScriptaculousLibRootFolder(scriptaculousLibraryVersion));
		buf.append("src/").append(SCRIPTACULOUS_JS_FILE_NAME);
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
	 * @param scriptaculousLibraryVersion The version for the scriptaculous library
	 * @return The full URI with context to the specific version of the scriptaculous.js root folder, usually ../ from scriptaculous.js
	 */
	public String getBundleURIToScriptaculousLibRootFolder(String scriptaculousLibraryVersion){
		StringBuffer buf = new StringBuffer();
		buf.append(SCRIPTACULOUS_ROOT_FOLDER_NAME_PREFIX).append(scriptaculousLibraryVersion).append("/");
		return getBundleURIWithinScriptsFolder(buf.toString());
	}
	
	/**
	 * 
	 * @return The full URI with context to the all the script's parent folder e.g. web2.0.bundle/resources/javascript/
	 */
	public String getBundleURIToScriptsFolder(){
		if(this.rootScriptsFolderBundleURI == null){
			IWBundle iwb = this.getBundle();
			this.rootScriptsFolderBundleURI = iwb.getResourcesVirtualPath()+"/javascript/";
		}
		return this.rootScriptsFolderBundleURI;
	}
	
	
	/**
	 * @param uriExtension a path within the scripts folder
	 * @return The full URI with context to a resource within the parent script folder e.g. uriExtension="scriptaculous-js-1.6.1/test/" would result in "...web2.0.bundle/resources/javascript/scriptaculous-js-1.6.1/test/"
	 */
	public String getBundleURIWithinScriptsFolder(String uriExtension){
		StringBuffer buf = new StringBuffer(getBundleURIToScriptsFolder());
		buf.append(uriExtension);
		return buf.toString();
	}
	
	public String getBundleIdentifier(){
		return WEB2_BUNDLE_IDENTIFIER;
	}
	
}
