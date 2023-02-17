export const openForm = (formType, datas={}) => ({
    type: 'SET_FORM_STATE',
    data: { 'isFormOpened': formType, ...datas }
});

export const closeForm = () => ({
    type: 'SET_FORM_STATE',
    data: { 'isFormOpened': false, recordId: '' }
});

export const showImage = () =>({
    type: 'SET_IMAGE_STATE',
    data: { 'isShowImage': true }
})

export const hideImage = () =>({
    type: 'SET_IMAGE_STATE',
    data: { 'isShowImage': false }
})

export const toggleView = () =>({
    type: 'TOGGLE_VIEW'
})
export const getMovies = (data) =>({
    type: 'GET_MOVIES',
    data
})
export const getSearchedMovies = (data) =>({
    type: 'SEARCHED_MOVIES',
    data
})
export const getSortedMovies = (data) =>({
    type: 'SORTED_MOVIES',
    data
})



export const updateMovies = (data) =>({
    type: 'UPDATE_MOVIES',
    data
})

export const deleteMovie =(id) =>({
    type: 'DELETE_MOVIE',
    data: id
})