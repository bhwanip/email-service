module.exports = {
    up: (queryInterface) => {
        queryInterface.createDatabase("email_service");
    },
    down: (queryInterface) => queryInterface.dropDatabase('email_service')
}