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
        roleBuilder.gather(creep);
      }
  },

  spawn: function(spawn){
    spawn.spawnCreep(
        [
            WORK,
            CARRY,
            CARRY,
            MOVE,
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

  gather: function(creep){
    if (creep.carry.energy == creep.carryCapacity){
      creep.memory.building = true;
    }

    var source = creep.pos.findClosestByPath(
      FIND_SOURCES
    )
    if (creep.harvest(source) == ERR_NOT_IN_RANGE){
      creep.moveTo(source)
    }
  },

  build: function(creep){
    var site = creep.pos.findClosestByPath(
      FIND_MY_CONSTRUCTION_SITES
    )
    if (creep.build(site) == ERR_NOT_IN_RANGE){
      creep.moveTo(site)
    }
  },

  idle: function(creep, spawn){
    // go sit near spawn out of hte way
    creep.moveTo(spawn)
  }
};

module.exports = roleBuilder;