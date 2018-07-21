var memoryHandler = {
  run: function(){
    // Make sure memory is initialized
    if(!Memory.rooms){
      Memory.rooms = {}
      Memory.rooms[Game.spawns[Object.keys(Game.spawns)[0]].room.name] = true
      
    }

    if (!Memory.controllerContainers){
      Memory.controllerContainers = {}
    }
    if(!Memory.repairList){
      Memory.repairList = [];
    }
    if(!Memory.sources){
      //need to populate a list of sources
      Memory.sources = [];
      for ( var r in Game.rooms){
        var room = Game.rooms[r]
        var sources = room.find(FIND_SOURCES)
        for (var s in sources){
          Memory.sources.push(sources[s].id)
        }
      }
    }
    if(!Memory.miners){
      Memory.miners={}
      for(var s in Memory.sources){
        var source = Memory.sources[s]
        Memory.miners[source] = null
      }
    }
    if(!Memory.haulers){
      Memory.haulers = {}
      for(var s in Memory.sources){
        var source = Memory.sources[s]
        Memory.haulers[source] = null
      }
    }

    memoryHandler.manageMinerMemory();
    memoryHandler.manageHaulerMemory();
    memoryHandler.manageControllerContainerMemory();
  },

  manageMinerMemory: function(){

    for (var m in Memory.miners){
      if (Memory.miners[m] == null){
        for (var name in Game.creeps){
          var creep = Game.creeps[name]
          if (creep.memory.type == "Miner"){
            // this is a miner
            Memory.miners[creep.memory.source.id] = creep.id
          }
        }
      }else{
        // No new miners, lets clear old ones out
        if (Game.getObjectById(Memory.miners[m]) == null){
          Memory.miners[m] = null
        }
      }
    }
  },

  manageHaulerMemory: function(){
    for(var h in Memory.haulers){
      if(Memory.haulers[h] == null){
        for (var name in Game.creeps){
          var creep = Game.creeps[name]
          if(creep.memory.type == 'Hauler'){
            Memory.haulers[creep.memory.source] = creep.id
          }
        }
      }else{
        if (Game.getObjectById(Memory.haulers[h]) == null){
          Memory.haulers[h] = null
        }
      }
    }
  },

  manageControllerContainerMemory: function(){
    for (var r in Game.rooms){
      var room = Game.rooms[r]
      var controller = room.controller
      if(Memory.controllerContainers[controller.id]){
        if (Game.getObjectById(Memory.controllerContainers[controller.id])){
          // do nothing
        } else {
          Memory.controllerContainers[controller.id] = null
        }
      } else {
        var container = controller.pos.findInRange(
          FIND_STRUCTURES,
          3,
          {
            filter: {
              structureType: STRUCTURE_CONTAINER
            }
          }
        )[0]
        if (container){
          Memory.controllerContainers[controller.id] = container.id
        }
      }
    }
  }
}

module.exports = memoryHandler;