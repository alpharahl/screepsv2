var containerPlacer = {
  run: function(){
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