var roleCreep = require('role.creep');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.depositing){
            if (creep.carry.energy == 0){
                creep.memory.depositing = false;
            }
        }
        if(creep.carry.energy < creep.carryCapacity &&
            (creep.memory.depositing == false || creep.memory.depositing == null)
        ) {
            var sources = creep.room.find(FIND_SOURCES);
            roleCreep.pickup(creep);
        }
        else {
            if (creep.carry.energy == creep.carryCapacity){
                creep.memory.depositing = true;
            }
            roleHarvester.deposit(creep);
        }
    },

    deposit: function(creep){
        var spawn = Game.spawns[Object.keys(Game.spawns)[0]]
        var controller = creep.room.controller
        if (spawn.energyCapacity > spawn.energy){
            if(creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(spawn)
            }
        } else {
            if(creep.upgradeController(controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(controller)
            }
        }
    },

    findMiningSpot: function(creep){
        
    },

    spawn: function(spawn){
        spawn.spawnCreep(
            [
                WORK,
                CARRY,
                MOVE
            ],
            'Harvester' + Game.time,
            {
                memory: {
                    type: 'Harvester'
                }
            }
        )
    }
};

module.exports = roleHarvester;