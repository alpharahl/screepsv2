var repairManager = {
  run: function(){
    // check to see if anything in teh repair list is repaired
    for (var idHash in Memory.repairList){
      var id = Memory.repairList[idHash]
      var struct = Game.getObjectById(id)
      if (struct && struct.hits == struct.hitsMax){
        delete Memory.repairList[idHash]
      }
    }


    // check to see if anything needs repairs
    for(var r in Game.rooms){
      var room = Game.rooms[r]
      var structures = room.find(
        FIND_STRUCTURES,
        {
          filter: {
            structureType: STRUCTURE_CONTAINER,
            structureType: STRUCTURE_ROAD,
            structureType: STRUCTURE_TOWER
          }
        }
      );
      for(var name in structures){
        var struct = structures[name];
        if (struct.hits < struct.hitsMax - 500){
          if(Memory.repairList.indexOf(struct.id) == -1){
            Memory.repairList.push(struct.id)
          }
        }
      }
    }
    
  }
}

module.exports = repairManager;