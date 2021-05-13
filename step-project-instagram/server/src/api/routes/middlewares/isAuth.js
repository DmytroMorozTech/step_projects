// In this step project this middleware wasn't utilised, because here we don't have such routes, where user has to edit/delete sensitive data. And there was no task to set permissions for accessing particular routes.

const jwt = require('jsonwebtoken');
const config = require('../../../config');

// The main logic of this middleware: it is inserted as an intermediary layer between the user's request to server and access to the requested resource. What it does: it reads the token, that arrived from  the client machine together with the request to server and verifies it.
//
// If it is correct - middleware function passes control to the next function. If not - process is stopped and user will not get any further from there.

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    console.log(token);
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        // second argument to the function above - value of jwtPrivateKey from .evn variables
        req.user = decoded;
        // above we've decoded the JWT (JSON WEB TOKEN) and received data that was encoded
        // in it as a payload. For example, this may by _id property, that contains userId.
        next();
    } catch (ex) {
        res.status(400).send('Invalid token!');
    }
};