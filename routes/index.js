module.exports = function(app) {

app.get('/', (req, res) => {

        res.statusCode = 200;
        res.setHeader ('context-type', 'text/html');
        res.end('<h1>ola</h1>');
        
        });

app.get('/sign-up', (req, res) => {

    res.statusCode = 200;
    res.setHeader ('context-type', 'text/html');
    res.end('<h1>crie sua conta</h1>');
    
});

}
