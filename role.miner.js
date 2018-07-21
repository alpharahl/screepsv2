var roleMiner = {
  run: function(creep){
    if(creep.memory.moving == true){
      roleMiner.move(creep);
    } else {
      roleMiner.mine(creep);
    }
  },

  move: function(creep){
    // Move to desired spot
    var mine=creep.memory.mine
    if (!creep.pos.isEqualTo(mine.x, mine.y)){
      creep.moveTo(mine.x, mine.y)
    } else {
      creep.memory.moving = false
    }
  },

  mine: function(creep){
    var source = Game.getObjectById(creep.memory.source.id)
    creep.harvest(source)
  },

  spawn: function(spawn, pos, s){
    spawn.spawnCreep(
      [
        WORK,
        WORK,
        MOVE,
        MOVE
      ],
      'Miner' + Game.time,
      {
        memory: {
          type: 'Miner',
          mine: pos,
          moving: true,
          source: s
        }
      }
    )
  }
}

module.exports = roleMiner;