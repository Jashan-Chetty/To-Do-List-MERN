import express from "express";
import { client } from "../db/db.js";
import bodyParser from "body-parser";
import { ObjectId } from "mongodb";


const now = new Date();
const current = now.toLocaleDateString();

const router = express.Router();
const db = client.db('Gr2-INSY7314');
let collection = db.collection('ToDoList');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/tasks', async (_, res) => {
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
});

// Add-task
router.post('/addtask', async (req, res) => {
    try {
        const taskModel = {
            task: req.body.text,
            when: current
        };
        const result = await collection.insertOne(taskModel);
        res.status(200).send(result);
    } catch (err) {
        console.log("Task creation failed: ", err);
        res.status(400).send("Internal server error");
    }
});

//Delete a blog
router.delete('/deleteTask/:id', async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const result = await collection.deleteOne(query);
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
});


export default router;