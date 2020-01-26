const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express();

var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

// Don't redirect if the hostname is `localhost:port` or the route is `/insecure`
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));

app.use(express.static(path.join(__dirname, 'public')))

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('pages/index'))
app.get('/podcasts', (req, res) => res.render('pages/podcasts'))

app.get('/insecure', function (req, res) {
  res.send('Dangerous!');
});

app.get('*', (req, res) => res.send('Page Not found 404'));

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

