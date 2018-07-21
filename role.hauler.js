var roleCreep = require('role.creep');

var roleHauler = {
  run: function(creep){
    roleCreep.navigate(creep)
    if (creep.memory.hauling){
      roleHauler.haul(creep)
    } else {
      roleHauler.pickup(creep)
    }
  },

  pickup: function(creep){
    var storage = Game.getObjectById(creep.memory.pickupId)
    if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
      creep.moveTo(storage)
    } else {
      creep.memory.hauling = true
    }
  },

  haul: function(creep){
    if (creep.memory.haulTarget){
      var target = Game.getObjectById(creep.memory.haulTarget)
      if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        creep.moveTo(target)
      } else {
        if (creep.carry.energy > 0){
          roleHauler.selectTarget(creep)
        } else {
          creep.memory.hauling = false
        }
      }
    } else {
      roleHauler.selectTarget(creep)
    }
  },

  selectTarget: function(creep){
    var room = creep.room
    var storage = room.find(
      FIND_MY_STRUCTURES,
      {
        filter: (i) =>
          (
            i.structureType == STRUCTURE_SPAWN ||
            i.structureType == STRUCTURE_EXTENSION
          ) &&
          i.energy < i.energyCapacity
      }
    )
    if (storage.length > 0){
        creep.memory.haulTarget = storage[0].id    
    } else {
      creep.memory.haulTarget = Memory.controllerContainers[room.controller.id]
    }
  },


  spawn: function(spawn, pickupId, sourceId){
    console.log("Spawning a hauler")
    spawn.spawnCreep(
      [
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        MOVE,
        MOVE,
        MOVE
      ],
      "Hauler" + Game.time,
      {
        memory: {
          type: 'Hauler',
          hauling: false,
          pickupId: pickupId.id,
          source: sourceId
        }
      }
    )
  }
}

module.exports = roleHauler;