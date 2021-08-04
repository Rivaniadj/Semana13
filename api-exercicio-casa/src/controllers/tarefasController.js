
const { response, request } = require("express")
const mongoose = require('mongoose');
const tarefas = require('../models/tarefa');

const getAll = (request, response)=>{
    tarefas.find()
        .then((tarefas) => {
            response.status(200).json(tarefas);
        })
        .catch(err => next(err));
}

const criarTarefa = (request, response)=>{
    let { descricao, nomeColaborador } = request.body

    const newTarefa = new Tarefa({
        descricao,
        nomeColaborador
    });
    newTarefa.save()
        .then((res) => {
            response.status(201).json(res);
        })
        .catch(err => next(err));

}

const atualizarTarefa = (request, response) =>{
    const { id } = request.params 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(400).json({ message: 'id citado não é válido' });
        return;
    }

    tarefas.findByIdAndUpdate(id, request.body)
        .then(() => {
            response.status(200).json({ message: ` ${request.params.id} houve sucesso na atualizacao.` });
        })
        .catch((err) => {
            response.json(err);
        });

}

const concluirTarefa = (request, response)=>{
    const { id } = request.params 
    const { concluido } = request.body 

    tarefas.findByIdAndUpdate(id, { $set: { concluido }})
        .then((tarefas) => {
            response.status(200).json({ message: `${request.params.id} tarefa foi concluida.`});                               
        })
        .catch((err) => {
            response.json(err);
        });

}

const deletarTarefa = (request, response)=>{
    const { id } = request.params

    tarefas.findByIdAndDelete(id)
        .then(() => {
            response.status(200).json('tarefa deletada');
        })
        .catch((err) => {
            throw new Error(err);
        });
}

module.exports ={
    getAll,
    criarTarefa,
    deletarTarefa,
    atualizarTarefa,
    concluirTarefa
}