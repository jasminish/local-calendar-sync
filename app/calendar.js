var google = require('googleapis');
var calendar = google.calendar('v3');
var authClient = require('./auth').client;

var getData = function(req, res) {
    authClient.credentials = req.session.tokens;
    var data = calendar.events.list({
        auth: authClient,
        calendarId: 'primary',
    }, function(err, response) {
        if (err) {
            console.log('API error: ' + err);
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(response.items, null, 3));
    });
};

exports.data = getData; 