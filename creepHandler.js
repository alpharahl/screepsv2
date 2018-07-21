var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var creepSpawner = require('creepSpawnManager');
var roleHauler = require('role.hauler');
var roleRepairer = require('role.repairer');
var roleUpgrader = require('role.upgrader');

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
        case 'Hauler':
          roleHauler.run(creep);
          break;
        case 'Repairer':
          roleRepairer.run(creep);
          break;
        case 'Upgrader':
          roleUpgrader.run(creep);
          break;
      }
    }
  }
}

module.exports = creepHandler;