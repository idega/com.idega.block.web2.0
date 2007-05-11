<?xml version="1.0" encoding="UTF-8" ?>

<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:rss="http://purl.org/rss/1.0/"
  exclude-result-prefixes="rss rdf dc">
    
  <!-- "number" parameter can be passed. default = 5 enteries -->
  <xsl:param name="number">5</xsl:param>
  
  <xsl:output method="text" encoding="utf-8"/>

  
  <!-- process for top channel -->
  <xsl:template match="/">
      <xsl:apply-templates select="rss" />
      <xsl:apply-templates select="rdf:RDF" />
  </xsl:template>
  
  <!-- RSS 1.0 -->
  <xsl:template match="rdf:RDF">
      <xsl:variable name="currentTitle" select="//rss:title" />
      <xsl:variable name="currentLink" select="//rss:link" />
      <xsl:variable name="currentDate" select="//dc:date" />
      <xsl:variable name="currentDesc" select="//rss:description" />

          {"channel": {
            "title" : "<xsl:value-of select="$currentTitle"/>",
            "link" : "<xsl:value-of select="$currentLink" />",
            "date" : "<xsl:value-of select="$currentDate" />",
            <!-- "description" : "<xsl:value-of select="$currentDesc" />", -->
            "item" : [
            <xsl:apply-templates select="rss:item" />
            ]}}
  </xsl:template>
  <!-- process each element item -->
  <xsl:template match="rss:item">
      <xsl:if test="($number = 0) or (position() &lt;= $number)">
          
          <xsl:call-template name="itemJson">
              <xsl:with-param name="link"><xsl:value-of select="rss:link"/></xsl:with-param>
              <xsl:with-param name="title"><xsl:value-of select="rss:title"/></xsl:with-param>
              <xsl:with-param name="date"><xsl:value-of select="dc:date"/></xsl:with-param>
              <xsl:with-param name="description"><xsl:value-of select="rss:description"/></xsl:with-param>
          </xsl:call-template>
      </xsl:if>
  </xsl:template>
  
  <!-- RSS 2.0 -->
  <xsl:template match="rss">
      <xsl:variable name="currentTitle" select="//title" />
      <xsl:variable name="currentLink" select="//link" />
      <xsl:variable name="currentDate" select="//pubDate" />
      <xsl:variable name="currentDesc" select="//description" />
   
      {"channel": {
        "title" : "<xsl:value-of select="$currentTitle"/>",
        "link" : "<xsl:value-of select="$currentLink" />",
        "date" : "<xsl:value-of select="$currentDate" />",
        <!-- "description" : "<xsl:value-of select="$currentDesc" />", -->
        "item" : [
        <xsl:apply-templates select="channel/item" />
        ]}}
  </xsl:template>
  
  <!-- process each element item -->
  <xsl:template match="item">
      <xsl:if test="($number = 0) or (position() &lt;= $number)">
      
          <xsl:call-template name="itemJson">
              <xsl:with-param name="link"><xsl:value-of select="link"/></xsl:with-param>
              <xsl:with-param name="title"><xsl:value-of select="title"/></xsl:with-param>
              <xsl:with-param name="date"><xsl:value-of select="pubDate"/></xsl:with-param>
              <xsl:with-param name="description"><xsl:value-of select="description"/></xsl:with-param>
          </xsl:call-template>
      </xsl:if>
  </xsl:template>
  
    
  
  <xsl:template name="itemJson">
      <xsl:param name="link">defaultLink</xsl:param>
      <xsl:param name="title">defaultTitle</xsl:param>
      <xsl:param name="date">defaultDate</xsl:param>
      <xsl:param name="description">defaultDescription</xsl:param>
      {
        "title" : "<xsl:value-of select="$title"/>",
        "link" : "<xsl:value-of select="$link" />",
        "date" : "<xsl:value-of select="$date" />"
        <!-- "description" : "<xsl:value-of select="$description" />" -->
      }
      <xsl:if test="(($number=0) and (position()!=last())) or (($number &gt; 0) and (position() != $number))">,</xsl:if>
  </xsl:template>

</xsl:stylesheet>
