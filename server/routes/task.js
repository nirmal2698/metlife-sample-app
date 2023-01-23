import express from 'express';
import { createTask, displayTasks, addActiveTask, displayActiveTasks, deleteActiveTasks, addCompletedTask, displayCompletedTasks } from '../controllers/task.js';

const router = express.Router();

router.post('/add_tasks', createTask);
router.get('/display_tasks', displayTasks);
router.post('/add_active-task', addActiveTask);
router.get('/display_active-tasks', displayActiveTasks);
router.delete('/delete_active-tasks/:id', deleteActiveTasks);
router.post('/add_completed-task', addCompletedTask);
router.get('/display_completed-tasks', displayCompletedTasks);

export default router;