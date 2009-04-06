package com.idega.block.web2.business;

import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.idega.business.IBORuntimeException;
import com.idega.util.FilePathBuilder;

/**
 * @author <a href="mailto:civilis@idega.com">Vytautas Čivilis</a>
 * @version $Revision: 1.1 $ Last modified: $Date: 2009/04/06 14:48:36 $ by $Author: civilis $
 */
@Service
@Scope("singleton")
public class JQueryImpl implements JQuery {
	
	// TODO: move all the jquery code from web2business to this class
	
	public static final String JQUERY_VALIDATION_LATEST_VERSION = "1.5.2";
	public static final String JQUERY_VALIDATION_FOLDER_PATH = "jquery-plugins/validation";
	
	@Autowired
	private Web2Business web2Business;
	
	public String getBundleURIToJQueryLib() {
		
		return getWeb2Business().getBundleURIToJQueryLib();
	}
	
	public String getBundleURIToJQueryLib(String jqueryLibraryVersion) {
		
		try {
			return getWeb2Business().getBundleURIToJQueryLib(
			    jqueryLibraryVersion);
			
		} catch (RemoteException e) {
			throw new IBORuntimeException(e);
		}
	}
	
	public String getBundleURIToJQueryUILib(JQueryUIType type) {
		
		return getWeb2Business().getBundleURIToJQueryUILib(type);
	}
	
	public String getBundleURIToJQueryUILib(String jqueryUILibraryVersion,
	        String fileName) {
		return getWeb2Business().getBundleURIToJQueryUILib(
		    jqueryUILibraryVersion, fileName);
	}
	
	public String getBundleURIToJQueryPlugin(JQueryPlugin plugin) {
		return getWeb2Business().getBundleURIToJQueryPlugin(plugin);
	}
	
	public List<String> getBundleURISToValidation() {
		
		FilePathBuilder pathBuilder = new FilePathBuilder(
		        JQUERY_VALIDATION_FOLDER_PATH);
		pathBuilder.addFolder(JQUERY_VALIDATION_LATEST_VERSION);
		
		ArrayList<String> validationScripts = new ArrayList<String>();
		
		String validateScript = pathBuilder
		        .getPathWithAddedFile("jquery.validate.js");
		String additionalMethodsScript = pathBuilder
		        .getPathWithAddedFile("additional-methods.js");
		
		validationScripts.add(getFullURI(validateScript));
		validationScripts.add(getFullURI(additionalMethodsScript));
		
		return validationScripts;
	}
	
	private String getFullURI(String uri) {
		
		try {
			return getWeb2Business().getBundleURIWithinScriptsFolder(uri);
			
		} catch (RemoteException e) {
			throw new IBORuntimeException(e);
		}
		
	}
	
	Web2Business getWeb2Business() {
		return web2Business;
	}
}