import React from 'react'
import { connect } from 'react-redux'
import DetailView from '../Component/DetailView';
import { closeForm, openForm } from '../Dispatcher/Action';
import { getDatas, getMoviesSelector } from './../Utils/selector';
function DetailViewContainer(props) {
  const { 
    formType,
    closeForm,
    canShowImage,
    movieDetail,
    movies,
    openForm,
    searchContainer
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
      Object.keys(movieDetail).length > 0 ? (
        <DetailView 
          formType={formType}
          closeForm={closeForm}
          canShowImage={canShowImage}
          movieDetail={movieDetail}
          getMvId={getMvId}
          movies={movies}
          changeDv={changeDv}
          editForm={editForm}
          searchContainer={searchContainer}
        />
      ) : null
      
  )
}

const mapStateToProps = state => {
  const { config={}, form={}, movies } = state;
  const formType = form.isFormOpened;
  const { isShowImage } = config;
  const { searchedMovies = [],mvDetail=[] } = movies;
  const datas = getDatas(state)
  return {
      state,
      formType,
      canShowImage: isShowImage,
      movies: datas,
      movieDetail: datas[form.recordId] || datas[searchedMovies[0]] || movies[form.recordId] || {}
    }
};

export default connect(mapStateToProps, {
  closeForm,
  openForm
})(DetailViewContainer);