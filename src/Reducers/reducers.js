export const movieReducer = (state={}, action)=>{
    const { searchedMovies=[], mvDetail=[] } = state;
    console.log(action, state)
    switch(action.type){
        case 'UPDATE_MOVIES':
            const key = Object.keys(action.data)[0]
            if(searchedMovies.length > 0){
                !searchedMovies.includes(parseInt(key)) && searchedMovies.splice(0,0,key)
            }
            if(mvDetail.length > 0){
                !mvDetail.includes(parseInt(key)) && mvDetail.splice(0,0,key)
            }
            const updateMovies = {...state, ...action.data}
            localStorage['mvDetails'] = JSON.stringify(updateMovies)
            return {...updateMovies, mvDetail, searchedMovies}
        case 'GET_MOVIES':
            return {...state,  ...action.data, searchedMovies:[], mvDetail}
        case 'SEARCHED_MOVIES':
            return {...state, searchedMovies: [...Object.keys(action.data)], mvDetail}
        case 'SORTED_MOVIES':
            return {...state, ...action.data, searchedMovies:[]}
        case 'DELETE_MOVIE':
            const oldState = state;
            delete oldState[action.data];
            mvDetail.splice(mvDetail.indexOf(action.data),1)
            searchedMovies.splice(mvDetail.indexOf(action.data),1)
            localStorage['mvDetails'] = JSON.stringify({...oldState})
            return { ...oldState, mvDetail, searchedMovies}
        default:
            return state;
    }
}

export const formReducer = (state={},action) =>{
    switch(action.type){
        case 'SET_FORM_STATE':
            return {...state,...action.data}
        default:
            return state;
    }
}

export const configReducer = (state={},action) =>{
    switch(action.type){
        case 'SET_IMAGE_STATE':
            return {...state,...action.data}
        case 'TOGGLE_VIEW':
            return {...state, view: state.view == 'classic' ? 'table' : 'classic'}
        default:
            return state;
    }
}

export const getAllReducers = () =>{
    return {
            movies: movieReducer,
            form: formReducer,
            config: configReducer
    }
}