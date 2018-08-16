let fs = require("fs");
let spotify = require("./assets/spotify.js");
let twitter = require("./assets/twitter.js");
let movies = require("./assets/movies.js")

let choice = process.argv.slice(2);

function choices(available, entered) {
    if (choice[1] !== undefined) {
        entered = choice[1];
    };
    switch (available) {
        case "my-tweets":
            return twitter.tweetGet();
            break;
        case "spotify-this-song":
            return spotify.spotifySearch(entered);
            break;
        case "movie-this":
            return movies.movieGet(entered);
            break;
        case "do-what-it-says":
            let random = function () {
                const data = fs.readFileSync("./assets/random.txt", "utf8");
                let datArray;
                if (data.includes(",")) {
                    datArray = data.trim().split(",");
                    process.argv.push(datArray[1]);
                    choices(datArray[0]), datArray[1];
                } else {
                    datArray = [data.trim()];
                    choices(datArray[0]);
                }
            };
            return random();
            break;
    }
}
choices(choice[0]);