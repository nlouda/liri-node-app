require("dotenv").config();
const Spotify = require("node-spotify-api");
const fs = require("fs");
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);

async function spotifySearch(available) {
    if (process.argv[3] === undefined) {
        return console.log("Search for a songnode liri.js spotify-this-song '<song name here>'");
    }
    let song = await spotify.search({
        query: encodeURIComponent(available.trim()),
        type: 'track',
        limit: 1
    });
    if (song.tracks.items.length < 1) {
        return console.log("No spotify song found.");
    };
    let results = {
        "Artist(s)": "",
        "Track Name": song.tracks.items[0].name,
        "Preview Link": song.tracks.items[0].preview_url,
        "Album": song.tracks.items[0].album.name
    };
    for (var i = 0; i < song.tracks.items[0].artists.length; i++) {
        if (i == song.tracks.items[0].artists.length - 1) {
            results["Artist(s)"] += song.tracks.items[0].artists[i].name
        } else {
            results["Artist(s)"] += song.tracks.items[0].artists[i].name + ", "
        }
    };
    if (results["Preview Link"] == null) {
        results["Preview Link"] = song.tracks.items[0].external_urls.spotify
    };
    fs.appendFileSync("./random.txt", JSON.stringify([`${process.argv[2]} -- ${process.argv[3]}`, results], null, 2), 'utf8');
    return console.log(results);
}
exports.spotifySearch = spotifySearch;