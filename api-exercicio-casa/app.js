const express = require("express")
const app = express()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tarefaList', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const index = require("./routes/index")
const tarefaRoutes = require("./routes/tarefaRoutes")


app.use(express.json())

app.use("/", index)
app.use("/tarefas", tarefaRoutes)

module.exports = app
