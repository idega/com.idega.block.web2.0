package com.idega.block.web2.business;

import java.util.Collection;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Scope(BeanDefinition.SCOPE_SINGLETON)
@Service("iwResourcePluginsResolver")
public class WebResourcePluginsResolver implements Map<String, String> {

	@Autowired
	private JQuery jQuery;

	public void clear() {
		throw new UnsupportedOperationException(this.getClass().getName() + ": UnsupportedOperationException");
	}

	public boolean containsKey(Object key) {
		throw new UnsupportedOperationException(this.getClass().getName() + ": UnsupportedOperationException");
	}

	public boolean containsValue(Object value) {
		throw new UnsupportedOperationException(this.getClass().getName() + ": UnsupportedOperationException");
	}

	public Set<java.util.Map.Entry<String, String>> entrySet() {
		throw new UnsupportedOperationException(this.getClass().getName() + ": UnsupportedOperationException");
	}

	public String get(Object key) {
		if (Web2BusinessBean.JQUERY_FOLDER_NAME_PREFIX.equals(key))
			return jQuery.getBundleURIToJQueryLib();
		else if ("url_parser".equals(key))
			return jQuery.getBundleURIToJQueryPlugin(JQueryPlugin.URL_PARSER);

		//	TODO: add more "resolvers"

		return key.toString();
	}

	public boolean isEmpty() {
		throw new UnsupportedOperationException(this.getClass().getName() + ": UnsupportedOperationException");
	}

	public Set<String> keySet() {
		throw new UnsupportedOperationException(this.getClass().getName() + ": UnsupportedOperationException");
	}

	public String put(String key, String value) {
		throw new UnsupportedOperationException(this.getClass().getName() + ": UnsupportedOperationException");
	}

	public void putAll(Map<? extends String, ? extends String> t) {
		throw new UnsupportedOperationException(this.getClass().getName() + ": UnsupportedOperationException");
	}

	public String remove(Object key) {
		throw new UnsupportedOperationException(this.getClass().getName() + ": UnsupportedOperationException");
	}

	public int size() {
		throw new UnsupportedOperationException(this.getClass().getName() + ": UnsupportedOperationException");
	}

	public Collection<String> values() {
		throw new UnsupportedOperationException(this.getClass().getName() + ": UnsupportedOperationException");
	}
}
