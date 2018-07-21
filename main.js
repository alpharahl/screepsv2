var creepManager = require('creepManager');
var creepHandler = require('creepHandler');
var memoryHandler = require('memoryHandler');
var buildingManager = require('buildingManager');

module.exports.loop = function () {
  memoryHandler.run();
  buildingManager.run();
  creepManager.run();
  creepHandler.run();
}