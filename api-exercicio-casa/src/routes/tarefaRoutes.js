const express = require("express")
const router = express.Router()

const controller = require("../controllers/tarefasController")



router.get("/", controller.getAllTarefas);
router.post("/create/:id", controller.createTarefa);
router.put("/editar/:id", controller. updateTarefas);
router.patch("/:id", controller.updateAnything)
router.delete("/tarefas/:id", controller.deleteTarefa);
router.get("/:id", controller.getTarefasById)

module.exports = router;