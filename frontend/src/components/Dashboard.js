import React, { useEffect, useState } from 'react';
import { getProjects } from '../api';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const token = localStorage.getItem('token');
            const response = await getProjects(token);
            setProjects(response.data);
        };
        fetchProjects();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <h3>Your Projects</h3>
            <table border={5}>
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Description</th>
                        <th>Members</th>
                        <th>Tasks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project._id}>
                            <td>{project.name}</td>
                            <td>{project.description || 'No description'}</td>
                            <td>{project.members.length || 0}</td>
                            <td>
                                {project.tasks && project.tasks.length > 0 ? (
                                    <ul>
                                        {project.tasks.map(task => (
                                            <li key={task._id}>
                                                {task.title} - {task.status}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    'No tasks'
                                )}
                            </td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
