import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getMvDetails } from '../Action/APIAction';
import ListViewContainer from './ListViewContainer';
import LeftPanelContainer from './LeftPanelContainer';
import RightPanelContainer from './RightPanelContainer';
import DetailViewContainer from './DetailViewContainer';
import { getMovies, getSearchedMovies } from '../Dispatcher/Action';
import { normalizeObj } from '../Utils/Utils';
import { searchDetails } from './../Action/APIAction';
let intialCall = false;
function AppContainer(props) {
    const { state, getMovies, getSearchedMovies, movies } = props;
    let [initialCallMade, setInitialCall ] = useState(false)
    useEffect(()=>{
      if(!initialCallMade){
        setInitialCall(true)
        intialCall = true;
        getMvDetails().then(
          data=>{
            getMovies(normalizeObj(data.mvDetails,'mvId'))
          })
      }
    },initialCallMade)
    const searchDv = (str) =>{
      const searchCall = str.length  == 0 ? getMvDetails : searchDetails;
      searchCall(str,Object.values(movies)).then(resp=>{
        getSearchedMovies(normalizeObj(resp.mvDetails,'mvId'))
      },err=>{
  
      })
    }
  return (
    <Container sx={{ display: 'flex', p:0, m:0, height:'100%'}}> 
        <LeftPanelContainer />
        <RightPanelContainer />
        <ListViewContainer searchDv={searchDv}/>
        <DetailViewContainer searchDv={searchDv} />
    </Container>
    
  );
}

const mapStateToProps = state => {
  const { movies={} } = state;
    return {
        state,
        movies
      }
};

export default connect(mapStateToProps,{
  getMovies,
  getSearchedMovies
})(AppContainer);