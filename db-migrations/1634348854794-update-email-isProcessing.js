module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Emails', 'isProcessing', {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        });
    }
    ,
    down: (queryInterface) => {
        return queryInterface.removeColumn('Emails', 'isProcessing');
    }
}