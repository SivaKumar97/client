import React from 'react'
import { connect } from 'react-redux'
import { exportDatas, exportProject, getPercentage, importDatas } from '../Action/APIAction';
import LeftPanel from '../Component/LeftPanel';
import { closeForm, openForm, showImage, hideImage, getMovies } from '../Dispatcher/Action';
import { getLeftPanelObj, normalizeObj } from '../Utils/Utils';
import { toggleView } from './../Dispatcher/Action';
function LeftPanelContainer(props) {
  const { 
    openForm, 
    closeForm,
    isShowImage,
    showImage, 
    hideImage,
    getMovies,
    windowSize,
    toggleView
  } = props;
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
      />
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  const { config } = state;
  const { isShowImage = false } = config
  return {
      state,
      isShowImage
    }
};

export default connect(mapStateToProps,{
  openForm,
  closeForm,
  showImage, 
  hideImage,
  getMovies,
  toggleView  
})(LeftPanelContainer);