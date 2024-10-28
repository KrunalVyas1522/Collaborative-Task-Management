const express = require('express');
const Task = require('../models/task');
const { authenticate } = require('../middleware/auth');
const router = express.Router();
const Project = require('../models/project');

router.post('/', authenticate(), async (req, res) => {

    const { title, description, projectId } = req.body;
    const newTask = new Task({
        title,
        description,
        projectId,
        createdBy: req.user.id,
    });
    try {
        const savedTask = await newTask.save();
        await Project.findByIdAndUpdate(projectId, { $push: { tasks: savedTask._id } });

        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get tasks by project
router.get('/:projectId', authenticate(), async (req, res) => {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.json(tasks);
});

module.exports = router;
