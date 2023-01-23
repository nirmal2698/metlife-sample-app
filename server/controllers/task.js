import Task from '../models/task.js';
import Active from '../models/active.js';
import Completed from '../models/completed.js';

export const createTask = async (req, res) => {
    const task = req.body;
    const newTask = new Task(task);
    try{
        await newTask.save();
        res.status(201).json(newTask);
    }
    catch(error){
        res.status(409).json({message: error.message})
    }
}

export const displayTasks = async (req, res) => {
    try{
        const tasks = await Task.find();
        res.status(201).json({tasks: tasks});
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}

export const addActiveTask = async (req, res) => {
    const task = req.body;
    const newTask = new Active(task);
    try{
        await newTask.save();
        res.status(201).json(newTask);
    }
    catch(error){
        res.status(409).json({message: error.message})
    }
}

export const displayActiveTasks = async (req, res) => {
    try{
        const tasks = await Active.find();
        res.status(201).json({tasks: tasks});
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}

export const deleteActiveTasks = async (req, res) => {
    const id = req.params.id;
    try{
        await Active.deleteOne({_id: id})
        res.status(201)
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}

export const addCompletedTask = async (req, res) => {
    const task = req.body;
    const newTask = new Completed(task);
    try{
        await newTask.save();
        res.status(201).json(newTask);
    }
    catch(error){
        res.status(409).json({message: error.message})
    }
}

export const displayCompletedTasks = async (req, res) => {
    try{
        const tasks = await Completed.find();
        res.status(201).json({tasks: tasks});
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}