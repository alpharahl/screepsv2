var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');

var creepHandler = {
  run: function(){
    for(var name in Game.creeps) {
      var creep = Game.creeps[name];
      switch (creep.memory.type){
        case 'Harvester':
          roleHarvester.run(creep);
          break;
        case 'Builder':
          roleBuilder.run(creep);
          break;
      }
    }
  }
}

module.exports = creepHandler;