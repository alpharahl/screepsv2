var roleCreep = require('role.creep');

var roleRepairer = {
  run: function(creep){
    roleCreep.navigate(creep);
    roleCreep.pickup(creep);
    if (creep.memory.repairTarget){
      roleRepairer.repair(creep)
    } else {
      if(Memory.repairList.length > 0){
        creep.memory.repairTarget = Memory.repairList[0]
      }
    }
  },

  repair: function(creep){
    var target = Game.getObjectById(creep.memory.repairTarget);
    if(creep.repair(target) == ERR_NOT_IN_RANGE){
      creep.moveTo(target)
    }
    if(target.hits == target.hitsMax){
      creep.memory.repairTarget = null
    }
  },

  spawn: function(spawn){
    spawn.spawnCreep(
      [
        WORK,
        WORK,
        WORK,
        CARRY,
        CARRY,
        MOVE,
        MOVE
      ],
      'Repairer' + Game.time,
      {
        memory: {
          type: 'Repairer'
        }
      }
    )
  }
}

module.exports = roleRepairer;