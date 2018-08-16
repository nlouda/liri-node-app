require ("dotenv").config();
const fs = require("fs");
const keys=require("./keys.js");
const fetch=require("node-fetch");

let movieGet= async(available)=>{
try{
const queryURL= `http://www.omdbapi.com/?apikey=${keys.omdb.key}&t=${available}`;
const response = await fetch(queryURL);
const result = await response.json();
let movie = {
"Title": result.Title,
"Year": result.Year,
"IMDB Rating": result.Ratings[0].Value,
"Rotten Tomato Rating": result.Ratings[1].Value,
"Production Country": result.Country,
"Plot": result.Plot,
"Actors": result.Actors
};
fs.appendFileSync("./random.txt", JSON.stringify([process.argv[2] + "--" +process.argv[3], movie], null, 2), 'utf8');
return console.log(JSON.stringify(movie, null, 2));
}catch(error){
    if(process.argv[3]=== undefined){
        return console.log("Search movie");
    }
return console.log(error);
}
};
exports.movieGet = movieGet