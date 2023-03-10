export const getMoviesSelector = (searchedList=[],movies) =>{
    const movieList = [];
    searchedList.map(mv=>{
        movieList.push(movies[mv])
    })
    return movieList;
}

export const getDatas = (state) =>{
    const { movies } = state;
    const { mvDetail=[],searchedMovies=[] } = movies;
    let datas = searchedMovies.length != 0 ? getMoviesSelector(searchedMovies, movies) : mvDetail.length > 0 ? getMoviesSelector(mvDetail, movies) : {...movies}  || {};
    if( mvDetail.length == 0 && searchedMovies.length == 0){
        delete datas.mvDetail;
        delete datas.searchedMovies
        datas = Object.values(datas)
      }
    return datas
}

export const getDatasByDay = (movies,type) =>{
    const dayInMs = 86400000
    let today = new Date()
    const movieObj = {...movies}
    let startTime = today.setHours(0,0,0,0);
    let endTime = startTime + dayInMs
    const moviesObj = []
    if(type == 'thisWeek'){
        const day = today.getDay();
        startTime = startTime - (day * dayInMs)
        endTime = startTime + (7 * dayInMs)
    }else if(type == 'nextWeek' || type == 'otherReleases'){
        const day = 7 - today.getDay();
        startTime = startTime + (day * dayInMs)
        endTime = startTime + (7 * dayInMs)
    }
    delete movieObj['mvDetail']
    delete movieObj['searchedMovies']
    Object.keys(movieObj).map(movie=>{
        const { releaseDate = '', name } = movies[movie];
        const releaseDateInMs = releaseDate && new Date(releaseDate).setHours(0,0,0,0);
        if(type == 'releasedMovies'){
            if(releaseDateInMs <= startTime || !releaseDate){
                moviesObj.push(movies[movie]);
            }
        }
        else if(type == 'otherReleases' && releaseDate && releaseDateInMs > endTime){
            moviesObj.push(movies[movie]);
        }
        else if(type != 'otherReleases' && releaseDate && releaseDateInMs >= startTime && releaseDateInMs < endTime){
            moviesObj.push(movies[movie]);
        }
    })
    return moviesObj
}