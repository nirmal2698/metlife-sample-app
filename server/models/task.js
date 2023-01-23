import mongoose from 'mongoose';

var TaskSchema = new mongoose.Schema({
    title : {
        type: String,
        required: "Required"
    }
})

const Task = mongoose.model("all", TaskSchema)

export default Task;