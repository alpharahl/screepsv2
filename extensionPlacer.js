var extensionPlacer = {
  run: function(){
    var extensionLimits = {
      1: 0,
      2: 5,
      3: 10,
      4: 20,
      5: 30,
      6: 40,
      7: 50,
      8: 60
    }
    for(var r in Game.rooms){
      var room = Game.rooms[r]
      var structures = room.find(
        FIND_MY_STRUCTURES,
        {
          filter: {
            structureType: STRUCTURE_EXTENSION
          }
        }
      )
      var controller = room.controller;
      if(structures.length < extensionLimits[controller.level]){
        // Need some logic to place extensions
      }
    }
  }
}

module.exports = extensionPlacer;