const express = require("express")
const app = express()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tarefas',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Conexao com o mongo
let db = mongoose.connection;

//Captura de erro ou sucesso na conexão
db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function () {
    console.log("conexão feita com sucesso.")
})




const tarefaRoutes = require("./src/routes/tarefaRoutes")


app.use(express.json())

app.use("/tarefas", tarefaRoutes)

module.exports = app
