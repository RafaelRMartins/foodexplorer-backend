const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class PlatesController{
  async create(request, response){
    const { name, price, type, description, ingredient_id } = request.body;
    const image = request.file.filename;

    const diskStorage = new DiskStorage();

    if(!image){
      throw new AppError("Favor inserir uma imagem.");
    }

    if(!name){
      throw new AppError("Favor inserir o nome do prato.");
    }

    if(!price){
      throw new AppError("Favor inserir o valor do prato.");
    }

    const filename = await diskStorage.saveFile(image);
    const plates = await knex("plates").insert({
      image,
      name,
      price,
      type,
      description
    })


    if(ingredient_id){
      const ingredientSplit = ingredient_id.split(',');
      const ingredient_plates = ingredientSplit.map(ingredient => {
        return{
          plates_id: plates[0],
          ingredients_id: ingredient
        }
      })
  
      await knex("ingredient_plates").insert(ingredient_plates);
    }

    response.json();
  }

  async delete(request, response){
    const { id } = request.params;

    const diskStorage = new DiskStorage();

    const plate = await knex("plates").where({ id })

    if (plate[0].image){
      await diskStorage.deleteFile(plate[0].image);
    }

    await knex("plates").where({ id }).delete();

    return response.json();
  }

  async update(request, response){
    const { id } = request.params;
    const { name, price, type, description, ingredient_id } = request.body;

    const plate = await knex("plates").where({ id })

    if(plate[0].name != name & name != ""){
      await knex("plates").update({ name }).where({ id })
    }

    if(plate[0].price != price & price != ""){
      await knex("plates").update({ price }).where({ id })
    }

    if(plate[0].type != type & type != ""){
      await knex("plates").update({ type }).where({ id })
    }

    if(plate[0].description != description & description != ""){
      await knex("plates").update({ description }).where({ id })
    }

    if(ingredient_id){
      const ingredient_platesOld = await knex("ingredient_plates").where({ plates_id: id });
      
      if (ingredient_platesOld){
        await knex("ingredient_plates").where({ plates_id: id }).delete();
      }

      const ingredientSplit = ingredient_id.split(',');
      const ingredient_platesNew = ingredientSplit.map(ingredient => {
        return{
          plates_id: id,
          ingredients_id: ingredient
        }
      })
  
      await knex("ingredient_plates").insert(ingredient_platesNew);
    } else{
      const ingredient_platesOld = await knex("ingredient_plates").where({ plates_id: id });
      
      if (ingredient_platesOld){
        await knex("ingredient_plates").where({ plates_id: id }).delete();
      }
    }
    
    return response.json();
  }

  async updateImage(request, response){
    const { id } = request.params;
    const image = request.file.filename;

    const diskStorage = new DiskStorage();

    const plate = await knex("plates").where({ id })

    if(image && plate[0].image != image){
      if(plate[0].image){
        await diskStorage.deleteFile(plate[0].image);
      }
      
      const filename = await diskStorage.saveFile(image);
      await knex("plates").update({ image }).where({ id })
    }
    
    return response.json();
  }
}
 
module.exports = PlatesController;