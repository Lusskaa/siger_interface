module.exports = {
  secret: process.env.AUTH_SECRET, // ISSO FUNCIONA OU SE EU COLOCAR 'process.env.AUTH_SECRET' TAMBÉM FUNCIONA
  expiresIn: process.env.AUTH_EXPIRESIN // NAO ESTÁ FUNCIONANDO COLOCAR SEM '' E NEM COLOCAR O AUTH_EXPIRESIN tentei isso aqui tbm
  // `${process.env.AUTH_EXPIRESIN}` ena funcionou
}
