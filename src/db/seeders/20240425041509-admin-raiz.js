'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Admins', [{
      nome: 'Moderador PETiguar',
      senha: '$2b$10$4x5PMq0bARf6//W5KvC/wOWtj6oZ/KRVIWFoog28wOV37czSGJXna',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', { nome: 'Moderador PETiguar' });
  }
};
