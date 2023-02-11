import {  Drawer } from '@mui/material';
import React from 'react'
import { connect } from 'react-redux'
import { deleteDetails, getMvDetails, searchDetails } from '../Action/APIAction';
import ListView from '../Component/ListView';
import { closeForm, openForm, deleteMovie, getSearchedMovies, getMovies } from '../Dispatcher/Action';
import { normalizeObj } from '../Utils/Utils';
function ListViewContainer(props) {
  const { 
    openForm : openDv,
    datas,
    deleteMovie,
    getSearchedMovies,
    getMovies,
    movies,
    searchDv
   } = props;
  const deleteDv = (id) =>{
    deleteDetails(id).then(resp=>{
      deleteMovie(id)
    },err=>{
      console.log("LV Error :",err)
    })
  }
  const [field,setField] = React.useState('')
  const sortDetails = (sortField) =>{
    const type = field == sortField ? 'desc' : 'asc'
    getMvDetails(sortField,type).then(
      data=>{
        setField(sortField)
        getMovies(normalizeObj(data.mvDetails,sortField,type))
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
      <ListView 
        openDv={openDv}
        datas={datas}
        deleteDv={deleteDv}
        searchDv={searchDv}
        sortDetails={sortDetails}
      />
    </Drawer>
  )
}

const mapStateToProps = state => {
  const { movies } =state;
  const { searchedMovies = {} } = movies;
  const datas = JSON.stringify(searchedMovies) == "{}" ? movies : searchedMovies || {}
  delete datas.searchedMovies
  return {
      state,
      datas,
      movies
    }
};

export default connect(mapStateToProps, {
  closeForm,
  openForm,
  deleteMovie,
  getSearchedMovies,
  getMovies
})(ListViewContainer);