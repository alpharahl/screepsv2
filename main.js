var roleHarvester = require('role.harvester');
var creepManager = require('creepManager');

var containerPlacer = require('containerPlacer');

module.exports.loop = function () {
  // Manage buildings
  containerPlacer.run();


  creepManager.run();
  for(var name in Game.creeps) {
      var creep = Game.creeps[name];
      roleHarvester.run(creep);
  }
}