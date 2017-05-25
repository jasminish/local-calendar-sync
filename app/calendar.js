var google = require('googleapis');
var calendar = google.calendar('v3');
var authClient = require('./auth').client;

var getData = function(req, res) {
    authClient.credentials = req.session.tokens;
    var startDate = req.query.startDate; 
    var endDate = req.query.endDate; 

    var data = calendar.events.list({
        auth: authClient,
        calendarId: 'primary',
    }, function(err, response) {
        if (err) {
            console.log('API error: ' + err);
            return;
        }

        var result = response.items; 
        if (startDate) {
            result = result.filter(function(entry) {
                return entry.start.dateTime >= startDate; 
            });
        }
        if (endDate) {
            result = result.filter(function(entry) {
                return entry.end.dateTime <= endDate;
            });
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result, null, 3));
    });
};

exports.data = getData; 