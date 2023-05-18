import {  Drawer } from '@mui/material';
import React from 'react'
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
    datas,
    deleteMovie,
    getSearchedMovies,
    getMovies,
    movies,
    searchContainer,
    toggleSearch,
    showSearch,
    getSortedMovies,
    canShowImage,
    view,
    formType
   } = props;
  const deleteDv = (id) =>{
    deleteDetails(id).then(resp=>{
      deleteMovie(id)
    },err=>{
      console.log("LV Error :",err)
    })
  }
  const [fields,setFields] = React.useState({releaseDate: 'desc'})
  const sortDetails = (sortField) =>{
    const type = fields[sortField] == 'asc' ? 'desc' : fields[sortField] == 'desc'? 'asc' : 'asc'
    fields[sortField] = type;
    // getSortedMvDetails(sortField,type,Object.values(movies)).then(
    //   data=>{
        setFields({...fields})
        getSortedMovies(normalizeObj(getMoviesLst(datas),sortField,type))
      // })
  }
  const updateMvDetails = (payload)=>{
    updateDetails(payload).then((res)=>{
      updateMovies(normalizeObj(res.mvDetails,'mvId'))
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
      {view == 'table' && formType != 'showRecent' ? (<ListView 
        openDv={openDv}
        rows={datas}
        deleteDv={deleteDv}
        searchContainer={searchContainer}
        sortDetails={sortDetails}
        toggleSearch={toggleSearch}
      />) : (
        <ClassicView 
          rows={datas}
          openDv={formType != 'showRecent' && openDv}
          canShowImage={canShowImage}
          updateMvDetails={formType != 'showRecent' && updateMvDetails}
          formType={formType}
          />
        )}
      
    </Drawer>
  )
}

const mapStateToProps = state => {
  const { movies, config={}, form } =state;
  const { isShowImage, view='table' } = config;
  const datas = getDatas(state)
  const formType = form['listView']
  return {
      state,
      datas,
      canShowImage: isShowImage,
      movies,
      view,
      formType
    }
};

export default connect(mapStateToProps, {
  closeForm,
  openForm,
  deleteMovie,
  getSearchedMovies,
  getMovies,
  getSortedMovies,
  updateDetails
})(ListViewContainer);