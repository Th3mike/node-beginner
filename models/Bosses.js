const mongoose = require("mongoose");

//Criar tabela no banco
const Bosses = mongoose.model("Bosses", {
  //Passando as entidades para a API
  name: String,
  level: Number,
  description: String,
  approved: Boolean,
});

//Exportando bossess
module.exports = Bosses;