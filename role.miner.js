var roleCreep = require('role.creep');

var roleMiner = {
  run: function(creep){
    roleCreep.navigate(creep);
    roleMiner.mine(creep);
  },

  mine: function(creep){
    var source = Game.getObjectById(creep.memory.source.id)
    creep.harvest(source)
  },

  spawn: function(spawn, pos, s){
    var spawnList = [MOVE, MOVE]
    //subtract 100 for the move nodes
    var energyA = spawn.room.energyAvailable - 100

    for (var i=0; i < Math.floor(energyA/100); i++){
      spawnList = spawnList.concat([WORK])
    }
    spawn.spawnCreep(
      spawnList,
      'Miner' + Game.time,
      {
        memory: {
          type: 'Miner',
          source: s,
          dest: new RoomPosition(pos.x, pos.y, pos.roomName)
        }
      }
    )
  }
}

module.exports = roleMiner;