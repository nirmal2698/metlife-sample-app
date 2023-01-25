import Task from '../models/task.js';
import Active from '../models/active.js';
import Completed from '../models/completed.js';

let arr1 = [];
let arr2 = [];
// let arr3 = [];

export const createTask = async (req, res) => {
    const task = req.body;
    const newTask = new Task(task);
    arr1.push(newTask.title);
    let i = 0;
    arr1.map((item) => { if(item === newTask.title) i++; })
    try{
        if(i==1){
            await newTask.save();
            res.status(201).json(newTask);
        }
        else res.status(201).json({message: 'Already present'});
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
    arr2.push(newTask.title);
    let i = 0;
    arr2.map((item) => { if(item === newTask.title) i++; })
    try{
        if(i==1){
            await newTask.save();
            res.status(201).json(newTask);
        }
        else res.status(201).json({message: 'Already active/completed'});
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
    // arr3.push(newTask.title);
    // let i = 0;
    // arr3.map((item) => { if(item === newTask.title) i++; })
    try{
        // if(i==1){
            await newTask.save();
            res.status(201).json(newTask);
        // }
        // else 
        // res.status(201).json({message: 'Already present'});
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