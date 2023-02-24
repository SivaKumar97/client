export const getMoviesSelector = (searchedList=[],movies) =>{
    const movieList = {};
    searchedList.map(mv=>{
        movieList[mv] = movies[mv]
    })
    return movieList;
}