var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var creepSpawner = require('creepSpawnManager');

var creepHandler = {
  run: function(){
    creepSpawner.run();
    for(var name in Game.creeps) {
      var creep = Game.creeps[name];
      switch (creep.memory.type){
        case 'Harvester':
          roleHarvester.run(creep);
          break;
        case 'Builder':
          roleBuilder.run(creep);
          break;
        case 'Miner':
          roleMiner.run(creep);
          break;
      }
    }
  }
}

module.exports = creepHandler;