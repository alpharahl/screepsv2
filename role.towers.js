var roleTowers = {
  run: function(){
    for (var x in Game.structures){
      var struct = Game.structures[x]
      if (struct.structureType == STRUCTURE_TOWER){
        if(!roleTowers.attack(struct)){
          roleTowers.repair(struct)
        }
      }
    }
  },

  attack: function(tower){
    var hostileCreeps = tower.room.find(FIND_HOSTILE_CREEPS)
    if(Object.keys(hostileCreeps).length > 0){
      var target = hostileCreeps[Object.keys(hostileCreeps)[0]]
      tower.attack(target)
      return true
    } else {
      return false
    }
  },

  repair: function(tower){
    if (tower.energy > 200){
      var room = tower.room
      var repairs = room.find(
        FIND_STRUCTURES,
        {
          filter: (i) =>
            i.hits < i.hitsMax
        }
      )
      if(Object.keys(repairs).length > 0){
        tower.repair(repairs[Object.keys(repairs)[0]])
      }
    }
  }
}

module.exports = roleTowers;