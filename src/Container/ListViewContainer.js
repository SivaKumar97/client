import {  Drawer } from '@mui/material';
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { deleteDetails, getMvDetails, searchDetails, updateDetails } from '../Action/APIAction';
import ClassicView from '../Component/ClassicView';
import ListView from '../Component/ListView';
import { closeForm, openForm, deleteMovie, getSearchedMovies, getMovies, updateMovies } from '../Dispatcher/Action';
import { getMoviesLst, normalizeObj } from '../Utils/Utils';
import { getSortedMovies } from './../Dispatcher/Action';
import { getDatas } from './../Utils/selector';
import MovieContainer from './MovieContainer';
function ListViewContainer(props) {
  const { 
    openForm : openDv,
    searchContainer,
    toggleSearch,
    formType,
    searchMv,
    movieList,
    updateConfig,
    configState,
    updateOtherConfig,
    otherConfig,
    setMovieList,
   } = props;
   const { 
    viewType,
    imagePreview
   } = otherConfig;
  const deleteDv = (id) =>{
    const { mvId } = movieList[id]
    deleteDetails(mvId).then(resp=>{
      movieList.splice(id,1);
      return setMovieList([...movieList]);
    },err=>{
      console.log("LV Error :",err)
    })
  }
  const  TableVirtuosoRef= React.useRef(null);
  const fetchNextData = ()=>{
    if(!otherConfig.isNoMoreData){
      updateConfig({from: configState.from+20})
      // TableVirtuosoRef.current && TableVirtuosoRef.current.scrollToOffset(configState.from)
    }
  }
  const sortDetails = (sortField) =>{
    updateConfig({sortField,from:0, sortOrder: sortField == configState.sortField ? configState.sortOrder == 'ASC' ? 'DESC' : 'ASC' : 'DESC'})
  }
  const updateMvDetails = (payload)=>{
    updateDetails(payload).then((res)=>{
      movieList[editId] = {name: movie_id, mvId, actName: actor_name, rating, downloadLink: download_link, subLink: subtitle_link, releaseDate: release_date, date, imgLink: image_link};
      setMovieList(movieList);
      return updateOtherConfig({formPage: 'detailView', dvId: res})
    },err=>{
      console.log("Error Found",err)
    })
  }
  return (
    <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: '84.8%',
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
              ml:'15.1%'
            }
          }}
        >
      <MovieContainer />    
      {searchContainer("LV")}
      {viewType == 'tableView' && formType != 'showRecent' ? (<ListView 
        openDv={openDv}
        rows={movieList}
        deleteDv={deleteDv}
        searchContainer={searchContainer}
        sortDetails={sortDetails}
        toggleSearch={toggleSearch}
        searchMv={searchMv}
        updateOtherConfig={updateOtherConfig}
        fetchNextData={fetchNextData}
        TableVirtuosoRef={TableVirtuosoRef}
        configState={configState}
      />) : (
        <ClassicView 
          rows={movieList}
          openDv={formType != 'showRecent' && openDv}
          canShowImage={imagePreview}
          updateMvDetails={formType != 'showRecent' && updateMvDetails}
          formType={formType}
          updateOtherConfig={updateOtherConfig}
          searchMv={searchMv}
          hasMore={!otherConfig.isNoMoreData}
          fetchNextData={fetchNextData}
          />
        )}
      
    </Drawer>
  )
}
export default ListViewContainer