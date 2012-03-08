package com.idega.block.web2.business;

import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.idega.business.IBORuntimeException;
import com.idega.util.FilePathBuilder;

/**
 * @author <a href="mailto:civilis@idega.com">Vytautas Čivilis</a>
 * @version $Revision: 1.2 $ Last modified: $Date: 2009/04/27 12:50:49 $ by $Author: valdas $
 */
@Service
@Scope("singleton")
public class JQueryImpl implements JQuery {

	// TODO: move all the jquery code from web2business to this class

	public static final String JQUERY_VALIDATION_LATEST_VERSION = "1.9.0";
	public static final String JQUERY_VALIDATION_FOLDER_PATH = "jquery-plugins/validation";

	@Autowired
	private Web2Business web2Business;

	@SuppressWarnings("deprecation")
	public String getBundleURIToJQueryLib() {
		return getWeb2Business().getBundleURIToJQueryLib();
	}

	@SuppressWarnings("deprecation")
	public String getBundleURIToJQueryLib(String jqueryLibraryVersion) {

		try {
			return getWeb2Business().getBundleURIToJQueryLib(
			    jqueryLibraryVersion);

		} catch (RemoteException e) {
			throw new IBORuntimeException(e);
		}
	}

	@SuppressWarnings("deprecation")
	public String getBundleURIToJQueryUILib(JQueryUIType type) {

		return getWeb2Business().getBundleURIToJQueryUILib(type);
	}

	@SuppressWarnings("deprecation")
	public String getBundleURIToJQueryUILib(String jqueryUILibraryVersion,
	        String fileName) {
		return getWeb2Business().getBundleURIToJQueryUILib(
		    jqueryUILibraryVersion, fileName);
	}

	@SuppressWarnings("deprecation")
	public String getBundleURIToJQueryPlugin(JQueryPlugin plugin) {
		return getWeb2Business().getBundleURIToJQueryPlugin(plugin);
	}

	public List<String> getBundleURISToValidation() {
		return getBundleURISToValidation(null, Boolean.TRUE);
	}
	
	public List<String> getBundleURISToValidation(boolean addAdditionalMethods) {
		return getBundleURISToValidation(null, addAdditionalMethods);
	}
	
	public List<String> getBundleURISToValidation(String language) {
		return getBundleURISToValidation(language, Boolean.TRUE);
	}

	public List<String> getBundleURISToValidation(String language, boolean addAdditionalMethods) {
		FilePathBuilder pathBuilder = new FilePathBuilder(JQUERY_VALIDATION_FOLDER_PATH);
		pathBuilder.addFolder(JQUERY_VALIDATION_LATEST_VERSION);

		List<String> validationScripts = new ArrayList<String>(addAdditionalMethods ? 2 : 1);

		validationScripts.add(getFullURI(pathBuilder.getPathWithAddedFile("jquery.validate.js")));

		if (language != null && !language.equals(Locale.ENGLISH.getLanguage())) {
			validationScripts.add(getFullURI(pathBuilder.getPathWithAddedFile("localization/messages_"+ language +".js")));
		}
		if (addAdditionalMethods) {
			validationScripts.add(getFullURI(pathBuilder.getPathWithAddedFile("additional-methods.js")));
		}

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