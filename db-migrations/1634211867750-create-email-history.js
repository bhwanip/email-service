module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('EmailHistories', {
            id: {
                allowNull: false,
                type: Sequelize.UUID,
                primaryKey: true,
                unique: true
            },
            emailId: {
                allowNull: false,
                type: Sequelize.UUID,
            },
            status: {
                allowNull: false,
                type: Sequelize.ENUM('PROCESSING', 'SUCCESS', 'ERROR'),
            },
            provider: {
                allowNull: true,
                type: Sequelize.ENUM('SENDGRID', 'AWS_SES'),
            },
            // Timestamps
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        }).then(() => {
            // User.belongsTo(Company, {foreignKey: 'fk_company'});
            return queryInterface.addConstraint('EmailHistories', ['emailId'], {
                type: 'foreign key',
                name: 'history_fkey_email',
                references: {
                    table: 'Emails',
                    field: 'id'
                }
            })
        })
    ,
    down: (queryInterface) => queryInterface.dropTable('EmailHistories')
}