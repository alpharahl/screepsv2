var containerPlacer = {
  run: function(){
      containerPlacer.minerContainers();
      containerPlacer.controllerContainer();
  },

  controllerContainer: function(){
    for (var r in Memory.rooms){
      if (Memory.controllerContainers[r] == null){
        var room = Game.rooms[r]
        var controllerPos = room.controller.pos
        var spawn = room.find(
          FIND_MY_STRUCTURES,
          {
            filter: {
              structureType: STRUCTURE_SPAWN
            }
          }
        )[0]

        containerLocation = controllerPos.findPathTo(spawn)[2]
        // room.createConstructionSite(
        //   containerLocation.x,
        //   containerLocation.y,
        //   STRUCTURE_CONTAINER
        // )
      }
    }
  },

  minerContainers: function(){
    for(var r in Game.rooms){
      var room = Game.rooms[r];
      var sources = room.find(FIND_SOURCES)
      for (var s in sources){
        var pos = sources[s].pos
        if( pos.findInRange(FIND_STRUCTURES,
          { 
            filter: 
              {structureType: STRUCTURE_CONTAINER}
            }
          ) == ''){
          var location = containerPlacer.getEmpty(pos, room)
          room.createConstructionSite(
            location.x,
            location.y,
            STRUCTURE_CONTAINER
          )
        }
      }
    } 
  },

  getEmpty: function(pos, room){
    // Look nearby for an empty place to put an object
    var rng = [-1, 0, 1];
    for (let x in rng){
      for (let y in rng){
        var testPos = room.getPositionAt(pos.x + rng[x], pos.y + rng[y])
        if (testPos != null){
          var terrain = testPos.lookFor(LOOK_TERRAIN)
          if (terrain == 'swamp' || terrain == 'plain'){
            return testPos;
          }
        }
      }
    }
    
  }
}

module.exports = containerPlacer;