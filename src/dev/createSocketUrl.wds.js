'use strict';
/* global self */

var url = require('url');

var getCurrentScriptSource = require('webpack-dev-server/client/utils/getCurrentScriptSource');

function createSocketUrl(resourceQuery, currentLocation) {
  var urlParts;

  if (typeof resourceQuery === 'string' && resourceQuery !== '') {
    urlParts = url.parse(resourceQuery
      .substr(1)
      .replace('&', '?'), true);
  } else {
    var scriptHost = getCurrentScriptSource();
    urlParts = url.parse(scriptHost || '/', true, true);
  }

  if (typeof currentLocation === 'string' && currentLocation !== '') {
    currentLocation = url.parse(currentLocation);
  } else {
    currentLocation = self.location;
  }

  return getSocketUrl(urlParts, currentLocation);
}

function getSocketUrl(urlParts, loc) {
  var query = urlParts.query;
  var sockPath = query.sockPath || '/sockjs-node';

  // Always use the current page origin for the socket URL (same host as the app).
  // e.g. https://demo.grakairos.com → https://demo.grakairos.com/sockjs-node
  // The reverse proxy serving the app must proxy /sockjs-node to the dev server (e.g. localhost:5555).
  return url.format({
    protocol: loc.protocol,
    hostname: loc.hostname,
    port: loc.port || '',
    pathname: sockPath
  });
}

module.exports = createSocketUrl;
