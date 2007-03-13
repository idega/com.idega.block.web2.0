package com.idega.block.web2.business;


import com.idega.business.IBOService;
import java.rmi.RemoteException;

public interface Web2Business extends IBOService {
	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToBehaviourLib
	 */
	public String getBundleURIToBehaviourLib() throws RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToReflectionLib
	 */
	public String getBundleURIToReflectionLib() throws RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToPrototypeLib
	 */
	public String getBundleURIToPrototypeLib() throws RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToPrototypeLib
	 */
	public String getBundleURIToPrototypeLib(String scriptaculousLibraryVersion) throws RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToScriptaculousLib
	 */
	public String getBundleURIToScriptaculousLib() throws RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToScriptaculousLib
	 */
	public String getBundleURIToScriptaculousLib(String scriptaculousLibraryVersion) throws RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToScriptaculousLibRootFolder
	 */
	public String getBundleURIToScriptaculousLibRootFolder() throws RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToScriptaculousLibRootFolder
	 */
	public String getBundleURIToScriptaculousLibRootFolder(String scriptaculousLibraryVersion) throws RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToScriptsFolder
	 */
	public String getBundleURIToScriptsFolder() throws RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIWithinScriptsFolder
	 */
	public String getBundleURIWithinScriptsFolder(String uriExtension) throws RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleIdentifier
	 */
	public String getBundleIdentifier() throws RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToRico
	 */
	public String getBundleURIToRico() throws RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToJMakiWidgetsFolder
	 */
	public String getBundleURIToJMakiWidgetsFolder() throws RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToJMakiLib
	 */
	public String getBundleURIToJMakiLib() throws RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToLightboxLibRootFolder
	 */
	public String getBundleURIToLightboxLibRootFolder() throws RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getBundleURIToLightboxLibRootFolder
	 */
	public String getBundleURIToLightboxLibRootFolder(String versionNumber) throws RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getLightboxImagesPath
	 */
	public String getLightboxImagesPath() throws RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getLightboxScriptPath
	 */
	public String getLightboxScriptPath() throws RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getLightboxStylePath
	 */
	public String getLightboxStylePath() throws RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getLightboxScriptFilePath
	 */
	public String getLightboxScriptFilePath() throws RemoteException;

	/**
	 * @see com.idega.block.web2.business.Web2BusinessBean#getLightboxStyleFilePath
	 */
	public String getLightboxStyleFilePath() throws RemoteException;
}