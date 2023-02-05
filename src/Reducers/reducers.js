export const movieReducer = (state={}, action)=>{
    switch(action.type){
        case 'UPDATE_MOVIES':
            return {...state, ...action.data}
        case 'GET_MOVIES':
            return {...state, ...action.data}
        case 'SEARCHED_MOVIES':
            return {...action.data}
        case 'DELETE_MOVIE':
            const oldState = state;
            delete oldState[action.data];
            return { ...oldState}
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