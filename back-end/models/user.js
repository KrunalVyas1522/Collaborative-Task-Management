const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Project Manager', 'Team Member'], default: 'Team Member' },
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
