const functions = require('firebase-functions');
const admin = require('firebase-admin');
const authorizationValidator = require('./AuthorizationValidator');
const updateStatusFunction = require('./UpdateStatusFunction');
const dateFormatUpdater = require('./DateFormatUpdater');
admin.initializeApp(functions.config().firebase);

const ref = admin.database().ref("orders");

exports.updateStatusFunction = functions.https.onRequest((request, response) => {
    if (!authorizationValidator(request, response))
        return;

    updateStatusFunction(request, response, ref);
});

exports.migrationRunner = functions.https.onRequest((request, response) => {
    if (!authorizationValidator(request, response))
        return;

    dateFormatUpdater(request, response, ref);
});


