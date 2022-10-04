const knex = require("../database/knex");

class CartsController{
  async create(request, response){
    const { amount_plates_id } = request.body;
    const user_id = request.user.id;
    const status = "Pendente";

    let details = "";
    for(let i = 0 ; i < amount_plates_id.length; i++){
      const plates_id = await knex.select("name").from("plates").where({ id: amount_plates_id[i].plate_id })

      if(i == 0){
        details = `${amount_plates_id[i].amount} x ${plates_id[0].name}`;
      }else{
        details = details.concat(`, ${amount_plates_id[i].amount} x ${plates_id[0].name}`);
      }
    }

    const carts = await knex("carts").insert({
      status,
      user_id,
      details
    })

    return response.json();
  }

  async showValue(request, response){
    const { amount_plates_id } = request.body;

    let value = 0;
    for(let i = 0 ; i < amount_plates_id.length; i++){
      const plates_id = await knex("plates").where({ id: amount_plates_id[i].plate_id })

      const priceValue = plates_id[0].price.replace(',','.')
      const multiplier = amount_plates_id[i].amount
      const valueMultiplied = parseFloat(priceValue*multiplier)
      value = parseFloat(valueMultiplied + value)
    }
    value = parseFloat(value).toFixed(2)
    value = (value.toString().replace(".", ","))

    return response.json({value});
  }

  async index(request, response){
    const carts = await knex("carts").orderBy("id", "desc");

    return response.json({carts});
  }

  async update(request, response){
    const { status, id } = request.body;

    const statusCart = await knex.select("status").from("carts").where({ id }).update({ status })

    return response.json();
  }

  async show(request, response){
    const user_id = request.user.id;

    const carts = await knex("carts").where({ user_id });

    return response.json({carts});
  }
}

module.exports = CartsController;