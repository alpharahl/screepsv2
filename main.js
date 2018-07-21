var creepManager = require('creepManager');

var containerPlacer = require('containerPlacer');
var creepHandler = require('creepHandler');

module.exports.loop = function () {
  containerPlacer.run();
  creepManager.run();
  creepHandler.run();
}