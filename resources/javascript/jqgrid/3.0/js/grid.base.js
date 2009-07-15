(function (jQuery) {
/*
 * jqGrid  3.0 - jQuery Grid
 * Copyright (c) 2008, Tony Tomov, tony@trirand.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Date: 2008-03-22
 */
jQuery.fn.jqGrid = function( p ) {
	p = jQuery.extend({
		url: '',
		/*<added>*/
        retrieveMode: 'url', // or function
        populateFromFunction: null,
        /*</added>*/
		height: 150,
		page: 1,
		rowNum: 20,
		records: 0,
		pager: "",
		colModel: [],
		rowList: [],
		colNames: [],			
		sortorder: "asc",
		sortname: "",
		/*<changed>*/
		imgpath: "/idegaweb/bundles/com.idega.block.web2.0.bundle/resources/javascript/jqgrid/3.0/themes/basic/images",
		/*</changed>*/
		sortascimg: "sort_asc.gif",
		sortdescimg: "sort_desc.gif",
		firstimg: "first.gif",
		previmg: "prev.gif",
		nextimg: "next.gif",
		lastimg: "last.gif",
		altRows: true,
		subGrid: false,
		subGridModel :[],
		lastpage: 0,
		lastsort: 0,//?
		selrow: null,
		onSelectRow: null,
		onSortCol: null,
		ondblClickRow: null,
		onRightClickRow: null,
		datatype: "xml",
		mtype: "GET",
		viewrecords: false,
		recordtext: "Rows",
		loadtext: "Loading...",
		loadonce: false,
		multiselect: false,
		multikey: null,
		selarrrow: [],
		rowheight: null,
		loadComplete: null, 
		editurl: null,
		savedRow: [],
		shrinkToFit: true, 
		xmlReader: {},
		jsonReader: {},
		search: false,
		searchdata: {},
		caption: "",
		hidegrid: true
	}, p || {});

	var grid={         
		headers:[],
		cols:[],
		dragStart: function(i,x) {
			this.resizing = { idx: i, startX: x};
			this.hDiv.style.cursor = "e-resize";
		},
		dragMove: function(x) {
			if(this.resizing) {
				var diff = x-this.resizing.startX;
				var h = this.headers[this.resizing.idx];
				var newWidth = h.width + diff;
				if(newWidth > 30) { 
					h.el.style.width = newWidth+"px";
					h.newWidth = newWidth; 
					this.cols[this.resizing.idx].style.width = newWidth+"px";
					this.newWidth = this.width+diff;
					jQuery('table',this.bDiv).css("width",this.newWidth + "px");
					this.hTable.style.width = this.newWidth + "px";
					var scrLeft = this.bDiv.scrollLeft;
					this.hDiv.scrollLeft = this.bDiv.scrollLeft;
					if(jQuery.browser.msie) {
						if(scrLeft - this.hDiv.scrollLeft >= 5) this.bDiv.scrollLeft = this.bDiv.scrollLeft - 17;									
					}
				}
			}
		},
		dragEnd: function() {
			this.hDiv.style.cursor = "default";
			if(this.resizing) {
				var idx = this.resizing.idx;
				this.headers[idx].width = this.headers[idx].newWidth;
				this.cols[idx].style.width = this.headers[idx].newWidth;
				this.width = this.newWidth;
				this.resizing = false;
			}
		},
		scrollGrid: function() {
		// todo smart render
			var scrollLeft = this.bDiv.scrollLeft;
			this.hDiv.scrollLeft = this.bDiv.scrollLeft;
			if(scrollLeft - this.hDiv.scrollLeft > 5) this.bDiv.scrollLeft = this.bDiv.scrollLeft - 17;			
	  	}
	}
	jQuery.fn.getUrl = function() {return this[0].p.url;};           
	jQuery.fn.getSortName = function() {return this[0].p.sortname;};
	jQuery.fn.getSortOrder = function() {return this[0].p.sortorder;};
	jQuery.fn.getSelectedRow = function() {return this[0].p.selrow};
	jQuery.fn.getPage = function() {return parseInt(this[0].p.page);};
	jQuery.fn.getRowNum = function() {return parseInt(this[0].p.rowNum);};
	jQuery.fn.getMultiRow = function () {return this[0].p.selarrrow;};
	jQuery.fn.getDataType = function () {return this[0].p.datatype;};
	jQuery.fn.getRecords = function () {return parseInt(this[0].p.records);};
	jQuery.fn.getDataIDs = function () {
		var ids=[];
		this.each(function(){
			jQuery("tr:gt(0)",this.grid.bDiv).each(function(i){
				ids[i]=this.id;
			});
		});
		return ids;
	};
	jQuery.fn.setUrl = function (newurl) { return this.each( function(){this.p.url=newurl;}); };
	jQuery.fn.setSortName = function (newsort) {
		return this.each(function(){
			var $t = this[0];
			for(var i=0;i< $t.p.colModel.length;i++){
				if($t.p.colModel[i].name==newsort || $t.p.colModel[i].index==newsort){
					$t.p.lastsort = i;
					$t.p.sortname=newsort;
					break;
				}
			};
		});
	};
	jQuery.fn.setSortOrder = function (neword) { return this.each( function(){this.p.sortorder=neword; });};
	jQuery.fn.setPage = function (newpage) { return this.each( function() {
		if( typeof newpage === 'number' && newpage > 0) {this.p.page=newpage;}
		});
	};
	jQuery.fn.setRowNum = function (newrownum) { 
		return this.each(function(){if( typeof newrownum === 'number' && newrownum > 0) {this.p.rowNum=newrownum;} });
	};
	jQuery.fn.setDataType = function(newtype) { return this.each( function(){this.p.datatype=newtype; });}
	jQuery.fn.setSelection = function(selection)	{
		return this.each(function(){
			var t = this, stat;
			var pt = jQuery("tr#"+selection,t.grid.bDiv);
			if (!pt.html()) return;
			if(!t.p.multiselect) {
				if( t.p.selrow ) jQuery("tr#"+t.p.selrow,t.grid.bDiv).removeClass("selected");
				t.p.selrow = jQuery(pt).attr("id");
				if(jQuery(pt).attr("class") !== "subgrid") jQuery(pt).addClass("selected");
				if( t.p.onSelectRow ) { t.p.onSelectRow(t.p.selrow, true); }
			} else {  			
				t.p.selrow = selection;
				var ia = t.p.selarrrow.indexOf(t.p.selrow);
				if (  ia === -1 ){ 
					if(jQuery(pt).attr("class") !== "subgrid") { jQuery(pt).addClass("selected");};
					stat = true;
					jQuery("#jqg_"+t.p.selrow,t.grid.bDiv).attr("checked",stat);
					t.p.selarrrow.push(t.p.selrow);
				} else {
					if(jQuery(pt).attr("class") !== "subgrid") { jQuery(pt).removeClass("selected");};
					stat = false;
					jQuery("#jqg_"+t.p.selrow,t.grid.bDiv).attr("checked",stat);
					t.p.selarrrow.splice(ia,1);
				}			
				if( t.p.onSelectRow ) { t.p.onSelectRow(t.p.selrow, stat); }
			}
		});
	};
	jQuery.fn.getRowData = function( rowid ) {
		var res = {};
		if (rowid){
			this.each(function(){
				var $t = this,nm;
				jQuery('#'+rowid+' td',$t.grid.bDiv).each( function(i) {
					nm = $t.p.colModel[i].name; 
					if ( nm !== 'cb' && nm !== 'subgrid')
						res[nm] = jQuery(this).text().replace(/\&nbsp\;/ig,'');
				});
			});
		};
		return res;
	};
	jQuery.fn.delRowData = function(rowid) {
		var success = false, rowInd;
		if(rowid) {
			this.each(function() {
				var t = this;
				jQuery('#'+rowid,this.grid.bDiv).each(function(){
					rowInd = this.rowIndex;
					jQuery(this).remove();
					t.p.records--;
					t.updatepager();
					success=true;
				});
				if(rowInd == 1 && success) {
					jQuery("tbody tr:eq(1) td",this.grid.bDiv).each( function( k ) {
						jQuery(this).css("width",t.grid.headers[k].width+"px");
						t.grid.cols[k] = this;
					});
				};
				if( this.p.altRows === true && success) {
					jQuery("tr",this.grid.bDiv).removeClass("alt");
					jQuery("tr:odd",this.grid.bDiv).addClass("alt");
				};
			});
		};
		return success;
	};
	jQuery.fn.setRowData = function(rowid, data) {
		var success = false, nm, vl=true;
		this.each(function(){
			var t = this;
			if( jQuery("#"+rowid,t.grid.bDiv).attr('id')==rowid &&  data ) {
				success=true;
				jQuery(this.p.colModel).each(function(i){
					nm = this.name;
					jQuery(data).each(function() {
						if(this[nm]) {
							jQuery("#"+rowid,t.grid.bDiv).find("td:eq("+i+")").html(this[nm]);
							vl = true;
							return false;
						}
						success = success && vl;
					});
				});
			}
		});
		return success;
	};
	jQuery.fn.addRowData = function(rowid,data,pos) {
		if(!pos) pos = "last";
		var success = false;
		var nm, row, td, gi=0, si=0;
		if(data) {
			this.each(function() {
				var t = this;
				row =  document.createElement("tr");
				row.id = rowid || t.p.records+1;
				if(t.p.multiselect) {
					td = jQuery('<td></td>');
					jQuery(td[0],t.grid.bDiv).html("<input type='checkbox'"+" id='jqg_"+rowid+"' class='cbox'/>");
					row.appendChild(td[0]);
					gi = 1;
				}
				if(t.p.subGrid ) {jQuery(t).addSubGrid(t.grid.bDiv,row,gi); si=1;}
				for(var i = gi+si; i < this.p.colModel.length;i++){
					nm = this.p.colModel[i].name;
					td  = jQuery('<td></td>');
					jQuery(td[0]).html('&nbsp;');
					t.formatCol(jQuery(td[0],t.grid.bDiv),i);
					jQuery(data).each(function(j) {
						if(this[nm]) {
							jQuery(td[0]).html(this[nm]);
							return false;
						}
					});
					row.appendChild(td[0]);
				}
				if (pos === "last") jQuery("tbody",t.grid.bDiv).append(row);
				else jQuery("tbody tr:eq(1)",t.grid.bDiv).before(row);
				t.p.records++;
				if(!jQuery.browser.msie) {
					t.scrollLeft = t.scrollLeft;
					jQuery("tbody tr:eq(1) td",t.grid.bDiv).each( function( k ) {
						jQuery(this).css("width",t.grid.headers[k].width+"px");
						t.grid.cols[k] = this;
					});
				};
				if( t.p.altRows === true ) { jQuery("tr", t.grid.bDiv).removeClass("alt");jQuery("tr:odd", t.grid.bDiv).addClass("alt"); }
				t.updatepager();
				success = true;
			});
		}
		return success;
	};
	jQuery.fn.hideCol = function(colname) {
		return this.each(function() {
			var $t = this,w=0;
			if (!$t.grid ) return;
			jQuery(this.p.colModel).each(function(i) {
				if (this.name === colname && !this.hidden) {
					w = jQuery("table:first",$t.grid.hDiv).width();
 					jQuery("tr th:eq("+i+")",$t.grid.hDiv).css({display:"none"});
					jQuery("tr",$t.grid.bDiv).each(function(j){
						jQuery("td:eq("+i+")",this).css({display:"none"});
					});
					this.hidden=true;
					jQuery("table:first",$t.grid.hDiv).css("width",w+"px");
					return false;
				};
			});
		});
	};
	jQuery.fn.showCol = function(colname) {
		return this.each(function() {
			$t = this; var w = 0;
			if (!$t.grid ) return;
			jQuery($t.p.colModel).each(function(i) {
				if (this.name === colname && this.hidden) {
					jQuery("tr th:eq("+i+")",$t.grid.hDiv).css("display","");
					jQuery("tr",$t.grid.bDiv).each(function(){
						jQuery("td:eq("+i+")",this).css("display","");
					});
					this.hidden=false;
					return false;
				};
			});
		});
	};
	jQuery.fn.setCaption = function (newcap){
		return this.each(function(){
			this.p.caption=newcap;
			jQuery("table th",this.grid.cDiv).text(newcap);
			jQuery(this.grid.cDiv).show();
		});
	};
	return this.each( function() {
		if(this.grid) return;
		if(p.imgpath !== "" ) p.imgpath += "/";
		this.p = p; p = null;
		var ts = this;
		if( this.p.colNames.length === 0 || this.p.colNames.length !== this.p.colModel.length ) {
			alert("Length of colNames <> colModel or 0!");
			return;
		}
		var onSelectRow = this.p.onSelectRow, ondblClickRow = this.p.ondblClickRow, onSortCol=this.p.onSortCol, loadComplete = this.p.loadComplete;
		var onRightClickRow = this.p.onRightClickRow;
		if(typeof onSelectRow !== 'function') {onSelectRow=false;}
		if(typeof ondblClickRow !== 'function') {ondblClickRow=false;}
		if(typeof onSortCol !== 'function') {onSortCol=false;}
		if(typeof loadComplete !== 'function') {loadComplete=false;}
		if(typeof onRightClickRow !== 'function') {onRightClickRow=false;}
		if(!Array.indexOf){
		    Array.prototype.indexOf = function(obj){
		        for(var i=0; i<this.length; i++){
		            if(this[i]==obj){
		                return i;
		            }
		        }
		        return -1;
		    }
		}
		var sortkeys = ["shiftKey","altKey","ctrlKey"];
		if (sortkeys.indexOf(ts.p.multikey) == -1 ) ts.p.multikey = null;
		var formatCol = function (elem, pos){
			var rowalign1 = ts.p.colModel[pos].align || "left";
			jQuery(elem).css("text-align",rowalign1);
			if(ts.p.colModel[pos].hidden) jQuery(elem).css("display","none");
			return false;
		};
		var resizeFirstRow = function (t){
			jQuery("tbody tr:eq(1) td",t).each( function( k ) {
				jQuery(this).css("width",grid.headers[k].width+"px");
				grid.cols[k] = this;
			});
			return false;
		};
		var addCell = function(t,row,cell,pos) {
			var td;
			td = document.createElement("td");
			jQuery(td,t).html( cell);
			formatCol(jQuery(td,t), pos);
			row.appendChild(td);
			return false;
		};
		var addMulti = function(t,row){
			var cbid,td;
			td = document.createElement("td");
			cbid = "jqg_"+row.id;
			jQuery(td,t).html("<input type='checkbox'"+" id='"+cbid+"' class='cbox'/>");
			formatCol(jQuery(td,t), 0);
			row.appendChild(td);
		};
		var reader = function (datatype) {
			var field, f=[], j=0;
			for(var i =0; i<ts.p.colModel.length; i++){
				var field = ts.p.colModel[i];
				if (field.name !== 'cb' && field.name !=='subgrid') {
					f[j] = datatype=="xml" ? field.xmlmap || field.name : field.jsonmap || field.name;
					j++;
				}
			}
			return f
		};
		var addXmlData = function addXmlData (xml,t) {
			if(xml) { jQuery("tbody tr:gt(0)", t).remove(); } else { return false; }
			var row,gi=0,si=0,cbid,rowh=0,idn, f=[];
			if(!ts.p.xmlReader.repeatitems) f = reader("xml");
			if( !ts.p.keyIndex ) {
				idn = ts.p.xmlReader.id;
				if( idn.indexOf("[") === -1 )
					var getId = function( trow, k) { return jQuery(idn,trow).text() || k }
				else 
					var getId = function( trow, k) { return trow.getAttribute(idn.replace(/[\[\]]/g,"")) || k }
			} else {
				var getId = function(trow) { return f.length >= ts.p.keyIndex ? jQuery(f[ts.p.keyIndex],trow).text() : jQuery(ts.p.xmlReader.cell+":eq("+ts.p.keyIndex+")",trow).text() }
			}
			jQuery(ts.p.xmlReader.page,xml).each( function() { ts.p.page = this.textContent  || this.text ; });
			jQuery(ts.p.xmlReader.total,xml).each( function() { ts.p.lastpage = this.textContent  || this.text ; }  );
			jQuery(ts.p.xmlReader.records,xml).each( function() { ts.p.records = this.textContent  || this.text ; }  );
			jQuery(t).attr('records', ts.p.records);
			jQuery(ts.p.xmlReader.root+">"+ts.p.xmlReader.row,xml).each( function( j ) {
				row = document.createElement("tr");
				row.id = getId(this,j+1);
				if(ts.p.multiselect) {
					addMulti(t,row);
					gi = 1;
				}
				if (ts.p.subGrid) {
					jQuery(ts).addSubGrid(t,row,gi);
					si= 1;
				}
				if(ts.p.xmlReader.repeatitems===true){
					jQuery(ts.p.xmlReader.cell,this).each( function (i) {
						addCell(t,row,this.textContent || this.text || '&nbsp;',i+gi+si);
					});
				} else {
					var v;
					for(var i = 0; i < f.length;i++) {
						v = jQuery(f[i],this).text() || '&nbsp;';
						addCell(t, row, v, i+gi+si);
					}
				}
				jQuery("tbody",t).append(row);
				if(ts.p.rowheight) rowh = rowh+ts.p.rowheight;
			});
			xml = null;
			if(!isMSIE) { ts.scrollLeft = ts.scrollLeft; resizeFirstRow(t);}
		  	ts.scrollTop = 0;
		  	if(ts.p.rowheight) jQuery(grid.bDiv).css({height:rowh+2+'px'});
		 	if( ts.p.altRows === true ) { jQuery("tbody tr:odd", t).addClass("alt"); }
			grid.hDiv.loading = false;
			jQuery("div.loading",grid.hDiv).hide("fast");
			updatepager();
			return false;
		};
		var addJSONData = function(data,t) {
			if(data) { jQuery("tbody tr:gt(0)", t).remove(); } else { return false; }
			var row,cur,gi=0,rowh=0,si=0,drows,idn;
			ts.p.page = data[ts.p.jsonReader.page];
			ts.p.lastpage= data[ts.p.jsonReader.total];
			ts.p.records= data[ts.p.jsonReader.records];
			idn = !ts.p.keyIndex ? ts.p.jsonReader.id : ts.p.keyIndex;
			if(!ts.p.jsonReader.repeatitems) var f = reader("json");
			drows = data[ts.p.jsonReader.root];
			if (drows) {
			for (var i=0;i<drows.length;i++) {
				cur = drows[i];
				row = document.createElement("tr");
				row.id = cur[idn] || i+1;
				if(ts.p.multiselect){
					addMulti(t,row);
					gi = 1;
				}
				if (ts.p.subGrid) {
					jQuery(ts).addSubGrid(t,row,gi);
					si= 1;
				}
				if (ts.p.jsonReader.repeatitems === true) {
					if(ts.p.jsonReader.cell) cur = cur[ts.p.jsonReader.cell];
					for (var j=0;j<cur.length;j++) {
						addCell(t,row,cur[j] || '&nbsp;',j+gi+si);
					}
				} else {
					for (var j=0;j<f.length;j++) {
						addCell(t,row,cur[f[j]] || '&nbsp;',j+gi+si);
					}
				}
				jQuery("tbody",t).append(row);
				if(ts.p.rowheight) rowh = rowh+ts.p.rowheight;
			}		
			}
			data = null;
			if(!isMSIE) { ts.scrollLeft = ts.scrollLeft; resizeFirstRow(t);}
		  	ts.scrollTop = 0;
		  	if(ts.p.rowheight) jQuery(grid.bDiv).css({height:rowh+2+'px'});
		 	if( ts.p.altRows === true ) { jQuery("tbody tr:odd", t).addClass("alt"); }
			grid.hDiv.loading = false;
			jQuery("div.loading",grid.hDiv).hide("fast");
			updatepager();
			return false;
		};
		var updatepager = function() {
			if(ts.p.pager) {
				var cp, last,imp = ts.p.imgpath;
				if (ts.p.loadonce) {
					cp = last = 1;
					ts.p.lastpage = ts.page =1;
					jQuery(".selbox",ts.p.pager).attr("disabled",true);
				} else {
					cp = IntNum(ts.p.page);
					last = IntNum(ts.p.lastpage);
					jQuery(".selbox",ts.p.pager).attr("disabled",false);
				}
				jQuery('#sp_1',ts.p.pager).html("/"+"&nbsp;"+ts.p.lastpage );
				jQuery('input.selbox',ts.p.pager).val(ts.p.page);
				if (ts.p.viewrecords)
					jQuery('#sp_2',ts.p.pager).html(ts.p.records+"&nbsp;"+ts.p.recordtext+"&nbsp;");
				if(cp==1) jQuery("#first",ts.p.pager).attr({src:imp+"off-"+ts.p.firstimg,disabled:true}); else jQuery("#first",ts.p.pager).attr({src:imp+ts.p.firstimg,disabled:false});
				if(cp==1) jQuery("#prev",ts.p.pager).attr({src:imp+"off-"+ts.p.previmg,disabled:true}); else jQuery("#prev",ts.p.pager).attr({src:imp+ts.p.previmg,disabled:false});
				if(cp==last) jQuery("#next",ts.p.pager).attr({src:imp+"off-"+ts.p.nextimg,disabled:true}); else jQuery("#next",ts.p.pager).attr({src:imp+ts.p.nextimg,disabled:false});
				if(cp==last) jQuery("#last",ts.p.pager).attr({src:imp+"off-"+ts.p.lastimg,disabled:true}); else jQuery("#last",ts.p.pager).attr({src:imp+ts.p.lastimg,disabled:false});
			}
			return false;
		};
		var populate = function () {
			if(!grid.hDiv.loading) {
				grid.hDiv.loading = true;
				var gdata = {page: ts.p.page, rows: ts.p.rowNum, sidx: ts.p.sortname, sord:ts.p.sortorder, _nd: (new Date().getTime()), _search:ts.p.search};
				if (ts.p.search ===true) gdata =jQuery.extend(gdata,ts.p.searchdata);
				switch(ts.p.datatype)
				{
				case "json":
					jQuery.ajax({url:ts.p.url,type:ts.p.mtype,datatype:"json",data: gdata, complete:function(JSON) { addJSONData(eval("("+JSON.responseText+")"),ts.grid.bDiv); if(loadComplete) loadComplete();}});
					if( ts.p.loadonce ) ts.p.datatype = "local";
  				break;
				case "xml":
				
				/*<added>*/
				    if(ts.p.retrieveMode === 'url') {
				    
                        jQuery.ajax({url: ts.p.url,type:ts.p.mtype,dataType:"xml",data: gdata, complete:function(xml) { addXmlData(xml.responseXML,ts.grid.bDiv);if(loadComplete) loadComplete();}});
                        if( ts.p.loadonce ) ts.p.datatype = "local";
                            
                        } else if(ts.p.retrieveMode === 'function') {
                        
                            if(ts.p.populateFromFunction != null) {
                                ts.p.populateFromFunction({
                                	page: ts.p.page,
                                    rows: ts.p.rowNum,
                                    sidx: ts.p.sortname,
                                    sord: ts.p.sortorder,
                                    rightsChanger: ts.p.rightsChanger,
                                    identifier: ts.p.identifier,
                                    downloadDocument: ts.p.downloadDocument,
                                    allowPDFSigning: ts.p.allowPDFSigning,
                                    showAttachmentStatistics: ts.p.showAttachmentStatistics,
                                    caseId: ts.p.caseId
                                },
                                    function(xml) {
                                    	if (xml != null) {
                                    		addXmlData(xml, ts.grid.bDiv);
                                    	}
                                    	
                                    	if (ts.p.callbackAfterInserted) {
                                    		ts.p.callbackAfterInserted();
                                    	}
                                    	
                                    	if (loadComplete) loadComplete();
                                    }
                                );
                            }
                        }
                /*</added>*/
										
				break;
				case "xmlstring":
					addXmlData(stringToDoc(ts.p.datastr),ts.grid.bDiv);
					ts.p.datastr = null;
					ts.p.datatype = "local";
					if(loadComplete) loadComplete();
				break;
				case "jsonstring":
					addJSONData(eval("("+ts.p.datastr+")"),ts.grid.bDiv);
					ts.p.datastr = null;
					ts.p.datatype = "local";
					if(loadComplete) loadComplete();
				break;
				case "local":
				case "clientSide":
					sortArrayData();
  				break;
				}
			}
			return false;
		};
		var stringToDoc =	function (xmlString) {
			var xmlDoc;
			if (isSafari2){
			 	var z=document.createElement('div');
			  	z.innerHTML = xmlString;
				xmlDoc=z;
				z.responseXML=z;
			} 
			else {
				try	{
					var parser = new DOMParser();
					xmlDoc = parser.parseFromString(xmlString,"text/xml");
				}
				catch(e) {
					xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
					xmlDoc.async=false;
					xmlDoc["loadXM"+"L"](xmlString);
				}
			}
			return (xmlDoc && xmlDoc.documentElement && xmlDoc.documentElement.tagName != 'parsererror') ? xmlDoc : null;			
		};
		var sortArrayData = function() {
			var newDir = ts.p.sortorder == "asc" ? 1 :-1;
			var column = ts.p.lastsort >=0 ? ts.p.lastsort:0;
			var st = ts.p.colModel[column].sorttype;
			if (st == 'float') {
				findSortKey = function($cell) {
					var key = parseFloat($cell.html().replace(/,/g, ''));
					return isNaN(key) ? 0 : key;
				}
			} else if (st=='int') {
				findSortKey = function($cell) {
					return IntNum($cell.html().replace(/,/g, ''))
				}
			} else if(st == 'date') {
				findSortKey = function($cell) {
					var fd = ts.p.colModel[column].datefmt || "Y-m-d";
					return parseDate(fd,$cell.html()).getTime();
				}
			} else {
				findSortKey = function($cell) {
					return $cell.html().toUpperCase();
				}
			}
			var rows = jQuery(ts.grid.bDiv).find('tbody > tr:gt(0)').get();
			jQuery.each(rows, function(index, row) {
				row.sortKey = findSortKey(jQuery(row).children('td').eq(column));
				var a =1;
			});
			rows.sort(function(a, b) {
				if (a.sortKey < b.sortKey) return -newDir;
				if (a.sortKey > b.sortKey) return newDir;
				return 0;
			});
			jQuery.each(rows, function(index, row) {
				jQuery('tbody',ts.grid.bDiv).append(row);
				row.sortKey = null;
			});
			if(!isMSIE) { ts.scrollLeft = ts.scrollLeft; resizeFirstRow(grid.bDiv);}
			if(ts.p.multiselect) {
				jQuery("tbody tr:gt(0)", ts.grid.bDiv).removeClass("selected");
				jQuery("[@id^=jqg_]",ts.grid.bDiv).attr("checked",false);
				ts.p.selarrrow = [];
			}
			if( ts.p.altRows === true ) {
				jQuery("tbody tr:gt(0)", ts.grid.bDiv).removeClass("alt");
				jQuery("tbody tr:odd", ts.grid.bDiv).addClass("alt");
			}
			ts.scrollTop = 0;
			ts.grid.hDiv.loading = false;
			jQuery("div.loading",ts.grid.hDiv).hide("fast");
		};
		var parseDate = function(format, date) { //so only numbers for now
			var tsp = {m : 1, d : 1, y : 1970, h : 0, i : 0, s : 0};
			format = format.toLowerCase();
			date = date.split(/[\\\/:_;.\s-]/);
			format = format.split(/[\\\/:_;.\s-]/);
		    for(var i=0;i<format.length;i++){
		        tsp[format[i]] = IntNum(date[i],tsp[format[i]]);
		    }
		    tsp.m = parseInt(tsp.m)-1;
		    var ty = tsp.y;
		    if (ty >= 70 && ty <= 99) tsp.y = 1900+tsp.y;
		    else if (ty >=0 && ty <=69) tsp.y= 2000+tsp.y;
		    return new Date(tsp.y, tsp.m, tsp.d, tsp.h, tsp.i, tsp.s,0);
		};
		var setPager = function (){
			var inpt = "<input type='image' class='pgbuttons' src='"+ts.p.imgpath+"spacer.gif'";
			jQuery(ts.p.pager).append(inpt+" id='first'/>"+"&nbsp;&nbsp;"+inpt+" id='prev'/>"+"&nbsp;<input class='selbox' type='text' size='3' maxlength='5' value='0'/><span id='sp_1'></span>&nbsp;"+inpt+" id='next'/>&nbsp;&nbsp;"+inpt+" id='last'/>");
			if(ts.p.rowList.length >0){
				var str="<SELECT class='selbox'>";
				for(var i=0;i<ts.p.rowList.length;i++){
					str +="<OPTION value="+ts.p.rowList[i]+((ts.p.rowNum == ts.p.rowList[i])?' selected':'')+">"+ts.p.rowList[i];
				}
				str +="</SELECT>";
				jQuery(ts.p.pager).append("&nbsp;"+str+"&nbsp;<span id='sp_2'></span>");
				jQuery(ts.p.pager).find("select").bind('change',function() { 
					ts.p.rowNum = this.value>0 ? this.value : ts.p.rowNum; populate();
					ts.p.selrow = null;
				});
			}
			jQuery("#first, #prev, #next, #last",ts.p.pager).click( function() {
				var cp = IntNum(ts.p.page);
				var last = IntNum(ts.p.lastpage), selclick = false;
				var fp=true; var pp=true; var np=true; var lp=true;
				if(last ===0 || last===1) {fp=false;pp=false;np=false;lp=false; }
				else if( last>1 && cp >=1) {
					if( cp === 1) { fp=false; pp=false; } 
					else if( cp>1 && cp <last){ }
					else if( cp===last){ np=false;lp=false; }
				} else if( last>1 && cp===0 ) { np=false;lp=false; cp=last-1;}
				if( jQuery(this).attr('id') === 'first' && fp ) { ts.p.page=1; populate(); selclick=true;} 
				if( jQuery(this).attr('id') === 'prev' && pp) { ts.p.page=(cp-1);populate(); selclick=true;} 
				if( jQuery(this).attr('id') === 'next' && np) { ts.p.page=(cp+1);populate(); selclick=true;} 
				if( jQuery(this).attr('id') === 'last' && lp) { ts.p.page=last;  populate(); selclick=true;}
				if(selclick) {
					ts.p.selrow = null;
					if(ts.p.multiselect) {ts.p.selarrrow =[];jQuery('#cb_jqg',ts.grid.hDiv).attr("checked",false);}
					ts.p.savedRow = [];
				}
				return false;
			});
			jQuery('input.selbox',ts.p.pager).keypress( function(e) {
				var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
				if(key == 13) {
					ts.p.page = jQuery(this).val()>0 ? jQuery(this).val():ts.p.page;
					populate();
					ts.p.selrow = null;
					return false;
				}
				return this;
			});
			return false;
		};
		var sortData = function (index, idxcol,reload){
			if(!reload) {
				if( ts.p.lastsort === idxcol /*ts.p.sortname === index*/) {				    
					if( ts.p.sortorder === 'asc') {
						ts.p.sortorder = 'desc';
					} else if(ts.p.sortorder === 'desc') { ts.p.sortorder='asc';}
				} else { ts.p.sortorder='asc';}
				ts.p.page = 1;
			}
			var imgs = ts.p.sortorder==='asc' ? ts.p.sortascimg : ts.p.sortdescimg;
			imgs = "<img src='"+ts.p.imgpath+imgs+"'>";
			var thd= jQuery("thead:first",grid.hDiv).get(0);
			jQuery("tr th div#"+ts.p.colModel[ts.p.lastsort].name+" img",thd).remove();
			jQuery("tr th div#"+index,thd).append(imgs);
			ts.p.lastsort = idxcol;
			ts.p.sortname = ts.p.colModel[idxcol].index || index;
			if(onSortCol) {onSortCol(index,idxcol);}
			if(ts.p.selrow && ts.p.datatype == "local" && !ts.p.multiselect){ jQuery('#'+ts.p.selrow,grid.bDiv).removeClass("selected");}
			ts.p.selrow = null;
			if(ts.p.multiselect && ts.p.datatype !== "local"){ts.p.selarrrow =[]; jQuery("#cb_jqg",ts.grid.hDiv).attr("checked",false);}
			ts.p.savedRow =[];
			populate();
			return false;
		};
		var setGridWidth = function () {
			var initwidth = 0; 
			for(var l=0;l<ts.p.colModel.length;l++)
				initwidth += IntNum(ts.p.colModel[l].width || 150);
			var tblwidth = ts.p.width ? ts.p.width : initwidth;
			for(l=0;l<ts.p.colModel.length;l++) {
                if(!ts.p.shrinkToFit) 
                    ts.p.colModel[l].owidth = ts.p.colModel[l].width;
				ts.p.colModel[l].width = Math.round(tblwidth/initwidth*ts.p.colModel[l].width);
			}
			return false;
		};
		var IntNum = function(val,defval) {
			val = parseInt(val,10);
			if (isNaN(val)) {
				return defval ? defval : 0;
			} else {
				return val;
			} 
		};
		if(this.p.subGrid) {
			this.p.colNames.unshift("");
			this.p.colModel.unshift({name:'subgrid',width:25,sortable: false,resizable:false});
		};
		if(this.p.multiselect) {
			this.p.colNames.unshift("<input id='cb_jqg' class='cbox' type='checkbox' style='text-align:center'/>");
			this.p.colModel.unshift({name:'cb',width:28,sortable:false,resizable:false});
		};
		var	xReader = {
			root: "rows",
			row: "row",
			page: "rows>page",
			total: "rows>total",
			records : "rows>records",
			repeatitems: true,
			cell: "cell",
			id: "[id]", 
			subgrid: {root:"rows", row: "row", repeatitems: true, cell:"cell"}
		};
		var jReader = {
			root: "rows",
			page: "page",
			total: "total",
			records: "records",
			repeatitems: true,
			cell: "cell",
			id: "id",
			subgrid: {root:"rows", repeatitems: true, cell:"cell"}
		};
		this.p.xmlReader = jQuery.extend( xReader, this.p.xmlReader);
		this.p.jsonReader = jQuery.extend( jReader, this.p.jsonReader);
		if (this.p.width) setGridWidth();
		var thead = document.createElement("thead");
		var trow = document.createElement("tr");
		thead.appendChild(trow); 
		var i=0, th, idn, thdiv;
		ts.p.keyIndex=false;
		for (var i=0; i<ts.p.colModel.length;i++) {
			if (ts.p.colModel[i].key==true) {
				ts.p.keyIndex = i;
				break;
			}
			i++;
		};
		for(i=0;i<this.p.colNames.length;i++){
			th = document.createElement("th");
			idn = ts.p.colModel[i].name;
			idn = idn ? idn : i+1;
			thdiv = document.createElement("div");
			thdiv.id = ""+idn+"";
			jQuery(thdiv).html(ts.p.colNames[i]+"&nbsp;");
			th.appendChild(thdiv);
			trow.appendChild(th);
		};
		if(this.p.multiselect) {
			jQuery('#cb_jqg',trow).click(function(){
				if (this.checked) {
					jQuery("[@id^=jqg_]",grid.bDiv).attr("checked",true);
					jQuery("tr:gt(0)",ts.grid.bDiv).each(function(i) {
						jQuery(this).addClass("selected");
						ts.p.selarrrow[i]=this.id;
					});
				}
				else {
					jQuery("[@id^=jqg_]",grid.bDiv).attr("checked",false);
					jQuery("tr",grid.bDiv).removeClass("selected");
					ts.p.selarrrow = [];
				}
			});
		};
		this.appendChild(thead);
		thead = jQuery("thead:first",ts).get(0);
		var w, res, sort;
		jQuery("tr:first th",thead).each(function ( j ) {
			w = ts.p.colModel[j].width || 150;
			if(typeof ts.p.colModel[j].resizable == 'undefined') ts.p.colModel[j].resizable = true;
			res = document.createElement("span");
			jQuery(res).html("&nbsp;");
			if(ts.p.colModel[j].resizable){
			jQuery(res).mousedown(function (e) {
				grid.dragStart( j ,e.clientX);
				return false;
			});
			} else {jQuery(res).css("cursor","default");}
			jQuery(this).css("width",w+"px").prepend(res);
			if( ts.p.colModel[j].hidden) jQuery(this).css("display","none");
			grid.headers[j] = { width: w, el: this };
		});
		jQuery("tr:first th div",thead).each(function(l) {
			sort = ts.p.colModel[l].sortable;
			if( typeof sort !== 'boolean') sort =  true;
			if(sort) { 
				jQuery(this).css("cursor","pointer");
				jQuery(this).click(function(){sortData(this.id,l);return false;});
			}
		});
		var tbody = document.createElement("tbody");
		trow = document.createElement("tr");
		trow.style.display="none";
		trow.id = "_empty";
		tbody.appendChild(trow);
		var td, ptr;
		for(i=0;i<ts.p.colNames.length;i++){
			td = document.createElement("td");
			trow.appendChild(td);
		};
		this.appendChild(tbody);
		var gw=0; //if hidden grid
		jQuery("tbody tr:first td",ts).each(function(ii) {
			w = ts.p.colModel[ii].width || 150;
			jQuery(this).css("width",w+"px");
			if( ts.p.colModel[ii].hidden) {
				jQuery(this).css("display","none");
			} else {
				w +=  IntNum(jQuery(this).css("padding-left")) +
				IntNum(jQuery(this).css("padding-right"))+
				IntNum(jQuery(this).css("border-left-width"))+
				IntNum(jQuery(this).css("border-right-width"));
			}
			grid.cols[ii] = this;
			gw += w;
		});
		grid.width = jQuery(this).width();
		if (grid.width == 0) grid.width = gw;
		ts.p.width = grid.width;
		grid.hTable = document.createElement("table");
		grid.hTable.cellSpacing="0"; 
		grid.hTable.cellPadding="0"; 
		grid.hTable.className = "scroll";
		grid.hTable.appendChild(thead);
		grid.hDiv = document.createElement("div");
		jQuery(grid.hDiv)
			.addClass('gridHeadersTableContainer')
		  	.css({ width: grid.width+"px", overflow: "hidden"})
			.prepend('<div class="loading">'+ts.p.loadtext+'</div>')
			.append(grid.hTable)
			.bind("selectstart", function () { return false; });
		if(ts.p.pager){
			if( jQuery(ts.p.pager).attr("class") === "scroll") jQuery(ts.p.pager).css({ width: (grid.width)+1+"px", overflow: "hidden"}).show();
			setPager();
		};
		jQuery(ts).mouseover(function(e) {
			td = (e.target || e.srcElement);
			ptr = jQuery(td,ts).parents("tr:first");
			if(jQuery(ptr).attr("class") !== "subgrid") {
				jQuery(ptr).addClass("over");
				td.title = jQuery(td).text();
			}
			return false;
		}).mouseout(function(e) {
			td = (e.target || e.srcElement);
			ptr = jQuery(td,ts).parents("tr:first");
			jQuery(ptr).removeClass("over");
			td.title = "";
			return false;
		}).css("width", grid.width+"px").before(grid.hDiv).click(function(e) {
			if ( !ts.p.multikey) {
				td = (e.target || e.srcElement);
				ptr = jQuery(td,ts).parents("tr:first");
				jQuery(ts).setSelection(jQuery(ptr).attr("id"));
			} else {
				if (e[ts.p.multikey]){
					td = (e.target || e.srcElement);
					ptr = jQuery(td,ts).parents("tr:first");
					jQuery(ts).setSelection(jQuery(ptr).attr("id"));
				} else {
					td = (e.target || e.srcElement);
					ptr = jQuery(td).parents("td:first");
					if ( jQuery(ptr).html() !== null) {
						td = jQuery("[@id^=jqg_]",ptr).attr("checked");
						td = typeof td == "undefined" ? false: td;
						jQuery("[@id^=jqg_]",ptr).attr("checked",!td);
					}
				}
			}
			e.stopPropagation();
		}).bind('reloadGrid', function(e) {
			ts.p.selrow=null;
			if(ts.p.multiselect) {ts.p.selarrrow =[];jQuery('#cb_jqg',ts.grid.hDiv).attr("checked",false);}
			populate();
		});
		if( ondblClickRow ) {
			jQuery(this).dblclick(function(e) {
				td = (e.target || e.srcElement);
				ptr = jQuery(td,ts).parents("tr:first");
				ts.p.ondblClickRow(jQuery(ptr).attr("id"));
				return false;
			});
		};
		if (onRightClickRow)
			jQuery(this).bind('contextmenu', function(e) {
				td = (e.target || e.srcElement);
				ptr = jQuery(td,ts).parents("tr:first");
				jQuery(ts).setSelection(jQuery(ptr).attr("id"));
				ts.p.onRightClickRow(jQuery(ptr).attr("id"));
				return false;
			});
		grid.bDiv = document.createElement("div");
		jQuery(grid.bDiv)
			.addClass('gridBodyTableContainer')
		  	.scroll(function (e) {grid.scrollGrid()})
			.css({ height: ts.p.height+(isNaN(ts.p.height)?"":"px"), padding: "0px", margin: "0px", overflow: "auto",width: (grid.width)+1+"px"} ).css("overflow-x","hidden")
			.append(this);
		jQuery("table:first",grid.bDiv).css("margin-right","20px");
		var isMSIE = jQuery.browser.msie ? true:false;
		var isSafari2 = jQuery.browser.safari && ( parseInt(jQuery.browser.version) <= 419) ? true : false;
		if( isMSIE ) {
			if( jQuery("tbody",this).size() === 2 ) { jQuery("tbody:first",this).remove();}
			if( ts.p.multikey) jQuery(grid.bDiv).bind("selectstart",function(){return false;});
		} else {
			if( ts.p.multikey) jQuery(grid.bDiv).bind("mousedown",function(){return false;});
		};
		grid.cDiv = document.createElement("div");
		jQuery(grid.cDiv).append("<table class='Header' cellspacing='0' cellpadding='0' border='0'><tr><td class='HeaderLeft'><img src='"+ts.p.imgpath+"spacer.gif' border='0' /></td><th>"+ts.p.caption+"</th>"+ ((ts.p.hidegrid==true) ? "<td class='HeaderButton'><img src='"+ts.p.imgpath+"up.gif' border='0'/></td>" :"") +"<td class='HeaderRight'><img src='"+ts.p.imgpath+"spacer.gif' border='0' /></td></tr></table>").addClass("GridHeader");
		jQuery(grid.cDiv).insertBefore(grid.hDiv);
		if(ts.p.caption) {
			jQuery(grid.cDiv,ts).show().width(grid.width).css("text-align","center");
			if(ts.p.hidegrid==true) {
				jQuery(".HeaderButton",grid.cDiv).toggle( function(){
					if(ts.p.pager) jQuery(ts.p.pager).hide("slow");
					jQuery(grid.bDiv,ts).hide("slow");
					jQuery(grid.hDiv,ts).hide("slow");
					jQuery("img",this).attr("src",ts.p.imgpath+"down.gif");
					},
					function() {
					jQuery(grid.hDiv,ts).show("slow");
					jQuery(grid.bDiv,ts).show("slow");
					if(ts.p.pager) jQuery(ts.p.pager).show("slow");
					jQuery("img",this).attr("src",ts.p.imgpath+"up.gif");
					}
				);
			};
		};
		jQuery(grid.hDiv).mousemove(function (e) {grid.dragMove(e.clientX);}).after(grid.bDiv)
		.mouseup(function (e) {
			if(grid.resizing) {
				grid.dragEnd();				
				var gwdt = grid.width < ts.p.width ? grid.width : ts.p.width;
				var overfl = grid.width < ts.p.width ? "hidden" : "auto";
				if(ts.p.pager && jQuery(ts.p.pager).attr("class")=="scroll" ) {
					jQuery(ts.p.pager).width(gwdt+1);
				}
				if(ts.p.caption,ts) jQuery(grid.cDiv).width(gwdt);
				jQuery(grid.bDiv).width(gwdt+1).css("overflow-x",overfl);
			}
			return false;
		});
		ts.formatCol = function(a,b) {formatCol(a,b);};
		ts.sortData = function(a,b,c){sortData(a,b,c);};
		ts.updatepager = function(){updatepager();};
		this.grid = grid;
		populate();
        if (!ts.p.shrinkToFit) {
            jQuery("tr:first th", thead).each(function(j){
                var w = ts.p.colModel[j].owidth;
                var diff = w - ts.p.colModel[j].width;
                if (diff > 0) {
                    grid.headers[j].width = w;
                    jQuery(this).add(grid.cols[j]).width(w);
                    grid.width = grid.width + diff;
                    jQuery('table',grid.bDiv).add(grid.hTable).width(grid.width);
                    grid.hDiv.scrollLeft = grid.bDiv.scrollLeft;
                }
            });
			jQuery(grid.bDiv).css("overflow-x","auto");
        };
		jQuery(window).unload(function () {
			jQuery(this).unbind();
			this.p = null;
			this.grid = null;
			jQuery(ts.p.pager).unbind();
		});
	});
};
})(jQuery);
