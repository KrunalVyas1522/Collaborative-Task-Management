const express = require('express');
const Project = require('../models/project');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// Create project
router.post('/', authenticate(['Admin', 'Project Manager']), async (req, res) => {
    console.log('req.user.id: ======> ', req.user.id);
    console.log('Total Body: ===> ', { ...req.body, createdBy: req.user.id });
    const project = new Project({ ...req.body, createdBy: req.user.id });
    await project.save();
    res.status(201).json(project);
});

// Get all projects
router.get('/', authenticate(), async (req, res) => {
    try {
        const projects = await Project.find()
            .populate('members', 'username email')
            .populate({
                path: 'tasks',
                populate: { path: 'assignedTo', select: 'username' }
            });

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
