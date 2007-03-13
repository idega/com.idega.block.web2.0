package com.idega.block.web2.business;


import javax.ejb.CreateException;
import com.idega.business.IBOHome;
import java.rmi.RemoteException;

public interface Web2BusinessHome extends IBOHome {
	public Web2Business create() throws CreateException, RemoteException;
}