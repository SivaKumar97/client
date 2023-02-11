import React from 'react'
import { connect } from 'react-redux'
import { addDetails, updateDetails } from '../Action/APIAction';
import RightPanel from '../Component/RightPanel';
import { closeForm, openForm, updateMovies } from '../Dispatcher/Action';
import { getActName, getMovieName, getRightPanelObj, normalizeObj } from '../Utils/Utils';
function RightPanelContainer(props) {
  const { 
    formType,
    closeForm,
    movies,
    updateMovies,
    actName,
    name,
    openForm,
    recordId
   } = props;
   
  const submitForm = (payload, setLoading, type) =>{
    let detailsAPICall = addDetails;
    if(type == 'editForm'){
      detailsAPICall = updateDetails
    }
    detailsAPICall(payload).then((res)=>{
      setLoading(false)
      updateMovies(normalizeObj(res.mvDetails,'mvId'))
      if(type == 'editForm'){
        return openForm('detailView')
      }
      closeForm();
    },err=>{
      setLoading(false)
      console.log("Error Found",err)
    })
  }
  return (
    (formType == 'addForm' || formType == 'editForm') ? (
      <React.Fragment>  
        <RightPanel
          rightPanelObj={getRightPanelObj(formType,movies[recordId])}
          formType={formType}
          closeForm={closeForm}
          submitForm={submitForm}
          mvDetail={movies[recordId]}
          actName={actName}
          name={name}
          openForm={openForm}
          recordId={recordId}
        />
    </React.Fragment>
    ) : null
  )
}

const mapStateToProps = state => {
  const { form, movies } = state;
  const formType = form.isFormOpened
  const actName = getActName(movies);
  const name = getMovieName(movies);
  const recordId = form.recordId;
  return {
      state,
      formType,
      movies,
      actName,
      name,
      recordId
    }
};

export default connect(mapStateToProps, {
  closeForm,
  updateMovies,
  openForm
})(RightPanelContainer);