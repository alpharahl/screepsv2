var roleCreep = {
  navigate: function(creep){
    var dest = creep.memory.dest
    if (dest){
      if(creep.pos.isEqualTo(dest.x, dest.y)){
        creep.memory.dest = null
      } else {
        creep.moveTo(new RoomPosition(dest.x, dest.y, dest.roomName))
      }
    }
  },

  gather: function(creep){
    
  },

  pickup: function(creep){
    if (creep.memory.pickup){
      var storage = Game.getObjectById(creep.memory.pickup)
      if (creep.withdraw(
        storage,
        RESOURCE_ENERGY
      ) == ERR_NOT_IN_RANGE){
        creep.moveTo(storage)
      } else {
        creep.memory.pickup = null
      }
    } else {
      roleCreep.getPickupLocation(creep)
    }
  },

  getPickupLocation(creep){
    
    if (Memory.controllerContainers[creep.room.controller.id]){
      creep.memory.pickup = Memory.controllerContainers[creep.room.controller.id]
      return;
    }
    var pos = creep.pos
    var storage = pos.findClosestByPath(
      FIND_STRUCTURES,
      { 
        filter: (i) =>
          i.structureType == STRUCTURE_CONTAINER &&
          i.store[RESOURCE_ENERGY] > creep.carryCapacity
      }
    )
    creep.memory.pickup = storage.id
  }
}

module.exports = roleCreep;