import React from 'react'
import { connect } from 'react-redux'
import { exportDatas, exportProject, getPercentage, importDatas, getRecentDatas, deleteByRate } from '../Action/APIAction';
import LeftPanel from '../Component/LeftPanel';
import { closeForm, openForm, showImage, hideImage, getMovies } from '../Dispatcher/Action';
import { getLeftPanelObj, normalizeObj } from '../Utils/Utils';
import { toggleView, getSearchedMovies, getRecentMovies, getSortedMovies } from './../Dispatcher/Action';
function LeftPanelContainer(props) {
  const { 
    openForm, 
    closeForm,
    isShowImage,
    showImage, 
    hideImage,
    getMovies,
    windowSize,
    toggleView,
    movies,
    getSearchedMovies,
    getRecentMovies,
    getSortedMovies,
    deleteByRate
  } = props;
  const getRecentMovie = ()=>{
    getRecentDatas().then((res=[])=>{
        const { recentLst= [] } = res[0]
        getRecentMovies(recentLst)
        openForm('showRecent')
    })
  }
  const deleteByRating = () =>{
    deleteByRate().then(res=>{
      delete localStorage['mvDetails'];
      window.location.reload()
    })
  }
  const exportData = (type,setLoading,setLoadingVal)=>{
      const getProgress = ()=>{
      setLoadingVal(0)
        setTimeout(()=>{
          getPercentage(setLoadingVal).then(res=>{
            // if(res.status == 'completed'){

            // }else{
              setLoadingVal(0)
            // }
          })
        },2000)       
      }
    const exportMethod = type == 'exportProject' ? exportProject : type == 'importData' ? importDatas : exportDatas;
    type == 'exportProject' && getProgress();
    setLoading(type)
    exportMethod().then(res=>{
      if(type == 'importData'){
        getMovies(normalizeObj(res.mvDetails,'mvId'))
      }
      setLoading(false)
    },err=>{
      setLoading(false)
    })
  }
  return (
    <React.Fragment>  
      <LeftPanel 
        leftPanelObj={getLeftPanelObj()}
        openForm={openForm}
        closeForm={closeForm}
        isShowImage={isShowImage}
        showImage={showImage}
        hideImage={hideImage}
        exportData={exportData}
        windowSize={windowSize}
        toggleView={toggleView}
        getSearchedMovies={getSearchedMovies}
        movies={movies}
        getRecentMovie={getRecentMovie}
        getSortedMovies={getSortedMovies}
        deleteByRating={deleteByRating}
      />
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  const { config, movies={} } = state;
  const { isShowImage = false } = config
  return {
      state,
      isShowImage,
      movies
    }
};

export default connect(mapStateToProps,{
  openForm,
  closeForm,
  showImage, 
  hideImage,
  getMovies,
  toggleView,
  getSearchedMovies,
  getRecentMovies,
  getSortedMovies,
  deleteByRate
  
})(LeftPanelContainer);