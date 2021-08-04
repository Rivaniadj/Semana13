const express = require("express")
const router = express.Router() 

router.get("/", function (request, response){ 
    response.status(200).send({ 
        titulo: "API do projeto semana 12",
        versao: "1.0.0",
        mensagem: "concluida"
    })
})

module.exports = router