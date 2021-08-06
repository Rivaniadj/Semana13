Opção 2*: Utilize uma api que você já tenha criado que tenha pelo menos uma rota de cada: `POST`, `GET`, `PUT`, `PATCH` e `DELETE` e gravar e retornar informações do banco de dados ao invés de fazer isso com arquivo. Testar a API utilizando o Postman, conforme fizemos em aula.


Nessa semana usamos postman com integraçao no BD.

Rotas usada na API "TAREFAS"

router.get("/", controller.getAllTarefas);
router.post("/tarefas/:id/create", controller.createTarefa);
router.put("/editar/:id", controller. updateTarefas);
router.patch("/:id", controller.updateAnything)
router.delete("/tarefas/:id", controller.deleteTarefa);
router.get("/:id", controller.getTarefasById)


