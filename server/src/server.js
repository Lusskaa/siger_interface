import app from './app'
// só posso fazer isso aqui se adicionar o sucrase yarn add sucrase
app.listen(process.env.PORT || 8000)

// para rodar  yarn sucrase-node src/server.js
