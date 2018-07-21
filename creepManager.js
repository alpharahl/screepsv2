var creepManager = {
  run: function(){
    var spawn = Game.spawns[Object.keys(Game.spawns)[0]];
    var harvesters = 1;
    if (Object.keys(Game.creeps).length < harvesters){
      spawn.spawnCreep([WORK, WORK, CARRY, MOVE], 'Harvester' + Object.keys(Game.creeps))
    }
  }
}

module.exports = creepManager;