module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Emails', {
            id: {
                allowNull: false,
                type: Sequelize.UUID,
                primaryKey: true,
                unique: true
            },
            from: {
                allowNull: false,
                type: Sequelize.STRING(50)
            },
            to: {
                allowNull: false,
                type: Sequelize.STRING(255),
            },
            cc: {
                allowNull: true,
                type: Sequelize.STRING(255),
            },
            bcc: {
                allowNull: true,
                type: Sequelize.STRING(255),
            },
            subject: {
                allowNull: true,
                type: Sequelize.STRING(255),
            },
            body: {
                allowNull: true,
                type: Sequelize.TEXT,
            },
            status: {
                allowNull: false,
                type: Sequelize.ENUM('ACCEPTED','SENT','FAILED'),
                defaultValue: 'ACCEPTED',
            },
            payload: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            // Timestamps
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        })
    ,
    down: (queryInterface) => queryInterface.dropTable('Email')
}