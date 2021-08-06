const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new mongoose.Schema ({
  id: { type: String},
  dataInclusao: { type: String},
  concluido: { type: Boolean },
  descricao: {type: String},
  nomeColaborador: { type: String }, 
  },
  { versionKey: false });

const Tarefas = mongoose.model('Tarefas', userSchema);

module.exports = Tarefas;