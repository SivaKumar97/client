import React from 'react'
import { connect } from 'react-redux'
import { closeForm, openForm, showImage, hideImage, getMovies } from '../Dispatcher/Action';
import { getLeftPanelObj, normalizeObj } from '../Utils/Utils';
import { toggleView, getSearchedMovies } from './../Dispatcher/Action';
import MovieList from './../Component/MovieList';
import { getDatas, getDatasByDay } from './../Utils/selector';
function MovieContainer(props) {
  const { 
    openForm, 
    isShowImage,
    movies,
    datas
  } = props;
  let mvList = getDatasByDay(movies,'today')
  const openDetailView = (id) =>{
    openForm('detailView',{"recordId": id});
  }
  return (
    <React.Fragment> 
        {isShowImage ? (
            <MovieList 
                movies={movies}
                datas={mvList.length > 0 ? mvList : datas}
                isTodayReleased={mvList.length != 0}
                openDetailView={openDetailView}
          />
        ) : <></>} 
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  const { config, movies={} } = state;
  const { isShowImage = false } = config
  const datas = getDatas(state)
  return {
      state,
      isShowImage,
      movies,
      datas
    }
};

export default connect(mapStateToProps,{
  openForm,
  closeForm,
  showImage, 
  hideImage,
  getMovies,
  toggleView,
  openForm,
  getSearchedMovies 
})(MovieContainer);