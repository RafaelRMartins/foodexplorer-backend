const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");


class IngredientsController{
  async create(request, response){
    const { name } = request.body;
    const image = request.file.filename;

    const diskStorage = new DiskStorage();

    if(!image){
      throw new AppError("Favor inserir a imagem do ingrediente.");
    }

    if(!name){
      throw new AppError("Favor inserir o nome do ingrediente.");
    }

    await diskStorage.saveFile(image)

    const ingredients = await knex("ingredients").insert({
      image,
      name
    })

    return response.json();
  }

  async index(request, response){
    
    const ingredients = await knex("ingredients")

    return response.json(ingredients);
  }

  async show(request, response){
    const { id } = request.params;
    
    const ingredients = await knex("ingredients").where({ id }).first();

    return response.json(ingredients);
  }

  async delete(request, response){
    const { id } = request.params;

    const diskStorage = new DiskStorage();

    const ingredient = await knex("ingredients").where({ id })

    if (ingredient[0].image){
      await diskStorage.deleteFile(ingredient[0].image);
    }

    await knex("ingredients").where({ id }).delete();

    return response.json();
  }

  async update(request, response){
    const { id } = request.params;
    const { name } = request.body;

    if(!name){
      throw new AppError("Favor inserir o nome do ingrediente.");
    }
    
    await knex("ingredients").update({ name }).where({ id })

    return response.json();
  }

  async updateImage(request, response){
    const { id } = request.params;
    const image = request.file.filename;

    const diskStorage = new DiskStorage();

    const plate = await knex("ingredients").where({ id })

    if(image && plate[0].image != image){
      if(plate[0].image){
        await diskStorage.deleteFile(plate[0].image);
      }
      
      const filename = await diskStorage.saveFile(image);
      await knex("ingredients").update({ image }).where({ id })
    }
    
    return response.json();
  }
}

module.exports = IngredientsController;