var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');

var creepSpawner = {
  run: function(){
    var spawn = Game.spawns[Object.keys(Game.spawns)[0]];
    creepSpawner.handleMiners(spawn);
    creepSpawner.handleBuilders(spawn);
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
      if (actualBuilders < desiredBuilders){
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
    var s = Game.getObjectById(source)
    var pos = s.pos
    var container = pos.findInRange(
      FIND_STRUCTURES,
      1,
      {
        filter:{
          structureType: STRUCTURE_CONTAINER
        }
      }
    )
    if(container == ""){
      //no container yet
      return false;
    }
    if(roleMiner.spawn(spawn, container[0].pos, s)){
      return true;
    }
    return false;
  }
}

module.exports = creepSpawner;