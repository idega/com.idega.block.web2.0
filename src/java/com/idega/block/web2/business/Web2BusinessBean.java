/*
 * $Id: Web2BusinessBean.java,v 1.9.2.6 2008/09/11 06:31:34 alexis Exp $
 * Created on May 3, 2006
 *
 * Copyright (C) 2006 Idega Software hf. All Rights Reserved.
 *
 * This software is the proprietary information of Idega hf.
 * Use is subject to license terms.
 */
package com.idega.block.web2.business;

import org.apache.myfaces.renderkit.html.util.AddResource;
import org.apache.myfaces.renderkit.html.util.AddResourceFactory;

import com.idega.business.IBOServiceBean;
import com.idega.idegaweb.IWBundle;
import com.idega.presentation.IWContext;
import com.idega.util.PresentationUtil;

/**
 * A service bean with handy methods for getting paths to Web 2.0 script libraries and more.
 * Scripts include<br>
 * Scriptaculous - Effects and drag and drop, just include prototype.js file first then scriptaculous.js file, <a href="http://script.aculo.us/">http://script.aculo.us/</a><br/> 
 * Prototype - Dom search and manipulation and Ajax and OOP addons for javascript, just include the prototype.js file, <a href="http://prototype.conio.net/ ">http://prototype.conio.net/</a> , a quick guide http://particletree.com/features/quick-guide-to-prototype/<br/> 
 * Behaviour - Get clean HTML by registering javascript unto CSS classes, just include the behaviour.js file,  <a href="http://bennolan.com/behaviour/">http://bennolan.com/behaviour/</a><br/>
 * Reflection - Create a reflection effect for your images, include the reflection.js file and add the css class "reflect" to your image, <a href="http://cow.neondragon.net/stuff/reflection/">http://cow.neondragon.net/stuff/reflection/</a>
 * Mootools - A great Web2 library with effects, plugins, extendable and lightweight, http://www.mootools.net
 * Lightbox - Displays a masked frame in a page, great for presenting images,iframes and more. Two implementations http://www.huddletogether.com/projects/lightbox2/ and http://particletree.com/features/lightbox-gone-wild/
 * Thickbox - A lightbox clone that works better in most browsers, based on JQuery. http://jquery.com/demo/thickbox/
 * Niftycube - A library to create rounded corners on anything, http://www.html.it/articoli/niftycube/index.html
 * SoundManager2 - A library that uses a flash object and JS to play sounds, http://www.schillmania.com/projects/soundmanager2/
 * MOOdalBox - An HTML Lightbox, based on Mootools, http://www.e-magine.ro/web-dev-and-design/36/moodalbox/
 * Transcorners - Rounds corners of provided DOM element, based on Mootools: http://inviz.ru/moo/transcorners/
 * Reflection - This is an improved version of the reflection.js script rewritten for mootools, http://www.digitalia.be/software/reflectionjs-for-mootools
 * InlineEdit - MooTools based plugin for creating inline edit type widgets dynamically out of any tag element that can hold text, http://dev.justinmaier.com/inlineEdit2/
 * ContextMenu - a lightweight jQuery plugin that lets you selectively override the browser's right-click menu with a custom one of your own. http://www.trendskitchens.co.nz/jquery/contextmenu/
 * mooRainbow - Javascript color picker that allows you to visually choose and use colors as a real and useful application. http://moorainbow.woolly-sheep.net/
 * 
 * Last modified: $Date: 2008/09/11 06:31:34 $ by $Author: alexis $
 * 
 * @author <a href="mailto:eiki@idega.com">Eirikur S. Hrafnsson</a>
 * @version $Revision: 1.9.2.6 $
 */
public class Web2BusinessBean extends IBOServiceBean implements Web2Business{
	
	private static final long serialVersionUID = -3243625218823349983L;
	
	private static final String SLASH = "/";

	public static final String SCRIPTACULOUS_LATEST_VERSION = Web2BusinessBean.SCRIPTACULOUS_VERSION_1_7_0;

	public static final String SCRIPTACULOUS_VERSION_1_5_3 = "1.5.3";
	public static final String SCRIPTACULOUS_VERSION_1_6_1 = "1.6.1";
	public static final String SCRIPTACULOUS_VERSION_1_6_2 = "1.6.2";
	public static final String SCRIPTACULOUS_VERSION_1_7_0 = "1.7.0";
	
	public static final String DOJO_LATEST_VERSION = Web2BusinessBean.DOJO_VERSION_0_4_1;

	public static final String DOJO_VERSION_0_3_1 = "version.3.1";
	public static final String DOJO_VERSION_0_4_1 = "version.4.1";
	
	public static final String LIGHTBOX_LATEST_VERSION = Web2BusinessBean.LIGHTBOX_PARTICLETREE_VERSION;

	public static final String LIGHTBOX_VERSION_2_02 = "2.02";
	public static final String LIGHTBOX_PARTICLETREE_VERSION = "particletree";
	public static final String LIGTHBOX_SCRIPT_FILE = "lightbox.js";
	public static final String LIGTHBOX_STYLE_FILE = "lightbox.css";
	
	public static final String THICKBOX_LATEST_VERSION = Web2BusinessBean.THICKBOX_2_1_1_VERSION;
	public static final String THICKBOX_2_1_1_VERSION = "2.1.1";
	public static final String THICKBOX_SCRIPT_FILE = "thickbox.js";
	public static final String THICKBOX_STYLE_FILE = "thickbox.css";
	
	public static final String MOODALBOX_LATEST_VERSION = Web2BusinessBean.MOODALBOX_1_2_1_VERSION;
	public static final String MOODALBOX_1_2_1_VERSION = "1.2.1";
	public static final String MOODALBOX_COMPRESSED_SCRIPT_FILE = "moodalbox.js";
	public static final String MOODALBOX_STYLE_FILE = "moodalbox.css";
	public static final String MOODALBOX_FULL_SCRIPT_FILE = "moodalbox_full.js";
	
	public static final String MOOTOOLS_LATEST_VERSION = Web2BusinessBean.MOOTOOLS_1_11_VERSION;
	public static final String MOOTOOLS_1_0_0_VERSION = "1.0.0";
	public static final String MOOTOOLS_1_1_0_VERSION = "1.1.0";
	public static final String MOOTOOLS_1_11_VERSION = "1.11";
	public static final String MOOTOOLS_SCRIPT_FILE = "mootools-all.js";
	public static final String MOOTOOLS_COMPRESSED_SCRIPT_FILE = "mootools-all-compressed.js";
	public static final String MOOTOOLS_STYLE_FILE = "mootools.css";
	
	public static final String CONTEXT_MENU_LATEST_VERSION = Web2BusinessBean.CONTEXT_MENU_R2_VERSION;
	public static final String CONTEXT_MENU_R2_VERSION = "r2";
	public static final String CONTEXT_MENU_SCRIPT_FILE = "contextmenu.js";
	public static final String CONTEXT_MENU_COMPRESSED_SCRIPT_FILE = "contextmenu-compressed.js";
	
	public static final String REFLECTION_FOR_MOOTOOLS_LATEST_VERSION = Web2BusinessBean.REFLECTION_FOR_MOOTOOLS_1_1_VERSION;
	public static final String REFLECTION_FOR_MOOTOOLS_1_1_VERSION = "1.1";
	
	public static final String PROTOTYPE_LATEST_VERSION = Web2BusinessBean.PROTOTYPE_1_5_0_VERSION;
	public static final String PROTOTYPE_1_5_0_VERSION = "1.5.0";
	public static final String PROTOTYPE_1_4_0_VERSION = "1.4.0";
	
	public static final String MOORAINBOW_LATEST_VERSION = Web2BusinessBean.MOORAINBOW_1_1_VERSION;
	public static final String MOORAINBOW_1_1_VERSION = "1.1";
	public static final String MOORAINBOW_SCRIPT_FILE = "mooRainbow.js";
	public static final String MOORAINBOW_STYLE_FILE = "mooRainbow.css";
	
	public static final String INLINE_EDIT_LATEST_VERSION = Web2BusinessBean.INLINE_EDIT_1_1_VERSION;
	public static final String INLINE_EDIT_1_1_VERSION = "1.1";
	public static final String INLINE_EDIT_SCRIPT_FILE = "inlineEdit.js";
	
	public static final String JQUERY_COMPRESSED_SCRIPT_FILE = "jquery-compressed.js";
	public static final String JQUERY_SCRIPT_FILE = "jquery.js";
	public static final String JQUERY_LATEST_VERSION = Web2BusinessBean.JQUERY_1_2_3_VERSION;
	public static final String JQUERY_UI_LATEST_VERSION = Web2BusinessBean.JQUERY_UI_1_5b_VERSION;
	public static final String JQUERY_1_1_3_1_VERSION = "1.1.3.1";
	public static final String JQUERY_1_2_3_VERSION = "1.2.3";
	public static final String JQUERY_UI_1_5b_VERSION = "1.5b";
	
	public static final String SCRIPTACULOUS_ROOT_FOLDER_NAME_PREFIX = "scriptaculous";
	public static final String PROTOTYPE_ROOT_FOLDER_NAME_PREFIX = "prototype";
	public static final String LIGHTBOX_ROOT_FOLDER_NAME_PREFIX = "lightbox";
	public static final String THICKBOX_ROOT_FOLDER_NAME_PREFIX = "thickbox";
	public static final String NIFTYCUBE_FOLDER_NAME_PREFIX = "niftycube";
	public static final String MOOTOOLS_FOLDER_NAME_PREFIX = "mootools";
	public static final String MOODALBOX_ROOT_FOLDER_NAME_PREFIX = "moodalbox";
	public static final String TRANSCORNERS_ROOT_FOLDER_NAME_PREFIX = "transcorners";
	public static final String INLINE_EDIT_FOLDER_NAME_PREFIX = "inlineEdit";
	public static final String REFLECTION_ROOT_FOLDER_NAME_PREFIX = "reflection";
	public static final String REFLECTION_FOR_MOOTOOLS_ROOT_FOLDER_NAME_PREFIX = "for_mootools";
	public static final String CODEPRESS_ROOT_FOLDER_NAME_PREFIX = "codepress";
	public static final String MOORAINBOW_FOLDER_NAME_PREFIX = "moorainbow";
	public static final String CONTEXT_MENU_FOLDER_NAME_PREFIX = "contextmenu";
	public static final String JQUERY_FOLDER_NAME_PREFIX = "jquery";
	
	public static final String SCRIPTACULOUS_JS_FILE_NAME = "scriptaculous.js";
	public static final String PROTOTYPE_JS_FILE_NAME = "prototype.js";
	public static final String BEHAVIOUR_JS_FILE_NAME = "behaviour.js";
	public static final String REFLECTION_JS_FILE_NAME = "reflection.js";
	public static final String RICO_JS_FILE_NAME = "rico.js";
	public static final String DOJO_JS_FILE_NAME = "dojo.js";
	public static final String JMAKI_JS_FILE_NAME = "jmaki.js";
	public static final String JQUERY_COMPRESSED_JS_FILE_NAME = "jquery-compressed.js";
	public static final String CONTROL_MODAL_JS_FILE_NAME = "control.modal.js";
	public static final String NIFTYCUBE_JS_FILE_NAME = "niftycube.js";
	public static final String TRANSCORNERS_JS_FILE_NAME = "Transcorners.js";
	public static final String CODEPRESS_JS_FILE_NAME = "codepress.js";
	
	public static final String SOUNDMANAGER2_JS_FILE_NAME = "soundmanager2.js";
	public static final String SOUNDMANAGER2_FLASH_FILE = "soundmanager2.swf";
	public static final String SOUNDMANAGER2_FOLDER_NAME = "soundmanager2";
	public static final String SOUNDMANAGER2_TEST_FILE_NAME = "test-click.mp3";
		
	public static final String WEB2_BUNDLE_IDENTIFIER = "com.idega.block.web2.0";

	public static final String MOOTOOLS_BASED_BEHAVIOUR_FILE = "behaviour-mootools.js";

	protected String rootScriptsFolderBundleURI;
	protected String rootLibsFolderBundleURI;
	protected String behaviourScriptPath;
	protected String reflectionScriptPath;
	protected String scriptaculousScriptPath;
	protected String prototypeScriptPath;
	protected String ricoScriptPath;
	protected String jMakiWidgetsURI;
	protected String jMakiScriptPath;
	protected String dojoScriptPath;
	protected String jQueryCompressedScriptPath = null;
	protected String controlModalScriptPath = null;
	
	private String lightboxScriptPath = null;
	private String lightboxStylePath = null;
	private String lightboxImagesPath = null;
	private String lightboxScriptFilePath = null;
	private String lightboxStyleFilePath = null;
	
	private String thickboxScriptPath = null;
	private String thickboxStylePath = null;
	private String thickboxScriptFilePath = null;
	private String thickboxStyleFilePath = null;

	private String mooToolsScriptPath = null;
	private String mooToolsStylePath = null;
	
	private String soundManager2ScriptPath = null;
	private String soundManager2FlashFilePath = null;

	private String soundManager2TestFilePath = null;
	
	private String inlideEditScriptFilePath = null;
	
	private String moodalboxScriptPath = null;
	private String moodalboxStyleFilePath = null;
	private String moodalboxStylePath = null;
	
	private String transcornersScriptFilePath = null;
	
	private String reflectionForMootoolsScriptFilePath = null;
	
	private String codePressScriptFilePath = null;
	
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
	 * @return The full URI with context to the latest version of the SoundManager2 javascript sound api
	 */
	public String getBundleURIToSoundManager2Lib(){
		if(this.soundManager2ScriptPath==null){
			StringBuffer path = new StringBuffer(SOUNDMANAGER2_FOLDER_NAME).append(SLASH).append(SOUNDMANAGER2_JS_FILE_NAME);
			this.soundManager2ScriptPath = getBundleURIWithinScriptsFolder(path.toString());
		}
		
		return this.soundManager2ScriptPath;
	}
	
	/**
	 * 
	 * @return The full URI with context to the latest version of the SoundManager2 javascript sound api's flash file
	 */
	public String getBundleURIToSoundManager2FlashFile(){
		if(this.soundManager2FlashFilePath==null){
			StringBuffer path = new StringBuffer(SOUNDMANAGER2_FOLDER_NAME).append(SLASH).append(SOUNDMANAGER2_FLASH_FILE);
			this.soundManager2FlashFilePath = getBundleURIWithinScriptsFolder(path.toString());
		}
		
		return this.soundManager2FlashFilePath;
	}
	
	/**
	 * 
	 * @return The full URI with context to the latest version of the SoundManager2 javascript sound api's test file
	 */
	public String getBundleURIToSoundManager2TestSoundFile(){
		if(this.soundManager2TestFilePath==null){
			StringBuffer path = new StringBuffer(SOUNDMANAGER2_FOLDER_NAME).append(SLASH).append(SOUNDMANAGER2_TEST_FILE_NAME);
			this.soundManager2TestFilePath = getBundleURIWithinScriptsFolder(path.toString());
		}
		return this.soundManager2TestFilePath;
	}
	
	/**
	 * 
	 * @return The full URI with context to the latest version of the reflection.js library, works with all browser that support the "canvas" tag
	 */
	public String getBundleURIToReflectionLib(){
		if(this.reflectionScriptPath==null){
			StringBuffer buf = new StringBuffer();
			buf.append(REFLECTION_ROOT_FOLDER_NAME_PREFIX).append(SLASH).append(REFLECTION_JS_FILE_NAME);
			
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
	
	public String getInlineEditScriptPath() {
		if (inlideEditScriptFilePath == null) {
			StringBuffer script = new StringBuffer(getBundleUriToInlineEditScript());
			inlideEditScriptFilePath = script.toString();
		}
		return inlideEditScriptFilePath;
	}
	
	private String getPathToInlineEdit(String version) {
		return getBundleURIWithinScriptsFolder(new StringBuffer(INLINE_EDIT_FOLDER_NAME_PREFIX).append(SLASH).append(version).append(SLASH).toString());
	}
	
	public String getBundleUriToInlineEditScript(String version) {
		return new StringBuffer(getPathToInlineEdit(version)).append(INLINE_EDIT_SCRIPT_FILE).toString();
	}
	
	public String getBundleUriToInlineEditScript() {
		return getBundleUriToInlineEditScript(INLINE_EDIT_LATEST_VERSION);
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
	
	public String getBundleURIToDojoLib() {
		if(this.dojoScriptPath == null){
			this.dojoScriptPath =  getBundleURIWithinLibsFolder("dojo/" + DOJO_LATEST_VERSION + SLASH + DOJO_JS_FILE_NAME);
		}
		return this.dojoScriptPath;
	}
	
	private String getPathToContextMenu(String version) {
		return getBundleURIWithinScriptsFolder(new StringBuffer(CONTEXT_MENU_FOLDER_NAME_PREFIX).append(SLASH).append(version).append(SLASH).toString());
	}
	
	public String getBundleUriToContextMenuScript(String version, boolean compressedFile) {
		StringBuffer uri = new StringBuffer(getPathToContextMenu(version));
		String file = CONTEXT_MENU_SCRIPT_FILE;
		if (compressedFile) {
			file = CONTEXT_MENU_COMPRESSED_SCRIPT_FILE;
		}
		uri.append(file);
		return uri.toString();
	}
	
	public String getBundleUriToContextMenuScript(boolean compressedFile) {
		return getBundleUriToContextMenuScript(Web2BusinessBean.CONTEXT_MENU_LATEST_VERSION, compressedFile);
	}
	
	public String getBundleUriToContextMenuScript() {
		return getBundleUriToContextMenuScript(Web2BusinessBean.CONTEXT_MENU_LATEST_VERSION, true);
	}
	
	/**
	 * 
	 * @return The full URI with context to the latest version of the scriptaculous.js, ATTENTION scriptaculous needs prototype.js added before it!
	 */
	public String getBundleURIToScriptaculousLib(){
		if(this.scriptaculousScriptPath==null){
			this.scriptaculousScriptPath = getBundleURIToScriptaculousLib(SCRIPTACULOUS_LATEST_VERSION);
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
	
	private String getPathToMooRainbow(String version) {
		return getBundleURIWithinScriptsFolder(new StringBuffer(MOORAINBOW_FOLDER_NAME_PREFIX).append(SLASH).append(version).append(SLASH).toString());
	}
	
	public String getBundleUriToMooRainbowScript(String version) {
		return new StringBuffer(getPathToMooRainbow(version)).append(MOORAINBOW_SCRIPT_FILE).toString();
	}
	
	public String getBundleUriToMooRainbowScript() {
		return getBundleUriToMooRainbowScript(MOORAINBOW_LATEST_VERSION);
	}
	
	public String getBundleUriToMooRainbowStyle(String version) {
		return new StringBuffer(getPathToMooRainbow(version)).append(MOORAINBOW_STYLE_FILE).toString();
	}
	
	public String getBundleUriToMooRainbowStyle() {
		return getBundleUriToMooRainbowStyle(MOORAINBOW_LATEST_VERSION);
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
		buf.append(SCRIPTACULOUS_ROOT_FOLDER_NAME_PREFIX).append(SLASH).append(scriptaculousLibraryVersion).append(SLASH);
		return getBundleURIWithinScriptsFolder(buf.toString());
	}
	
	
	/**
	 * 
	 * @return The full URI with context to the latest version of the mootools-all-compressed.js
	 */
	public String getBundleURIToMootoolsLib(){
		if(this.mooToolsScriptPath==null){
			this.mooToolsScriptPath = getBundleURIToMootoolsLib(MOOTOOLS_LATEST_VERSION);
		}
		
		return this.mooToolsScriptPath;
	}
	
	/**
	 * @param mootoolsLibraryVersion The version for the mootools library
	 * @return The full URI with context to the specific version of the mootools-all-compressed.js
	 */
	public String getBundleURIToMootoolsLib(String mootoolsLibraryVersion){
		StringBuffer buf = new StringBuffer();
		buf.append(MOOTOOLS_FOLDER_NAME_PREFIX).append(SLASH).append(mootoolsLibraryVersion).append(SLASH).append(MOOTOOLS_COMPRESSED_SCRIPT_FILE);
		//temp 
	//	buf.append(MOOTOOLS_FOLDER_NAME_PREFIX).append(SLASH).append(mootoolsLibraryVersion).append(SLASH).append("mootools.js");
		return getBundleURIWithinScriptsFolder(buf.toString());
	}
	
	/**
	 * 
	 * @return The full URI with context to the mootools.css (same for all versions)
	 */
	public String getBundleURIToMootoolsStyleFile() {
		if (mooToolsStylePath == null) {
			StringBuffer style = new StringBuffer().append(MOOTOOLS_FOLDER_NAME_PREFIX).append(SLASH).append("css").append(SLASH).append(MOOTOOLS_STYLE_FILE);
			mooToolsStylePath = getBundleURIWithinScriptsFolder(style.toString());
		}
		return mooToolsStylePath;
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
	
	public String getBundleURIToLibsFolder() {
		if(this.rootLibsFolderBundleURI == null) {
			IWBundle iwb = this.getBundle();
			this.rootLibsFolderBundleURI = iwb.getResourcesVirtualPath() + "/libs/";
		}
		return this.rootLibsFolderBundleURI;
	}
	
	public String getBundleURIWithinLibsFolder(String uriExtension) {
		StringBuffer buf = new StringBuffer(getBundleURIToLibsFolder());
		buf.append(uriExtension);
		return buf.toString();
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
	
	public String getBundleURIToRicoLib(){
		if(this.ricoScriptPath==null){
			this.ricoScriptPath =  getBundleURIWithinScriptsFolder(RICO_JS_FILE_NAME);
		}
		
		return this.ricoScriptPath;
	}
	
	
	/**
	 * 
	 * @return The full URI with context to version 1.4 of the prototype.js library (standard download) 
	 */
	public String getBundleURIToRico(){
		if(this.ricoScriptPath==null){
			this.ricoScriptPath =  getBundleURIWithinScriptsFolder(RICO_JS_FILE_NAME);
		}
		
		return this.ricoScriptPath;
	}
	
	/**
	 * 
	 * @return The full URI with context to the jMaki widgets parent folder e.g. web2.0.bundle/resources/jmaki/
	 */
	public String getBundleURIToJMakiWidgetsFolder(){
		if(this.jMakiWidgetsURI == null){
			IWBundle iwb = this.getBundle();
			this.jMakiWidgetsURI = iwb.getResourcesVirtualPath()+"/jmaki/";
		}
		return this.jMakiWidgetsURI;
	}
	
	/**
	 * 
	 * @return The full URI with context to the jmaki.js library
	 */
	public String getBundleURIToJMakiLib(){
		if(this.jMakiScriptPath == null){
			this.jMakiScriptPath = getBundleURIWithinScriptsFolder(JMAKI_JS_FILE_NAME);
		}
		return this.jMakiScriptPath;
	}
	
	public String getBundleURIToLightboxLibRootFolder() {
		return getBundleURIToLightboxLibRootFolder(LIGHTBOX_LATEST_VERSION);
	}
	
	public String getBundleURIToLightboxLibRootFolder(String versionNumber) {
		StringBuffer buf = new StringBuffer();
		buf.append(LIGHTBOX_ROOT_FOLDER_NAME_PREFIX).append(SLASH).append(versionNumber).append(SLASH);
		return getBundleURIWithinScriptsFolder(buf.toString());
	}

	public String getLightboxImagesPath() {
		if (lightboxImagesPath == null) {
			StringBuffer images = new StringBuffer(getBundleURIToLightboxLibRootFolder()).append("images").append(SLASH);
			lightboxImagesPath = images.toString();
		}
		return lightboxImagesPath;
	}

	public String getLightboxScriptPath() {
		if (lightboxScriptPath == null) {
			StringBuffer script = new StringBuffer(getBundleURIToLightboxLibRootFolder()).append("js").append(SLASH);
			lightboxScriptPath = script.toString();
		}
		return lightboxScriptPath;
	}

	public String getLightboxStylePath() {
		if (lightboxStylePath == null) {
			StringBuffer style = new StringBuffer(getBundleURIToLightboxLibRootFolder()).append("css").append(SLASH);
			lightboxStylePath = style.toString();
		}
		return lightboxStylePath;
	}
	
	public String getLightboxScriptFilePath() {
		if (lightboxScriptFilePath == null) {
			StringBuffer script = new StringBuffer(getLightboxScriptPath()).append(LIGTHBOX_SCRIPT_FILE);
			lightboxScriptFilePath = script.toString();
		}
		return lightboxScriptFilePath;
	}
	
	public String getLightboxStyleFilePath() {
		if (lightboxStyleFilePath == null) {
			StringBuffer style = new StringBuffer(getLightboxStylePath()).append(LIGTHBOX_STYLE_FILE);
			lightboxStyleFilePath = style.toString();
		}
		return lightboxStyleFilePath;
	}
	
	public String getBundleURIToThickboxLibRootFolder() {
		return getBundleURIToThickboxLibRootFolder(THICKBOX_LATEST_VERSION);
	}
	
	public String getBundleURIToThickboxLibRootFolder(String versionNumber) {
		StringBuffer buf = new StringBuffer();
		buf.append(THICKBOX_ROOT_FOLDER_NAME_PREFIX).append(SLASH).append(versionNumber).append(SLASH);
		return getBundleURIWithinScriptsFolder(buf.toString());
	}
	
	public String getThickboxScriptPath() {
		if (thickboxScriptPath == null) {
			StringBuffer script = new StringBuffer(getBundleURIToThickboxLibRootFolder()).append("js").append(SLASH);
			thickboxScriptPath = script.toString();
		}
		return thickboxScriptPath;
	}
	
	public String getThickboxStylePath() {
		if (thickboxStylePath == null) {
			StringBuffer style = new StringBuffer(getBundleURIToThickboxLibRootFolder()).append("css").append(SLASH);
			thickboxStylePath = style.toString();
		}
		return thickboxStylePath;
	}
	
	public String getThickboxScriptFilePath() {
		if (thickboxScriptFilePath == null) {
			StringBuffer script = new StringBuffer(getThickboxScriptPath()).append(THICKBOX_SCRIPT_FILE);
			thickboxScriptFilePath = script.toString();
		}
		return thickboxScriptFilePath;
	}
	
	public String getThickboxStyleFilePath() {
		if (thickboxStyleFilePath == null) {
			StringBuffer style = new StringBuffer(getThickboxStylePath()).append(THICKBOX_STYLE_FILE);
			thickboxStyleFilePath = style.toString();
		}
		return thickboxStyleFilePath;
	}
	
	public String getBundleURIToJQueryLib() {
		
		if(jQueryCompressedScriptPath == null)
			jQueryCompressedScriptPath = getBundleURIToJQueryLib(JQUERY_LATEST_VERSION);
		
		return jQueryCompressedScriptPath;
	}
	
	public String getBundleURIToJQueryLib(String jqueryLibraryVersion){
		StringBuffer buf = new StringBuffer();
		buf.append(JQUERY_FOLDER_NAME_PREFIX).append(SLASH).append(jqueryLibraryVersion).append(SLASH).append(JQUERY_COMPRESSED_SCRIPT_FILE);
		return getBundleURIWithinScriptsFolder(buf.toString());
	}
	
	public String getPrototypeScriptFilePath(String version) {
		StringBuffer script = new StringBuffer(getBundleURIToScriptsFolder()).append(PROTOTYPE_ROOT_FOLDER_NAME_PREFIX);
		script.append(SLASH).append(version).append(SLASH).append(PROTOTYPE_JS_FILE_NAME);
		return script.toString();
	}
	
	public String getBundleURIToControlModalLib() {
		if (controlModalScriptPath == null) {
			controlModalScriptPath = getBundleURIWithinScriptsFolder(CONTROL_MODAL_JS_FILE_NAME);
		}
		return controlModalScriptPath;
	}
	
	public String getNiftyCubeScriptFilePath() {
		StringBuffer script = new StringBuffer(getBundleURIToScriptsFolder()).append(NIFTYCUBE_FOLDER_NAME_PREFIX);
		script.append(SLASH).append(NIFTYCUBE_JS_FILE_NAME);
		return script.toString();
	}

	public String getMootoolsBasedBehaviourScriptFilePath() {
		StringBuffer script = new StringBuffer(getBundleURIToScriptsFolder()).append(MOOTOOLS_BASED_BEHAVIOUR_FILE);
		return script.toString();
	}
	
	/** MOOdalBox starts **/
	public String getMoodalboxScriptFilePath(boolean needFullScript) {
		StringBuffer script = new StringBuffer(getMoodalboxScriptPath());
		if (needFullScript) {
			script.append(MOODALBOX_FULL_SCRIPT_FILE);
		}
		else {
			script.append(MOODALBOX_COMPRESSED_SCRIPT_FILE);
		}
		return script.toString();
	}
	
	public String getMoodalboxStyleFilePath() {
		if (moodalboxStyleFilePath == null) {
			StringBuffer style = new StringBuffer(getMoodalboxStylePath()).append(MOODALBOX_STYLE_FILE);
			moodalboxStyleFilePath = style.toString();
		}
		return moodalboxStyleFilePath;
	}
	
	public String getMoodalboxStylePath() {
		if (moodalboxStylePath == null) {
			StringBuffer style = new StringBuffer(getBundleURIToMoodalboxLibRootFolder()).append("css").append(SLASH);
			moodalboxStylePath = style.toString();
		}
		return moodalboxStylePath;
	}
	
	public String getMoodalboxScriptPath() {
		if (moodalboxScriptPath == null) {
			StringBuffer script = new StringBuffer(getBundleURIToMoodalboxLibRootFolder()).append("js").append(SLASH);
			moodalboxScriptPath = script.toString();
		}
		return moodalboxScriptPath;
	}
	
	public String getBundleURIToMoodalboxLibRootFolder() {
		return getBundleURIToMoodalboxLibRootFolder(MOODALBOX_LATEST_VERSION);
	}
	
	public String getBundleURIToMoodalboxLibRootFolder(String versionNumber) {
		StringBuffer buf = new StringBuffer();
		buf.append(MOODALBOX_ROOT_FOLDER_NAME_PREFIX).append(SLASH).append(versionNumber).append(SLASH);
		return getBundleURIWithinScriptsFolder(buf.toString());
	}
	/** MOOdalBox ends **/
	
	public String getTranscornersScriptFilePath() {
		if (transcornersScriptFilePath == null) {
			StringBuffer script = new StringBuffer(getBundleURIToScriptsFolder()).append(TRANSCORNERS_ROOT_FOLDER_NAME_PREFIX);
			script.append(SLASH).append(TRANSCORNERS_JS_FILE_NAME);
			transcornersScriptFilePath = script.toString();
		}
		return transcornersScriptFilePath;
	}
	
	public String getReflectionForMootoolsScriptFilePath() {
		if (reflectionForMootoolsScriptFilePath == null) {
			StringBuffer script = new StringBuffer(getBundleURIToScriptsFolder()).append(REFLECTION_ROOT_FOLDER_NAME_PREFIX);
			script.append(SLASH).append(REFLECTION_FOR_MOOTOOLS_ROOT_FOLDER_NAME_PREFIX).append(SLASH);
			script.append(REFLECTION_FOR_MOOTOOLS_LATEST_VERSION).append(REFLECTION_JS_FILE_NAME);
			reflectionForMootoolsScriptFilePath = script.toString();
		}
		return reflectionForMootoolsScriptFilePath;
	}
	
	public String getCodePressScriptFilePath() {
		if (codePressScriptFilePath == null) {
			StringBuffer script = new StringBuffer(getBundleURIToScriptsFolder()).append(CODEPRESS_ROOT_FOLDER_NAME_PREFIX);
			script.append(SLASH).append(CODEPRESS_JS_FILE_NAME);
			codePressScriptFilePath = script.toString();
		}
		return codePressScriptFilePath;
	}
	
	public void addTablesorterScriptFilesToPage(IWContext iwc, String className, String theme) {
		if (theme == null || theme.equals("")) {
			theme = "blue";
		}
		PresentationUtil.addStyleSheetToHeader(iwc, getBundleURIToScriptsFolder() + "tablesorter/"+theme+"/style.css");
		PresentationUtil.addJavaScriptSourceLineToHeader(iwc, getBundleURIToScriptsFolder() + "tablesorter/jquery.1.2.3.packed.js");
		PresentationUtil.addJavaScriptSourceLineToHeader(iwc, getBundleURIToScriptsFolder() + "tablesorter/jquery.metadata.js");
		PresentationUtil.addJavaScriptSourceLineToHeader(iwc, getBundleURIToScriptsFolder() + "tablesorter/jquery.tablesorter.min.js");

		StringBuffer buffer = new StringBuffer();
		buffer.append("$(document).ready(function() { $('.").append(className).append("').tablesorter(); });");

		AddResource adder = AddResourceFactory.getInstance(iwc);
		adder.addInlineScriptAtPosition(iwc, AddResource.HEADER_BEGIN, buffer.toString());

	}
}
