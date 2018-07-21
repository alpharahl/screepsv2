var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');

var creepManager = {
  run: function(){
    var spawn = Game.spawns[Object.keys(Game.spawns)[0]];
    if (spawn.spawning){
      return;
    }
    var desired = {
      'Harvester': 1,
      'Builder':0
    }

    var creepList = {
      'Harvester': 0,
      'Builder': 0
    }
    for (var name in Game.creeps){
      var creep = Game.creeps[name]
      creepList[creep.memory.type] += 1
    }


    var priorityOrderdCreeps = [
      'Harvester',
      'Builder'
    ]
    for(var name in priorityOrderdCreeps){
      var type = priorityOrderdCreeps[name]
      if (creepList[type] < desired[type]){
        creepManager.spawn(type)
        return;
      }
    }
  },

  spawn: function(type){
    console.log("Spawning a new ", type)
    var spawn = Game.spawns[Object.keys(Game.spawns)[0]];
    switch (type){
      case 'Harvester':
        roleHarvester.spawn(spawn);
        break;
      case 'Builder':
        roleBuilder.spawn(spawn);
        break;
        
    }
  }
}

module.exports = creepManager;