import React from 'react'
import { connect } from 'react-redux'
import { exportDatas, exportProject, getPercentage, importDatas, getRecentDatas, deleteByRate } from '../Action/APIAction';
import LeftPanel from '../Component/LeftPanel';
import { closeForm, openForm, showImage, hideImage, getMovies } from '../Dispatcher/Action';
import { getLeftPanelObj, normalizeObj } from '../Utils/Utils';
import { toggleView, getSearchedMovies, getRecentMovies, getSortedMovies } from './../Dispatcher/Action';
function LeftPanelContainer(props) {
  const { 
    closeForm,
    getMovies,
    windowSize,
    movies,
    getSearchedMovies,
    getRecentMovies,
    getSortedMovies,
    updateOtherConfig,
    otherConfig,
    countObj,
    updateConfig,
    usageObj
  } = props;
  const toggleView = () =>{
    updateOtherConfig({viewType: otherConfig.viewType == 'tableView' ? 'classicView' : 'tableView'})
  }
  const toggleImagePreview = () =>{
    updateOtherConfig({imagePreview: !otherConfig.imagePreview})
  }
  const openForm = ()=>{
    updateOtherConfig({formPage: 'addForm'})
  }
  const getRecentMovie = ()=>{
    getRecentDatas().then((res=[])=>{
        const { recentLst= [] } = res[0]
        getRecentMovies(recentLst)
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
        isShowImage={otherConfig.imagePreview}
        toggleImagePreview={toggleImagePreview}
        exportData={exportData}
        windowSize={windowSize}
        toggleView={toggleView}
        getSearchedMovies={getSearchedMovies}
        movies={movies}
        getRecentMovie={getRecentMovie}
        getSortedMovies={getSortedMovies}
        deleteByRating={deleteByRating}
        countObj={countObj}
        updateConfig={updateConfig}
        usageObj={usageObj}
      />
    </React.Fragment>
  );
}


export default LeftPanelContainer