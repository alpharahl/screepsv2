var creepManager = require('creepManager');
var repairManager = require('repairManager')
var containerPlacer = require('containerPlacer');
var creepHandler = require('creepHandler');

module.exports.loop = function () {
  // Make sure memory is initialized
  if(!Memory.repairList){
    Memory.repairList = []
  }

  repairManager.run();
  containerPlacer.run();
  creepManager.run();
  creepHandler.run();
}