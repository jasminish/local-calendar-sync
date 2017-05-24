var authClient = require('./auth').client;
var authUrl = require('./auth').authUrl;
var calendar = require('./calendar');

module.exports = function(app) {
    app.get('/', function(req, res) {
        var locals = {
            'text': 'Login',
            'url': authUrl
        };
        res.render('index.ejs', locals);
    });

    app.get('/auth/google/callback', function(req, res) {
        var code = req.query.code;
        authClient.getToken(code, function(err, tokens){
            authClient.credentials = tokens;
            res.cookie('authTokens', JSON.stringify(tokens));
            res.redirect('/calendar-events');
        });
    });

    app.get('/calendar-events', calendar.data);
};
