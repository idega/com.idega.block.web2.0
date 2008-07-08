/*
 * jqGrid  3.0 - jQuery Grid
 * Copyright (c) 2008, Tony Tomov, tony@trirand.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Date: 2008-03-22 rev 32
 */
 
 /*<added>*/
 
if(JQGridInclude == null) var JQGridInclude = function() {};
if(JQGridParams == null) var JQGridParams = function() {};
if(JQGrid == null) var JQGrid = function() {};


JQGridInclude.prototype = {

    FORMEDIT: false,
    INLINEEDIT: false,
    SUBGRID: false
};

/*</added>*/
 
// we make it simple as possible
function jqGridInclude(jQGridInclude, callback)
{
    var pathtojsfiles = "/idegaweb/bundles/com.idega.block.web2.0.bundle/resources/javascript/jqgrid/3.0/"; // need to be ajusted
    // if you do not want some module to be included
    // set include to false.
    // by default all modules are included.
    var minver = false;
    var modules = [
        { include: true, incfile: 'js/grid.base.js',minfile: 'min/grid.base-min.js'}, // jqGrid base
        { include: jQGridInclude.FORMEDIT, incfile:'js/grid.formedit.js',minfile: 'min/grid.formedit-min.js' }, // jqGrid Form editing
        { include: jQGridInclude.INLINEEDIT, incfile:'js/grid.inlinedit.js',minfile: 'min/grid.inlinedit-min.js' }, // jqGrid inline editing
        { include: jQGridInclude.SUBGRID, incfile:'js/grid.subgrid.js',minfile: 'min/grid.subgrid-min.js'} //jqGrid subgrid
    ];
    
    var resourcesToLoad = new Array();
    for (var i = 0; i < modules.length; i++) {
        if (modules[i].include == true) {
        	if (minver != true) {
        		resourcesToLoad.push(pathtojsfiles+modules[i].incfile);
        	}
        	else {
        		resourcesToLoad.push(pathtojsfiles+modules[i].minfile);
        	}
        }
    }
    LazyLoader.loadMultiple(resourcesToLoad, callback);
}

/*<added>*/

JQGridParams.prototype = {

    url: 'local',
    retrieveMode: 'function',
    populateFromFunction: function(params, callback) {},
    datatype: "xml", 
    colNames: ['Id'],
    colModel: [{name:'id', index:'id'}], 
    rowNum: null, 
    rowList: null, 
    pager: null, 
    sortname: 'id',
    viewrecords: true, 
    sortorder: "desc", 
    multiselect: false, 
    onSelectRow: function(rowId) {},
    rightsChanger: false,
    downloadDocument: true,
    identifier: null
};

JQGrid.prototype.createGrid = function(tblSelector, params) {

    this.grid = jQuery(tblSelector);
    this.grid = this.grid.jqGrid({
            url: params.url,
            retrieveMode: params.retrieveMode,
            populateFromFunction: params.populateFromFunction,
            datatype: params.datatype, 
            height: params.height, 
            colNames: params.colNames,
            colModel: params.colModel, 
            rowNum: params.rowNum, 
            rowList: params.rowList, 
            pager: params.pager, 
            sortname: params.sortname,
            viewrecords: params.viewrecords, 
            sortorder: params.sortorder, 
            multiselect: params.multiselect, 
            subGrid : params.subGrid,
            onSelectRow: params.onSelectRow,
            subGridRowExpanded: params.subGridRowExpanded,
            rightsChanger: params.rightsChanger,
            downloadDocument: params.downloadDocument,
            identifier: params.identifier
        });
        
        return this.grid;
}
/*</added>*/