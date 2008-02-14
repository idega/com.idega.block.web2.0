jQuery.noConflict();

(function (jQuery) {
/**
 * jqGrid 3.0 rc - jQuery Grid plugin 29/10/2007
 * rev. 8 14/11/2007 
 * http://trirand.com/blog/
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Modified to support function calls for data retrieval/storing (for dwr)
 *
 *
 */
jQuery.fn.jqGrid = function( p ) {
	p = jQuery.extend({
		url: '',
        retrieveMode: 'url', // or function
        populateFromFunction: null,
        populateSubgridFromFunction: null,
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
		imgpath: "/idegaweb/bundles/com.idega.block.web2.0.bundle/resources/javascript/jqgrid/images",
		sortascimg :  "sort_asc.gif",
		sortdescimg : "sort_desc.gif",
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
		datatype:"xml",
		viewrecords: false,
		recordtext:"Record(s)",
		loadtext: "Loading...",
		loadonce: false,
		multiselect: false,
		multikey: null,
		selarrrow:[],
		rowheight:null,
		loadComplete: null, //Joe Tataro
		editurl: null,
		savedRow: [],
		xReader : {
			root : "rows",
			row: "row",
			page: "rows>page",
			total : "rows>total",
			records : "rows>records",
			repeatitems: true,
			cell: "cell",
			id: "id",
			subgrid: {root:"rows", row: "row", repeatitems: true, cell:"cell"}
		},
		xmlReader : {},
		jReader : {
			root : "rows",
			page: "page",
			total: "total",
			records: "records",
			repeatitems: true,
			cell: "cell",
			id: "id",
			subgrid: {root:"rows", repeatitems: true, cell:"cell"}
			},
		jsonReader :{},
		keyIndex: null
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
					this.hDiv.scrollLeft = this.bDiv.scrollLeft;
				}
			}
		},
		dragEnd: function() {
			this.hDiv.style.cursor = "default";
			if(this.resizing) {
				var idx = this.resizing.idx;
				this.headers[idx].width = this.headers[idx].newWidth;
				this.width = this.newWidth;
				this.resizing = false;
			}
		},
		scroll: function() {
			this.hDiv.scrollLeft = this.bDiv.scrollLeft;
	  	}
	}
	jQuery.fn.getUrl = function() {return this[0].p.url;};           
	jQuery.fn.getSortName = function() {return this[0].p.sortname;};
	jQuery.fn.getSortOrder = function() {return this[0].p.sortorder;};
	jQuery.fn.getSelectedRow = function() {return this[0].p.selrow};
	jQuery.fn.getPage = function() {return this[0].p.page;};
	jQuery.fn.getRowNum = function() {return this[0].p.rowNum;};
	jQuery.fn.getMultiRow = function () {return this[0].p.selarrrow;};
	jQuery.fn.getDataType = function () {return this[0].p.datatype;};
	jQuery.fn.getRecords = function () {return this[0].p.records;};
	jQuery.fn.getDataIDs = function () {	var ids=[];
		jQuery("tr:gt(0)",this[0].grid.bDiv).each(function(i){
			ids[i]=this.id;
		});
		return ids;
	};
	jQuery.fn.setUrl = function (newurl) { return this.each( function(){this.p.url=newurl;}); };
	jQuery.fn.setSortName = function (newsort) { return this.each( function(){this.p.sortname=newsort; });};
	jQuery.fn.setSortOrder = function (neword) { return this.each( function(){this.p.sortorder=neword; });};
	jQuery.fn.setPage = function (newpage) { return this.each( function() {
		if( typeof newpage === 'number' && newpage > 0) {this.p.page=newpage;}
		});
	};
	jQuery.fn.setRowNum = function (newrownum) { 
		return this.each(function(){if( typeof newrownum === 'number' && newrownum > 0) {this.p.rowNum=newrownum;} });
	};
	jQuery.fn.setDataType = function(newtype) { return this.each( function(){this.p.datatype=newtype; });};
	jQuery.fn.setSelection = function(selection)	{ /* idea from Sven */
		t = this[0];
  		var pt = jQuery("tbody tr#"+selection,t.grid.bDiv);
  		if (!pt.html()) return false;
  		if(!t.p.multiselect) {
  			if( t.p.selrow ) jQuery("tbody tr#"+t.p.selrow,t.grid.bDiv).removeClass("selected");
  			t.p.selrow = jQuery(pt).attr("id");
  			if(jQuery(pt).attr("class") !== "subgrid") jQuery(pt).addClass("selected");
  			if( t.p.onSelectRow ) { t.p.onSelectRow(t.p.selrow); }
  		} else {  			
			t.p.selrow = selection;
			var ia = t.p.selarrrow.indexOf(t.p.selrow);
			if (  ia === -1 ){ 
				if(jQuery(pt).attr("class") !== "subgrid") { jQuery(pt).addClass("selected");};
				jQuery("#jqg_"+t.p.selrow,t.grid.bDiv).attr("checked",true);
				t.p.selarrrow.push(t.p.selrow);
			} else {
				if(jQuery(pt).attr("class") !== "subgrid") { jQuery(pt).removeClass("selected");};
				jQuery("#jqg_"+t.p.selrow,t.grid.bDiv).attr("checked",false);
				t.p.selarrrow.splice(ia,1);
			}			
  		}
		return false;
	};
	jQuery.fn.hideCol = function(colname) {
		return this.each(function() {
			var jQueryt = this,w=0;
			jQuery(this.p.colModel).each(function(i) {
				if (this.name === colname && !this.hidden) {
					w = jQuery("table",jQuery(t.grid.hDiv)).width();
					jQuery("tr th:eq("+i+")",jQuery(t.grid.hDiv)).css({display:"none"});
					jQuery("tr",jQuery(t.grid.bDiv)).each(function(j){
						jQuery("td:eq("+i+")",this).css({display:"none"});
					});
					this.hidden=true;
					jQuery("table",jQuery(t.grid.hDiv)).width(w);
					return false;
				};
			});
		});
	}
	jQuery.fn.showCol = function(colname) {
		return this.each(function() {
			//$t = this; 
            var w = 0;
			jQuery(this.p.colModel).each(function(i) {
				if (this.name === colname && this.hidden) {
					jQuery("tr th:eq("+i+")",this.grid.hDiv).css("display","");
					jQuery("tr",this.grid.bDiv).each(function(){
						jQuery("td:eq("+i+")",this).css("display","");
					});
					this.hidden=false;
					return false;
				};
			});
		});
	}
	jQuery.fn.editRow = function(rowid,keys) {
		//var $t = this[0],
        var theT = this[0]; 
        var nm, tmp, editable, cnt=0, focus=null, svr=[], self=this;
		var sz, ml;
		if( !theT.p.multiselect ) {
			editable = jQuery('#'+rowid,theT.grid.bDiv).attr("editable") || "0";
			if (editable === "0") {
				jQuery('#'+rowid+' td',theT.grid.bDiv).each( function(i) {
					nm = theT.p.colModel[i].name;
					if ( nm !== 'cb' && nm !== 'subgrid' && theT.p.colModel[i].editable===true) {
						if(focus===null) focus = i;
						tmp = jQuery(this).html().replace(/\&nbsp\;/ig,'');
						svr[nm]=tmp;
						jQuery(this).html("");
						var opt = jQuery.extend(theT.p.colModel[i].editoptions || {} ,{id:rowid+"_"+nm,name:nm})
						var elc = createEl(theT.p.colModel[i].edittype || "text",opt,tmp);
						jQuery(elc).addClass("editable");
						jQuery(this).append(elc);						
						cnt++;
					}
				});
				if(cnt > 0) {
					svr['id'] = rowid; theT.p.savedRow.push(svr);
					jQuery('#'+rowid,theT.grid.bDiv).attr("editable","1");
					jQuery('#'+rowid+" td:eq("+focus+") input",theT.grid.bDiv).focus();
					if(keys===true) {
						jQuery('#'+rowid,theT.grid.bDiv).bind("keydown",function(e) {
							if (e.keyCode === 27) self.restoreRow(rowid);
							if (e.keyCode === 13) self.saveRow(rowid);
						});
					}
				}
			}
		}
		function createEl(eltype,options,vl)
		{
			var elem = "";
			switch (eltype)
			{
				case "textarea" :
					elem = document.createElement("textarea");
					if (!options.rows) options.rows = 1;
					jQuery(elem).attr(options);
					elem.innerHTML = vl;
					break;
				case "checkbox" :
					elem = document.createElement("input");
					elem.type = "checkbox";
					elem.value = vl;
					if(vl == options.value.split(":")[0]) elem.checked = true;
					break;
				case "select" :
					var so = options.value.split(";"),sv, ov;
					elem = document.createElement("select");
					jQuery(elem).attr({id:options.id,name:options.name});
					for(var i=0; i<so.length;i++){
						sv = so[i].split(":");
						ov = document.createElement("option");
						ov.value = sv[0]; ov.innerHTML = sv[1];
						if (sv[1]==vl) ov.selected ="selected";
						elem.appendChild(ov);
					}
					break;
				case "text" :
					elem = document.createElement("input");
					elem.type = "text";
					if (!options.size) options.size = vl.length;
					jQuery(elem).attr(options);
					elem.value = vl;
					break;
			}
			return elem;
		}
		return false;
	}
	jQuery.fn.saveRow = function(rowid, succesfunc, url, extraparam) {
		//var $t = this[0],
        var theT = this[0]; 
        var nm, tmp={}, tmp2, editable, fr, self = this;
		editable = jQuery('#'+rowid,theT.grid.bDiv).attr("editable");
		url = url ? url : theT.p.editurl;
		if (editable==="1" && url) {
			jQuery('#'+rowid+" td",theT.grid.bDiv).each(function(i) {
				nm = theT.p.colModel[i].name;
				if ( nm !== 'cb' && nm !== 'subgrid' && theT.p.colModel[i].editable===true) {
					tmp[nm]= jQuery("input, select>option:selected, textarea",this).val();
				}
			});
			if(tmp) { tmp["id"] = rowid; if(extraparam) jQuery.extend(tmp,extraparam);}
			if(!theT.grid.hDiv.loading) {
				theT.grid.hDiv.loading = true;
				jQuery("div.loading",theT.grid.hDiv).fadeIn("fast");
				jQuery.post(url,tmp,function(res,stat){
					if (stat === "success"){
						if( typeof succesfunc === "function") res = succesfunc(res);
						else res = true;
						if (res) {
							jQuery('#'+rowid+" td",theT.grid.bDiv).each(function(i) {
								nm = theT.p.colModel[i].name;
								if ( nm !== 'cb' && nm !== 'subgrid' && theT.p.colModel[i].editable===true) {
									switch (theT.p.colModel[i].edittype) {
										case "select":
											tmp2 = jQuery("select>option:selected", this).text();
											break;
										case "checkbox":
											var cbv = theT.p.colModel[i].editoptions.value.split(":") || ["Yes","No"];
											tmp2 = jQuery("input",this).attr("checked") ? cbv[0] : cbv[1];
											break;
										default:
											tmp2 = jQuery("input, textarea", this).val();
									}
									jQuery(this).empty();
									jQuery(this).html(tmp2 || "&nbsp;");
								}
							});
							jQuery('#'+rowid,theT.grid.bDiv).attr("editable","0");
							for( var k=0;k<theT.p.savedRow.length;k++) {
								if( theT.p.savedRow[k].id===rowid) {fr = k; break;}
							};
							if(fr >= 0) theT.p.savedRow.splice(fr,1);
						} else self.restoreRow(rowid);
					} else {alert("Error Row: "+rowid+" Result: " +res+" Status: "+stat)}				
				});
				theT.grid.hDiv.loading = false;
				jQuery("div.loading",theT.grid.hDiv).fadeOut("fast");
				jQuery("#"+rowid,theT.grid.bDiv).unbind("keydown");
			}
		}
		return false;
	}
	jQuery.fn.restoreRow = function(rowid) {
		//var $t= this[0]
        var theT= this[0];
        var nm, fr;
		for( var k=0;k<theT.p.savedRow.length;k++) {
			if( theT.p.savedRow[k].id===rowid) {fr = k; break;}
		};
		if(fr >= 0) {
			jQuery('#'+rowid+" td",theT.grid.bDiv).each(function(i) {
				nm = theT.p.colModel[i].name;
				if ( nm !== 'cb' && nm !== 'subgrid' && theT.p.colModel[i].editable==true) {
					jQuery(this).empty()
					jQuery(this).html(theT.p.savedRow[fr][nm] || "&nbsp;");
				}
			});
			jQuery('#'+rowid,theT.grid.bDiv).attr("editable","0");		
			theT.p.savedRow.splice(fr,1);
		}
		return false;
	}
	jQuery.fn.getRowData = function( rowid ) { var res = {};	if (rowid){
		//var $t = this[0]
        var theT = this[0];
        var nm;
		jQuery('#'+rowid+' td',theT.grid.bDiv).each( function(i) {
			nm = theT.p.colModel[i].name; 
			if ( nm !== 'cb' && nm !== 'subgrid')
				res[nm] = jQuery(this).text().replace(/\&nbsp\;/ig,'');
		});
		};
		return res;
	};
	jQuery.fn.delRowData = function(rowid) { var success = false; if(rowid) {
		this.each(function() { jQuery('#'+rowid,this.grid.bDiv).each(function(){ jQuery(this).remove(); success=true; }) });
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
				t = this;
				row =  document.createElement("tr");
				row.id = rowid || t.p.records+1;
				if(t.p.multiselect) {
					td = jQuery('<td></td>');
					jQuery(td[0],t.grid.bDiv).html("<input type='checkbox'"+" id='jqg_"+rowid+"' class='cbox'/>");
					row.appendChild(td[0]);
					gi = 1;
				}
				if(t.p.subGrid ) {t.addSubGrid(t.grid.bDiv,row,gi); si=1;}
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
				}
				success = true;
			});
		}
		return success;
	};
	jQuery.fn.GridUnload = function(){
		this.each(function(){
			var defgrid = {id: jQuery(this).attr('id'),cl: jQuery(this).attr('class'),cellSpacing: jQuery(this).attr('cellspacing') || '0',cellPadding:jQuery(this).attr('cellpadding') || '0'};
			if (this.p.pager) {
				jQuery(this.p.pager).unbind();
				jQuery(this.p.pager).empty();
			}
			jQuery(this).unbind();
			var newtable = document.createElement('table');
			jQuery(newtable).attr({id:defgrid['id'],cellSpacing:defgrid['cellSpacing'], cellPadding:defgrid['cellPadding']});
			newtable.className = defgrid['cl'];
			jQuery(this.grid.bDiv).remove();
			jQuery(this.grid.hDiv).before(newtable).remove();
			this.p = null;
			this.grid =null;
		});
		return false;
	}
	if(p.imgpath !== "" ) {
		p.imgpath = p.imgpath + "/";
		p.sortascimg = p.imgpath+p.sortascimg;
		p.sortdescimg = p.imgpath+p.sortdescimg;
		p.firstimg = p.imgpath+p.firstimg;
		p.previmg = p.imgpath+p.previmg;
		p.nextimg = p.imgpath+p.nextimg;
		p.lastimg = p.imgpath+p.lastimg;
	}
	return this.each( function() {
		if(this.grid) {return false;}
		this.p = p; p = null;
		var ts = this;
		if( this.p.colNames.length === 0 || this.p.colNames.length !== this.p.colModel.length ) {
			alert("Length of colNames <> colModel or 0!");
			return false;
		}
		var onSelectRow = this.p.onSelectRow, ondblClickRow = this.p.ondblClickRow, onSortCol=this.p.onSortCol, loadComplete = this.p.loadComplete;
		if(typeof onSelectRow !== 'function') {onSelectRow=false;}
		if(typeof ondblClickRow !== 'function') {ondblClickRow=false;}
		if(typeof onSortCol !== 'function') {onSortCol=false;}
		if(typeof loadComplete !== 'function') {loadComplete=false;}
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
		}
		var resizeFirstRow = function (t){
			jQuery("tbody tr:eq(1) td",t).each( function( k ) {
				jQuery(this).css("width",grid.headers[k].width+"px");
				grid.cols[k] = this;
			});
			return false;
		}
		var addCell = function(t,row,cell,pos) {
			var td;
			td = document.createElement("td");
			jQuery(td,t).html( cell);
			formatCol(jQuery(td,t), pos);
			row.appendChild(td);
			return false;
		}
		var addMulti = function(t,row){
			var cbid,td;
			td = document.createElement("td");
			cbid = "jqg_"+row.id;
			jQuery(td,t).html("<input type='checkbox'"+" id='"+cbid+"' class='cbox'/>");
			formatCol(jQuery(td,t), 0);
			row.appendChild(td);
		}
		var addSubGrid = function(t,row,pos) {
			var td;
			td = document.createElement("td");
			jQuery(td,t).html("<img src='"+ts.p.imgpath+"plus.gif'/>").toggle( function() { 
				jQuery(this).html("<img src='"+ts.p.imgpath+"minus.gif'/>");
				var req = populatesubgrid(jQuery(this).parent()); var atd= pos==1?'<td></td>':'';
				var subdata = "<tr class='subgrid'>"+atd+"<td><img src='"+ts.p.imgpath+"line3.gif'/></td><td colspan='"+parseInt(ts.p.colNames.length-1)+"'><div class='tablediv'>"; 
				jQuery(this).parent().after( subdata+ req +"</div></td></tr>" );jQuery(".tablediv",ts).css("width", ts.grid.width-20+"px");	}, 
				function() { jQuery(this).parent().next().remove(".subgrid"); jQuery(this).html("<img src='"+ts.p.imgpath+"plus.gif'/>");
			});
			formatCol(jQuery(td,t), pos);
			row.appendChild(td);
		}
		var reader = function (datatype) {
			var field, f=[];
			for(var i =0; i<ts.p.colModel.length; i++){
				var field = ts.p.colModel[i];
				if (field.name !== 'cb' && field.name !=='subgrid')
					f[i] = datatype=="xml" ? field.xmlmap || field.name : field.jsonmap || field.name;
			}
			return f
		}
		var addXmlData = function addXmlData (xml,t) {
			if(xml) { jQuery("tbody tr:gt(0)", t).remove(); } else { return false; }
			var row,gi=0,si=0,cbid,rowh=0,idn;
			idn = ts.p.xmlReader.id;
			if(!ts.p.xmlReader.repeatitems) var f = reader("xml");
			jQuery(ts.p.xmlReader.page,xml).each( function() { ts.p.page = this.textContent  || this.text ; });
			jQuery(ts.p.xmlReader.total,xml).each( function() { ts.p.lastpage = this.textContent  || this.text ; }  );
			jQuery(ts.p.xmlReader.records,xml).each( function() { ts.p.records = this.textContent  || this.text ; }  );
			jQuery(ts.p.xmlReader.root+">"+ts.p.xmlReader.row,xml).each( function( j ) {
				row = document.createElement("tr");
				if(ts.p.multiselect) {
					addMulti(t,row);
					gi = 1;
				}
				if (ts.p.subGrid) {
					addSubGrid(t,row,gi);
					si= 1;
				}
				if(ts.p.xmlReader.repeatitems===true){
					jQuery(ts.p.xmlReader.cell,this).each( function (i) {
						addCell(t,row,this.textContent || this.text || '&nbsp;',i+gi+si);
					});
					row.id = this.getAttribute(idn) || jQuery(idn,this).text() || jQuery(ts.p.xmlReader.cell+":eq("+ts.p.keyIndex+")",this).text() ||	j+1;
				} else {
					var v;
					for(var i = 0; i < f.length;i++) {
						v = jQuery(f[i],this).text() || '&nbsp;';
						addCell(t, row, v, i+gi+si);
					}
					row.id = this.getAttribute(idn) || jQuery(idn,this).text() || jQuery(f[ts.p.keyIndex],this).text() ||	j+1;
				}
				jQuery("tbody",t).append(row);
				if(ts.p.rowheight) rowh = rowh+ts.p.rowheight;
			});
			xml = null;
			if(isMozilla) { ts.scrollLeft = ts.scrollLeft; resizeFirstRow(t);}
			else if(!isMSIE){ resizeFirstRow(t);ts.scrollLeft = ts.scrollLeft;}
		  	ts.scrollTop = 0;
		  	if(ts.p.rowheight) jQuery(grid.bDiv).css({height:rowh+2+'px'});
		 	if( ts.p.altRows === true ) { jQuery("tbody tr:odd", t).addClass("alt"); }
			grid.hDiv.loading = false;
			jQuery("div.loading",grid.hDiv).fadeOut("fast");
			updatepager();
			return false;
		}
		var addJSONData = function(data,t) {
			if(data) { jQuery("tbody tr:gt(0)", t).remove(); } else { return false; }
			var row,cur,gi=0,rowh=0,si=0,drows,idn;
			ts.p.page = data[ts.p.jsonReader.page];
			ts.p.lastpage= data[ts.p.jsonReader.total];
			ts.p.records= data[ts.p.jsonReader.records];
			idn = ts.p.jsonReader.id;
			if(!ts.p.jsonReader.repeatitems) var f = reader("json");
			drows = data[ts.p.jsonReader.root];
			if (drows) {
			for (var i=0;i<drows.length;i++) {
				cur = drows[i];
				row = document.createElement("tr");
				row.id = cur[idn] || "";
				if(ts.p.multiselect){
					addMulti(t,row);
					gi = 1;
				}
				if (ts.p.subGrid) {
					addSubGrid(t,row,gi);
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
				if(!row.id) row.id = cur[ts.p.keyIndex] || i+1;
				jQuery("tbody",t).append(row);
				if(ts.p.rowheight) rowh = rowh+ts.p.rowheight;
			}		
			}
			data = null;
			if(isMozilla) { ts.scrollLeft = ts.scrollLeft; resizeFirstRow(t);}
			else if(!isMSIE){ resizeFirstRow(t);ts.scrollLeft = ts.scrollLeft;}
		  	ts.scrollTop = 0;
		  	if(ts.p.rowheight) jQuery(grid.bDiv).css({height:rowh+2+'px'});
		 	if( ts.p.altRows === true ) { jQuery("tbody tr:odd", t).addClass("alt"); }
			grid.hDiv.loading = false;
			jQuery("div.loading",grid.hDiv).fadeOut("fast");
			updatepager();
			return false;
		}
		var updatepager = function() {
			if(ts.p.pager) {
				jQuery('span:eq(1)',ts.p.pager).html("/"+"&nbsp;"+ts.p.lastpage );
				jQuery('input',ts.p.pager).val(ts.p.page);
				if (ts.p.viewrecords)
					jQuery(ts.p.pager).find('span:eq(0)').html(ts.p.records+"&nbsp;"+ts.p.recordtext+"&nbsp;");
			}
			return false;
		}
		var populate = function () {
			if(!grid.hDiv.loading) {
				grid.hDiv.loading = true;
				jQuery("div.loading",grid.hDiv).fadeIn("fast");
                
                switch(ts.p.datatype) {
                    case "json":
                        jQuery.getJSON(ts.p.url,{page: ts.p.page, rows: ts.p.rowNum, sidx: ts.p.sortname, sord:ts.p.sortorder}, function(JSON) { addJSONData (JSON,ts.grid.bDiv); if(loadComplete) loadComplete();});
                        if( ts.p.loadonce ) ts.p.datatype = "local";
                    break;
                    case "xml":
                    
                        if(ts.p.retrieveMode === 'url') {
                            jQuery.ajax({ url: ts.p.url,type:"GET",dataType:"xml",data :{page: ts.p.page, rows: ts.p.rowNum, sidx: ts.p.sortname, sord:ts.p.sortorder}, complete:function(xml) { addXmlData(xml.responseXML,ts.grid.bDiv);if(loadComplete) loadComplete();}});
                            if( ts.p.loadonce ) ts.p.datatype = "local";
                            
                        } else if(ts.p.retrieveMode === 'function') {
                        
                            if(ts.p.populateFromFunction != null) {
                                console.log('calling poopulate from function');
                                ts.p.populateFromFunction(
                                    {page: ts.p.page, rows: ts.p.rowNum, sidx: ts.p.sortname, sord:ts.p.sortorder},
                                    function(xml) { addXmlData(xml, ts.grid.bDiv);if(loadComplete) loadComplete();}
                                );
                            }
                        }
                        
                    break;
                    case "local":
                        sortArrayData();
                        break;
                }
			}
			return false;
		}
		var sortArrayData = function() {
			var newDir = ts.p.sortorder == "asc" ? 1 :-1;
			var column = ts.p.lastsort >=0 ? ts.p.lastsort:0;
			var st = ts.p.colModel[column].sorttype;
			if (st == 'float') {
				findSortKey = function(ccell) {
					var key = parseFloat(ccell.html().replace(/,/g, ''));
					return isNaN(key) ? 0 : key;
				}
			} else if (st=='int') {
				findSortKey = function(ccell) {
					var key = parseInt(ccell.html().replace(/,/g, ''));
					return isNaN(key) ? 0 : key;
				}
			} else if(st == 'date') { //iso
				findSortKey = function(ccell) {
					return new Date(ccell.html().replace(new RegExp(/-/g),"/")).getTime();
				}
			} else {
				findSortKey = function(ccell) {
					return ccell.html().toUpperCase();
				}
			}
			var rows = jQuery(grid.bDiv).find('tbody > tr:gt(0)').get();
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
				jQuery('tbody',grid.bDiv).append(row);
				row.sortKey = null;
			});
			if(isMozilla) { ts.scrollLeft = ts.scrollLeft; resizeFirstRow(grid.bDiv);}
			else if(!isMSIE){ resizeFirstRow(grid.bDiv);ts.scrollLeft = ts.scrollLeft;}
			ts.scrollTop = 0;
			grid.hDiv.loading = false;
			jQuery("div.loading",grid.hDiv).fadeOut("fast");
		}
		var populatesubgrid = function( rd ) {
			var res,sid,dp;
			sid = jQuery(rd).attr("id");
			dp ={id:sid};
			if(!ts.p.subGridModel[0]) return;
			if(ts.p.subGridModel[0].params)
				for(var j=0; j < ts.p.subGridModel[0].params.length; j++)
					for(var i=0; i<ts.p.colModel.length; i++)
						if(ts.p.colModel[i].name == ts.p.subGridModel[0].params[j])
							dp[ts.p.colModel[i].name]= jQuery("td:eq("+i+")",rd).text().replace(/\&nbsp\;/ig,'');
			if(!grid.hDiv.loading) {
				grid.hDiv.loading = true;
				jQuery("div.loading",grid.hDiv).fadeIn("fast");
				switch(ts.p.datatype) {
					case "xml":
					
                    if(ts.p.retrieveMode === 'url') {
                        jQuery.ajax({type:"GET", url: ts.p.subGridUrl, dataType:"xml",data: dp, async: false,complete: function(sxml) { res = subGridJXml(sxml.responseXML); } });
                    
                    } else if(ts.p.retrieveMode === 'function') {
                    
                        if(ts.p.populateSubgridFromFunction != null) {
                        
                            ts.p.populateSubgridFromFunction(
                                {data: dp},
                                function(sxml) { subGridJXml(sxml);}
                            );
                        }
                    }
                    
					break;
					case "json":
					jQuery.ajax({type:"GET", url: ts.p.subGridUrl, dataType:"json",data: dp, async: false,complete: function(JSON) { res = subGridJXml(JSON); } });
					break;
				}
      		}
			return res;
    	}
		var subGridCell = function(trdiv,cell,pos){
			var tddiv;
			tddiv = document.createElement("div");
			tddiv.className = "celldiv";
			jQuery(tddiv).html(cell);
			jQuery(tddiv).width( ts.p.subGridModel[0].width[pos] || 80);
			trdiv.appendChild(tddiv);
		}
    	var subGridJXml = function( sjxml ){
      		var trdiv, tddiv,result = "", i,cur, sgmap;
      		if (sjxml){
        		var dummy = document.createElement("span");
        		trdiv = document.createElement("div");
        		trdiv.className="rowdiv";
        		for (i = 0; i<ts.p.subGridModel[0].name.length; i++) {
          			tddiv = document.createElement("div");
          			tddiv.className = "celldivth";
          			jQuery(tddiv).html(ts.p.subGridModel[0].name[i]);
          			jQuery(tddiv).width( ts.p.subGridModel[0].width[i]);
          			trdiv.appendChild(tddiv);
        		}
        		dummy.appendChild(trdiv);
				if(ts.p.datatype === "xml") {
					sgmap = ts.p.xmlReader.subgrid;
					jQuery(sgmap.root+">"+sgmap.row, sjxml).each( function(){
						trdiv = document.createElement("div");
						trdiv.className="rowdiv";
						if(sgmap.repeatitems === true) {
							jQuery(sgmap.cell,this).each( function(i) {
								subGridCell(trdiv, this.textContent || this.text || '&nbsp;',i);
							});
						} else {
							var f = ts.p.subGridModel[0].mapping;
							if (f) {
								for (i=0;i<f.length;i++) {
									subGridCell(trdiv, jQuery(f[i],this).text() || '&nbsp;',i);
								}
							}
						}
						dummy.appendChild(trdiv);
					});
				} else {
					sjxml = eval("("+sjxml.responseText+")");
					sgmap = ts.p.jsonReader.subgrid;
					for (i=0;i<sjxml[sgmap.root].length;i++) {
						cur = sjxml[sgmap.root][i];
						trdiv = document.createElement("div");
						trdiv.className="rowdiv";
						if(sgmap.repeatitems === true) {
							if(sgmap.cell) cur=cur[sgmap.cell];
							for (var j=0;j<cur.length;j++) {
								subGridCell(trdiv, cur[j] || '&nbsp;',j);
							}
						} else {
							var f = ts.p.subGridModel[0].mapping;
							for (var j=0;j<f.length;j++) {
								subGridCell(trdiv, cur[f[j]] || '&nbsp;',j);
							}
						}
						dummy.appendChild(trdiv);
					}
				}
        		result += jQuery(dummy).html();
        		sjxml = null
        		grid.hDiv.loading = false;
        		jQuery("div.loading",grid.hDiv).fadeOut("fast");
      		}
      		return result;
    	}
		var setPager = function (){
			jQuery(ts.p.pager).append('<span></span>&nbsp;<img id="first" src="'+ts.p.firstimg+'">&nbsp;&nbsp;<img id="prev" src="'+ts.p.previmg+'">&nbsp;<input class="selbox" type="text" size="3" maxlength="5" value="0"/><span></span>&nbsp;<img id="next" src="'+ts.p.nextimg+'">&nbsp;&nbsp;<img id="last" src="'+ts.p.lastimg+'">');
			if(ts.p.rowList.length >0){
				var str="<SELECT class='selbox'>";
				for(var i=0;i<ts.p.rowList.length;i++){
					str +="<OPTION value="+ts.p.rowList[i]+">"+ts.p.rowList[i];
				}
				str +="</SELECT>";
				jQuery(ts.p.pager).append("&nbsp;&nbsp;"+str);
				jQuery(ts.p.pager).find("select").bind('change',function() { 
					ts.p.rowNum = this.value>0 ? this.value : ts.p.rowNum; populate();
					ts.p.selrow = null;
				});
			}
			jQuery(ts.p.pager).find('img').click( function() {
				var cp = parseInt(ts.p.page,10);
				var last = parseInt(ts.p.lastpage,10), selclick = false;
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
			}).hover(function() { jQuery(this).addClass("jsHover"); },
				function () { jQuery(this).removeClass("jsHover"); }  
			);
			jQuery('input',ts.p.pager).keypress( function(e) {
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
		}
		var sortData = function (index, idxcol){
			if( ts.p.lastsort === idxcol /*ts.p.sortname === index*/) {				    
				if( ts.p.sortorder === 'asc') {
					ts.p.sortorder = 'desc';
				} else if(ts.p.sortorder === 'desc') { ts.p.sortorder='asc';}
			} else { ts.p.sortorder='asc';}
			var imgs = ts.p.sortorder==='asc' ? ts.p.sortascimg : ts.p.sortdescimg;
			imgs = "<img src='"+imgs+"'>";
			var thd= jQuery("thead:first",grid.hDiv).get(0);
			jQuery("tr th div#"+ts.p.colModel[ts.p.lastsort].name+" img",thd).remove();
			jQuery("tr th div#"+index,thd).append(imgs);
			ts.p.lastsort = idxcol;
			ts.p.sortname = ts.p.colModel[idxcol].index || index;
			ts.p.page = 1;
			if(onSortCol) {onSortCol(index,idxcol);}
			if(ts.p.selrow && ts.p.datatype == "local" && !ts.p.multiselect){ jQuery('#'+ts.p.selrow,grid.bDiv).removeClass("selected");}
			ts.p.selrow = null;
			if(ts.p.multiselect && ts.p.datatype !== "local"){ts.p.selarrrow =[]; jQuery("#cb_jqg",ts.grid.hDiv).attr("checked",false);}
			ts.p.savedRow =[];
			populate();
			return false;
		}
		var setGridWidth = function () {
			var initwidth = 0; 
			for(var l=0;l<ts.p.colModel.length;l++)
				initwidth += parseInt(ts.p.colModel[l].width || 150);
			var tblwidth = ts.p.width ? ts.p.width : initwidth;
			for(l=0;l<ts.p.colModel.length;l++)
				ts.p.colModel[l].width = Math.round(tblwidth/initwidth*ts.p.colModel[l].width);
			return false;
		}
		if(this.p.subGrid) {
		  this.p.colNames.unshift("");
		  this.p.colModel.unshift({name:'subgrid',width:25,sortable: false,resizable:false});
		}
		if(this.p.multiselect) {
			this.p.colNames.unshift("<input id='cb_jqg' type='checkbox'/>");
			this.p.colModel.unshift({name:'cb',width:25,sortable:false,resizable:false});
		}
		this.p.xmlReader = jQuery.extend( this.p.xReader, this.p.xmlReader);
		this.p.jsonReader = jQuery.extend( this.p.jReader, this.p.jsonReader);
		if( this.p.loadonce) this.p.pager = false;
		if (this.p.width) setGridWidth();
		var thead = document.createElement("thead");
		var trow = document.createElement("tr");
		thead.appendChild(trow); 
		var i=0, th, idn, thdiv;
		for (var col in this.p.colModel) { //Brice Burgess
			if (this.p.colModel[col].key) {
				this.p.keyIndex = i;
				break;
			}
			i++;
		}
		for(i=0;i<this.p.colNames.length;i++){
			th = document.createElement("th");
			idn = ts.p.colModel[i].name;
			idn = idn ? idn : i+1;
			thdiv = document.createElement("div");
			thdiv.id = ""+idn+"";
			jQuery(thdiv).html(ts.p.colNames[i]+"&nbsp;");
			th.appendChild(thdiv);
			trow.appendChild(th);
		}
		if(this.p.multiselect) {
			jQuery('#cb_jqg',trow).addClass("cbox").click(function(){
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
		}
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
			if( typeof sort == 'boolean') {sort = sort;} else {sort =  true;}
			if(sort) { 
				jQuery(this).css("cursor","pointer");
				jQuery(this).click(function(){sortData(this.id,l);});
			}
		});
		var tbody = document.createElement("tbody");
		trow = document.createElement("tr");
		trow.style.display="none";
		tbody.appendChild(trow);
		var td, ptr;
		for(i=0;i<ts.p.colNames.length;i++){
			td = document.createElement("td");
			trow.appendChild(td);
		}
		this.appendChild(tbody);
		jQuery("tbody tr:first td",ts).each(function(ii) {
			w = ts.p.colModel[ii].width || 150;
			jQuery(this).css("width",w+"px");
			if( ts.p.colModel[ii].hidden) jQuery(this).css("display","none");
			grid.cols[ii] = this ;
		});
		grid.width = jQuery.css(ts,"width");
		grid.hTable = document.createElement("table");
		grid.hTable.cellSpacing="0"; 
		grid.hTable.cellPadding="0"; 
		grid.hTable.className = "scroll";
		grid.hTable.appendChild(thead);
		grid.hDiv = document.createElement("div");
		jQuery(grid.hDiv)
		  	.css({ width: grid.width+"px", overflow: "hidden"})
			.prepend('<div class="loading">'+ts.p.loadtext+'</div>')					
			.append(grid.hTable)
			.bind("selectstart", function () { return false; });
		jQuery(this).mouseover(function(e) {
			td = (e.target || e.srcElement);
			ptr = jQuery(td).parents("tr");
			if(jQuery(ptr).attr("class") !== "subgrid") {
			jQuery(ptr).addClass("over");
			 td.title = td.innerHTML;
			}
			return false;
		}).mouseout(function(e) {
			td = (e.target || e.srcElement);
			ptr = jQuery(td).parents("tr");
			jQuery(ptr).removeClass("over");
			td.title = "";
			return false;
		}).css("width", grid.width+"px").before(grid.hDiv).click(function(e) {
			if ( !ts.p.multikey) {
				td = (e.target || e.srcElement);
				ptr = jQuery(td).parents("tr");
				jQuery(ts).setSelection(jQuery(ptr).attr("id"));
			} else {
				if (e[ts.p.multikey]){
					td = (e.target || e.srcElement);
					ptr = jQuery(td).parents("tr");
					jQuery(ts).setSelection(jQuery(ptr).attr("id"));
				} else {
					td = (e.target || e.srcElement);
					ptr = jQuery(td).parent("td");
					if ( jQuery(ptr).html() !== null) {
						td = jQuery("[@id^=jqg_]",ptr).attr("checked");
						td = typeof td == "undefined" ? false: td;
						jQuery("[@id^=jqg_]",ptr).attr("checked",!td);
					}
				}
			}
		}).dblclick(function (e) {
			td = (e.target || e.srcElement);
			if( ondblClickRow ) {ondblClickRow(td.parentNode.id);}
		}).bind('reloadGrid', function(e) {
			ts.p.selrow=null;
			if(ts.p.multiselect) {ts.p.selarrrow =[];jQuery('#cb_jqg',ts.grid.hDiv).attr("checked",false);}
			populate();
		});
		grid.bDiv = document.createElement("div");
		jQuery(grid.bDiv)
		  	.scroll(function (e) {grid.scroll()})
			.css({ height: ts.p.height+(isNaN(ts.p.height)?"":"px"), padding: "0px", margin: "0px", overflow: "auto", width: (grid.width)+17+"px"})
			.append(this);
		var isMSIE = jQuery.browser.msie ? true:false;
		var isMozilla = jQuery.browser.mozilla ? true:false;
		//(bug in 1.1.2 ie)
		if( isMSIE ) {
			if( jQuery("tbody",this).size() === 2 ) { jQuery("tbody:first",this).remove();}
			if( ts.p.multikey) jQuery(grid.bDiv).bind("selectstart",function(){return false;});
		} else {
			if( ts.p.multikey) jQuery(grid.bDiv).bind("mousedown",function(){return false;});
		}
		jQuery(grid.hDiv).mousemove(function (e) {grid.dragMove(e.clientX);}).after(grid.bDiv);
		populate();
		if(ts.p.pager){
			if( jQuery(ts.p.pager).attr("class") === "scroll") jQuery(ts.p.pager).css({ width: (grid.width)+"px", overflow: "hidden"});
			setPager();
		}
		jQuery(document).mouseup(function (e) {grid.dragEnd();});
		ts.formatCol = function(a,b) {formatCol(a,b);};
		ts.addSubGrid = function(a,b,c) {addSubGrid(a,b,c);};
		this.grid = grid;
		jQuery(window).unload(function () {
			jQuery(this).unbind();
			this.p = null;
			this.grid = null;
			jQuery(ts.p.pager).unbind();
		});
	});
};
})(jQuery);

if(JQGrid == null) var JQGrid = function() {};
if(JQGridParams == null) var JQGridParams = function() {};

JQGridParams.prototype = {

	url: 'local',
    retrieveMode: 'function',
    populateFromFunction: function(params, callback) {},
    datatype: "xml", 
    height: 250, 
    colNames: ['Id'],
	colModel: [{name:'id', index:'id'}], 
	rowNum: null, 
	rowList: null, 
	pager: null, 
	sortname: 'id',
	viewrecords: true, 
	sortorder: "desc", 
	multiselect: false, 
	onSelectRow: function(rowId) {}
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
            onSelectRow: params.onSelectRow
        });
        
        return this.grid;
}