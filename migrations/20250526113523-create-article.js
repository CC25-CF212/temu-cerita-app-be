'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Articles', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      title: Sequelize.STRING,
      slug: {
        type: Sequelize.STRING,
        unique: true,
      },
      thumbnail_url: Sequelize.STRING,
      content_html: Sequelize.TEXT,
      province: Sequelize.STRING,
      city: Sequelize.STRING,
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('article_category_map');
    await queryInterface.dropTable('Article_likes');
    await queryInterface.dropTable('Article_comments'); 
    await queryInterface.dropTable('Article_category');
    await queryInterface.dropTable('Article_saved');
    await queryInterface.dropTable('Articles');
  }
};
