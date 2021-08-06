
const { res, req } = require("express")
const mongoose = require('mongoose');
const tarefas = require('../models/tarefa');

const getAllTarefas = (req, res) => {
    
    tarefas.find(function (err, tarefasEncontrada) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
           
                res.status(200).send(tarefasEncontrada)
        
        }
    })
};
const getTarefasById = (req, res) => {
    const resquestId = req.params.id;
    tarefas.findOne({ id: resquestId }, function () {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (tarefasEncontrada) {
                res.status(200).send(tarefasEncontrada.toJSON({ virtuals: true }));
            } else {
                res.status(204).send();
            }
        }
    })
};

const createTarefa = (request, response) => {
    let {descricao, nomeColaborador} = request.body
    let tarefa = {

        dataInclusao: new Date(),
        concluido: false,
        descricao,
        nomeColaborador
    }
    tarefas.findOne(function(err, tarefaEncontrada){
        if(err){
            response.status(500).send({ "message": err.message})
        }
        else{
            if(tarefaEncontrada){
                let newTarefa = new tarefas(tarefa) 
                newTarefa.save (function (err){
                    if(err){
                        response.status(500).send({"message": err.message})
                    }
                    else{
                        tarefaEncontrada.tarefas.push(tarefas);
                        tarefas.updateOne({ $set: {tarefas: tarefaEncontrada.tarefas }}, function (err){
                            if(err) {
                                response.status(500).send({"message": err.message})
                            }
                            response.status(201).send({
                                "message": "Tarefa foi criada com sucesso!",
                                ...tarefaFound.toJSON()
                            })
                        })
                    }
                })
            }
            else{
                response.status(404).send({ "message": " OPS! Não foi possivel inserir nova tarefa!"})
            }
        }
    })
 }

const updateTarefas = (req, res) => {
    const tarefaId = req.params.id;
    tarefas.findOne({ id: tarefaId }, function (err, tarefaEncontrada) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (tarefaEncontrada) {
                tarefas.updateOne({ id: tarefaId }, { $set: req.body }, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message })
                    } else {
                        res.status(200).send({ message: "Registro alterado com sucesso" })
                    }
                })
            } else {
                res.status(404).send({ message: "nenhum nome  para ser atualizado com esse id" });
            }
        }
    })
};


 const updateAnything = (req, res) => {
    let requestdId = req.params.id;

    let filteredTarefa = tarefas.find(tarefa => tarefa.id === req.params.id);
    let updatedTarefa = req.body;

    let keyList = Object.keys(updatedTarefa);

    keyList.forEach((key) => {

        filteredTarefa[key] = updatedTarefa[key]
    });

    res.status(201).send({
        "message": "tarefa atualizado com sucesso",
        filteredTarefa
    });

};



const deleteTarefa = (req, res) => {
    const requiredId = req.params.id;
    tarefas.findOne({ id: requiredId }, function (err, tarefas) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (tarefas) {
            
                tarefas.deleteOne({ id: requiredId }, function (err) {
                    if (err) {
                        res.status(500).send({
                            message: err.message,
                            status: "FAIL"
                        })
                    } else {
                        res.status(200).send({
                            message: 'tarefa deletada com sucesso',
                            status: "SUCCESS"
                        })
                    }
                })
            } else {
                res.status(404).send({ message: 'nenhuma tarefa para ser removido com esse id' })
            }
        }
    })
};







module.exports ={
    getAllTarefas,
    createTarefa,
    deleteTarefa,
    updateTarefas,
    updateAnything,
    getTarefasById
}
