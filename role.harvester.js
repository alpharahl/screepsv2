var roleCreep = require('role.creep');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        roleCreep.navigate(creep);
        if (creep.memory.depositing){
            if (creep.carry.energy == 0){
                creep.memory.depositing = false;
            }
        }
        if(creep.carry.energy < creep.carryCapacity &&
            (creep.memory.depositing == false || creep.memory.depositing == null)
        ) {
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
        if (creep.memory.deposit){
            if (creep.carry.energy == 0){
                creep.memory.deposit = null
            }

            if (creep.memory.deposit != 'controller'){
                var depo = Game.getObjectById(creep.memory.deposit)
                if (creep.transfer(depo, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(depo)
                } else {
                    creep.memory.deposit = null
                }
            } else {
                var controller = creep.room.controller
                if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE){
                    creep.moveTo(controller)
                }
                roleHarvester.getDepositTarget(creep)
            }
            
        } else {
            roleHarvester.getDepositTarget(creep)

        }
    },

    getDepositTarget: function(creep){
        var room = creep.room
        var storage = room.find(
            FIND_MY_STRUCTURES,
            {
                filter: (i) =>
                    (
                        i.structureType == STRUCTURE_SPAWN ||
                        i.structureType == STRUCTURE_EXTENSION
                    ) &&
                    i.energy < i.energyCapacity
            }
        )
        if (storage.length > 0){
            creep.memory.deposit = storage[0].id    
        } else {
            creep.memory.deposit = 'controller'
        }
    },

    spawn: function(spawn){
        spawn.spawnCreep(
            [
                WORK,
                WORK,
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