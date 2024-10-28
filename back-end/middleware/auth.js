const jwt = require('jsonwebtoken');

exports.authenticate = (roles = []) => {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Unauthorized' });
            req.user = decoded;
            // TODO - AUthenticate users
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            next();
        });
    };
};
