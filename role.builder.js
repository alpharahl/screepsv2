var roleCreep = require('role.creep');

var roleBuilder = {

  /** @param {Creep} creep **/
  run: function(creep) {
      if (creep.memory.building){
        if(creep.carry.energy == 0){
          creep.memory.building = false;
        }
      }

      if(creep.memory.building){
        roleBuilder.build(creep);
      }else{
        roleCreep.pickup(creep);
        if (creep.carryCapacity == creep.carry.energy){
          creep.memory.building = true
        }
      }
  },

  spawn: function(spawn){
    spawn.spawnCreep(
        [
            WORK,
            WORK,
            CARRY,
            MOVE
        ],
        'Builder' + Game.time,
        {
            memory: {
                type: 'Builder'
            }
        }
    )
  },

  build: function(creep){
    var site = creep.pos.findClosestByPath(
      FIND_MY_CONSTRUCTION_SITES
    )
    if (site){
      if (creep.build(site) == ERR_NOT_IN_RANGE){
        creep.moveTo(site)
      }  
    } else {
      // Nothing to build, lets repair
      if(Memory.repairList.length > 0){
        var target = Game.getObjectById(Memory.repairList[0])
        if (creep.repair(target) == ERR_NOT_IN_RANGE){
          creep.moveTo(target)
        }
      }
    }
    
  },

  idle: function(creep, spawn){
    // go sit near spawn out of hte way
    creep.moveTo(spawn)
  }
};

module.exports = roleBuilder;