/*built on 2013-08-01 12:06:29.33*/ 
define("agsjs/dijit/TOC",["dojo/_base/declare","dijit/_Widget","dijit/_Templated","dojox/gfx","dojo/fx/Toggler","dijit/form/Slider"],function(h,i,m,n,j){(function(){var a=dojo.create("link",{type:"text/css",rel:"stylesheet",href:dojo.moduleUrl("agsjs.dijit","css/TOC.css")});dojo.doc.getElementsByTagName("head")[0].appendChild(a)})();var k=h([i,m],{templateString:'<div class="agsjsTOCNode"><div data-dojo-attach-point="rowNode" data-dojo-attach-event="onclick:_onClick"><span data-dojo-attach-point="contentNode" class="agsjsTOCContent"><span data-dojo-attach-point="checkContainerNode"></span><img src="${_blankGif}" alt="" data-dojo-attach-point="iconNode" /><span data-dojo-attach-point="labelNode"></span></span></div><div data-dojo-attach-point="containerNode" style="display: none;"> </div></div>',
rootLayer:null,serviceLayer:null,legend:null,rootLayerTOC:null,data:null,_childTOCNodes:[],constructor:function(a){dojo.mixin(this,a)},postCreate:function(){dojo.style(this.rowNode,"paddingLeft",""+this.rootLayerTOC.tocWidget.indentSize*this.rootLayerTOC._currentIndent+"px");this.data=this.legend||this.serviceLayer||this.rootLayer;this.blank=this.iconNode.src;if(this.legend)this._createLegendNode(this.legend);else if(this.serviceLayer)this._createServiceLayerNode(this.serviceLayer);else this.rootLayer&&
this._createRootLayerNode(this.rootLayer);if(this.containerNode&&j)this.toggler=new j({node:this.containerNode,showFunc:dojo.fx.wipeIn,hideFunc:dojo.fx.wipeOut});if(!this._noCheckNode){var a;if(dijit.form&&dijit.form.CheckBox){a=new dijit.form.CheckBox({checked:this.data.visible});a.placeAt(this.checkContainerNode);a.startup()}else a=dojo.create("input",{type:"checkbox",checked:this.data.visible},this.checkContainerNode);this.checkNode=a}a=this.data.visible;if(this.data._subLayerInfos){var b=true;
dojo.every(this.data._subLayerInfos,function(c){if(c.visible)return b=false;return true});if(b)a=false}if(this.data.collapsed)a=false;if(this.iconNode&&this.iconNode.src==this.blank){dojo.addClass(this.iconNode,"dijitTreeExpando");dojo.addClass(this.iconNode,a?"dijitTreeExpandoOpened":"dijitTreeExpandoClosed")}if(this.containerNode)dojo.style(this.containerNode,"display",a?"block":"none")},_createRootLayerNode:function(a){dojo.addClass(this.rowNode,"agsjsTOCRootLayer");dojo.addClass(this.labelNode,
"agsjsTOCRootLayerLabel");var b=this.rootLayerTOC.config.title;if(b===""){esri.hide(this.rowNode);a.show();this.rootLayerTOC._currentIndent--}a.collapsed=this.rootLayerTOC.config.collapsed;if(this.rootLayerTOC.config.slider){this.sliderNode=dojo.create("div",{"class":"agsjsTOCSlider"},this.rowNode,"last");this.slider=new dijit.form.HorizontalSlider({showButtons:false,value:a.opacity*100,intermediateChanges:true,tooltip:"adjust transparency",onChange:function(f){a.setOpacity(f/100)},layoutAlign:"right"});
this.slider.placeAt(this.sliderNode);dojo.connect(a,"onOpacityChange",this,function(f){this.slider.setValue(f*100)})}if(this.rootLayerTOC.config.noLegend)dojo.style(this.iconNode,"visibility","hidden");else if(a._tocInfos)this._createChildrenNodes(a._tocInfos,"serviceLayer");else if(a.renderer){var c=a.renderer;if(c.infos){var e=c.infos;c.defaultSymbol&&e.length>0&&e[0].label!="[all other values]"&&e.unshift({label:"[all other values]",symbol:c.defaultSymbol});var d=c.attributeField+(c.normalizationField?
"/"+c.normalizationField:"");d+=(c.attributeField2?"/"+c.attributeField2:"")+(c.attributeField3?"/"+c.attributeField3:"");c=dojo.create("div",{},this.containerNode);dojo.style(c,"paddingLeft",""+this.rootLayerTOC.tocWidget.indentSize*(this.rootLayerTOC._currentIndent+2)+"px");c.innerHTML=d;this._createChildrenNodes(e,"legend")}else this._createChildrenNodes([a.renderer],"legend")}else dojo.style(this.iconNode,"visibility","hidden");this.labelNode.innerHTML=b;dojo.attr(this.rowNode,"title",b)},_createServiceLayerNode:function(a){this.labelNode.innerHTML=
a.name;if(a._subLayerInfos){dojo.addClass(this.rowNode,"agsjsTOCGroupLayer");dojo.addClass(this.labelNode,"agsjsTOCGroupLayerLabel");this._createChildrenNodes(a._subLayerInfos,"serviceLayer")}else{dojo.addClass(this.rowNode,"agsjsTOCServiceLayer");dojo.addClass(this.labelNode,"agsjsTOCServiceLayerLabel");if(this.rootLayer.visibleLayers)a.visible=dojo.indexOf(this.rootLayer.visibleLayers,a.id)==-1?false:true;if(this.rootLayer.tileInfo)this._noCheckNode=true;if(a._legends&&!this.rootLayerTOC.config.noLegend)if(a._legends.length==
1){this.iconNode.src=this._getLegendIconUrl(a._legends[0]);dojo.destroy(this.containerNode);this.containerNode=null}else this._createChildrenNodes(a._legends,"legend");else{dojo.destroy(this.iconNode);this.iconNode=null;dojo.destroy(this.containerNode);this.containerNode=null}}},_createLegendNode:function(a){this._noCheckNode=true;dojo.destroy(this.containerNode);dojo.addClass(this.labelNode,"agsjsTOCLegendLabel");this._setIconNode(a,this.iconNode,this);var b=a.label;if(a.label===undefined){if(a.value!==
undefined)b=a.value;if(a.maxValue!==undefined)b=""+a.minValue+" - "+a.maxValue}this.labelNode.appendChild(document.createTextNode(b))},_setIconNode:function(a,b,c){var e=this._getLegendIconUrl(a);if(e){b.src=e;if(a.symbol&&a.symbol.width&&a.symbol.height){b.style.width=a.symbol.width;b.style.height=a.symbol.height}}else if(a.symbol){e=this.rootLayerTOC.tocWidget.swatchSize[0];var d=this.rootLayerTOC.tocWidget.swatchSize[1];if(a.symbol.width&&a.symbol.height){e=a.symbol.width;d=a.symbol.height}var f=
dojo.create("span",{});dojo.style(f,{width:e+"px",height:d+"px",display:"inline-block"});dojo.place(f,b,"replace");c.iconNode=f;a=esri.symbol.getShapeDescriptors(a.symbol);b=n.createSurface(f,e,d);if(a)dojo.isIE?window.setTimeout(dojo.hitch(this,"_createSymbol",b,a,e,d),500):this._createSymbol(b,a,e,d)}else console&&console.log("no symbol in renderer")},_createSymbol:function(a,b,c,e){a=a.createShape(b.defaultShape);b.fill&&a.setFill(b.fill);b.stroke&&a.setStroke(b.stroke);a.applyTransform({dx:c/
2,dy:e/2})},_getLegendIconUrl:function(a){var b=a.url;if(b!=null&&b.indexOf("data")==-1)if(!dojo.isIE&&a.imageData&&a.imageData.length>0)b="data:image/png;base64,"+a.imageData;else if(b.indexOf("http")!==0)b=this.rootLayer.url+"/"+this.serviceLayer.id+"/images/"+b;return b},_createChildrenNodes:function(a,b){this.rootLayerTOC._currentIndent++;for(var c=[],e=0,d=a.length;e<d;e++){var f=a[e],g={rootLayerTOC:this.rootLayerTOC,rootLayer:this.rootLayer,serviceLayer:this.serviceLayer,legend:this.legend};
g[b]=f;g.data=f;f=new k(g);f.placeAt(this.containerNode);c.push(f)}this._childTOCNodes=c;this.rootLayerTOC._currentIndent--},_toggleContainer:function(a){if(dojo.hasClass(this.iconNode,"dijitTreeExpandoClosed")||dojo.hasClass(this.iconNode,"dijitTreeExpandoOpened")){if(a){dojo.removeClass(this.iconNode,"dijitTreeExpandoClosed");dojo.addClass(this.iconNode,"dijitTreeExpandoOpened")}else if(a===false){dojo.removeClass(this.iconNode,"dijitTreeExpandoOpened");dojo.addClass(this.iconNode,"dijitTreeExpandoClosed")}else{dojo.toggleClass(this.iconNode,
"dijitTreeExpandoClosed");dojo.toggleClass(this.iconNode,"dijitTreeExpandoOpened")}if(dojo.hasClass(this.iconNode,"dijitTreeExpandoOpened"))this.toggler?this.toggler.show():esri.show(this.containerNode);else this.toggler?this.toggler.hide():esri.hide(this.containerNode);if(this.rootLayer&&!this.serviceLayer&&!this.legend)this.rootLayerTOC.config.collapsed=dojo.hasClass(this.iconNode,"dijitTreeExpandoClosed")}},_adjustToState:function(){if(this.checkNode){var a=this.legend?this.legend.visible:this.serviceLayer?
this.serviceLayer.visible:this.rootLayer?this.rootLayer.visible:false;if(this.checkNode.set)this.checkNode.set("checked",a);else this.checkNode.checked=a}if(this.serviceLayer){a=esri.geometry.getScale(this.rootLayerTOC.tocWidget.map);(a=this.serviceLayer.maxScale!=0&&a<this.serviceLayer.maxScale||this.serviceLayer.minScale!=0&&a>this.serviceLayer.minScale)?dojo.addClass(this.domNode,"agsjsTOCOutOfScale"):dojo.removeClass(this.domNode,"agsjsTOCOutOfScale");if(this.checkNode)if(this.checkNode.set)this.checkNode.set("disabled",
a);else this.checkNode.disabled=a}this._childTOCNodes.length>0&&dojo.forEach(this._childTOCNodes,function(b){b._adjustToState()})},_onClick:function(a){a=a.target;if(a==this.checkNode||dijit.getEnclosingWidget(a)==this.checkNode){if(this.serviceLayer){this.serviceLayer.visible=this.checkNode&&this.checkNode.checked;if(this.serviceLayer.visible)for(a=this.serviceLayer;a._parentLayerInfo;){if(!a._parentLayerInfo.visible)a._parentLayerInfo.visible=true;a=a._parentLayerInfo}this.serviceLayer.visible&&
!this.rootLayer.visible&&this.rootLayer.show();this.serviceLayer._subLayerInfos&&this._setSubLayerVisibilitiesFromGroup(this.serviceLayer);this.rootLayer.setVisibleLayers(this._getVisibleLayers(),true);this.rootLayerTOC._refreshLayer()}else this.rootLayer&&this.rootLayer.setVisibility(this.checkNode&&this.checkNode.checked);this._toggleContainer(this.checkNode&&this.checkNode.checked);this.rootLayerTOC._adjustToState()}else a==this.iconNode&&this._toggleContainer()},_setSubLayerVisibilitiesFromGroup:function(a){a._subLayerInfos&&
a._subLayerInfos.length>0&&dojo.forEach(a._subLayerInfos,function(b){b.visible=a.visible;b._subLayerInfos&&b._subLayerInfos.length>0&&this._setSubLayerVisibilitiesFromGroup(b)},this)},_getVisibleLayers:function(){var a=[];dojo.forEach(this.rootLayer.layerInfos,function(b){b.subLayerIds||b.visible&&a.push(b.id)});if(a.length===0)a.push(-1);else this.rootLayer.visible||this.rootLayer.show();return a}}),o=h([i],{_currentIndent:0,rootLayer:null,tocWidget:null,constructor:function(a){this.config=a.config||
{};this.rootLayer=a.config.layer;this.tocWidget=a.tocWidget},postCreate:function(){if(this.rootLayer instanceof esri.layers.ArcGISDynamicMapServiceLayer||this.rootLayer instanceof esri.layers.ArcGISTiledMapServiceLayer){if(this.config.title===undefined){var a=this.rootLayer.url.toLowerCase().indexOf("/rest/services/"),b=this.rootLayer.url.toLowerCase().indexOf("/mapserver",a);this.config.title=this.rootLayer.url.substring(a+15,b)}this._legendResponse?this._createRootLayerTOC():this._getLegendInfo()}else this._createRootLayerTOC()},
_getLegendInfo:function(){var a="";if(this.rootLayer.version>=10.01)a=this.rootLayer.url+"/legend";else{a="http://www.arcgis.com/sharing/tools/legend";var b=this.rootLayer.url.toLowerCase().indexOf("/rest/");b=this.rootLayer.url.substring(0,b)+this.rootLayer.url.substring(b+5);a=a+"?soapUrl="+escape(b)}esri.request({url:a,content:{f:"json"},callbackParamName:"callback",handleAs:"json",load:dojo.hitch(this,this._processLegendInfo),error:dojo.hitch(this,this._processLegendError)})},_processLegendError:function(){this._createRootLayerTOC()},
_processLegendInfo:function(a){this._legendResponse=a;var b=this.rootLayer;if(!b._tocInfos){var c={};dojo.forEach(b.layerInfos,function(d){c[""+d.id]=d;d.visible=d.defaultVisibility});a.layers&&dojo.forEach(a.layers,function(d){var f=c[""+d.layerId];if(f&&d.legend)f._legends=d.legend});dojo.forEach(b.layerInfos,function(d){if(d.subLayerIds){var f=[];dojo.forEach(d.subLayerIds,function(g,l){f[l]=c[g];f[l]._parentLayerInfo=d});d._subLayerInfos=f}});var e=[];dojo.forEach(b.layerInfos,function(d){d.parentLayerId==
-1&&e.push(d)});b._tocInfos=e}this._createRootLayerTOC()},_createRootLayerTOC:function(){this._rootLayerNode=new k({rootLayerTOC:this,rootLayer:this.rootLayer});this._rootLayerNode.placeAt(this.domNode);this._visHandler=dojo.connect(this.rootLayer,"onVisibilityChange",this,"_adjustToState");if(this.rootLayer instanceof esri.layers.ArcGISDynamicMapServiceLayer)this._visLayerHandler=dojo.connect(this.rootLayer,"setVisibleLayers",this,"_onSetVisibleLayers");this._adjustToState();this._loaded=true;this.onLoad()},
onLoad:function(){},_refreshLayer:function(){var a=this.rootLayer,b=this.tocWidget.refreshDelay;if(this._refreshTimer){window.clearTimeout(this._refreshTimer);this._refreshTimer=null}this._refreshTimer=window.setTimeout(function(){a.setVisibleLayers(a.visibleLayers)},b)},_onSetVisibleLayers:function(a,b){if(!b){dojo.forEach(this.rootLayer.layerInfos,function(c){if(dojo.indexOf(a,c.id)!=-1)c.visible=true;else if(!c._subLayerInfos)c.visible=false});this._adjustToState()}},_adjustToState:function(){this._rootLayerNode._adjustToState()},
destroy:function(){dojo.disconnect(this._visHandler);this._visLayerHandler&&dojo.disconnect(this._visLayerHandler)}});return h("agsjs.dijit.TOC",[i],{indentSize:18,swatchSize:[30,30],refreshDelay:500,layerInfos:null,constructor:function(a){a=a||{};if(!a.map)throw new Error("no map defined in params for TOC");this.layerInfos=a.layerInfos;dojo.mixin(this,a)},postCreate:function(){this._createTOC()},onLoad:function(){},_createTOC:function(){dojo.empty(this.domNode);this._rootLayerTOCs=[];for(var a=0,
b=this.layerInfos.length;a<b;a++){var c=new o({config:this.layerInfos[a],tocWidget:this});this._rootLayerTOCs.push(c);c.placeAt(this.domNode);this._checkLoadHandler=dojo.connect(c,"onLoad",this,"_checkLoad");this._checkLoad()}if(!this._zoomHandler)this._zoomHandler=dojo.connect(this.map,"onZoomEnd",this,"_adjustToState")},_checkLoad:function(){var a=true;dojo.every(this._rootLayerTOCs,function(b){if(!b._loaded)return a=false;return true});a&&this.onLoad()},_adjustToState:function(){dojo.forEach(this._rootLayerTOCs,
function(a){a._adjustToState()})},refresh:function(){this._createTOC()},destroy:function(){dojo.disconnect(this._zoomHandler);this._zoomHandler=null;dojo.disconnect(this._checkLoadHandler);this._checkLoadHandler=null}})});
