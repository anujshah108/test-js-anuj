import moment from 'moment'
import movies from './movies'


export function getPopularMovies () {

// using concat to combine movies array because movies contains the results of two API requests (two arrays)
  let combinedResults = movies[0].concat(movies[1])

//  Filtering for 4 and 5 stars (all movies here are 5 stars so therefore in this specific case not needed)
//  combinedResults = combinedResults.filter(movie => movie.rating==5||movie.rating==4)

//initializaing object to be used to sort years and titles
  const yearObj = {}


// Will loop throughout the combined array and first, get releaseYear of each movie and add it to the movie object and then push each movie to the corresponding year key in the yearObj or create a year key with the first movie of that year within an array.

//JavaScript automatically sorts numerical keys in an object therefore the sorting of years is done for us in this way. Also allows for sorting of title within a year to be much easier.

  for(let i = 0;i<combinedResults.length;i++){

// each movie object in the results needs a releaseYear attribute added
    let releaseYear = moment(combinedResults[i].releaseDate).format('YYYY')
    combinedResults[i]['releaseYear'] = releaseYear

// Optional line - removing the year in the title.
    combinedResults[i].title = combinedResults[i].title.split('(')[0].trim()


    if(yearObj[releaseYear]){
    yearObj[releaseYear].push(combinedResults[i])
    }
    else{
    yearObj[releaseYear] = [combinedResults[i]]
    }

  }

// empty combinedResult to concat arrays of sorted titles by year
   combinedResults = []

// iterate through each year in yearObj and sort the corresponding array by title and then concat the sorted array to combinedResults. Years in yearObj are already sorted for us by JavaScript so the resultant array will be an array of movies sorted by year first and then title.

   for(var year in yearObj){

    yearObj[year].sort(function(movieA,movieB){

     if (movieA.title < movieB.title) {
     return -1;
     }
     if (movieA.title > movieB.title) {
     return 1;
     }

    });

   combinedResults = combinedResults.concat(yearObj[year])

  }


  return {
    type: 'GET_MOVIES_SUCCESS',
    movies: combinedResults
  }


}

