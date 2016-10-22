// ==UserScript==
// @id             zoom17@megazet
// @name           IITC plugin: zoom17
// @category       Tweaks
// @version        0.1.0.20161022.0
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      
// @downloadURL    
// @description    Adds a button to activate the zoom17 mode at any map zoom
// @include        https://*.ingress.com/intel*
// @include        http://*.ingress.com/intel*
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @include        https://*.ingress.com/mission/*
// @include        http://*.ingress.com/mission/*
// @match          https://*.ingress.com/mission/*
// @match          http://*.ingress.com/mission/*
// @grant          none
// ==/UserScript==


function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

//PLUGIN AUTHORS: writing a plugin outside of the IITC build environment? if so, delete these lines!!
//(leaving them in place might break the 'About IITC' page or break update checks)
plugin_info.buildName = 'iitc';
plugin_info.dateTimeVersion = '20161003.4740';
plugin_info.pluginId = 'zoom17';
//END PLUGIN AUTHORS NOTE



// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
plugin.zoom17 = {}

plugin.zoom17.onBtnClick = function() {
  var btn = plugin.zoom17.button;

  if (btn.classList.contains("z17-default")) {
    btn.classList.remove("z17-default");
    btn.classList.add("z17-17");
    window.getDataZoomForMapZoom = function() {
      return 17;
    }
  } else if (btn.classList.contains("z17-17")) {
    btn.classList.remove("z17-17");
    btn.classList.add("z17-14");
    window.getDataZoomForMapZoom = function() {
      return 14;
    }
  } else {
  	btn.classList.remove("z17-14");
  	btn.classList.add("z17-default");
    window.getDataZoomForMapZoom = function() {
      return map.getZoom();
    }
  }
  window.mapDataRequest.start();
}

var setup = function() {
  $('<style>').prop('type', 'text/css').html('.leaflet-control-z17 a.z17-default {background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+DQogPGcgc3R5bGU9ImZpbGw6IzAwMDAwMDtzdHJva2U6bm9uZSI+DQogIDxwb2x5Z29uIGNsYXNzPSJmaWwwIiBwb2ludHM9IjEyLDIxIDYsMjEgNiwyMCAxMSwxMyA3LDEzIDcsMTIgMTIsMTIgMTIsMTMgOCwyMCAxMiwyMCAiLz4NCiAgPHBhdGggaWQ9IjEiIGNsYXNzPSJmaWwwIiBkPSJNMjQgMTRjMCwxIDAsMSAwLDIgMCwwIDAsMSAwLDEgMCwxIDAsMSAtMSwyIDAsMCAwLDAgMCwxIDAsMCAwLDAgMCwwIDAsMCAtMSwxIC0xLDEgMCwwIDAsMCAtMSwwIDAsMCAwLDAgLTEsMCAwLDAgLTEsMCAtMSwwIDAsMCAtMSwwIC0yLDBsLTMgMCAwIC0xMiA1IDBjMCwwIDEsMCAyLDAgMCwwIDAsMCAxLDAgMCwwIDEsMCAxLDEgMCwwIDAsMCAwLDEgMCwwIDEsMSAxLDEgMCwxIDAsMSAwLDJ6bS0yIDBjMCwtMSAwLC0xIDAsLTEgMCwwIDAsLTEgMCwtMSAwLDAgMCwtMSAwLC0xIDAsMCAwLDAgLTEsMCAwLDAgMCwtMSAwLC0xIDAsMCAwLDAgLTEsMCAwLDAgMCwwIC0xLDAgMCwwIC0xLDAgLTEsMGwtMiAwIDAgMTAgMiAwYzEsMCAxLDAgMSwwIDAsMCAxLDAgMSwwIDAsMCAxLDAgMSwwIDAsMCAwLDAgMCwtMSAwLDAgMSwwIDEsMCAwLDAgMCwwIDAsLTEgMCwwIDAsMCAwLC0xIDAsMCAwLDAgMCwtMWwwIC0yeiIvPg0KIDwvZz4NCjwvc3ZnPg0K");}.leaflet-control-z17 a.z17-17 {background-color: #FF6666;background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+DQogPGcgc3R5bGU9ImZpbGw6IzAwMDAwMDtzdHJva2U6bm9uZSI+DQogIDxwb2x5Z29uIHBvaW50cz0iMTIsMjEgNiwyMSA2LDIwIDEwLDEzIDYsMTMgNiwxMiAxMiwxMiAxMiwxMyA4LDIwIDEyLDIwICIvPg0KICA8cGF0aCBkPSJNMTYgMjFsLTEgMCAwIC0xMCAtMiAwIDAgLTFjMSwwIDEsMCAyLC0xbDEgMCAwIDEyeiIvPg0KICA8cGF0aCBkPSJNMjQgOWwwIDFjLTIsNSAtMyw4IC00LDExbC0xIDBjMSwtMyAyLC03IDQsLTExbC01IDAgMCAtMSA2IDB6Ii8+DQogPC9nPg0KPC9zdmc+");}.leaflet-control-z17 a.z17-14{background-color: #FFCE00;background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+DQogPGcgc3R5bGU9ImZpbGw6IzAwMDAwMDtzdHJva2U6bm9uZSI+DQogIDxwb2x5Z29uIGNsYXNzPSJmaWwwIiBwb2ludHM9IjEyLDIxIDYsMjEgNiwyMCAxMCwxMyA2LDEzIDYsMTIgMTIsMTIgMTIsMTMgOCwyMCAxMiwyMCAiLz4NCiAgPHBhdGggaWQ9IjEiIGNsYXNzPSJmaWwwIiBkPSJNMTYgMjFsLTEgMCAwIC0xMCAtMiAwIDAgLTFjMSwwIDEsMCAyLC0xbDEgMCAwIDEyeiIvPg0KICA8cGF0aCBpZD0iMiIgY2xhc3M9ImZpbDAiIGQ9Ik0yNiAxOGwtMSAwIDAgMyAtMiAwIDAgLTMgLTUgMCAwIC0xIDQgLTggMyAwIDAgOCAxIDAgMCAxem0tMyAtOGMwLDAgMCwwIDAsMCAwLDEgLTEsMSAtMSwxbC0yIDRjMCwwIDAsMSAwLDEgMCwwIDAsMSAwLDFsMyAwIDAgLTd6Ii8+DQogPC9nPg0KPC9zdmc+DQo=");}').appendTo('head');

  var parent = $(".leaflet-top.leaflet-left", window.map.getContainer());
  var button = document.createElement("a");
    button.className = "leaflet-bar-part z17-default";
    button.addEventListener("click", plugin.zoom17.onBtnClick, false);
    button.href = '#';
    button.title = 'White - default / Red - all porals / Yellow - all links';

  var container = document.createElement("div");
    container.className = "leaflet-control-z17 leaflet-bar leaflet-control";
    container.appendChild(button);
    parent.append(container);

  plugin.zoom17.button = button;
  plugin.zoom17.container = container;
}

  // PLUGIN END //////////////////////////////////////////////////////////

setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);