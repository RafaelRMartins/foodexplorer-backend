const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class PlatesController{
  async show(request, response){
    const { id } = request.params;

    const plates = await knex("plates").where({ id }).first();
    const ingredient_plates = await knex("ingredient_plates").where({ plates_id: id });
    const ingredients_id = ingredient_plates.map(ingredient_plate => {
      const ingredients_id = ingredient_plate["ingredients_id"]
      return ingredients_id
    })

    let ingredient = []
    for(let i = 0 ; i < ingredients_id.length; i++){
      ingredient[i] = await knex("ingredients").where({ id: ingredients_id[i] })
    }

    return response.json({...plates, ingredient});
  }

  async index(request, response){
    const { title } = request.query;
    const user_id = request.user.id;
    
    const favorites = await knex("favorite").where({ user_id })

    const plates = await knex("plates").whereLike("name", `%${title}%`)

    const allPlates = plates.map(plate => {
      let favoriteBoolean = false
      favorites.map(favorite => {
        if(plate.id === favorite.plates_id){
          return favoriteBoolean = true
        }
      })
      return{
        ...plate,
        favorited: favoriteBoolean
      }
      
    })

    return response.json(allPlates)
  }

  async getHomePlate(request, response){
    const { type } = request.query;
    const user_id = request.user.id;
    
    const favorites = await knex("favorite").where({ user_id })

    const plates = await knex("plates").whereLike("type", `%${type}%`)

    const allPlates = plates.map(plate => {
      let favoriteBoolean = false
      favorites.map(favorite => {
        if(plate.id === favorite.plates_id){
          return favoriteBoolean = true
        }
      })
      return{
        ...plate,
        favorited: favoriteBoolean
      }
      
    })

    return response.json(allPlates)
  }

  async getFavorite(request, response){
    const { title } = request.query;
    const user_id = request.user.id;
    
    const favorites = await knex("favorite").where({ user_id })

    const plates = await knex("plates")

    const allPlates = plates.map(plate => {
      let favoriteBoolean = false
      favorites.map(favorite => {
        if(plate.id === favorite.plates_id){
          return favoriteBoolean = true
        }
      })
      if(favoriteBoolean){
        return{
          ...plate,
          favorited: favoriteBoolean
        }
      }
      
    })

    const favoritePlates = allPlates.filter(plate => {
      return plate
    })
    return response.json(favoritePlates)
  }
}
 
module.exports = PlatesController;