const jwt = require('jsonwebtoken');
const secretKey = "asdfgewlnclnlhjkl"

function generateToken(userId) {
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
    return token;
}

function validateToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(400).json({ message: 'Authentication failed: Token missing' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: 'Authentication failed: Invalid token' });
        }
        req.userId = decoded.userId;
        next();
    });
}

module.exports = { generateToken, validateToken }