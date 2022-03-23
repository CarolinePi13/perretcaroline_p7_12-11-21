const { Sequelize } = require('sequelize');


// const sequelize = new Sequelize('groupomania', 'postgres', process.env.DB_PASSWORD, {
//     host: 'localhost',
//     port:5432,
//     dialect: 'postgres'
//   });

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
      ssl: {
          require: true,
          rejectUnauthorized: false
      }
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



  module.exports= sequelize;