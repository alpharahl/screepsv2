var roleCreep = require('role.creep');

var roleUpgrader = {
  run: function(creep){
    roleCreep.navigate(creep);
    roleCreep.pickup(creep);
    var controller = creep.room.controller
    if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE){
      creep.moveTo(controller)
    }
  },

  spawn: function(spawn){
    spawn.spawnCreep(
      [
        WORK,
        WORK,
        WORK,
        WORK,
        CARRY,
        MOVE,
        MOVE
      ],
      'Upgrader' + Game.time,
      {
        memory: {
          type: 'Upgrader'
        }
      }
    )
  }
}

module.exports = roleUpgrader;