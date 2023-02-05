import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getMvDetails } from '../Action/APIAction';
import ListViewContainer from './ListViewContainer';
import LeftPanelContainer from './LeftPanelContainer';
import RightPanelContainer from './RightPanelContainer';
import DetailViewContainer from './DetailViewContainer';
import { getMovies } from '../Dispatcher/Action';
import { normalizeObj } from '../Utils/Utils';
let intialCall = false;
function AppContainer(props) {
    const { state, getMovies } = props;
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
  return (
    <Container sx={{ display: 'flex', p:0, m:0, height:'100%'}}> 
        <LeftPanelContainer />
        <RightPanelContainer />
        <ListViewContainer />
        <DetailViewContainer />
    </Container>
    
  );
}

const mapStateToProps = state => {
    return {
        state
      }
};

export default connect(mapStateToProps,{
  getMovies
})(AppContainer);