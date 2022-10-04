const AppError = require("../utils/AppError");
const knex = require("../database/knex");


async function checkAdmin(request, response, next){
  const user_id = request.user.id;
  
  const user = await knex("users").where({ id: user_id })

  if (user[0].admin == 0){
    throw new AppError("Acesso negado!", 401);
  }

  return next();

}

module.exports = checkAdmin;