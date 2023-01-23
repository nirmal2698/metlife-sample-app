import mongoose from 'mongoose';

var ActiveSchema = new mongoose.Schema({
    title : {
        type: String,
        required: "Required"
    },
    checkState : {
        type: Boolean,
        required: "Required"
    }
})

const Active = mongoose.model("active", ActiveSchema)

export default Active;