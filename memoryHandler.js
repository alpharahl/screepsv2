var memoryHandler = {
  run: function(){
    // Make sure memory is initialized
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

    memoryHandler.manageMinerMemory();
  },

  manageMinerMemory: function(){

    for (var m in Memory.miners){
      if (Memory.miners[m] == null){
        for (var name in Game.creeps){
          var creep = Game.creeps[name]
          if (creep.memory.mine){
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
    

  }
}

module.exports = memoryHandler;