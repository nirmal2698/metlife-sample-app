import mongoose from 'mongoose';

var CompletedSchema = new mongoose.Schema({
    title : {
        type: String,
        required: "Required"
    }
})

const Completed = mongoose.model("completed", CompletedSchema)

export default Completed;