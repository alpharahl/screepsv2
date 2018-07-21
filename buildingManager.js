var containerPlacer = require('containerPlacer');
var repairManager = require('repairManager');
var extensionPlacer = require('extensionPlacer');

var buildingManager = {
  run: function(){
    containerPlacer.run();
    repairManager.run();
    extensionPlacer.run();
  }
}

module.exports = buildingManager;