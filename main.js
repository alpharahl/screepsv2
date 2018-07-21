var roleHarvester = require('role.harvester');
var creepManager = require('creepManager');

module.exports.loop = function () {
  creepManager.run();
  for(var name in Game.creeps) {
      var creep = Game.creeps[name];
      roleHarvester.run(creep);
  }
}