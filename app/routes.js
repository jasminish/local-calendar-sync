var authClient = require('./auth').client;
var authUrl = require('./auth').authUrl;
var calendar = require('./calendar');

module.exports = function(app) {
    app.get('/', isAuthenticated, function(req, res){
        res.redirect('/calendar-events');
    }); 

    app.get('/login', function(req, res) {
        res.render('login.ejs', { 'url': authUrl });
    });

    app.get('/auth/google/callback', function(req, res) {
        var code = req.query.code;
        authClient.getToken(code, function(err, tokens){
            authClient.credentials = tokens;
            req.session.tokens = tokens;
            res.redirect('/calendar-events');
        });
    });

    app.get('/logout', function(req, res) {
        req.session.destroy();
        res.redirect('/login');
    });

    app.get('/calendar-events', isAuthenticated, calendar.data);
};

function isAuthenticated(req, res, next) {
    if (req.session.tokens) 
        return next(); 
    res.redirect('/login');
}