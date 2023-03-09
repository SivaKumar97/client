import React from 'react'
import { connect } from 'react-redux'
import DetailView from '../Component/DetailView';
import { closeForm, openForm } from '../Dispatcher/Action';
import { getDatas } from './../Utils/selector';
function DetailViewContainer(props) {
  const { 
    formType,
    closeForm,
    canShowImage,
    movieDetail,
    movies,
    openForm,
    searchContainer,
    dataArr
   } = props;
   const getMvId = (type) =>{
    const keys = dataArr
    const currentIndex = keys.findIndex(key=>key == movieDetail['mvId'])
    let id = keys[currentIndex+1] || movieDetail['mvId'] ;
    if(type == 'prev'){
      id = keys[currentIndex-1] || movieDetail['mvId']
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
  const dataArr = searchedMovies.length > 0 ? searchedMovies : mvDetail.length > 0 ? mvDetail : Object.keys(movies)
  return {
      state,
      formType,
      canShowImage: isShowImage,
      dataArr,
      movies,
      movieDetail: form.recordId && movies[form.recordId] || datas[searchedMovies[0]] || {}
    }
};

export default connect(mapStateToProps, {
  closeForm,
  openForm
})(DetailViewContainer);