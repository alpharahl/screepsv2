var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleHauler = require('role.hauler');
var roleRepairer = require('role.repairer');
var roleUpgrader = require('role.upgrader');

var creepSpawner = {
  run: function(){
    var spawn = Game.spawns[Object.keys(Game.spawns)[0]];
    if (spawn.spawning){
      return;
    }
    creepSpawner.handleMiners(spawn);
    creepSpawner.handleHaulers(spawn);
    creepSpawner.handleBuilders(spawn);
    creepSpawner.handleRepairers(spawn);
    creepSpawner.handleUpgraders(spawn);
  },

  handleHaulers: function(spawn){
    for (var h in Memory.haulers){
      if (Memory.haulers[h] == null){
        if(spawn.room.energyAvailable >= 400 && creepSpawner.spawnHauler(spawn, h)){
          return;
        }
      }
    }
  },

  handleRepairers: function(spawn){
    var desired = 0;
    var current = 0;
    for (var name in Game.creeps){
      if(Game.creeps[name].memory.type == 'Repairer'){
        current ++
      }
    }

    if (current < desired){
      roleRepairer.spawn(spawn)
    }
  },

  handleUpgraders: function(spawn){
    var desired = 2;
    var current = 0;
    for (var name in Game.creeps){
      if(Game.creeps[name].memory.type == 'Upgrader'){
        current ++
      }
    }

    if (current < desired){
      roleUpgrader.spawn(spawn)
    }
  },

  handleBuilders: function(spawn){
    var numSites = Object.keys(Game.constructionSites).length
    if (numSites){
      var desiredBuilders = Math.floor(numSites/2);
      var actualBuilders = 0;
      for (var name in Game.creeps){
        var creep = Game.creeps[name]
        if (creep.memory.type == 'Builder'){
          actualBuilders ++
        }
      }
      if (actualBuilders < desiredBuilders  && actualBuilders < 2){
        roleBuilder.spawn(spawn)
      }
    }
  },

  handleMiners: function(spawn){
    for (var m in Memory.miners){
      if (Memory.miners[m] == null){
        if(creepSpawner.spawnMiner(m,spawn)){
          return;
        }
      } 
    }
  },

  spawnMiner: function(source,spawn){
    console.log('spawning a miner for source ', source)
    var s = Game.getObjectById(source)
    var container = creepSpawner.getSourceContainer(source)
    if(container == ""){
      //no container yet
      return false;
    }
    if(roleMiner.spawn(spawn, container[0].pos, s)){
      return true;
    }
    return false;
  },

  spawnHauler: function(spawn, source){
    var container = creepSpawner.getSourceContainer(source)
    if(container == ""){
      return false;
    }
    // console.log("source id in spawn hauler: ", source)
    if(roleHauler.spawn(spawn,container[0],source)){
      return true;
    }
    return false
  },

  getSourceContainer: function(source){
    var s = Game.getObjectById(source)
    var pos = s.pos
    return container = pos.findInRange(
      FIND_STRUCTURES,
      1,
      {
        filter:{
          structureType: STRUCTURE_CONTAINER
        }
      }
    )
  }
}

module.exports = creepSpawner;