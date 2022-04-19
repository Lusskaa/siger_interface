
const insertOwnUser = (request, response, next) => {
  request.body = request.body.map(plan => ({
    ...plan,
    users_id: request.user.id
  }))
  next()
}

export default {
  insertOwnUser
}
