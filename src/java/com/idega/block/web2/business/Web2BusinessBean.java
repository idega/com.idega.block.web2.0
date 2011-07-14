/*
 * $Id: Web2BusinessBean.java,v 1.76 2009/05/05 08:59:35 valdas Exp $
 * Created on May 3, 2006
 *
 * Copyright (C) 2006 Idega Software hf. All Rights Reserved.
 *
 * This software is the proprietary information of Idega hf.
 * Use is subject to license terms.
 */
package com.idega.block.web2.business;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.myfaces.renderkit.html.util.AddResource;
import org.apache.myfaces.renderkit.html.util.AddResourceFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.idega.business.IBOServiceBean;
import com.idega.idegaweb.IWBundle;
import com.idega.presentation.IWContext;
import com.idega.util.CoreConstants;
import com.idega.util.CoreUtil;
import com.idega.util.PresentationUtil;
import com.idega.util.StringUtil;
import com.octo.captcha.service.CaptchaServiceException;

/**
 * A service bean with handy methods for getting paths to Web 2.0 script libraries and more.
 * Scripts include<br>
 * Scriptaculous - Effects and drag and drop, just include prototype.js file first then scriptaculous.js file, <a href="http://script.aculo.us/">http://script.aculo.us/</a><br/> 
 * Prototype - Dom search and manipulation and Ajax and OOP addons for javascript, just include the prototype.js file, <a href="http://prototype.conio.net/ ">http://prototype.conio.net/</a> , a quick guide http://particletree.com/features/quick-guide-to-prototype/<br/> 
 * Behaviour - Get clean HTML by registering javascript unto CSS classes, just include the behaviour.js file,  <a href="http://bennolan.com/behaviour/">http://bennolan.com/behaviour/</a><br/>
 * Reflection - Create a reflection effect for your images, include the reflection.js file and add the css class "reflect" to your image, <a href="http://cow.neondragon.net/stuff/reflection/">http://cow.neondragon.net/stuff/reflection/</a>
 * Mootools - A great Web2 library with effects, plugins, extendable and lightweight, http://www.mootools.net
 * Lightbox - Displays a masked frame in a page, great for presenting images,iframes and more. Two implementations http://www.huddletogether.com/projects/lightbox2/ and http://particletree.com/features/lightbox-gone-wild/
 * Slimbox - A lightbox clone based on mootools,http://www.digitalia.be/software/slimbox , there is an extended version as well http://homepage.mac.com/yukikun/software/slimbox_ex/
 * Thickbox - A lightbox clone that works better in most browsers, based on JQuery. http://jquery.com/demo/thickbox/
 * Niftycube - A library to create rounded corners on anything, http://www.html.it/articoli/niftycube/index.html
 * SoundManager2 - A library that uses a flash object and JS to play sounds, http://www.schillmania.com/projects/soundmanager2/
 * MOOdalBox - An HTML Lightbox, based on Mootools, http://www.e-magine.ro/web-dev-and-design/36/moodalbox/
 * Transcorners - Rounds corners of provided DOM element, based on Mootools: http://inviz.ru/moo/transcorners/
 * Reflection - This is an improved version of the reflection.js script rewritten for mootools, http://www.digitalia.be/software/reflectionjs-for-mootools
 * Mootabs - Creates tabs using MooTools. http://www.silverscripting.com/mootabs
 * mooRainbow - Javascript color picker that allows you to visually choose and use colors as a real and useful application. http://moorainbow.woolly-sheep.net/
 * InlineEdit - MooTools based plugin for creating inline edit type widgets dynamically out of any tag element that can hold text, http://dev.justinmaier.com/inlineEdit2/
 * ContextMenu - a lightweight jQuery plugin that lets you selectively override the browser's right-click menu with a custom one of your own. http://www.trendskitchens.co.nz/jquery/contextmenu/
 * jsTree - dymanic tree, based on jQuery. http://vakata.com/en/jstree
 * sexylightbox - another lightbox. http://www.coders.me/web-html-js-css/javascript/sexy-lightbox-2
 * fancybox - lightbox, Mac style. http://fancy.klade.lv
 * CodeMirror - In-browser code editing made slightly less painful. http://marijn.haverbeke.nl/codemirror/
 *
 * Last modified: $Date: 2009/05/05 08:59:35 $ by $Author: valdas $
 *
 * @author <a href="mailto:eiki@idega.com">Eirikur S. Hrafnsson</a>
 * @version $Revision: 1.76 $
 */
@Scope(BeanDefinition.SCOPE_SINGLETON)
@Service(Web2Business.SPRING_BEAN_IDENTIFIER)
public class Web2BusinessBean extends IBOServiceBean implements Web2Business {

	private static final long serialVersionUID = -3243625218823349983L;

	private static final String SLASH = CoreConstants.SLASH;

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

	public static final String THICKBOX_LATEST_VERSION = Web2BusinessBean.THICKBOX_3_1_VERSION;
	public static final String THICKBOX_3_1_VERSION = "3.1";
	public static final String THICKBOX_2_1_1_VERSION = "2.1.1";
	public static final String THICKBOX_SCRIPT_FILE = "thickbox.js";
	public static final String THICKBOX_STYLE_FILE = "thickbox.css";

	public static final String SLIMBOX_LATEST_VERSION = Web2BusinessBean.SLIMBOX_1_4_1_VERSION;
	public static final String SLIMBOX_1_4_1_VERSION = "1.4.1";
	public static final String SLIMBOX_SCRIPT_FILE = "slimbox.js";
	public static final String SLIMBOX_STYLE_FILE = "slimbox.css";

	public static final String MOODALBOX_LATEST_VERSION = Web2BusinessBean.MOODALBOX_1_2_1_VERSION;
	public static final String MOODALBOX_1_2_1_VERSION = "1.2.1";
	public static final String MOODALBOX_COMPRESSED_SCRIPT_FILE = "moodalbox.js";
	public static final String MOODALBOX_STYLE_FILE = "moodalbox.css";
	public static final String MOODALBOX_FULL_SCRIPT_FILE = "moodalbox_full.js";

	public static final String MOOTOOLS_LATEST_VERSION = Web2BusinessBean.MOOTOOLS_1_11_VERSION;
	public static final String MOOTOOLS_1_0_0_VERSION = "1.0.0";
	public static final String MOOTOOLS_1_1_0_VERSION = "1.1.0";
	public static final String MOOTOOLS_1_11_VERSION = "1.11";
	public static final String MOOTOOLS_1_2_1_VERSION = "1.2.1";
	public static final String MOOTOOLS_SCRIPT_FILE = "mootools-all.js";
	public static final String MOOTOOLS_COMPRESSED_SCRIPT_FILE = "mootools-all-compressed.js";
	public static final String MOOTOOLS_MORE_SCRIPT_FILE = "mootools-more.js";
	public static final String MOOTOOLS_MORE_COMPRESSED_SCRIPT_FILE = "mootools-more-compressed.js";
	public static final String MOOTOOLS_STYLE_FILE = "mootools.css";


	public static final String TAGEDIT_SCRIPT_FILE_UI = "jquery-ui-1.8.6.custom.min.js";
	public static final String TAGEDIT_SCRIPT_FILE_AUTOGROW = "jquery.autoGrowInput.js";
	public static final String TAGEDIT_SCRIPT_FILE_TAGEDIT = "jquery.tagedit-1.2.0.js";

	public static final String TAGEDIT_STYLE_FILE_1 = "jquery.tagedit.css";
	public static final String TAGEDIT_STYLE_FILE_2 = "jquery-ui-1.8.6.custom.css";

	public static final String REFLECTION_FOR_MOOTOOLS_LATEST_VERSION = Web2BusinessBean.REFLECTION_FOR_MOOTOOLS_1_2_VERSION;
	public static final String REFLECTION_FOR_MOOTOOLS_1_1_VERSION = "1.1";
	public static final String REFLECTION_FOR_MOOTOOLS_1_2_VERSION = "1.2";

	public static final String PROTOTYPE_LATEST_VERSION = Web2BusinessBean.PROTOTYPE_1_5_0_VERSION;
	public static final String PROTOTYPE_1_5_0_VERSION = "1.5.0";
	public static final String PROTOTYPE_1_4_0_VERSION = "1.4.0";

	public static final String YUI_LATEST_VERSION = Web2BusinessBean.YUI_2_8_2_VERSION;
	public static final String YUI_2_3_0_VERSION = "2.3.0",
								YUI_2_8_2_VERSION = "2.8.2";
	public static final String YUI_UTILITIES_SCRIPT_FILE = "utilities.js";
	public static final String YUI_UTILITIES_COMRESSED_SCRIPT_FILE = "utilities_compressed.js";

	public static final String MOOTABS_LATEST_VERSION = Web2BusinessBean.MOOTABS_1_2_VERSION;
	public static final String MOOTABS_1_2_VERSION = "1.2";
	public static final String MOOTABS_SCRIPT_FILE = "mootabs.js";
	public static final String MOOTABS_STYLE_FILE = "mootabs.css";

	public static final String INLINE_EDIT_LATEST_VERSION = Web2BusinessBean.INLINE_EDIT_1_1_VERSION;
	public static final String INLINE_EDIT_1_1_VERSION = "1.1";
	public static final String INLINE_EDIT_SCRIPT_FILE = "inlineEdit.js";

	public static final String MOORAINBOW_LATEST_VERSION = Web2BusinessBean.MOORAINBOW_1_1_VERSION;
	public static final String MOORAINBOW_1_1_VERSION = "1.1";
	public static final String MOORAINBOW_SCRIPT_FILE = "mooRainbow.js";
	public static final String MOORAINBOW_STYLE_FILE = "mooRainbow.css";

	public static final String CONTEXT_MENU_LATEST_VERSION = Web2BusinessBean.CONTEXT_MENU_R2_VERSION;
	public static final String CONTEXT_MENU_R2_VERSION = "r2";
	public static final String CONTEXT_MENU_SCRIPT_FILE = "contextmenu.js";
	public static final String CONTEXT_MENU_COMPRESSED_SCRIPT_FILE = "contextmenu-compressed.js";

	public static final String HUMAN_MESAGES_LATEST_VERSION = Web2BusinessBean.HUMAN_MESAGES_1_0_VERSION;
	public static final String HUMAN_MESAGES_1_0_VERSION = "1.0";

	public static final String JS_TREE_LATEST_VERSION = Web2BusinessBean.JS_TREE_0_9_5_VERSION;
	public static final String JS_TREE_0_8_1_VERSION = "0.8.1";
	public static final String JS_TREE_0_9_5_VERSION = "0.9.5";
	public static final String JS_TREE_FILE = "tree_component";

	public static final String SEXY_LIGHT_BOX_LATEST_VERSION = Web2BusinessBean.SEXY_LIGHT_BOX_2_0_1_VERSION;
	public static final String SEXY_LIGHT_BOX_2_0_1_VERSION = "2.0.1";

	public static final String FANCY_BOX_LATEST_VERSION = Web2BusinessBean.FANCY_BOX_1_3_4_VERSION;
	public static final String FANCY_BOX_1_0_VERSION = "1.0";
	public static final String FANCY_BOX_1_2_1_VERSION = "1.2.1";
	public static final String FANCY_BOX_1_3_0_VERSION = "1.3.0";
	public static final String FANCY_BOX_1_3_1_VERSION = "1.3.1";
	public static final String FANCY_BOX_1_3_2_VERSION = "1.3.2";
	public static final String FANCY_BOX_1_3_3_VERSION = "1.3.3";
	public static final String FANCY_BOX_1_3_4_VERSION = "1.3.4";

	public static final String CODE_MIRROR_LATEST_VERSION = Web2BusinessBean.CODE_MIRROR_0_6_VERSION;
	public static final String CODE_MIRROR_0_6_VERSION = "0.6";

	public static final String SCRIPTACULOUS_ROOT_FOLDER_NAME_PREFIX = "scriptaculous";
	public static final String PROTOTYPE_ROOT_FOLDER_NAME_PREFIX = "prototype";
	public static final String LIGHTBOX_ROOT_FOLDER_NAME_PREFIX = "lightbox";
	public static final String THICKBOX_ROOT_FOLDER_NAME_PREFIX = "thickbox";
	public static final String NIFTYCUBE_FOLDER_NAME_PREFIX = "niftycube";
	public static final String MOOTOOLS_FOLDER_NAME_PREFIX = "mootools";
	public static final String TAGEDIT_FOLDER_NAME_PREFIX = "tagedit";
	public static final String MOODALBOX_ROOT_FOLDER_NAME_PREFIX = "moodalbox";
	public static final String TRANSCORNERS_ROOT_FOLDER_NAME_PREFIX = "transcorners";
	public static final String REFLECTION_ROOT_FOLDER_NAME_PREFIX = "reflection";
	public static final String REFLECTION_FOR_MOOTOOLS_ROOT_FOLDER_NAME_PREFIX = "for_mootools";
	public static final String CODEPRESS_ROOT_FOLDER_NAME_PREFIX = "codepress";
	public static final String JQGRID_ROOT_FOLDER_NAME_PREFIX = "jqgrid";
	public static final String JQGRID_3_0_VERSION = "3.0";
	public static final String JQGRID_LATEST_VERSION = Web2BusinessBean.JQGRID_3_0_VERSION;
	public static final String JQUERY_FOLDER_NAME_PREFIX = "jquery";
	public static final String JQUERY_UI_FOLDER_NAME_PREFIX = "jquery-ui";
	public static final String YUI_FOLDER_NAME_PREFIX = "yui";
	public static final String MOOTABS_FOLDER_NAME_PREFIX = "mootabs";
	public static final String MOORAINBOW_FOLDER_NAME_PREFIX = "moorainbow";
	public static final String SLIMBOX_ROOT_FOLDER_NAME_PREFIX = "slimbox";
	public static final String INLINE_EDIT_FOLDER_NAME_PREFIX = "inlineEdit";
	public static final String SMOOTHBOX_FOLDER_NAME_PREFIX = "smoothbox";
	public static final String CONTEXT_MENU_FOLDER_NAME_PREFIX = "contextmenu";
	public static final String HUMAN_MESSAGES_FOLDER_NAME_PREFIX = "humanmsg";
	public static final String GREY_BOX_FOLDER_NAME_PREFIX = "greybox";
	public static final String JQUERY_PLUGINS_FOLDER_NAME_PREFIX = "jquery-plugins";
	public static final String JS_TREE_FOLDER_NAME_PREFIX = "jsTree";
	public static final String SEXY_LIGHT_BOX_FOLDER_NAME_PREFIX = "sexylightbox";
	public static final String FANCY_BOX_FOLDER_NAME_PREFIX = "fancybox";
	public static final String CODE_MIRROR_FOLDER_NAME_PREFIX = "codemirror";
	
	public static final String SCRIPTACULOUS_JS_FILE_NAME = "scriptaculous.js";
	public static final String PROTOTYPE_JS_FILE_NAME = "prototype.js";
	public static final String BEHAVIOUR_JS_FILE_NAME = "behaviour.js";
	public static final String JQGRID_JS_FILE_NAME = "jquery.jqGrid.js";
	public static final String JQGRID_CSS_FILE_NAME = "grid.css";
	public static final String REFLECTION_JS_FILE_NAME = "reflection.js";
	public static final String RICO_JS_FILE_NAME = "rico.js";
	public static final String DOJO_JS_FILE_NAME = "dojo.js";
	public static final String JMAKI_JS_FILE_NAME = "jmaki.js";
	
	public static final String JQUERY_COMPRESSED_SCRIPT_FILE = "jquery-compressed.js";
	public static final String JQUERY_SCRIPT_FILE = "jquery.js";
	public static final String JQUERY_LATEST_VERSION = Web2BusinessBean.JQUERY_1_5_2_VERSION;
	public static final String JQUERY_UI_LATEST_VERSION = Web2BusinessBean.JQUERY_UI_1_5b_VERSION;
	public static final String JQUERY_1_1_3_1_VERSION = "1.1.3.1";
	public static final String JQUERY_1_2_3_VERSION = "1.2.3";
	public static final String JQUERY_1_2_6_VERSION = "1.2.6";
	public static final String JQUERY_1_3_VERSION = "1.3";
	public static final String JQUERY_1_3_1_VERSION = "1.3.1";
	public static final String JQUERY_1_3_2_VERSION = "1.3.2";
	public static final String JQUERY_1_4_VERSION = "1.4";
	public static final String JQUERY_1_4_1_VERSION = "1.4.1";
	public static final String JQUERY_1_4_2_VERSION = "1.4.2";
	public static final String JQUERY_1_4_4_VERSION = "1.4.4";
	public static final String JQUERY_1_5_1_VERSION = "1.5.1";
	public static final String JQUERY_1_5_2_VERSION = "1.5.2";
	public static final String JQUERY_UI_1_5b_VERSION = "1.5b";

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

	public static final String SMOOTHBOX_SCRIPT_FILE = "smoothbox.js";
	public static final String SMOOTHBOX_STYLE_FILE = "smoothbox.css";

	public static final String TINY_MCE_LATEST_VERSION = Web2BusinessBean.TINY_MCE_VERSION_3_2_6;
	public static final String TINY_MCE_VERSION_3_2_6 = "3.2.6";
	public static final String TINY_MCE_FOLDER = "tinymce";

	protected String rootScriptsFolderBundleURI;
	protected String rootLibsFolderBundleURI;
	protected String behaviourScriptPath;
	protected String jqGridScriptPath;
	protected String jqGridStylesPath;
	protected String reflectionScriptPath;
	protected String scriptaculousScriptPath;
	protected String prototypeScriptPath;
	protected String ricoScriptPath;
	protected String jMakiWidgetsURI;
	protected String jMakiScriptPath;
	protected String dojoScriptPath;
	protected String jQueryCompressedScriptPath;
	//re
	protected String jQueryUICompressedScriptPath;
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

	private String moodalboxScriptPath = null;
	private String moodalboxStyleFilePath = null;
	private String moodalboxStylePath = null;

	private String slimboxScriptPath = null;
	private String slimboxStylePath = null;
	private String slimboxStyleFilePath = null;

	private String transcornersScriptFilePath = null;

	private String reflectionForMootoolsScriptFilePath = null;

	private String codePressScriptFilePath = null;

	private String inlideEditScriptFilePath = null;

	private String smoothboxScriptFilePath = null;
	private String smoothboxStyleFilePath = null;

	@Autowired
	private JQuery jQuery;

	/**
	 *
	 * @return The full URI with context to the latest version of the behaviour.js library (special modified version to work alongside Scriptaculous)
	 */
	@Override
	public String getBundleURIToBehaviourLib(){
		if(this.behaviourScriptPath==null){
			this.behaviourScriptPath = getBundleURIWithinScriptsFolder(BEHAVIOUR_JS_FILE_NAME);
		}

		return this.behaviourScriptPath;
	}

	@Override
	public String getBundleURIToJQGrid(){

		if (jqGridScriptPath == null) {
			jqGridScriptPath = new StringBuffer(getBundleURIToScriptsFolder()).append(JQGRID_ROOT_FOLDER_NAME_PREFIX)
			.append(SLASH).append(JQGRID_LATEST_VERSION).append(SLASH).append(JQGRID_JS_FILE_NAME).toString();
		}
		return jqGridScriptPath;
	}

	@Override
	public String getBundleURIToJQGridStyles(){
		if (jqGridStylesPath == null) {
			jqGridStylesPath = new StringBuffer(getBundleURIToScriptsFolder()).append(JQGRID_ROOT_FOLDER_NAME_PREFIX)
			.append(SLASH).append(JQGRID_LATEST_VERSION).append("/themes/basic/grid.css").toString();
		}
		return jqGridStylesPath;
	}

	/**
	 *
	 * @return The full URI with context to the latest version of the SoundManager2 javascript sound api
	 */
	@Override
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
	@Override
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
	@Override
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
	@Override
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
	@Override
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
	@Override
	public String getBundleURIToPrototypeLib(String scriptaculousLibraryVersion){
		StringBuffer buf = new StringBuffer(getBundleURIToScriptaculousLibRootFolder(scriptaculousLibraryVersion));
		buf.append("lib/").append(PROTOTYPE_JS_FILE_NAME);
		return buf.toString();
	}

	@Override
	public String getBundleURIToDojoLib() {
		if(this.dojoScriptPath == null){
			this.dojoScriptPath =  getBundleURIWithinLibsFolder("dojo/" + DOJO_LATEST_VERSION + SLASH + DOJO_JS_FILE_NAME);
		}
		return this.dojoScriptPath;
	}

	/**
	 *
	 * @return The full URI with context to the latest version of the scriptaculous.js, ATTENTION scriptaculous needs prototype.js added before it!
	 */
	@Override
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
	@Override
	public String getBundleURIToScriptaculousLib(String scriptaculousLibraryVersion){
		StringBuffer buf = new StringBuffer(getBundleURIToScriptaculousLibRootFolder(scriptaculousLibraryVersion));
		buf.append("src/").append(SCRIPTACULOUS_JS_FILE_NAME);
		return buf.toString();
	}

	/**
	 *
	 * @return The full URI with context to the latest version of the scriptaculous.js root folder, usually ../ from scriptaculous.js
	 */
	@Override
	public String getBundleURIToScriptaculousLibRootFolder(){
		return getBundleURIToScriptaculousLibRootFolder(SCRIPTACULOUS_LATEST_VERSION);
	}

	/**
	 * @param scriptaculousLibraryVersion The version for the scriptaculous library
	 * @return The full URI with context to the specific version of the scriptaculous.js root folder, usually ../ from scriptaculous.js
	 */
	@Override
	public String getBundleURIToScriptaculousLibRootFolder(String scriptaculousLibraryVersion){
		StringBuffer buf = new StringBuffer();
		buf.append(SCRIPTACULOUS_ROOT_FOLDER_NAME_PREFIX).append(SLASH).append(scriptaculousLibraryVersion).append(SLASH);
		return getBundleURIWithinScriptsFolder(buf.toString());
	}


	/**
	 *
	 * @return The full URI with context to the latest version of the mootools-all-compressed.js
	 */
	@Override
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
	@Override
	public String getBundleURIToMootoolsLib(String mootoolsLibraryVersion){
		StringBuffer buf = new StringBuffer();
		buf.append(MOOTOOLS_FOLDER_NAME_PREFIX).append(SLASH).append(mootoolsLibraryVersion).append(SLASH).append(MOOTOOLS_COMPRESSED_SCRIPT_FILE);
		//temp
	//	buf.append(MOOTOOLS_FOLDER_NAME_PREFIX).append(SLASH).append(mootoolsLibraryVersion).append(SLASH).append("mootools.js");
		return getBundleURIWithinScriptsFolder(buf.toString());
	}

	/**
	 *
	 * @return The full URI with context to the latest version of the jquery-compressed.js
	 */
	@Override
	public String getBundleURIToJQueryLib() {

		if(jQueryCompressedScriptPath == null)
			jQueryCompressedScriptPath = getBundleURIToJQueryLib(JQUERY_LATEST_VERSION);

		return jQueryCompressedScriptPath;
	}

	/**
	 *
	 * @return The full URI with context to the latest version of the jquery-compressed.js
	 */
	@Override
	public String getBundleURIToJQueryUILib(JQueryUIType type) {

		return getBundleURIToJQueryUILib(JQUERY_UI_LATEST_VERSION, type.getFileName());
	}

	@Override
	public String getBundleURIToJQueryPlugin(JQueryPlugin plugin) {
		StringBuilder uri = new StringBuilder(JQUERY_PLUGINS_FOLDER_NAME_PREFIX).append(SLASH).append(JQUERY_FOLDER_NAME_PREFIX).append(plugin.getFileName());
		return getBundleURIWithinScriptsFolder(uri.toString());
	}

	/**
	 * @param jqueryLibraryVersion The version for the jquery library
	 * @return The full URI with context to the specific version of the jquery-compressed.js
	 */
	@Override
	public String getBundleURIToJQueryLib(String jqueryLibraryVersion){
		StringBuffer buf = new StringBuffer();
		buf.append(JQUERY_FOLDER_NAME_PREFIX).append(SLASH).append(jqueryLibraryVersion).append(SLASH).append(JQUERY_COMPRESSED_SCRIPT_FILE);
//		buf.append(JQUERY_FOLDER_NAME_PREFIX).append(SLASH).append(jqueryLibraryVersion).append(SLASH).append(JQUERY_SCRIPT_FILE);
		return getBundleURIWithinScriptsFolder(buf.toString());
	}

	@Override
	public String getBundleURIToJQueryUILib(String jqueryUILibraryVersion, String fileName) {
		StringBuffer buf = new StringBuffer();
		buf.append(JQUERY_UI_FOLDER_NAME_PREFIX).append(SLASH).append(jqueryUILibraryVersion).append(SLASH).append(fileName);
		return getBundleURIWithinScriptsFolder(buf.toString());
	}

	/**
	 *
	 * @return The full URI with context to the mootools.css (same for all versions)
	 */
	@Override
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
	@Override
	public String getBundleURIToScriptsFolder(){
		if(this.rootScriptsFolderBundleURI == null){
			IWBundle iwb = this.getBundle();
			this.rootScriptsFolderBundleURI = iwb.getResourcesVirtualPath()+"/javascript/";
		}
		return this.rootScriptsFolderBundleURI;
	}

	@Override
	public String getBundleURIToLibsFolder() {
		if(this.rootLibsFolderBundleURI == null) {
			IWBundle iwb = this.getBundle();
			this.rootLibsFolderBundleURI = iwb.getResourcesVirtualPath() + "/libs/";
		}
		return this.rootLibsFolderBundleURI;
	}

	@Override
	public String getBundleURIWithinLibsFolder(String uriExtension) {
		StringBuffer buf = new StringBuffer(getBundleURIToLibsFolder());
		buf.append(uriExtension);
		return buf.toString();
	}


	/**
	 * @param uriExtension a path within the scripts folder
	 * @return The full URI with context to a resource within the parent script folder e.g. uriExtension="scriptaculous-js-1.6.1/test/" would result in "...web2.0.bundle/resources/javascript/scriptaculous-js-1.6.1/test/"
	 */
	@Override
	public String getBundleURIWithinScriptsFolder(String uriExtension){
		StringBuffer buf = new StringBuffer(getBundleURIToScriptsFolder());
		buf.append(uriExtension);
		return buf.toString();
	}

	@Override
	public String getBundleIdentifier(){
		return WEB2_BUNDLE_IDENTIFIER;
	}

	@Override
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
	@Override
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
	@Override
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
	@Override
	public String getBundleURIToJMakiLib(){
		if(this.jMakiScriptPath == null){
			this.jMakiScriptPath = getBundleURIWithinScriptsFolder(JMAKI_JS_FILE_NAME);
		}
		return this.jMakiScriptPath;
	}

	@Override
	public String getBundleURIToLightboxLibRootFolder() {
		return getBundleURIToLightboxLibRootFolder(LIGHTBOX_LATEST_VERSION);
	}

	@Override
	public String getBundleURIToLightboxLibRootFolder(String versionNumber) {
		StringBuffer buf = new StringBuffer();
		buf.append(LIGHTBOX_ROOT_FOLDER_NAME_PREFIX).append(SLASH).append(versionNumber).append(SLASH);
		return getBundleURIWithinScriptsFolder(buf.toString());
	}

	@Override
	public String getLightboxImagesPath() {
		if (lightboxImagesPath == null) {
			StringBuffer images = new StringBuffer(getBundleURIToLightboxLibRootFolder()).append("images").append(SLASH);
			lightboxImagesPath = images.toString();
		}
		return lightboxImagesPath;
	}

	@Override
	public String getInlineEditScriptPath() {
		if (inlideEditScriptFilePath == null) {
			StringBuffer script = new StringBuffer(getBundleUriToInlineEditScript());
			inlideEditScriptFilePath = script.toString();
		}
		return inlideEditScriptFilePath;
	}

	public String getSmoothboxScriptPath() {
		if(smoothboxScriptFilePath == null) {
			StringBuffer script = new StringBuffer(getBundleUriToSmoothboxScript());
			smoothboxScriptFilePath = script.toString();
		}
		return smoothboxScriptFilePath;
	}

	public String getSmoothboxStylesheetPath() {
		if(smoothboxStyleFilePath == null) {
			StringBuffer script = new StringBuffer(getBundleUriToSmoothboxStylesheet());
			smoothboxStyleFilePath = script.toString();
		}
		return smoothboxStyleFilePath;
	}

	@Override
	public String getLightboxScriptPath() {
		if (lightboxScriptPath == null) {
			StringBuffer script = new StringBuffer(getBundleURIToLightboxLibRootFolder()).append("js").append(SLASH);
			lightboxScriptPath = script.toString();
		}
		return lightboxScriptPath;
	}

	@Override
	public String getLightboxStylePath() {
		if (lightboxStylePath == null) {
			StringBuffer style = new StringBuffer(getBundleURIToLightboxLibRootFolder()).append("css").append(SLASH);
			lightboxStylePath = style.toString();
		}
		return lightboxStylePath;
	}

	@Override
	public String getLightboxScriptFilePath() {
		if (lightboxScriptFilePath == null) {
			StringBuffer script = new StringBuffer(getLightboxScriptPath()).append(LIGTHBOX_SCRIPT_FILE);
			lightboxScriptFilePath = script.toString();
		}
		return lightboxScriptFilePath;
	}

	@Override
	public String getLightboxStyleFilePath() {
		if (lightboxStyleFilePath == null) {
			StringBuffer style = new StringBuffer(getLightboxStylePath()).append(LIGTHBOX_STYLE_FILE);
			lightboxStyleFilePath = style.toString();
		}
		return lightboxStyleFilePath;
	}

	@Override
	public String getBundleURIToThickboxLibRootFolder() {
		return getBundleURIToThickboxLibRootFolder(THICKBOX_LATEST_VERSION);
	}

	@Override
	public String getBundleURIToThickboxLibRootFolder(String versionNumber) {
		StringBuffer buf = new StringBuffer();
		buf.append(THICKBOX_ROOT_FOLDER_NAME_PREFIX).append(SLASH).append(versionNumber).append(SLASH);
		return getBundleURIWithinScriptsFolder(buf.toString());
	}

	@Override
	public String getThickboxScriptPath() {
		if (thickboxScriptPath == null) {
			StringBuffer script = new StringBuffer(getBundleURIToThickboxLibRootFolder()).append("js").append(SLASH);
			thickboxScriptPath = script.toString();
		}
		return thickboxScriptPath;
	}

	@Override
	public String getThickboxStylePath() {
		if (thickboxStylePath == null) {
			StringBuffer style = new StringBuffer(getBundleURIToThickboxLibRootFolder()).append("css").append(SLASH);
			thickboxStylePath = style.toString();
		}
		return thickboxStylePath;
	}

	@Override
	public String getThickboxScriptFilePath() {
		if (thickboxScriptFilePath == null) {
			StringBuffer script = new StringBuffer(getThickboxScriptPath()).append(THICKBOX_SCRIPT_FILE);
			thickboxScriptFilePath = script.toString();
		}
		return thickboxScriptFilePath;
	}

	@Override
	public String getThickboxStyleFilePath() {
		if (thickboxStyleFilePath == null) {
			StringBuffer style = new StringBuffer(getThickboxStylePath()).append(THICKBOX_STYLE_FILE);
			thickboxStyleFilePath = style.toString();
		}
		return thickboxStyleFilePath;
	}

	@Override
	public String getPrototypeScriptFilePath(String version) {
		StringBuffer script = new StringBuffer(getBundleURIToScriptsFolder()).append(PROTOTYPE_ROOT_FOLDER_NAME_PREFIX);
		script.append(SLASH).append(version).append(SLASH).append(PROTOTYPE_JS_FILE_NAME);
		return script.toString();
	}

	@Override
	public String getBundleURIToControlModalLib() {
		if (controlModalScriptPath == null) {
			controlModalScriptPath = getBundleURIWithinScriptsFolder(CONTROL_MODAL_JS_FILE_NAME);
		}
		return controlModalScriptPath;
	}

	@Override
	public String getNiftyCubeScriptFilePath() {
		StringBuffer script = new StringBuffer(getBundleURIToScriptsFolder()).append(NIFTYCUBE_FOLDER_NAME_PREFIX);
		script.append(SLASH).append(NIFTYCUBE_JS_FILE_NAME);
		return script.toString();
	}

	@Override
	public String getMootoolsBasedBehaviourScriptFilePath() {
		StringBuffer script = new StringBuffer(getBundleURIToScriptsFolder()).append(MOOTOOLS_BASED_BEHAVIOUR_FILE);
		return script.toString();
	}

	/** MOOdalBox starts **/
	@Override
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

	@Override
	public String getMoodalboxStyleFilePath() {
		if (moodalboxStyleFilePath == null) {
			StringBuffer style = new StringBuffer(getMoodalboxStylePath()).append(MOODALBOX_STYLE_FILE);
			moodalboxStyleFilePath = style.toString();
		}
		return moodalboxStyleFilePath;
	}

	@Override
	public String getMoodalboxStylePath() {
		if (moodalboxStylePath == null) {
			StringBuffer style = new StringBuffer(getBundleURIToMoodalboxLibRootFolder()).append("css").append(SLASH);
			moodalboxStylePath = style.toString();
		}
		return moodalboxStylePath;
	}

	@Override
	public String getMoodalboxScriptPath() {
		if (moodalboxScriptPath == null) {
			StringBuffer script = new StringBuffer(getBundleURIToMoodalboxLibRootFolder()).append("js").append(SLASH);
			moodalboxScriptPath = script.toString();
		}
		return moodalboxScriptPath;
	}

	@Override
	public String getBundleURIToMoodalboxLibRootFolder() {
		return getBundleURIToMoodalboxLibRootFolder(MOODALBOX_LATEST_VERSION);
	}

	@Override
	public String getBundleURIToMoodalboxLibRootFolder(String versionNumber) {
		StringBuffer buf = new StringBuffer();
		buf.append(MOODALBOX_ROOT_FOLDER_NAME_PREFIX).append(SLASH).append(versionNumber).append(SLASH);
		return getBundleURIWithinScriptsFolder(buf.toString());
	}
	/** MOOdalBox ends **/

	/** Slimbox starts **/
	@Override
	public String getSlimboxScriptFilePath() {
		StringBuffer script = new StringBuffer(getSlimboxScriptPath());
		script.append(SLIMBOX_SCRIPT_FILE);

		return script.toString();
	}

	@Override
	public String getSlimboxStyleFilePath() {
		if (slimboxStyleFilePath == null) {
			StringBuffer style = new StringBuffer(getSlimboxStylePath()).append(SLIMBOX_STYLE_FILE);
			slimboxStyleFilePath = style.toString();
		}
		return slimboxStyleFilePath;
	}

	public String getSlimboxStylePath() {
		if (slimboxStylePath == null) {
			StringBuffer style = new StringBuffer(getBundleURIToSlimboxLibRootFolder()).append("css").append(SLASH);
			slimboxStylePath = style.toString();
		}
		return slimboxStylePath;
	}

	public String getSlimboxScriptPath() {
		if (slimboxScriptPath == null) {
			StringBuffer script = new StringBuffer(getBundleURIToSlimboxLibRootFolder()).append("js").append(SLASH);
			slimboxScriptPath = script.toString();
		}
		return slimboxScriptPath;
	}

	public String getBundleURIToSlimboxLibRootFolder() {
		return getBundleURIToSlimboxLibRootFolder(SLIMBOX_LATEST_VERSION);
	}

	public String getBundleURIToSlimboxLibRootFolder(String versionNumber) {
		StringBuffer buf = new StringBuffer();
		buf.append(SLIMBOX_ROOT_FOLDER_NAME_PREFIX).append(SLASH).append(versionNumber).append(SLASH);
		return getBundleURIWithinScriptsFolder(buf.toString());
	}
	/** Slimbox ends **/

	@Override
	public String getTranscornersScriptFilePath() {
		if (transcornersScriptFilePath == null) {
			StringBuffer script = new StringBuffer(getBundleURIToScriptsFolder()).append(TRANSCORNERS_ROOT_FOLDER_NAME_PREFIX);
			script.append(SLASH).append(TRANSCORNERS_JS_FILE_NAME);
			transcornersScriptFilePath = script.toString();
		}
		return transcornersScriptFilePath;
	}

	@Override
	public String getReflectionForMootoolsScriptFilePath() {
		if (reflectionForMootoolsScriptFilePath == null) {
			StringBuffer script = new StringBuffer(getBundleURIToScriptsFolder()).append(REFLECTION_ROOT_FOLDER_NAME_PREFIX);
			script.append(SLASH).append(REFLECTION_FOR_MOOTOOLS_ROOT_FOLDER_NAME_PREFIX).append(SLASH);
			script.append(REFLECTION_FOR_MOOTOOLS_LATEST_VERSION).append(SLASH).append(REFLECTION_JS_FILE_NAME);
			reflectionForMootoolsScriptFilePath = script.toString();
		}
		return reflectionForMootoolsScriptFilePath;
	}

	@Override
	public String getCodePressScriptFilePath() {
		if (codePressScriptFilePath == null) {
			StringBuffer script = new StringBuffer(getBundleURIToScriptsFolder()).append(CODEPRESS_ROOT_FOLDER_NAME_PREFIX);
			script.append(SLASH).append(CODEPRESS_JS_FILE_NAME);
			codePressScriptFilePath = script.toString();
		}
		return codePressScriptFilePath;
	}

	/**
	 * @param needFullScript true if the full version of the script needs to be included
	 * @return The full URI with context to the latest version of the mootools-all-compressed.js OR mootools-all.js depending on the parameter
	 */
	@Override
	public String getBundleURIToMootoolsLib(boolean needFullScript){
		if(this.mooToolsScriptPath==null){
			this.mooToolsScriptPath = getBundleURIToMootoolsLib(MOOTOOLS_LATEST_VERSION, needFullScript);
		}

		return this.mooToolsScriptPath;
	}

	/**
	 * @param needFullScript true if the full version of the script needs to be included
	 * @param mootoolsLibraryVersion The version for the mootools library
	 * @return The full URI with context to the specific version of the mootools-all-compressed.js
	 */
	@Override
	public String getBundleURIToMootoolsLib(String mootoolsLibraryVersion, boolean needFullScript){
		StringBuffer buf = new StringBuffer();
		if(needFullScript) {
			buf.append(MOOTOOLS_FOLDER_NAME_PREFIX).append(SLASH).append(mootoolsLibraryVersion).append(SLASH).append(MOOTOOLS_SCRIPT_FILE);
		} else {
			buf.append(MOOTOOLS_FOLDER_NAME_PREFIX).append(SLASH).append(mootoolsLibraryVersion).append(SLASH).append(MOOTOOLS_COMPRESSED_SCRIPT_FILE);
		}
		return getBundleURIWithinScriptsFolder(buf.toString());
	}

	@Override
	public String getBundleURIToYUIScript(String version, boolean needFullScript) {
		StringBuffer script = new StringBuffer(YUI_FOLDER_NAME_PREFIX).append(SLASH).append(version).append(SLASH);
		if (needFullScript) {
			script.append(YUI_UTILITIES_COMRESSED_SCRIPT_FILE);
		}
		else {
			script.append(YUI_UTILITIES_SCRIPT_FILE);
		}
		return getBundleURIWithinScriptsFolder(script.toString());
	}

	@Override
	public String getBundleURIToYUIScript(boolean needFullScript) {
		return getBundleURIToYUIScript(YUI_LATEST_VERSION, needFullScript);
	}

	@Override
	public String getBundleURIToYUIScript() {
		return getBundleURIToYUIScript(YUI_LATEST_VERSION, false);
	}

	private String getPathToMootabs(String version) {
		return getBundleURIWithinScriptsFolder(new StringBuffer(MOOTABS_FOLDER_NAME_PREFIX).append(SLASH).append(version).append(SLASH).toString());
	}

	private String getPathToInlineEdit(String version) {
		return getBundleURIWithinScriptsFolder(new StringBuffer(INLINE_EDIT_FOLDER_NAME_PREFIX).append(SLASH).append(version).append(SLASH).toString());
	}

	@Override
	public String getBundleUriToMootabsScript(String version) {
		return new StringBuffer(getPathToMootabs(version)).append(MOOTABS_SCRIPT_FILE).toString();
	}

	private String getPathToSmoothbox() {
		return getBundleURIWithinScriptsFolder(new StringBuffer(SMOOTHBOX_FOLDER_NAME_PREFIX).append(SLASH).toString());
	}

	@Override
	public String getBundleUriToSmoothboxScript() {
		return new StringBuffer(getPathToSmoothbox()).append(SMOOTHBOX_SCRIPT_FILE).toString();
	}

	@Override
	public String getBundleUriToSmoothboxStylesheet() {
		return new StringBuffer(getPathToSmoothbox()).append(SMOOTHBOX_STYLE_FILE).toString();
	}

	@Override
	public String getBundleUriToInlineEditScript(String version) {
		return new StringBuffer(getPathToInlineEdit(version)).append(INLINE_EDIT_SCRIPT_FILE).toString();
	}

	@Override
	public String getBundleUriToMootabsScript() {
		return getBundleUriToMootabsScript(MOOTABS_LATEST_VERSION);
	}

	@Override
	public String getBundleUriToInlineEditScript() {
		return getBundleUriToInlineEditScript(INLINE_EDIT_LATEST_VERSION);
	}

	@Override
	public String getBundleUriToMootabsStyle(String version) {
		return new StringBuffer(getPathToMootabs(version)).append(MOOTABS_STYLE_FILE).toString();
	}

	@Override
	public String getBundleUriToMootabsStyle() {
		return getBundleUriToMootabsStyle(MOOTABS_LATEST_VERSION);
	}

	private String getPathToMooRainbow(String version) {
		return getBundleURIWithinScriptsFolder(new StringBuffer(MOORAINBOW_FOLDER_NAME_PREFIX).append(SLASH).append(version).append(SLASH).toString());
	}

	@Override
	public String getBundleUriToMooRainbowScript(String version) {
		return new StringBuffer(getPathToMooRainbow(version)).append(MOORAINBOW_SCRIPT_FILE).toString();
	}

	@Override
	public String getBundleUriToMooRainbowScript() {
		return getBundleUriToMooRainbowScript(MOORAINBOW_LATEST_VERSION);
	}

	@Override
	public String getBundleUriToMooRainbowStyle(String version) {
		return new StringBuffer(getPathToMooRainbow(version)).append(MOORAINBOW_STYLE_FILE).toString();
	}

	@Override
	public String getBundleUriToMooRainbowStyle() {
		return getBundleUriToMooRainbowStyle(MOORAINBOW_LATEST_VERSION);
	}

	private String getPathToContextMenu(String version) {
		return getBundleURIWithinScriptsFolder(new StringBuffer(CONTEXT_MENU_FOLDER_NAME_PREFIX).append(SLASH).append(version).append(SLASH).toString());
	}

	@Override
	public String getBundleUriToContextMenuScript(String version, boolean compressedFile) {
		StringBuffer uri = new StringBuffer(getPathToContextMenu(version));
		String file = CONTEXT_MENU_SCRIPT_FILE;
		if (compressedFile) {
			file = CONTEXT_MENU_COMPRESSED_SCRIPT_FILE;
		}
		uri.append(file);
		return uri.toString();
	}

	@Override
	public String getBundleUriToContextMenuScript(boolean compressedFile) {
		return getBundleUriToContextMenuScript(Web2BusinessBean.CONTEXT_MENU_LATEST_VERSION, compressedFile);
	}

	@Override
	public String getBundleUriToContextMenuScript() {
		return getBundleUriToContextMenuScript(Web2BusinessBean.CONTEXT_MENU_LATEST_VERSION, true);
	}

	@Override
	public void addTablesorterScriptFilesToPage(IWContext iwc, String className, String theme) {
		if (StringUtil.isEmpty(theme)) {
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

	@Override
	public void addWebAppFilesToPage(IWContext iwc) {
		PresentationUtil.addStyleSheetToHeader(iwc, getBundle().getResourcesVirtualPath() + "/WebApp/Design/Render.css");
		if (iwc.isMozilla()) {
			PresentationUtil.addStyleSheetToHeader(iwc, getBundle().getResourcesVirtualPath() + "/WebApp/Design/Firefox.css");
		}
		PresentationUtil.addJavaScriptSourceLineToHeader(iwc, getBundle().getResourcesVirtualPath() + "/WebApp/Action/Logic.js");
	}

	private String getBundleUriToHumanizedMessages(String version) {
		return getBundleURIWithinScriptsFolder(new StringBuilder(HUMAN_MESSAGES_FOLDER_NAME_PREFIX).append(SLASH).append(HUMAN_MESAGES_LATEST_VERSION).append(SLASH).toString());
	}

	@Override
	public String getBundleUriToHumanizedMessagesScript() {
		return new StringBuilder(getBundleUriToHumanizedMessages(HUMAN_MESAGES_LATEST_VERSION)).append("js").append(SLASH).append("humanmsg.js").toString();
	}

	@Override
	public String getBundleUriToHumanizedMessagesStyleSheet() {
		return new StringBuilder(getBundleUriToHumanizedMessages(HUMAN_MESAGES_LATEST_VERSION)).append("css").append(SLASH).append("humanmsg.css").toString();
	}

	@Override
	public String getBundleUtiToGreyBoxScript() {
		return new StringBuilder(getBundleURIWithinScriptsFolder(GREY_BOX_FOLDER_NAME_PREFIX)).append(SLASH).append("js").append(SLASH).append("greybox.js")
				.toString();
	}

	@Override
	public String getBundleUtiToGreyBoxStyleSheet() {
		return new StringBuilder(getBundleURIWithinScriptsFolder(GREY_BOX_FOLDER_NAME_PREFIX)).append(SLASH).append("css").append(SLASH).append("greybox.css")
				.toString();
	}

	@Override
	public String getBundleURIToJSTreeStyleFile() {
		return new StringBuilder(getBundleURIWithinScriptsFolder(JS_TREE_FOLDER_NAME_PREFIX)).append(SLASH).append(JS_TREE_LATEST_VERSION).append(SLASH)
			.append("css").append(SLASH).append(JS_TREE_FILE).append(".css").toString();
	}

	@Override
	public List<String> getBundleURIsToJSTreeScriptFiles() {
		return getBundleURIsToJSTreeScriptFiles(false, false, false);
	}

	@Override
	public List<String> getBundleURIsToJSTreeScriptFiles(boolean usesXmlDataTypes, boolean usesMetadataRules, boolean usesCookies) {
		List<String> files = new ArrayList<String>();

		files.add(getBundleURIToJQueryLib());
		files.add(getBundleURIToJQueryPlugin(JQueryPlugin.LISTEN));
		files.add(new StringBuilder(getBundleURIWithinScriptsFolder(JS_TREE_FOLDER_NAME_PREFIX)).append(SLASH).append(JS_TREE_LATEST_VERSION).append(SLASH)
						.append("js").append(SLASH).append("css.js").toString());

		files.add(new StringBuilder(getBundleURIWithinScriptsFolder(JS_TREE_FOLDER_NAME_PREFIX)).append(SLASH).append(JS_TREE_LATEST_VERSION).append(SLASH)
						.append("js").append(SLASH).append(JS_TREE_FILE).append(".js").toString());

		if (usesXmlDataTypes) {
			files.add(new StringBuilder(getBundleURIWithinScriptsFolder(JS_TREE_FOLDER_NAME_PREFIX)).append(SLASH).append(JS_TREE_LATEST_VERSION).append(SLASH)
						.append("js").append(SLASH).append("sarissa.js").toString());
			files.add(new StringBuilder(getBundleURIWithinScriptsFolder(JS_TREE_FOLDER_NAME_PREFIX)).append(SLASH).append(JS_TREE_LATEST_VERSION).append(SLASH)
						.append("js").append(SLASH).append("sarissa_ieemu_xpath.js").toString());
			files.add(getBundleURIToJQueryPlugin(JQueryPlugin.XSLT));
		}

		if (usesMetadataRules) {
			files.add(getBundleURIToJQueryPlugin(JQueryPlugin.METADATA));
		}

		if (usesCookies) {
			files.add(getBundleURIToJQueryPlugin(JQueryPlugin.COOKIE));
		}

		return files;
	}

	@Override
	public List<String> getBundleURIsToSexyLightBoxScriptFiles() {
		return getBundleURIsToSexyLightBoxScriptFiles(true);
	}

	@Override
	public List<String> getBundleURIsToSexyLightBoxScriptFiles(boolean useCompressedScript) {
		List<String> files = new ArrayList<String>();

		files.addAll(getBundleURIsToMooToolsLib(MOOTOOLS_1_2_1_VERSION, useCompressedScript, true, false));

		String scriptFile = useCompressedScript ? new StringBuilder(SEXY_LIGHT_BOX_FOLDER_NAME_PREFIX).append(".packed").toString() :
												SEXY_LIGHT_BOX_FOLDER_NAME_PREFIX;
		files.add(new StringBuilder(getBundleURIWithinScriptsFolder(SEXY_LIGHT_BOX_FOLDER_NAME_PREFIX)).append(SLASH).append(SEXY_LIGHT_BOX_LATEST_VERSION)
					.append(SLASH).append(scriptFile).append(".js").toString());

		return files;
	}

	@Override
	public String getBundleURIToSexyLightBoxStyleFile() {
		return new StringBuilder(getBundleURIWithinScriptsFolder(SEXY_LIGHT_BOX_FOLDER_NAME_PREFIX)).append(SLASH).append(SEXY_LIGHT_BOX_LATEST_VERSION)
					.append(SLASH).append(SEXY_LIGHT_BOX_FOLDER_NAME_PREFIX).append(".css")
				.toString();
	}

	@Override
	public String getSexyLightBoxInitAction(IWContext iwc, String variableName) {
		String imagesDir = new StringBuilder(getBundleURIWithinScriptsFolder(SEXY_LIGHT_BOX_FOLDER_NAME_PREFIX)).append(SLASH).append(SEXY_LIGHT_BOX_LATEST_VERSION)
							.append(SLASH).append("sexyimages").toString();

		String globalVariable = CoreConstants.EMPTY;
		String variable = CoreConstants.EMPTY;
		if (!StringUtil.isEmpty(variableName)) {
			variable = new StringBuilder(variableName).append(" = ").toString();
			globalVariable = new StringBuilder("var ").append(variable).append("null;").toString();
		}
		StringBuilder initAction = new StringBuilder(variable).append("new SexyLightBox({imagesdir: '").append(imagesDir).append("'});");
		if (!CoreUtil.isSingleComponentRenderingProcess(iwc)) {
			initAction = new StringBuilder("window.addEvent('domready', function() { ").append(initAction.toString()).append(" });");
		}
		initAction = new StringBuilder(globalVariable).append(initAction.toString());
		return initAction.toString();
	}

	@Override
	public void insertSexyLightBoxIntoPage(IWContext iwc) {
		PresentationUtil.addJavaScriptSourcesLinesToHeader(iwc, getBundleURIsToSexyLightBoxScriptFiles());
		PresentationUtil.addStyleSheetToHeader(iwc, getBundleURIToSexyLightBoxStyleFile());
		PresentationUtil.addJavaScriptActionToBody(iwc, getSexyLightBoxInitAction(iwc, getSexyLightBoxVariableName()));
	}

	@Override
	public String getSexyLightBoxVariableName() {
		return "Sexy";
	}

	@Override
	public List<String> getBundleURIsToMooToolsLib(String version, boolean needCompressedFiles, boolean needMooToolsMore, boolean addBridgingScript) {
		List<String> files = new ArrayList<String>();

		files.add(getBundleURIWithinScriptsFolder(new StringBuilder(MOOTOOLS_FOLDER_NAME_PREFIX).append(SLASH).append(version).append(SLASH)
				.append(needCompressedFiles ? MOOTOOLS_COMPRESSED_SCRIPT_FILE : MOOTOOLS_SCRIPT_FILE).toString()));
		if (needMooToolsMore) {
			files.add(getBundleURIWithinScriptsFolder(new StringBuilder(MOOTOOLS_FOLDER_NAME_PREFIX).append(SLASH).append(version).append(SLASH)
						.append(needCompressedFiles ? MOOTOOLS_MORE_COMPRESSED_SCRIPT_FILE : MOOTOOLS_MORE_SCRIPT_FILE).toString()));
		}
		if (addBridgingScript) {
			files.add(getBundleURIWithinScriptsFolder(new StringBuilder(MOOTOOLS_FOLDER_NAME_PREFIX).append(SLASH).append(MOOTOOLS_1_2_1_VERSION).append(SLASH)
					.append("mootools-compat-core.js").toString()));
			if (needMooToolsMore) {
				files.add(getBundleURIWithinScriptsFolder(new StringBuilder(MOOTOOLS_FOLDER_NAME_PREFIX).append(SLASH).append(MOOTOOLS_1_2_1_VERSION).append(SLASH)
						.append("mootools-compat-more.js").toString()));
			}
			files.add(getBundleURIWithinScriptsFolder(new StringBuilder(MOOTOOLS_FOLDER_NAME_PREFIX).append(SLASH).append(MOOTOOLS_1_2_1_VERSION).append(SLASH)
					.append("mootools-compat-custom.js").toString()));
		}

		return files;
	}

	@Override
	public List<String> getBundleURIsToMooToolsLib(boolean needCompressedFiles, boolean needMooToolsMore, boolean addBridgingScript) {
		return getBundleURIsToMooToolsLib(MOOTOOLS_LATEST_VERSION, needCompressedFiles, needMooToolsMore, addBridgingScript);
	}

	@Override
	public List<String> getBundleURIsToMooToolsLib() {
		return getBundleURIsToMooToolsLib(MOOTOOLS_LATEST_VERSION, true, true, true);
	}

	@Override
	public String getBrowserPlusScriptFile() {
		return "http://bp.yahooapis.com/2.1.6/browserplus-min.js";
	}

	@Override
	public String getBundleURIToFancyBoxStyleFile() {
		return getBundleURIToFancyBoxStyleFile(FANCY_BOX_LATEST_VERSION);
	}

	@Override
	public String getBundleURIToFancyBoxStyleFile(String version) {
		return new StringBuilder(getBundleURIWithinScriptsFolder(FANCY_BOX_FOLDER_NAME_PREFIX)).append(SLASH).append(version).append(SLASH)
		.append(FANCY_BOX_FOLDER_NAME_PREFIX).append(".css").toString();
	}

	@Override
	public List<String> getBundleURIsToFancyBoxScriptFiles() {
		return getBundleURIsToFancyBoxScriptFiles(FANCY_BOX_LATEST_VERSION);
	}

	@Override
	public List<String> getBundleURIsToFancyBoxScriptFiles(String version) {
		List<String> scripts = new ArrayList<String>();
		scripts.add(new StringBuilder(getBundleURIWithinScriptsFolder(FANCY_BOX_FOLDER_NAME_PREFIX)).append(SLASH).append(version).append(SLASH)
					.append(FANCY_BOX_FOLDER_NAME_PREFIX).append(".js").toString());
		if (version.equals(FANCY_BOX_1_0_VERSION)) {
			scripts.add(new StringBuilder(getBundleURIWithinScriptsFolder(FANCY_BOX_FOLDER_NAME_PREFIX)).append(SLASH).append(version).append(SLASH)
					.append(FANCY_BOX_FOLDER_NAME_PREFIX).append("PngFix.js").toString());
		}
		if (!version.equals(FANCY_BOX_1_0_VERSION)) {
			scripts.add(getBundleURIToJQueryPlugin(JQueryPlugin.EASING));
		}
		if (version.equals(FANCY_BOX_1_3_0_VERSION) || version.equals(FANCY_BOX_1_3_1_VERSION)) {
			scripts.add(getBundleURIToJQueryPlugin(JQueryPlugin.MOUSE_WHEEL));
		}
		return scripts;
	}


	@Override
	public String getBundleURIToCodeMirrorFolder() {
		return new StringBuilder(getBundleURIWithinScriptsFolder(CODE_MIRROR_FOLDER_NAME_PREFIX)).append(SLASH).append(CODE_MIRROR_LATEST_VERSION).append(SLASH)
		.append("js/").toString();
	}

	@Override
	public String getBundleURIToCodeMirrorScriptFile() {
		return getBundleURIToCodeMirrorScriptFile(CODE_MIRROR_FOLDER_NAME_PREFIX + ".js");
	}

	@Override
	public String getBundleURIToCodeMirrorScriptFile(String scriptFile) {
		return new StringBuilder(getBundleURIToCodeMirrorFolder()).append(scriptFile).toString();
	}

	@Override
	public String getBundleURIToCodeMirrorStyleFile(String styleFile) {
		return new StringBuilder(getBundleURIWithinScriptsFolder(CODE_MIRROR_FOLDER_NAME_PREFIX)).append(SLASH).append(CODE_MIRROR_LATEST_VERSION).append(SLASH)
		.append("css/").append(styleFile).toString();
	}

	@Override
	public String getBundleUriToLinkLinksWithFilesScriptFile() {
		return new StringBuilder(getBundleURIWithinScriptsFolder("linkslinker")).append(SLASH).append("1.0").append(SLASH).append("linkslinker.js").toString();
	}

	@Override
	public String getActionToLinkLinksWithFiles(String containerId, boolean executeOnLoad, boolean addStyleForNonFileLinks) {
		String action = new StringBuilder("LinksLinker.linkLinks(").append(addStyleForNonFileLinks).append(", ")
			.append(StringUtil.isEmpty(containerId) ? "null" : new StringBuilder("'").append(containerId).append("'").toString()).append(");").toString();

		if (executeOnLoad) {
			action = new StringBuilder("jQuery(document).ready(function() {").append(action).append("});").toString();
		}

		return action;
	}

	@Override
	public String getBundleUriToLinkLinksWithFilesStyleFile() {
		return new StringBuilder(getBundleURIWithinScriptsFolder("linkslinker")).append(SLASH).append("1.0").append(SLASH).append("linkslinker.css").toString();
	}

	@Override
	public JQuery getJQuery() {
    	return jQuery;
    }

	@Override
	public String getBundleUriToGritterScriptFile() {
		return new StringBuilder(getBundleURIWithinScriptsFolder("gritter")).append(SLASH).append("1.2").append(SLASH).append("gritter.js").toString();
	}

	@Override
	public String getBundleUriToGritterStyleSheet() {
		return new StringBuilder(getBundleURIWithinScriptsFolder("gritter")).append(SLASH).append("1.2").append(SLASH).append("gritter.css").toString();
	}

	@Override
	public List<String> getScriptsForTinyMCE() {
		return getScriptsForTinyMCE(TINY_MCE_LATEST_VERSION);
	}

	@Override
	public List<String> getScriptsForTinyMCE(String version) {
		String tinyMCEFolder = new StringBuilder(getBundleURIWithinScriptsFolder(TINY_MCE_FOLDER)).append(SLASH).append(version).append(SLASH).toString();

		return Arrays.asList(
				tinyMCEFolder + "tiny_mce.js",
				tinyMCEFolder + "jquery.tinymce.js"
		);
	}

	@Override
	public boolean validateJCaptcha(String sessionId, String userCaptchaResponse) {
		Boolean isResponseCorrect = Boolean.FALSE;

        // Call the Service method
         try {
             isResponseCorrect = CaptchaServiceSingleton.getInstance().validateResponseForID(sessionId, userCaptchaResponse);
         }
         catch (CaptchaServiceException e) {
              //should not happen, may be thrown if the id is not valid
         }

         return isResponseCorrect.booleanValue();
	}

	@Override
	public String getJCaptchaImageURL() {
		return "/jcaptcha.jpg";
	}

	@Override
	public List<String> getBundleURIsToTageditLib() {
		String version = "1.2.0";
		List<String> files = new ArrayList<String>();

		files.add(getBundleURIWithinScriptsFolder(new StringBuilder(TAGEDIT_FOLDER_NAME_PREFIX).append(SLASH).append(version).append(SLASH)
				.append(TAGEDIT_SCRIPT_FILE_UI).toString()));
		files.add(getBundleURIWithinScriptsFolder(new StringBuilder(TAGEDIT_FOLDER_NAME_PREFIX).append(SLASH).append(version).append(SLASH)
				.append(TAGEDIT_SCRIPT_FILE_AUTOGROW).toString()));
		files.add(getBundleURIWithinScriptsFolder(new StringBuilder(TAGEDIT_FOLDER_NAME_PREFIX).append(SLASH).append(version).append(SLASH)
				.append(TAGEDIT_SCRIPT_FILE_TAGEDIT).toString()));
		return files;
	}
	@Override
	public List<String> getBundleURIsToTageditStyleFiles(){
		String version = "1.2.0";
		List<String> files = new ArrayList<String>();

		files.add(getBundleURIWithinScriptsFolder(new StringBuilder(TAGEDIT_FOLDER_NAME_PREFIX)
				.append(SLASH).append(version).append(SLASH).append("css").append(SLASH).append(TAGEDIT_STYLE_FILE_1)
				.toString()));
		files.add(getBundleURIWithinScriptsFolder(new StringBuilder(TAGEDIT_FOLDER_NAME_PREFIX)
				.append(SLASH).append(version).append(SLASH).append("css")
				.append(SLASH).append("ui-lightness").append(SLASH).append(TAGEDIT_STYLE_FILE_2)
				.toString()));

		return files;
	}
}