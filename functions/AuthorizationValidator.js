const functions = require('firebase-functions');

// eslint-disable-next-line no-undef
module.exports = function (request, response) {

    const rightKey = functions.config().functions.key;
    const requestKey = request.headers.authorization;

    if (rightKey !== requestKey) {
        // eslint-disable-next-line no-magic-numbers
        response.status(403).send('Unauthorized. Please add valid Authorization header.');
        return false;
    }

    return true;
}