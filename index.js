const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const uuid = require('uuid');
const app = express();


app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name: "Melissa",
    favoriteMovies: []
  },
  {
    id: 2,
    name: "Parker",
    favoriteMovies: ["Up"]
  },
];

let movies = [
  {
    "Title" : "The Dark Knight",

    "Description" : "A gang of masked criminals rob a Mafia-owned bank in Gotham City, each betraying the other until the sole survivor, the Joker, reveals himself as the mastermind and escapes with the money. The vigilante Batman, district attorney Harvey Dent, and police lieutenant Jim Gordon form an alliance to eliminate Gotham's organized crime. Batman's alter-ego, billionaire Bruce Wayne, publicly supports Dent as Gotham's legitimate protector, believing his success will allow Batman to retire so Wayne can romantically pursue his childhood friend Rachel Dawes, despite her relationship with Dent.",

    "Genre" : {
              "Name" : "Action",
              "Description" : "Featuring characters involved   in exciting and usually dangerous activities and adventures"
            },

    "Director" : {
                  "Name" : "Christopher Nolan",
                  "Bio" : "Christopher Nolan ( born 30 July 1970) is a British-American film director, producer, and screenwriter. His films have grossed more than US$5 billion worldwide and have garnered 11 Academy Awards from 36 nominations."
    },

    "ImageURL" : "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg",

    "Year" : "2008"
  },

  {
    "Title" : "The Lord Of The Rings: The Return Of The King",

    "Description" : "The hobbit Sméagol is fishing with his cousin Déagol, who discovers the One Ring in the river. Sméagol's mind is ensnared by the Ring, and he kills his cousin for it. Increasingly corrupted physically and mentally, he retreats into the Misty Mountains and becomes known as Gollum.",

    "Genre" : {
            "Name" : "Fantasy",
            "Description" : "A type of adventure film where the action takes place in imaginary lands with strange beasts, wizards and witches."
    },

    "Director" : {
                "Name" : "Peter Jackson",
                "Bio" : "Sir Peter Robert Jackson (born 31 October 1961) is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy (2001–2003) and the Hobbit trilogy (2012–2014), both of which are adapted from the novels of the same name by J. R. R. Tolkien."
    },

    "ImageURL" : "https://upload.wikimedia.org/wikipedia/en/b/be/The_Lord_of_the_Rings_-_The_Return_of_the_King_%282003%29.jpg",

    "Year" : "2003"
  },

  {
    "Title" : "Gladiator",

    "Description" : "In 180 AD, Hispano-Roman General Maximus Decimus Meridius intends to return home after he leads the Roman army to victory against the Germanic tribes near Vindobona on the Limes Germanicus. Emperor Marcus Aurelius tells Maximus that his own son, Commodus, is unfit to rule and that he wishes Maximus to succeed him, as regent, to help save Rome from corruption and restore the republic. Upon hearing this, Commodus murders his father. ",

    "Genre" : {
            "Name" : "Action",
            "Description" : "Featuring characters involved   in exciting and usually dangerous activities and adventures"
    },

    "Director" : {
                "Name" : "Ridley Scott",
                "Bio" : "Sir Ridley Scott (born 30 November 1937) is an English film director and producer. He has directed, among others, the science fiction films Alien (1979), Blade Runner (1982) and The Martian (2015), the road crime film Thelma & Louise (1991), the historical epic drama film Gladiator (2000), and the war film Black Hawk Down (2001)."
    },

    "ImageURL" : "https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png",

    "Year" : "2000"
  },

  {
    "Title" : "No Country For Old Men",

    "Description" :"In 1980, hitman Anton Chigurh is arrested in Texas. In custody, he strangles a deputy sheriff and uses a captive bolt pistol to kill a stranger on the highway and escape in his car. He spares the life of a gas station owner who correctly guesses the result of Chigurh's coin toss.",

    "Genre" : {
              "Name" : "Crime",
              "Description" : "Crime is a genre that focuses on crimes, the criminals that commit them and the police that catch them."
     },

    "Director" : {
                "Name" : "Joel and Ethan Coen",
                "Bio" : "Joel Daniel Coen (born November 29, 1954) and Ethan Jesse Coen (born September 21, 1957), collectively known as the Coen brothers (/ˈkoʊən/) are American filmmakers. Their films span many genres and styles, which they frequently subvert or parody. Their most acclaimed works include Raising Arizona (1987), Miller's Crossing (1990), Barton Fink (1991), Fargo (1996), The Big Lebowski (1998), O Brother, Where Art Thou? (2000), No Country for Old Men (2007), True Grit (2010), Inside Llewyn Davis (2013), and The Ballad of Buster Scruggs (2018)."
    },

    "ImageURL" : "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",

    "Year" : "2007"
  },

  {
    "Title" : "The Departed",

    "Description" : "In South Boston in the 1980s, Colin Sullivan is introduced to organized crime by Irish-American gangster Frank Costello. Twenty years later, Sullivan has been groomed as a spy inside the Massachusetts State Police (MSP) and joins the Special Investigations Unit, led by Captain Ellerby. Another recruit, State Trooper Billy Costigan Jr., is approached by Captain Queenan and Staff Sergeant Dignam to go undercover and infiltrate Costello's crew. They believe Costigan's deceased uncle's reputation as a prominent mobster will give him credibility with Costello.",

    "Genre" : {
          "Name" : "Crime",
          "Description" : "Crime is a genre that focuses on crimes, the criminals that commit them and the police that catch them."
    },

    "Director" : {
                "Name" : "Martin Scorsese",
                "Bio" : "Martin Charles Scorsese (Italian: [skorˈseːze, -se]; born November 17, 1942) is an American film director, producer, screenwriter and actor. He is the recipient of many accolades, including an Academy Award, three Primetime Emmy Awards, a Grammy Award, four British Academy Film Awards, three Golden Globe Awards, and two Directors Guild of America Awards. Scorsese has received various honors including the AFI Life Achievement Award in 1997, the Kennedy Center Honor in 2007, and the BAFTA Fellowship in 2012."
    },

    "ImageURL" : "https://upload.wikimedia.org/wikipedia/en/5/50/Departed234.jpg",

    "Year" : "2006"
  },

  {
    "Title" : "Inglourious Basterds",

    "Description" : "In 1941, SS-Standartenführer Hans Landa interrogates French farmer Perrier LaPadite as to the whereabouts of a Jewish family, the Dreyfuses. Landa suspects the Dreyfuses are hiding under their floorboards and, in exchange for the Nazis not murdering his family, LaPadite tearfully confirms it. The soldiers shoot through the floorboards, killing all but one of the Dreyfuses: Shoshanna, the Dreyfuses' daughter, who escapes.",

    "Genre" : {
            "Name" : "War",
            "Description" : "War film is a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes."
    },

    "Director" : {
                "Name" : "Quentin Tarantino",
                "Bio" : "Quentin Jerome Tarantino (born March 27, 1963) is an American filmmaker and actor. His films are characterized by frequent references to popular culture and film history, nonlinear storylines, dark humor, stylized violence, extended dialogue, pervasive use of profanity, cameos and ensemble casts."
    },

    "ImageURL" : "https://upload.wikimedia.org/wikipedia/en/c/c3/Inglourious_Basterds_poster.jpg",

    "Year" : "2009"
  },

  {
    "Title" : "Up",

    "Description" : "As a young boy, 10-year-old Carl Fredricksen idolizes explorer Charles Muntz. After he is accused of presenting a fake giant bird skeleton from Paradise Falls in South America, Muntz returns to the area intent on clearing his name by capturing a living specimen. Carl meets fellow Muntz fan Ellie, who confides her desire to move her 'clubhouse'—an abandoned house in the neighborhood—to a cliff overlooking Paradise Falls. The two later marry and live in the rebuilt house, with Carl working as a balloon salesman and Ellie a tour guide at the zoo. After Ellie suffers a miscarriage, the couple decide to refocus and begin saving for a trip to Paradise Falls, but are constantly forced to spend their savings on more urgent needs. Years pass and Carl decides to arrange the trip as a surprise for Ellie. On the day that Carl plans to tell Ellie, she falls ill and is hospitalized, dying soon after.",

    "Genre" : {
            "Name" : "Family",
            "Description" : "Family film is a genre that is contains appropriate content for younger viewers."
    },

    "Director" : {
              "Name" : "Pete Docter",
              "Bio" : "Peter Hans Docter (born October 9, 1968) is an American animator, film director, screenwriter, producer, voice actor, and chief creative officer of Pixar.[2][3] He is best known for directing the Pixar animated feature films Monsters, Inc. (2001), Up (2009), Inside Out (2015), and Soul (2020), and as a key figure and collaborator at Pixar. He has been nominated for nine Oscars and has won three for Best Animated Feature—for Up, Inside Out and Soul—making him the first person in history to win the category three times."
    },

    "ImageURL" : "https://upload.wikimedia.org/wikipedia/en/0/05/Up_%282009_film%29.jpg",

    "Year" : "2009"
  },

  {
    "Title" : "Memento",

    "Description" : "The film starts with a Polaroid photograph of a dead man. As the sequence plays backward, the photo reverts to its undeveloped state, entering the camera before the man is shot in the head. The film then continues, alternating between black-and-white and color sequences.",

    "Genre" : {
            "Name" : "Thriller",
            "Description" : "Thriller is a genre of fiction, having numerous, often overlapping subgenres."
    },

    "Director" : {
                  "Name" : "Christopher Nolan",
                  "Bio" : "Christopher Nolan (born 30 July 1970) is a British-American film director, producer, and screenwriter. His films have grossed more than US$5 billion worldwide and have garnered 11 Academy Awards from 36 nominations."
    },

    "ImageURL" : "https://en.wikipedia.org/wiki/Memento_(film)#/media/File:Memento_poster.jpg",

    "Year" : "2000"
  },

  {
    "Title" : "Kill Bill: Volume One",

    "Description" : "In 1999, a pregnant woman in a wedding dress, the Bride, lies wounded in a chapel in El Paso, Texas. She tells her attacker, Bill, that the baby is his just as he shoots her in the head.",

    "Genre" : {
              "Name" : "Action",
              "Description" : "Featuring characters involved   in exciting and usually dangerous activities and adventures"
    },

    "Director" : {
                "Name" : "Quentin Tarantino",
                "Bio" :"Quentin Jerome Tarantino (born March 27, 1963) is an American filmmaker and actor. His films are characterized by frequent references to popular culture and film history, nonlinear storylines, dark humor, stylized violence, extended dialogue, pervasive use of profanity, cameos and ensemble casts."
    },

    "ImageURL" : "https://upload.wikimedia.org/wikipedia/en/2/2c/Kill_Bill_Volume_1.png",

    "Year" : "2003"
  },
  {
    "Title" : "Casino Royale",

    "Description" : "MI6 operative James Bond gains his license to kill and promotion to 00 agent status by assassinating the traitorous Dryden and his contact at the British Embassy in Prague. In Uganda, Mr. White introduces Steven Obanno, a high-ranking member of the Lord's Resistance Army, to Le Chiffre, an Albanian private banker to terrorists. Obanno entrusts Le Chiffre with a large sum of money to invest; Le Chiffre shorts the stock of aerospace manufacturer Skyfleet using insider knowledge of a terrorist attack.",

    "Genre" : {
              "Name" : "Action",
              "Description" : "Featuring characters involved   in exciting and usually dangerous activities and adventures"
    },

    "Director" : {
                "Name" : "Martin Campbell",
                "Bio" : "Martin Campbell (born 24 October 1943) is a New Zealand film and television director based in the United Kingdom. He directed the British miniseries Edge of Darkness (1985), for which he won a BAFTA, The Mask of Zorro (1998), and the James Bond films GoldenEye (1995) and Casino Royale (2006)."
    },

    "ImageURL" : "https://upload.wikimedia.org/wikipedia/en/1/15/Casino_Royale_2_-_UK_cinema_poster.jpg",

    "Year" : "2006"
  }
];

// CREATE
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
    res.status(400).send('users need names')
  }
})

//CREATE

app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id ); //search user by id

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to ${user.name}'s array`);
  } else {
    res.status(400).send('No such user found!');
  }
});

//UPDATE

app.put('/users/:id', (req, res) => {
  const {id} = req.params;
  const updatedUser = req.body;

  let user = users.find(user => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('User not found')
  }
})

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});


//Read

app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

//Read

app.get('/movies/:title', (req, res) => {
  const {title} = req.params;
  const movie = movies.find( movie => movie.Title === title );

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('Movie not found');
  }
});

//Read

app.get('/movies/genre/:genreName', (req, res) => {
  const {genreName} = req.params;
  const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('Genre not found');
  }
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Something went wrong!');
});

//Read

app.get('/movies/director/:directorName', (req, res) => {
  const {directorName} = req.params;
  const director = movies.find( movie => movie.Director.Name === directorName ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('Director not found');
  }
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Something went wrong!');
});

//DELETE

app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id );

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from ${user.name}'s array`);
  } else {
    res.status(400).send('No such user found!');
  }
});

//DELETE

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find( user => user.id == id );

  if (user) {
    users = users.filter(user => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send('No such user found!');
  }
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
