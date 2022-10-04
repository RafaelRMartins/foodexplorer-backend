const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class FavoriteController{
  async create(request, response){
    const { plates_id } = request.params;
    const user_id = request.user.id;

    const checkPlate = await knex("plates").where({ id: plates_id }).first();

    if(!checkPlate){
      throw new AppError("Este prato não foi encontrado.");
    }

    const favoriteCheck = await knex("favorite").where({ user_id, plates_id });

    if(favoriteCheck[0]){
      throw new AppError("Este prato já foi favoritado.");
    }

    const favorite = await knex("favorite").insert({
      user_id,
      plates_id
    })

    return response.json();
  }

  async show(request, response){
    const user_id = request.user.id;
    
    const favoriteList = await knex("favorite").where({ user_id });

    return response.json({favoriteList});
  }

  async delete(request, response){
    const { plates_id } = request.params;
    const user_id = request.user.id;

    await knex("favorite").where({ user_id, plates_id }).delete();

    return response.json();
  }
}

module.exports = FavoriteController;