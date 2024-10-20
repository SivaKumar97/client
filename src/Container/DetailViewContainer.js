import React from 'react'
import { connect } from 'react-redux'
import DetailView from '../Component/DetailView';
import { getDatas } from './../Utils/selector';
function DetailViewContainer(props) {
  const { 
    canShowImage,
    searchContainer,
    movieList,
    otherConfig,
    updateOtherConfig
   } = props;
   const { dvId, imagePreview } = otherConfig;
   const getMvId = (type) =>{
    let currentId = parseInt(dvId);
    if(type == 'prev'){
      currentId -= 1
    }else{
      currentId +=1
    }
    currentId = currentId >= movieList.length ? dvId : currentId < 0 ? dvId : currentId;
    return currentId+''
   }
  const changeDv = (id)=>{
    updateOtherConfig({dvId: id+''})
  }
  const editForm = ()=>{
    updateOtherConfig({dvId: '', formPage: 'editForm', editId: dvId+''});
  }
  const closeForm = ()=>{
    updateOtherConfig({dvId: '', formPage: ''})
  }
  return (
        <DetailView 
          isDeailViewOpened={true}
          closeForm={closeForm}
          canShowImage={imagePreview}
          movieList={movieList}
          getMvId={getMvId}
          changeDv={changeDv}
          editForm={editForm}
          searchContainer={searchContainer}
          otherConfig={otherConfig}
        />
      
  )
}


export default DetailViewContainer