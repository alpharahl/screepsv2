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
    var structures = Game.structures;
    for(var name in structures){
      var struct = structures[name];
      if (struct.hits < struct.hitsMax - 500){
        Memory.repairList.push(structure.id)
      }
    }
  }
}

module.exports = repairManager;