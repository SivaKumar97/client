export const getMoviesSelector = (searchedList=[],movies) =>{
    const movieList = {};
    searchedList.map(mv=>{
        movieList[mv] = movies[mv]
    })
    return movieList;
}

export const getDatasByDay = (movies,type) =>{
    const dayInMs = 86400000
    let today = new Date()
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
    Object.keys(movies).map(movie=>{
        const { releaseDate = '', name } = movies[movie];
        const releaseDateInMs = releaseDate && new Date(releaseDate).setHours(0,0,0,0);
        if(type == 'otherReleases' && releaseDate && releaseDateInMs > endTime){
            moviesObj.push(movies[movie]);
        }
        else if(type != 'otherReleases' && releaseDate && releaseDateInMs >= startTime && releaseDateInMs < endTime){
            moviesObj.push(movies[movie]);
        }
    })
    return moviesObj
}