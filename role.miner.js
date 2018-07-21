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
    spawn.spawnCreep(
      [
        WORK,
        WORK,
        WORK,
        WORK,
        MOVE
      ],
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