// ==UserScript==
// @id             iitc-plugin-mini-portals@megazet
// @name           IITC plugin: Mini Portals
// @category       Tweaks
// @version        0.1.0.20161204.0
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      https://raw.githubusercontent.com/megazet/megazet.github.io/master/IITC/IITC-plugin-mini-portals.meta.js
// @downloadURL    https://raw.githubusercontent.com/megazet/megazet.github.io/master/IITC/IITC-plugin-mini-portals.user.js
// @description    Adds a button that makes portals looks like tiny dots.
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
plugin_info.dateTimeVersion = '20161204.0';
plugin_info.pluginId = 'mini-portals';
//END PLUGIN AUTHORS NOTE



// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
plugin.miniPortals = {}

plugin.miniPortals.onBtnClick = function() {
  
  var btn = plugin.miniPortals.button;
  
  var LEVEL_TO_RADIUS;
  var LEVEL_TO_RADIUS_MIN = [1, 1, 1, 1, 1, 2, 2, 2, 3];
  var LEVEL_TO_RADIUS_DEF = [7, 7, 7, 7, 8, 8, 9,10,11];

  if (btn.classList.contains("mini-portals-default")) {
    btn.classList.remove("mini-portals-default");
    btn.classList.add("mini-portals-active");
    LEVEL_TO_RADIUS = LEVEL_TO_RADIUS_MIN;

  } else if (btn.classList.contains("mini-portals-active")) {
    btn.classList.remove("mini-portals-active");
    btn.classList.add("mini-portals-default");
    LEVEL_TO_RADIUS = LEVEL_TO_RADIUS_DEF;
    console.log('Sector clear');

  } else {
    alert('Cosmic rays broke Mini Portals script.');
  }
  
  window.getMarkerStyleOptions = function(details) {
    var scale = window.portalMarkerScale();

    //   portal level      0  1  2  3  4  5  6  7  8
    var LEVEL_TO_WEIGHT = [2, 2, 2, 2, 2, 3, 3, 4, 4];

    var level = Math.floor(details.level||0);

    var lvlWeight = LEVEL_TO_WEIGHT[level] * Math.sqrt(scale);
    var lvlRadius = LEVEL_TO_RADIUS[level] * scale;

    var dashArray = null;
    // thinner and dashed outline for placeholder portals
    if (details.team != TEAM_NONE && level==0) {
      lvlWeight = 1;
      dashArray = [1,2];
    }
    var options = {
      radius: lvlRadius,
      stroke: true,
      color: COLORS[details.team],
      weight: lvlWeight,
      opacity: 1,
      fill: true,
      fillColor: COLORS[details.team],
      fillOpacity: 0.5,
      dashArray: dashArray
    };

    return options;
  }
  
  window.resetHighlightedPortals();
  
}

var setup = function() {
  $('<style>').prop('type', 'text/css').html('.leaflet-control-mini-portals a.mini-portals-default {background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+DQogIDxnPg0KICAgIDxjaXJjbGUgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MC40O3N0cm9rZTpibGFjaztzdHJva2Utd2lkdGg6MS45OTkwMiIgY3g9IjE1IiBjeT0iMTUiIHI9IjciLz4NCiAgPC9nPg0KPC9zdmc+");}.leaflet-control-mini-portals a.mini-portals-active {background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+DQogIDxnPg0KICAgIDxjaXJjbGUgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MC40O3N0cm9rZTpibGFjaztzdHJva2Utd2lkdGg6MS45OTkwMiIgY3g9IjE1IiBjeT0iMTUiIHI9IjEiLz4NCiAgPC9nPg0KPC9zdmc+");}').appendTo('head');

  var parent = $(".leaflet-top.leaflet-left", window.map.getContainer());
  var button = document.createElement("a");
    button.className = "mini-portals-default";
    button.addEventListener("click", plugin.miniPortals.onBtnClick, false);
    button.href = '#';
    button.title = 'Change portal size';

  var container = document.createElement("div");
    container.className = "leaflet-control-mini-portals leaflet-bar leaflet-control";
    container.appendChild(button);
    parent.append(container);

  plugin.miniPortals.button = button;
  plugin.miniPortals.container = container;
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
