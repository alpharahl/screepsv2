var roleCreep = {
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