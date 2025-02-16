import React from 'react'
import { connect } from 'react-redux'
import { addDetails, updateDetails } from '../Action/APIAction';
import RightPanel from '../Component/RightPanel';
import { closeForm, openForm, updateMovies } from '../Dispatcher/Action';
import { getActName, getCurrentDate, getMovieName, getRightPanelObj, normalizeObj } from '../Utils/Utils';
function RightPanelContainer(props) {
  const { 
    updateMovies,
    actName,
    name,
    openForm,
    recordId,
    movieList,
    otherConfig,
    updateOtherConfig,
    setMovieList,
    getMovieById
   } = props;
  const closeForm = () =>{
    updateOtherConfig({editId: '', formPage: ''})
  }

  const editId = otherConfig['editId'];
  const formPage = otherConfig['formPage']
  const submitForm = (payload, setLoading, type) =>{
    let detailsAPICall = addDetails;
    if(formPage == 'editForm'){
      detailsAPICall = updateDetails
    }
    detailsAPICall(payload).then((res)=>{
      setLoading(false)
      const {mvId, movie_id, actor_name, rating, download_link, subtitle_link, release_date, date=getCurrentDate('',true), image_link } = payload;
      if(formPage == 'editForm'){
        movieList[editId] = {...movieList[editId], name: movie_id, mvId, actName: actor_name, rating, downloadLink: download_link, subLink: subtitle_link, releaseDate: getCurrentDate(release_date,true), imageLink: image_link};
        setMovieList(movieList);
        return updateOtherConfig({formPage: 'detailView', dvId: editId})
      }else{
        setMovieList([{name: movie_id, actName: actor_name, rating, downloadLink: download_link, subLink: subtitle_link, releaseDate: getCurrentDate(release_date,true), date, imageLink: image_link, mvId:res.id},...movieList])
      }
      closeForm();
    },err=>{
      setLoading(false)
      console.log("Error Found",err)
    })
  }
  return (
    (formPage == 'addForm' || formPage == 'editForm') ? (
      <React.Fragment>  
        <RightPanel
          rightPanelObj={getRightPanelObj(formPage,movieList[editId])}
          formType={formPage}
          closeForm={closeForm}
          submitForm={submitForm}
          mvDetail={movieList[editId]}
          actName={actName}
          name={name}
          openForm={openForm}
          recordId={editId}
          getMovieById={getMovieById}
        />
    </React.Fragment>
    ) : null
  )
}

export default RightPanelContainer
