module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('EmailHistories', 'response', {
            type: Sequelize.TEXT,
        });
    }
    ,
    down: (queryInterface) => {
        return queryInterface.removeColumn('EmailHistories', 'response');
    }
}