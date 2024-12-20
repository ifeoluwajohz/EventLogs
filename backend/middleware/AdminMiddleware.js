const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const AdminMiddleware = async (req, res, next) => {
    // Read token from the Authorization header (Bearer token)
    const token = req.headers.authorization?.split(' ')[1]; // Get token after 'Bearer'

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by the ID encoded in the token
        const admin = await prisma.admin.findUnique({ where: { id: decoded.adminId } });

        if (!admin) {
            return res.status(401).json({ error: 'Unauthorized: admin not found' });
        }

        // Attach the user object to the request
        req.admin = admin;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = AdminMiddleware;
