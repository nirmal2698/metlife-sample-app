import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

mongoose.connect('mongodb://0.0.0.0:27017/to-do-list');
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
  console.log("connection succeeded");
})

import taskRoutes from './routes/task.js';

const port = 3003;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});