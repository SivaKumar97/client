import React from 'react'
import { connect } from 'react-redux'
import DetailView from '../Component/DetailView';
import { closeForm, openForm } from '../Dispatcher/Action';
function DetailViewContainer(props) {
  const { 
    formType,
    closeForm,
    canShowImage,
    movieDetail,
    movies,
    openForm,
    searchDv
   } = props;
   const getMvId = (type) =>{
    const keys = Object.keys(movies)
    let id = keys[keys.indexOf(movieDetail['mvId']+'')+1] || movieDetail['mvId'] ;
    if(type == 'prev'){
      id = keys[keys.indexOf(movieDetail['mvId']+'')-1] || movieDetail['mvId']
    }
    return id
   }
  const changeDv = (type)=>{
    const id = getMvId(type)
    openForm('detailView',{"recordId": id})
  }
  const editForm = ()=>{
    openForm('editForm')
  }
  return (
      <DetailView 
        formType={formType}
        closeForm={closeForm}
        canShowImage={canShowImage}
        movieDetail={movieDetail}
        getMvId={getMvId}
        movies={movies}
        changeDv={changeDv}
        editForm={editForm}
        searchDv={searchDv}
      />
  )
}

const mapStateToProps = state => {
  const { config={}, form={}, movies } = state;
  const formType = form.isFormOpened;
  const { isShowImage } = config;
  const { searchedMovies = {} } = movies;
  const datas = JSON.stringify(searchedMovies) == "{}" ? movies : searchedMovies || {}
  delete movies.searchedMovies
  return {
      state,
      formType,
      canShowImage: isShowImage,
      movies,
      movieDetail: searchedMovies[Object.keys(searchedMovies)[0]] || movies[form.recordId] || {}
    }
};

export default connect(mapStateToProps, {
  closeForm,
  openForm
})(DetailViewContainer);