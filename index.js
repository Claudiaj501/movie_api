const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'), // import built in node modules fs and path
    path = require('path');
const bodyParser = require('body-parser'),
    methodOverride = require('method-override');
const app = express();
// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' })
app.use(morgan('combined')); // setup the logger, Mildware function to the terminal
app.use(express.static('public')); // Automatically routes all requests for static files to their corresponding files within a certain folder on the server
app.use(bodyParser.urlencoded({ //support parsing of application/x-www-form-urlencoded post data
    extended: true
}));
app.use(bodyParser.json()); // support parsing of application/json type post data
app.use(methodOverride());

let topMovies = [
  {
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    genre: 'Action, Adventure',
    year: '2008'
  },
  {
    title: 'The Lord Of The Rings: The Return Of The King',
    director: 'Peter Jackson',
    genre: 'Fantasy, Adventure',
    year: '2003'
  },
  {
    title: 'Gladiator',
    director: 'Ridley Scott',
    genre: 'Action, Adventure',
    year: '2000'
  },
  {
    title: 'No Country For Old Men',
    director: 'Joel and Ethan Coen',
    genre: 'Crime, Drama',
    year: '2007'
  },
  {
    title: 'The Departed',
    director: 'Martin Scorsese',
    genre: 'Crime, Drama',
    year: '2006'
  },
  {
    title: 'Inglourious Basterds',
    director: 'Quentin Tarantino',
    genre: 'War, Action',
    year: '2009'
  },
  {
    title: 'Up',
    director: 'Pete Docter',
    genre: 'Adventure, Family',
    year: '2009'
  },
  {
    title: 'Memento',
    director: 'Christopher Nolan',
    genre: 'Mystery, Thriller',
    year: '2000'
  },
  {
    title: 'Kill Bill: Volume One',
    director: 'Quentin Tarantino',
    genre: 'Action, Crime',
    year: '2003'
  },
  {
    title: 'Casino Royale',
    director: 'Martin Campbell',
    genre: 'Action, Adventure',
    year: '2006'
  }
];

app.get('/', (req, res) => {
    res.send('Welcome to myFlix! This is my Top 10 movie list!');
});

app.get('/documentation', (req, res) => {
    /* try {
        throw new Error({ stack: 'ere' });
    } catch (error) {
        next(error)
    }*/
    res.sendFile('public/documentation.html', { root: __dirname });
});


app.get('/movies', (req, res) => {
    res.json(topMovies)
});
app.get('/secreturl', (req, res) => {
    res.send('This is a secret url with super top-secret content.');
});
app.get('*', (req, res) => {
    res.send(`I don't know that path!`)
})
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke! Sorry...')
})
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});
