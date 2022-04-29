const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD /* `${process.env.DB_PASSWORD}` */,
  database: process.env.DB_DATABASE,
  define: {
    timespamps: true,
    underscored: true,
    underscoredall: true
  }
}

// aqui devemos fazer algumas configuraacoes quando eu for para o siger