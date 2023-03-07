import {  Drawer } from '@mui/material';
import React from 'react'
import { connect } from 'react-redux'
import { deleteDetails, getMvDetails, searchDetails } from '../Action/APIAction';
import ClassicView from '../Component/ClassicView';
import ListView from '../Component/ListView';
import { closeForm, openForm, deleteMovie, getSearchedMovies, getMovies } from '../Dispatcher/Action';
import { getMoviesLst, normalizeObj } from '../Utils/Utils';
import { getSortedMovies } from './../Dispatcher/Action';
import { getDatas } from './../Utils/selector';
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
    view
   } = props;
  const deleteDv = (id) =>{
    deleteDetails(id).then(resp=>{
      deleteMovie(id)
    },err=>{
      console.log("LV Error :",err)
    })
  }
  const [fields,setFields] = React.useState({})
  const sortDetails = (sortField) =>{
    const type = fields[sortField] == 'asc' ? 'desc' : fields[sortField] == 'desc'? 'asc' : 'asc'
    fields[sortField] = type;
    // getSortedMvDetails(sortField,type,Object.values(movies)).then(
    //   data=>{
        setFields({...fields})
        getSortedMovies(normalizeObj(getMoviesLst(datas),sortField,type))
      // })
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
          
      {searchContainer("LV")}
      {view == 'table' ? (<ListView 
        openDv={openDv}
        rows={datas}
        deleteDv={deleteDv}
        searchContainer={searchContainer}
        sortDetails={sortDetails}
        toggleSearch={toggleSearch}
      />) : (
        <ClassicView 
          rows={datas}
          openDv={openDv}
          canShowImage={canShowImage}
          />
        )}
      
    </Drawer>
  )
}

const mapStateToProps = state => {
  const { movies, config={} } =state;
  const { isShowImage, view='table' } = config;
  const datas = getDatas(state)
  return {
      state,
      datas,
      canShowImage: isShowImage,
      movies,
      view
    }
};

export default connect(mapStateToProps, {
  closeForm,
  openForm,
  deleteMovie,
  getSearchedMovies,
  getMovies,
  getSortedMovies
})(ListViewContainer);